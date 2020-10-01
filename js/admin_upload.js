var base64
var canvas
$(document).ready(function () {
    displayUsers();
    uploadPrep();
    previewImage();
    getTools();
});

  function displayUsers() {
    var jsonData = {};
        $.ajax({
            type: "post",
            url: "../../backend/index.php?action=displayUsers",
            data: {
                data: JSON.stringify(jsonData)
            },
            success: function (response) {
                console.log(response);
                if(response.status == "OK"){
                  var i = 0;
                  $(response.users).each(function(index){
                    var self = this;
                    $("#table_body").append(
                      `<tr class="user_row" data-href="../profile_admin.php">
                        <td class="userid" id="${this.userid}">${this.userid}</td>
                        <td class="firstname">${this.firstname}</td>
                        <td class="lastname">${this.lastname}</td>
                        <td class="email">${this.email}</td>
                        <td>unknown</td>
                        <td>${this.group_type}</td>
                        <td>${this.created}</td>
                       </tr>
                      `
                    )
                    $(".user_row").hover(function(){
                      $(this).css("cursor", "pointer");
                    });
                    $(".user_row").click(function() {
                      window.location = $(this).data("href")+"?id="+$(this).find(".userid").attr("id");
                    });
                  });
                  $("#user_table").DataTable();
                  $(".dataTables_filter").css("display","none");
                  setTimeout(function(){ sortTable(response.users) }, 300);
                }
            }
        });
}

function sortTable(response_array){

  $("#search_field, #order_by, #sort_order, #user_group").change(function(){
    var new_array = response_array;
    var ug_value=$("#user_group").val();
    var so_value=$("#sort_order").val();
    var ob_value=$("#order_by").val();

    if(ug_value!="ALL"){
      new_array = new_array.filter((a) => {
        return a.group_type.toUpperCase() == ug_value;
      });
    }

    if(so_value=="descending"){
        new_array = new_array.sort((a, b) => {
        return a[ob_value].toUpperCase() > b[ob_value].toUpperCase() ? 1 : -1;
        });
        new_array.reverse();
    }else{
        new_array = new_array.sort((a, b) => {
        return a[ob_value].toUpperCase() > b[ob_value].toUpperCase() ? 1 : -1;
      });
    }

    $("#table_body tr").remove(); 
    $(new_array).each(function(index){
      var self = this;
      $("#table_body").append(
        `<tr class="user_row" data-href="../profile_admin.php">
          <td class="userid">${this.userid}</td>
          <td>${this.firstname}</td>
          <td>${this.lastname}</td>
          <td>${this.email}</td>
          <td>unknown</td>
          <td>${this.group_type}</td>
          <td>${this.created}</td>
         </tr>
        `
      );
    var entry = $("#order_by").val();
    searchInTable(entry);
    $("#user_table").DataTable();
    $(".dataTables_filter").css("display","none");
    $(".user_row").hover(function(){
      $(this).css("cursor", "pointer");
    });
    $(".user_row").click(function() {
      window.location = $(this).data("href")+"?id="+$(this).find(".userid").html();
    });
  });
});
}

function searchInTable(value){
    var input, filter, table, tr, td, i, txtValue, x;
    input = document.getElementById("search_field");
    filter = input.value.toUpperCase();
    table = document.getElementById("user_table");
    tr = table.getElementsByTagName("tr");
    switch(value){
      case "userid":
        x=0;
        break;
      case "firstname":
        x=1;
        break;
      case "lastname":
        x=2;
        break;
      case "email":
        x=3;
        break;
      default:
        console.log("error");
    }
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[x];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
}

function uploadPrep(){
  $("#tool-input").submit(function (e) {
    e.preventDefault();
    uploadCanvasImage(canvas)
    uploadToolData()
  });
}

function uploadToolData() {
    $("button[type=submit]").prop( "disabled", true );
    jsonData["base64"]=base64;
    jsonData["description"]=$("#toolDesc").val();
    jsonData["title"]=$("#toolName").val();
    jsonData["folder"]=$("#toolFolder").val();
    jsonData["video_url"]=$("#toolVideo").val();
    jsonData["keywords"]=$("#toolKey").val();
    if($("#toolFolder").val()!=""){
      if($("#pending_status").prop('checked')){
        jsonData["status"]="pending"
      }else{
        jsonData["status"]="active"
      }
    }else{
      jsonData["status"]="inactive"
    }
    console.log(jsonData["status"])
    var platform = $("#selectPlatform").val();
    if(platform=="Desktop"){platform="desktop"}else if(platform=="Mobile"){platform="mobile"}else{platform="desktop_mobile"}
    jsonData["platform"]=platform;
    var webmaster=0;
    var social_media=0;
    var business=0;
    if($("#category_social").prop('checked')){social_media=1};
    if($("#category_webmaster").prop('checked')){webmaster=1};
    if($("#category_business").prop('checked')){business=1};
    jsonData["webmaster"]=webmaster;
    jsonData["social_media"]=social_media;
    jsonData["business"]=business;
    console.log(jsonData);
    if($(".submitTool").html()!="Submit"){
    jsonData["toolid"]=toolid;
      $.ajax({
        type: "post",
        url: "../backend/index.php?action=updateToolData",
        data: {
          data: JSON.stringify(jsonData)
        },
        success: function (response) {
          $("button[type=submit]").prop( "disabled", false );
          console.log(response)
          if (response.status == "OK") {
            Swal.fire({
              title: "Success",
              icon: 'success',
              html: "Tool has been successfully updated.",
              showCloseButton: true,
              showCancelButton: false,
              showConfirmButton: true,
              focusConfirm: true,
              focusClose:false,
              customClass: {
                content: 'swalContent',
                confirmButton: 'swalUpdateYes',
                closeButton: 'swalCloseYes'
              },
              confirmButtonText:
                'Yes',
              cancelButtonText:
                'No'
            });
            $(".swalUpdateYes, swalCloseYes").click(function(e){
             // location.reload();
            })
          } else {
            Swal('Error','Tool could not be uploaded.','error');
          }
        }, error: function(x){
          $("button[type=submit]").prop( "disabled", false );
          console.log(x);
        }
      });
    }else{
      $.ajax({
        type: "post",
        url: "../backend/index.php?action=uploadToolData",
        data: {
          data: JSON.stringify(jsonData)
        },
        success: function (response) {
          $("button[type=submit]").prop( "disabled", false );
          console.log(response)
          if (response.status == "OK") {
            Swal('Success','Tool has been successfully uploaded.','success');
          } else {
            Swal('Error','Tool could not be uploaded.','error');
          }
        }, error: function(x){
          $("button[type=submit]").prop( "disabled", false );
          console.log(x);
        }
      });
    }
}

function previewImage(){
  $("#tool_pic").change(function(e){
    var img = new Image();
    img.onload = draw;
    img.onerror = failed;
    img.src = URL.createObjectURL(this.files[0]);
  });
}
function draw() {
  $("#canvas_container").css("background-image","none")
  canvas = document.getElementById('toolCanvas');
  canvas.height = 300;
  var tmpCtx = canvas.getContext('2d');
  tmpCtx.save();
    tmpCtx.beginPath();
    tmpCtx.arc(150, 150, 150, 0, Math.PI * 2, true);
    tmpCtx.closePath();
    tmpCtx.clip();

    tmpCtx.drawImage(this, 0, 0, 300, 300);
  /*ctx.drawImage(this,0,0);
  ctx.beginPath();
  ctx.arc(0,0,300,300, Math.PI*2);
  ctx.fill();*/
  return true;
}
function failed() {
  console.error("The provided file couldn't be loaded as an Image media");
}
function uploadCanvasImage(input){
  base64 = input.toDataURL().split(",")[1];
  console.log(base64)
  return true;
}

function getTools(){
  $.ajax({
    type: "post",
    url: "../backend/index.php?action=getTools",
    data: {
      data: JSON.stringify(dummyJson)
    },
    success: function (response) {
      console.log(response)
      if (response.status == "OK") {
        responseArray.push(response.tools);
        var inactiveTools = responseArray[0].filter(function(item) { return item.status=="inactive"; })
        var activeTools = responseArray[0].filter(function(item) { return item.status=="active"; })
        var pendingTools = responseArray[0].filter(function(item) { return item.status=="pending"; })
        $(inactiveTools).each(function(index){
            var self = this;
            var description = nl2br(self.description);
          $("#toolList").append(`
            <div class="col-sm-4 tool" style="text-align:center!important" title="${self.title}" desc="${description}" hash="${self.hash}" toolid="${self.toolid}" webmaster="${self.webmaster}" social_media="${self.social_media}" business="${self.business}" video_url="${self.video_url}" platform="${self.platform}" folder="${self.folder}" pending=false keywords="${self.keywords}">
              <img src="../backend/uploads/tool_images/${self.hash}.png" style="height:auto; width:100%; border:solid 4px grey;" alt="">
              <h6>${self.title}</h6>
            </div>
          `);
          setToolData();
        });
        $(activeTools).each(function(index){
          var self = this;
          var description = nl2br(self.description);
        $("#activeToolList").append(`
          <div class="col-sm-4 tool" style="text-align:center!important" title="${self.title}" desc="${description}" hash="${self.hash}" toolid="${self.toolid}" webmaster="${self.webmaster}" social_media="${self.social_media}" business="${self.business}" video_url="${self.video_url}" platform="${self.platform}" folder="${self.folder}" pending=false keywords="${self.keywords}">
            <img src="../backend/uploads/tool_images/${self.hash}.png" style="height:auto; width:100%; border:solid 4px grey;" alt="">
            <h6>${self.title}</h6>
          </div>
        `);
        setToolData();
      });
      $(pendingTools).each(function(index){
        var self = this;
        var description = nl2br(self.description);
      $("#pendingToolList").append(`
        <div class="col-sm-4 tool" style="text-align:center!important" title="${self.title}" desc="${description}" hash="${self.hash}" toolid="${self.toolid}" webmaster="${self.webmaster}" social_media="${self.social_media}" business="${self.business}" video_url="${self.video_url}" platform="${self.platform}" folder="${self.folder}" pending=true keywords="${self.keywords}">
          <img src="../backend/uploads/tool_images/${self.hash}.png" style="height:auto; width:100%; border:solid 4px grey;" alt="">
          <h6>${self.title}</h6>
        </div>
      `);
      setToolData();
    });
        $(".tool").css("cursor","pointer");
      } else {
        console.log("error");
      }
    }, error: function(x){
      console.log(x);
    }
  });
}

function nl2br (str) {   
  var breakTag = '<br>';    
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}

var toolid;

function setToolData(){
  $(".tool").on("click", function (e) {
    var hash = $(this).attr("hash");
    var desc = $(this).attr("desc");
    var title = $(this).attr("title");
    var video_url = $(this).attr("video_url");
    var webmaster = $(this).attr("webmaster");
    var social_media = $(this).attr("social_media");
    var business = $(this).attr("business");
    var platform = $(this).attr("platform");
    var folder = $(this).attr("folder");
    var pending = $(this).attr("pending");
    var keywords = $(this).attr("keywords");
    toolid=$(this).attr("toolid");
    if($(this).attr("hash")!=null){
      canvas = document.getElementById('toolCanvas');
      var ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = "../backend/uploads/tool_images/"+hash+".png";
      img.onload = () => {
        var canvas = document.getElementById('toolCanvas');
        canvas.height = 300;
        var tmpCtx = canvas.getContext('2d');
        tmpCtx.save();
          tmpCtx.beginPath();
          tmpCtx.arc(150, 150, 150, 0, Math.PI * 2, true);
          tmpCtx.closePath();
          tmpCtx.clip();
          tmpCtx.drawImage(img, 0, 0, 300, 300);
      };
    }else{
      console.log("no hash");
    }
    $("#toolName").val(title);
    $("#toolDesc").val(desc.replace(/<br\s*\/?>/gi,""));
    $("#toolFolder").val(folder);
    if(video_url!="N/A"){$("#toolVideo").val(video_url)};
    if(platform=="mobile"){platform="Mobile"}else if(platform=="desktop"){platform="Desktop"}else{platform="Desktop & Mobile"}
    $("#selectPlatform").val(platform);
    $(".submitTool").html("Update Tool");
    if(webmaster==1){$("#category_webmaster").prop('checked',true)}else{$("#category_webmaster").prop('checked',false)}
    if(social_media==1){$("#category_social").prop('checked',true)}else{$("#category_social").prop('checked',false)}
    if(business==1){$("#category_business").prop('checked',true)}else{$("#category_business").prop('checked',false)}
    if(pending=="true"){$("#pending_status").prop('checked',true)}else{$("#pending_status").prop('checked',false)}
    $("#toolKey").val(keywords);
  });
}