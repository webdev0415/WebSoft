var to_do_order_from_db = []
$(document).ready(function () {
    getUserDetails()
  });

  function getUserDetails(){
      $.ajax({
        type: "post",
        url: "../backend/index.php?action=getUserDetails",
        data: {
          data: JSON.stringify(dummyJson)
        },
        success: function (response) {
          console.log(response);
          if(response.status == "OK"){
            getPositions(response.users.userid)
          }
        }
      })
  }

  function runQuill(elementName){
    var toolbarOptions = [
      ['bold','italic','underline'],
      ['blockquote','code-block'],
      //[{'header':[1,2,3,4,5,6,false]}],
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

  function getPositions(userid){
    jsonData["userid"]=userid
    $.ajax({
      type: "post",
      url: "../backend/index.php?action=getToDoOrder",
      data: {
        data: JSON.stringify(jsonData)
      },
      success: function (response) {
        console.log(response)
        var split_todo_array = response.to_do_order.split(",")
        for(i=0;i<split_todo_array.length;i++){
          to_do_order_from_db.push(split_todo_array[i].replace(",",""))
        }
        displayToDoLists(userid)
      },error(x){
        console.log(x)
      }
    })
    return true;
  }

  function displayToDoLists(userid){
    jsonData["userid"]=userid
        $.ajax({
        type: "post",
        url: "../backend/index.php?action=displayToDoLists",
        data: {
            data: JSON.stringify(jsonData)
        },
        success: function (response) {
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
                      <button class="btn btn-light dropdown-toggle-priority"  nr=${self[e].nr} type="button">Change status</button>
                      <button class="btn btn-light dropdown-toggle dropdown-toggle-issue" nr=${self[e].nr} type="button" data-toggle="dropdown">Change status
                        <span class="caret"></span></button>
                        <ul class="dropdown-menu dropdown-menu-issue">
                            <li class="change_report_status change_to_open" value="open"><span class="dot change_to_open_dot"></span>Open</li>
                            <li class="change_report_status change_to_in_progress" value="in_progress"><span class="dot change_to_in_progress_dot"></span>In progress</li>
                            <li class="change_report_status change_to_resolved" value="resolved"><span class="dot change_to_resolved_dot"></span>Resolved</li>
                        </ul>
                      <button class="btn btn-primary open_to_do">Open</button>
                    </div>
                    <div class="collapse">
                      <div class="card-body">
                          <h6 nr=${self[e].nr} >${linksToAnchorTags(nl2br(self[e].note))}</h6>
                      </div>
                    </div>
                  </div>
              </li>`)
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
                })
                openToDo()
                changeToDoStatus()
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

  function nl2br (str) {   
    var breakTag = '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
  }

  function linksToAnchorTags (str) {      
    return (str.replace(/(?:(https?\:\/\/[^\s]+))/g,
    '<a href="$1" target="_blank">$1</a>'))
  }

  function openToDo(){
    $(".open_to_do").click(function(e){
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
}

function changeToDoStatus(){
  $(".dropdown-menu-issue li").click(function(e){
    jsonData["nr"] = $(this).parent().parent().attr("nr")
    jsonData["status"] = $(this).attr("value")
    jsonData["user_note"] = ""
    if(jsonData["status"]=="resolved"){
      Swal.fire({
        title: "Leave an extra note (not mandatory)",
        html: "<div id='extra_note' style='height:20vh'></div>",
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: true,
        focusConfirm: true,
        focusClose:false,
        customClass: {
          content: 'swalContent',
          confirmButton: 'swalStart',
          title: 'swalTitle',
          closeButton: 'swalClose'
        },
        confirmButtonText:
          'OK'
        });
        runQuill(`#extra_note`)
        $(".ql-toolbar.ql-snow").css("text-align","left")
        $(".swalStart,.swalClose").click(function(e){
          jsonData["user_note"] = $(".ql-editor").html()
          $.ajax({
            type: "post",
            url: "../backend/index.php?action=changeToDoStatus",
            data: {
              data: JSON.stringify(jsonData)
            },
            success: function (response) {
              console.log(response)
              if(response.status="OK"){
                var status=`<span class="dot change_to_resolved_dot"></span>`+capitalize(jsonData["status"])
                $(`.dropdown-toggle-issue[nr='${jsonData["nr"]}'`).html(`${status}`)
              }
            }
          })
        })
    }else{
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
                              status=`<span class="dot change_to_closed_dot"></span>`+capitalize(self[e].status)
                            break;
                        }
                        $(`.dropdown-toggle-issue[nr='${jsonData["nr"]}'`).html(`${status}`)
          }
        }
      })
    }
  })
}