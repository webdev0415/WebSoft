var current_user
var to_do_order_from_db = []
$(document).ready(function () {
    displayUsers()
    addToDo()
    runQuill('#note_text')
  });

  function runQuill(elementName){
    var toolbarOptions = [
      ['bold','italic','underline'],
      ['blockquote','code-block'],
      //[{'headesr':[1,2,3,4,5,6,false]}],
      [{'list':'ordered'},{'list':'bullet'}],
      [{'direction':'rtl'}],
      [{'size':['small',false,'large','huge']}],
      ['link','image','video','formula']
    ]
    var editor = new Quill(elementName, {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: 'snow'
    });
  }

  function mapOrder (array, order, key) {
  
    array.sort( function (a, b) {
      var A = a[key], B = b[key];
      
      if (order.indexOf(A) > order.indexOf(B)) {
        return 1;
      } else {
        return -1;
      }
      
    });
    
    return array;
  };

  function displayUsers(){
    $.ajax({
      type: "post",
      url: "../backend/index.php?action=displayToDoListUsers",
      data: {
        data: JSON.stringify(dummyJson)
      },
      success: function (response) {
        console.log(response)
        var self = response.users
        if (response.status == "OK") {
            $(self).each(function(e){
                $("#users").append(`<button class="btn btn-sm btn-primary to_do_user" userid="${self[e].userid}"><h5>${self[e].firstname} ${self[e].lastname}</h5></button>`)
            })
              displayToDoLists()
        } else {
          console.log("ERROR");
        }
      }, error: function(x){
        console.log(x);
      }
    });
  }

  function displayToDoLists(userid){
    $(".to_do_user").click(function(e){
      $("#users button").prop("disabled",true)
      current_user = this.getAttribute("userid")
      jsonData["userid"]=current_user
      $("#to_do_list").empty()
      getPositions(current_user)
    })
  }

  function displayToDoAjax(userid){
    jsonData["userid"]=userid
        $.ajax({
        type: "post",
        url: "../backend/index.php?action=displayToDoLists",
        data: {
            data: JSON.stringify(jsonData)
        },
        success: function (response) {
            console.log(response)
            var self = response.list_items
            var orderedToDoArray = []
            orderedToDoArray = mapOrder(self, to_do_order_from_db, 'nr');
            if (response.status == "OK") {
                $(orderedToDoArray).each(function(e){
                    $("#to_do_list").append(`<li>
                  <div class="card" nr=${self[e].nr}>
                    <div class="card-header" nr=${self[e].nr}>
                      <h5 class="mb-0 to_do_item">
                        ${self[e].title}
                      </h5>
                      <div class="dropdown_prio_wrapper" style="display:inline-block" nr=${self[e].nr} >
                      <button class="btn btn-sm btn-light dropdown-toggle dropdown-toggle-priority"  nr=${self[e].nr} type="button" data-toggle="dropdown">Change status
                      <span class="caret"></span></button>
                        <ul class="dropdown-menu dropdown-menu-priority">
                          <li class="change_report_status change_to_open" value="normal"><span class="dot change_to_open_dot"></span>Normal</li>
                          <li class="change_report_status change_to_in_progress" value="urgent"><span class="dot change_to_resolved_dot"></span>Urgent</li>
                        </ul>
                      </div>
                      <div class="dropdown_status_wrapper" style="display:inline" nr=${self[e].nr}>
                      <button class="btn btn-sm btn-light dropdown-toggle dropdown-toggle-issue"  nr=${self[e].nr} type="button" data-toggle="dropdown">Change status
                      <span class="caret"></span></button>
                        <ul class="dropdown-menu dropdown-menu-issue">
                          <li class="change_report_status change_to_open" value="open"><span class="dot change_to_open_dot"></span>Open</li>
                          <li class="change_report_status change_to_in_progress" value="in_progress"><span class="dot change_to_in_progress_dot"></span>In progress</li>
                          <li class="change_report_status change_to_resolved" value="resolved"><span class="dot change_to_resolved_dot"></span>Resolved</li>
                          <li class="change_report_status change_to_closed" value="to_be_corrected"><span class="dot change_to_closed_dot"></span>To be corrected</li>
                        </ul>
                      </div>
                      <button class="btn btn-sm btn-success edit_to_do">Edit</button>
                      <button class="btn btn-sm btn-danger delete_to_do">Delete</button>
                    </div>
                    <div class="collapse" nr=${self[e].nr}>
                      <div class="card-body">
                          <input class="form-control" nr=${self[e].nr} style="margin-bottom: 2vh;"></input>
                          <div nr=${self[e].nr} class="edit_quill" id="edit_quill_${self[e].nr}"></div>
                          <button class="btn btn-success save_to_do_text">Save</button>
                      </div>
                    </div>
                  </div>
              </li>`)
              if(self[e].user_note!=""){
                $(`.collapse[nr='${self[e].nr}'] .card-body`).append(`<div style="margin-top:2vh"><h5>User note:</h5>${self[e].user_note}</div>`)
              }
              var status
              switch(capitalize(self[e].status)){
                case "Open":
                    status=`<span class="dot change_to_open_dot"></span>`+capitalize(self[e].status)
                break;
                case "In progress":
                    status=`<span class="dot change_to_in_progress_dot"></span>`+capitalize(self[e].status)
                break;
                case "Resolved":
                    status=`<span class="dot change_to_resolved_dot"></span>`+capitalize(self[e].status)
                break;
                case "To be corrected":
                    status=`<span class="dot change_to_closed_dot"></span>`+capitalize(self[e].status)
                break;
              }
              $(`.dropdown-toggle-issue[nr='${self[e].nr}']`).html(status)

              var priority
              switch(capitalize(self[e].priority)){
                case "Normal":
                  priority=`<span class="dot change_to_open_dot"></span>`+capitalize(self[e].priority)
                break;
                case "Urgent":
                  priority=`<span class="dot change_to_resolved_dot"></span>`+capitalize(self[e].priority)
                break;
              }
              $(`.dropdown-toggle-priority[nr='${self[e].nr}']`).html(priority)
              runQuill(`#edit_quill_${self[e].nr}`)
              $(`div[nr='${self[e].nr}']`).find(".ql-editor").html(self[e].note)
              $(`input[nr='${self[e].nr}']`).val(self[e].title)
                })
                $( "#to_do_list" ).sortable({
                    revert: true,
                    axis:"y",
                    stop: function( event, ui ) {
                      uploadPositions()
                    },
                    cancel:'.ql-editor,.edit_quill'
                  });
                  $("#users button").prop("disabled",false)
                  editToDo()
                  deleteToDo()
                  saveToDoText()
                  changeToDoStatus()
                  changeToDoPriority()
            } else {
            console.log("ERROR");
            }
        }, error: function(x){
            console.log(x);
        }
        });
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g," ")
  }

  function addToDo(){
      $("#notes_button").click(function(e){
        jsonData["title"]=$("#title").val()
        jsonData["note"]=$(".ql-editor").html()
        jsonData["userid"]=current_user
        $.ajax({
            type: "post",
            url: "../backend/index.php?action=addToDo",
            data: {
                data: JSON.stringify(jsonData)
            },
            success: function (response) {
                console.log(response)
                if (response.status == "OK") {
                    $("#to_do_list").append(`<li>
                    <div class="card" nr=${response.nr}>
                      <div class="card-header" nr=${response.nr}>
                        <h5 class="mb-0 to_do_item">
                          ${jsonData["title"]}
                        </h5>
                        <div class="dropdown_prio_wrapper" style="display:inline-block" nr=${response.nr} >
                        <button class="btn btn-sm btn-light dropdown-toggle dropdown-toggle-priority"  nr=${response.nr} type="button" data-toggle="dropdown"><span class="dot change_to_open_dot"></span>Normal
                        <span class="caret"></span></button>
                        <ul class="dropdown-menu dropdown-menu-priority">
                          <li class="change_report_status change_to_open" value="normal"><span class="dot change_to_open_dot"></span>Normal</li>
                          <li class="change_report_status change_to_in_progress" value="urgent"><span class="dot change_to_resolved_dot"></span>Urgent</li>
                        </ul>
                        </div>
                        <div class="dropdown_status_wrapper" style="display:inline" nr=${response.nr}>
                        <button class="btn btn-sm btn-light dropdown-toggle dropdown-toggle-issue" nr=${response.nr} type="button" data-toggle="dropdown"><span class="dot change_to_open_dot"></span>Open
                        <span class="caret"></span></button>
                        <ul class="dropdown-menu dropdown-menu-issue">
                            <li class="change_report_status change_to_open" value="open"><span class="dot change_to_open_dot"></span>Open</li>
                            <li class="change_report_status change_to_in_progress" value="in_progress"><span class="dot change_to_in_progress_dot"></span>In progress</li>
                            <li class="change_report_status change_to_resolved" value="resolved"><span class="dot change_to_resolved_dot"></span>Resolved</li>
                            <li class="change_report_status change_to_closed" value="to_be_corrected"><span class="dot change_to_closed_dot"></span>To be corrected</li>
                        </ul>
                        </div>
                        <button class="btn btn-sm btn-success edit_to_do">Edit</button>
                        <button class="btn btn-sm btn-danger delete_to_do">Delete</button>
                      </div>
                      <div class="collapse">
                        <div class="card-body" nr=${response.nr} title=${jsonData["title"]} note=${jsonData["note"]}>
                            <input class="form-control" nr=${response.nr} style="margin-bottom: 2vh;"></input>
                            <div nr=${response.nr} class="edit_quill" id="edit_quill_${response.nr}"></div>
                            <button class="btn btn-success save_to_do_text">Save</button>
                        </div>
                      </div>
                    </div>
                </li>`)
                runQuill(`#edit_quill_${response.nr}`)
                $(`div[nr='${response.nr}']`).find(".ql-editor").html(response.nr)
                $(`input[nr='${response.nr}']`).val(jsonData["title"])
                  uploadPositions()
                  editToDo()
                  deleteToDo()
                  saveToDoText()
                  changeToDoStatus()
                  changeToDoPriority()
                }
            }
        })
      })
  }

  function deleteToDo(){
      $(".delete_to_do").click(function(e){
        e.preventDefault()
        e.stopPropagation()
        jsonData["nr"]=$(this).parent().attr("nr")
        $.ajax({
            type: "post",
            url: "../backend/index.php?action=deleteToDo",
            data: {
                data: JSON.stringify(jsonData)
            },
            success: function (response) {
                console.log(response)
                if (response.status == "OK") {
                    $(`input[nr='${jsonData["nr"]}']`).parent().parent().parent().remove()
                }
            }
        })
      })
  }

  function editToDo(){
    $(".edit_to_do").click(function(e){
      e.preventDefault()
      e.stopPropagation()
      if($(this).parent().parent().find(".collapse").hasClass("display-block")){
        $(this).parent().parent().find(".collapse").removeClass("display-block")
        $(this).parent().parent().find(".collapse").addClass("display-none")
      }else{
        $(this).parent().parent().find(".collapse").removeClass("display-none")
        $(this).parent().parent().find(".collapse").addClass("display-block")
      }
    })
    return true;
}

function uploadPositions(){
  var position_array = []
  $(".to_do_item").each(function(e){
    position_array.push($(this).parent().attr("nr"))
  })
  jsonData["nrs"]=position_array.join(",")
  jsonData["userid"]=current_user
  console.log(jsonData["nrs"])
  $.ajax({
    type: "post",
    url: "../backend/index.php?action=uploadToDoOrder",
    data: {
      data: JSON.stringify(jsonData)
    },
    success: function (response) {
      console.log(response)
    },error(x){
      console.log(x)
    }
  })
}

function getPositions(current_user){
  $.ajax({
    type: "post",
    url: "../backend/index.php?action=getToDoOrder",
    async: false,
    data: {
      data: JSON.stringify(jsonData)
    },
    success: function (response) {
      console.log(response)
      console.log(split_todo_array)
      var split_todo_array = response.to_do_order.split(",")
      to_do_order_from_db = []
      for(i=0;i<split_todo_array.length;i++){
        to_do_order_from_db.push(split_todo_array[i].replace(",",""))
      }
    },error(x){
      console.log(x)
    }
  })
  displayToDoAjax(current_user)
  return true;
}

function saveToDoText(){
  $(".save_to_do_text").click(function(e){
    jsonData["note"] = $(this).parent().find(`.ql-editor`).html()
    jsonData["title"] = $(this).parent().find("input").val()
    jsonData["nr"]= $(this).parent().find(".edit_quill").attr("nr")
        $.ajax({
            type: "post",
            url: "../backend/index.php?action=updateToDo",
            data: {
                data: JSON.stringify(jsonData)
            },
            success: function (response) {
                console.log(response)
                if(response.status=="OK"){
                  Swal.fire("Success","To do successfully updated!","success")
                  $(`textarea[nr='${jsonData["nr"]}']`).parent().parent().removeClass("display-block")
                  $(`textarea[nr='${jsonData["nr"]}']`).parent().parent().addClass("display-none")
                }else{
                  Swal.fire("Error","An error has occured!","error")
                }
                return true;
            }
          })
        })
  }

  function changeToDoStatus(){
    $(".dropdown-menu-issue li").click(function(e){
      jsonData["nr"] = $(this).parent().parent().attr("nr")
      jsonData["status"] = $(this).attr("value")
      $.ajax({
        type: "post",
        url: "../backend/index.php?action=changeToDoStatus",
        data: {
          data: JSON.stringify(jsonData)
        },
        success: function (response) {
          console.log(response)
          if(response.status="OK"){
            var status = jsonData["status"]
                        switch(capitalize(status)){
                            case "Open":
                                status=`<span class="dot change_to_open_dot"></span>`+capitalize(status)
                            break;
                            case "In progress":
                                status=`<span class="dot change_to_in_progress_dot"></span>`+capitalize(status)
                            break;
                            case "Resolved":
                                status=`<span class="dot change_to_resolved_dot"></span>`+capitalize(status)
                            break;
                            case "To be corrected":
                              console.log("yupupup")
                                status=`<span class="dot change_to_closed_dot"></span>`+capitalize(status)
                            break;
                        }
                        $(`.dropdown-toggle-issue[nr='${jsonData["nr"]}'`).html(`${status}`)
          }
        }
      })
    })
  }

  function changeToDoPriority(){
    $(".dropdown-menu-priority li").click(function(e){
      jsonData["nr"] = $(this).parent().parent().attr("nr")
      jsonData["priority"] = $(this).attr("value")
      $.ajax({
        type: "post",
        url: "../backend/index.php?action=changeToDoPriority",
        data: {
          data: JSON.stringify(jsonData)
        },
        success: function (response) {
          console.log(response)
          if(response.status="OK"){
            var priority = jsonData["priority"]
            switch(capitalize(priority)){
              case "Normal":
                priority=`<span class="dot change_to_open_dot"></span>`+capitalize(priority)
              break;
              case "Urgent":
                priority=`<span class="dot change_to_resolved_dot"></span>`+capitalize(priority)
              break;
            }
            $(`.dropdown-toggle-priority[nr='${jsonData["nr"]}'`).html(`${priority}`)
          }
        }
      })
    })
  }