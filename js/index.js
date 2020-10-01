var isLoggedIn;
var openTabs = [];
var group_type;
var tool_order_from_db = []
var orderedActiveToolArray = []
$(document).ready(function () {
  getToolOrder()
  emailActivated();
  getUserDetails()
  setMediaText();
  resetPageDescription()
  changeUrlOnDropdown()
});

function getToolOrder(){
  $.ajax({
    type: "post",
    url: "../backend/index.php?action=getToolOrder",
    data: {
      data: JSON.stringify(dummyJson)
    },
    success: function (response) {
      console.log(response)
      var split_tool_array = response.tool_order.split(",")
      for(i=0;i<split_tool_array.length;i++){
        tool_order_from_db.push(split_tool_array[i].replace(",",""))
      }
    },error(x){
      console.log(x)
    }
  })
}

function emailActivated(){
  var window_location = window.location.href;
  if(window_location.includes("verified=true")){
    $(".page_title").prepend(`<div id="accountActivated">Your account has been successfully activated.</div>`);
  }else if(window_location.includes("email_changed=true")){
    $(".page_title").prepend(`<div id="accountActivated">Your email has been successfully changed.</div>`);
  }else{
    $(".page_title").css("padding-top","5vh");
  }
}

function getUserDetails() {
  $.ajax({
    type: "post",
    url: "../backend/index.php?action=getUserDetails",
    data: {
      data: JSON.stringify(dummyJson)
    },
    success: function (response) {
      console.log(response);
      if(response.status=="OK"){
        var self = response.users;
        jsonData["userid"] = self.userid
        group_type=self.group_type
        $("#select_tool").css("display","none")
      }
        getTools()
    }
  })
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
        var activeToolArray = responseArray[0].filter(function(item) { return item.status=="active"; });
        orderedActiveToolArray = mapOrder(activeToolArray, tool_order_from_db, 'toolid');
        $(orderedActiveToolArray).each(function(e){
          var self = this;
            iframe =self.video_url;
            if(iframe!="N/A"){
              iframe=`<hr><iframe height='315' style='width:100%!important'
              src='${self.video_url}'>
              </iframe>`;
            }else{
              iframe="";
            }
          $("#activeToolList").append(`
            <div class="tool side-corner-tag" id='${this.title.split(" ").join("_").toLowerCase().replace(/\W/g, '').replace("__","_")}' style="text-align:center!important" title="${self.title}" desc="${nl2br(self.description)}" iframe="${iframe}" status="${self.status}" folder="${self.folder}" toolid="${self.toolid}">
              <img src="../backend/uploads/tool_images/${self.hash}.png" class="tool_img" style="height:auto; width:100%; border:solid 4p grey;" alt="">
              <h6>${self.title}</h6>
            </div>`
          )
        })
        $(response.tools).each(function(index){
          if(window.innerWidth<900&&this.platform.includes("mobile")){
            var self = this;
            iframe =self.video_url;
            if(iframe!="N/A"){
              iframe=`<hr><iframe height='315' style='width:100%!important'
              src='${self.video_url}'>
              </iframe>`;
            }else{
              iframe="";
            }
            var description = nl2br(self.description);
            if(this.status=="active"){
              $("#activeToolList").append(`
              <div class="tool side-corner-tag" id='${this.title.split(" ").join("_").toLowerCase().replace(/\W/g, '').replace("__","_")}' style="text-align:center!important" title="${self.title}" desc="${description}" iframe="${iframe}" status="${self.status}" folder="${self.folder}" toolid="${self.toolid}">
                <img src="../backend/uploads/tool_images/${self.hash}.png" class="tool_img" style="height:auto; width:100%; border:solid 4p grey;" alt="">
                <h6>${self.title}</h6>
              </div>
            `);
            }else if(this.status=="inactive"){
              $("#toolList").append(`
              <div class="tool side-corner-tag" id='${this.title.split(" ").join("_").toLowerCase().replace(/\W/g, '').replace("__","_")}' style="text-align:center!important" title="${self.title}" desc="${description}" iframe="${iframe}" status="${self.status}">
                <img src="../backend/uploads/tool_images/${self.hash}.png" class="tool_img" style="height:auto; width:100%; border:solid 4p grey;" alt="">
                <p><span>Coming soon</span></p>
                <h6>${self.title}</h6>
              </div>
            `);
            }
          
            	if(group_type=="ADMIN" && this.status=="pending"){
                $("#activeToolList").prepend(`
              <div class="tool side-corner-tag" id='${this.title.split(" ").join("_").toLowerCase().replace(/\W/g, '').replace("__","_")}' style="text-align:center!important" title="${self.title}" desc="${description}" iframe="${iframe}" status="${self.status}" folder="${self.folder}" toolid="${self.toolid}">
                <img src="../backend/uploads/tool_images/${self.hash}.png" class="tool_img" style="height:auto; width:100%; border:solid 4p grey;" alt="">
                <h6>${self.title}</h6>
              </div>
            `);
              }

        }else if(window.innerWidth>=900&&this.platform.includes("desktop")){
          var self = this;
            iframe =self.video_url;
            if(iframe!="N/A"){
              iframe=`<hr><iframe width='470' height='265'
              src='${self.video_url}'>
              </iframe>`;
            }else{
              iframe="";
            }
            var description = nl2br(self.description);
          if(this.status=="inactive"){
            $("#toolList").append(`
            <div class="tool side-corner-tag" id='${this.title.split(" ").join("_").toLowerCase().replace(/\W/g, '').replace("__","_")}' style="text-align:center!important" title="${self.title}" desc="${description}" iframe="${iframe}" status="${self.status}">
              <img src="../backend/uploads/tool_images/${self.hash}.png" class="tool_img" style="height:auto; width:100%; border:solid 4p grey;" alt="">
              <p><span>Coming soon</span></p>
              <h6>${self.title}</h6>
            </div>
          `);
          }

          if(group_type=="ADMIN" && this.status=="pending"){
            $("#activeToolList").prepend(`
          <div class="tool side-corner-tag" id='${this.title.split(" ").join("_").toLowerCase().replace(/\W/g, '').replace("__","_")}' style="text-align:center!important" title="${self.title}" desc="${description}" iframe="${iframe}" status="${self.status}" folder="${self.folder}" toolid="${self.toolid}">
            <img src="../backend/uploads/tool_images/${self.hash}.png" class="tool_img" style="height:auto; width:100%; border:solid 4p grey;" alt="">
            <h6>${self.title}<br>(pending)</h6>
          </div>
        `);
          }

          //var activeArray = responseArray[0].filter(function(item) { return item.status=="active"; });
          var inactiveArray = responseArray[0].filter(function(item) { return item.status=="inactive"; });
          $("#selectCategory").change(function(){
            filterToolsByCategory(orderedActiveToolArray, inactiveArray);
          });
          $('#searchBox').keydown(function(e){
            if(e.keyCode === 13){
              searchTools(orderedActiveToolArray, inactiveArray);
            }
          });
          $(".search_button").on("click", function (e) {
            e.preventDefault();
            searchTools(orderedActiveToolArray, inactiveArray);
          });
        }
        });
        $(".tool").css("cursor","pointer");
        $.ajax({
          type: "post",
          url: "../backend/index.php?action=sessionChecker",
          data: {
            data: JSON.stringify(dummyJson)
          },
          success: function (response) {
            console.log(response)
            if(response.status == "NOT OK"){
              showLoggedOutPopup(".tool");
              popupUrlHandler()
              isLoggedIn = false;
            }else{
              showLoggedInPopup(".tool");
              isLoggedIn = true;
              $("#tabs").prepend(`
                <ul id="tabs_ul_container" class="toolBar">
                  <li style="background:lightgreen"><a href="#tabs-1">All software</a></li>
                </ul>
                `);
              loadTabs();
            }
          }
        });
      } else {
        console.log("error");
      }
    }, error: function(x){
      console.log(x);
    }
  });
  $("#activeToolList").sortable({
    revert: true,
    helper : 'clone',
    stop: function( event, ui ) {
      uploadToolOrder()
    }
  });
}

function nl2br (str) {   
  var breakTag = '<br>';    
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}

function showLoggedInPopup(className){
  $(className).on("click", function (e) {
  $(".swal2-confirm").prop( "disabled", false );
  var status=$(this).attr("status");
  var folder=$(this).attr("folder");
  var title=$(this).attr("title");
  var toolid=$(this).attr("toolid");
  $( "#tabs" ).tabs().find( ".ui-tabs-nav" ).find()
  if(status=="active"&&!ifTabExists(toolid)){
    Swal.fire({
      title: $(this).attr("title"),
      icon: 'info',
      html: $(this).attr("desc")+"<br>"+$(this).attr("iframe"),
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: true,
      focusConfirm: true,
      focusClose:false,
      customClass: {
        content: 'swalContent',
        confirmButton: 'swalStart',
        title: 'swalTitle'
      },
      confirmButtonText:
        'Start this Software'
    });
    $(".swalTitle").css({
      "font-size":"24px!important"
    })
    $(".swalStart").on("click", function (e) {
      var opened_manually = true
      createTab(folder, title, toolid, opened_manually);
      removeTab();
    });
  }else if(status=="active"&&ifTabExists(toolid)){
    /*Swal.fire({
      title: $(this).attr("title"),
      icon: 'info',
      html: $(this).attr("desc")+"<br>"+$(this).attr("iframe"),
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: true,
      focusConfirm: true,
      focusClose:false,
      customClass: {
        content: 'swalContent',
        confirmButton: 'swalInactive',
        title: 'swalTitle'
      },
      confirmButtonText:
        'Software already started'
    });
    $(".swalTitle").css({
      "font-size":"24px!important"
    })
    $(".swal2-confirm").prop( "disabled", true );*/
    /*var active = $( `li[aria-controls="tabs-${toolid}"]` ).tabs( "option", "active" );
    $( "#tabs" ).tabs( "option", "active", active );*/
    $(`a[href="#tabs-${toolid}"]`).click()
    $(`li[role="tab"]`).css("background","#e6e6e6 url('images/ui-bg_glass_75_e6e6e6_1x400.png') 50% 50% repeat-x")
    $("li[aria-labelledby='ui-id-1']").css("background","#ffc107")
    $(`a[href="#tabs-${toolid}"]`).parent().css("background","lightgreen")
  }else if(status=="pending"&&!ifTabExists(toolid)){
    Swal.fire({
      title: $(this).attr("title"),
      icon: 'info',
      html: $(this).attr("desc")+"<br>"+$(this).attr("iframe"),
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: true,
      focusConfirm: true,
      focusClose:false,
      customClass: {
        content: 'swalContent',
        confirmButton: 'swalStart',
        title: 'swalTitle'
      },
      confirmButtonText:
        'Start this Software'
    });
    $(".swalStart").on("click", function (e) {
      var opened_manually = true
      createTab(folder, title, toolid, opened_manually);
      removeTab();
    });
    $(".swalTitle").css({
      "font-size":"24px!important"
    })
  }else if(status=="pending"&&ifTabExists(toolid)){
    Swal.fire({
      title: $(this).attr("title"),
      icon: 'info',
      html: $(this).attr("desc")+"<br>"+$(this).attr("iframe"),
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: true,
      focusConfirm: true,
      focusClose:false,
      customClass: {
        content: 'swalContent',
        confirmButton: 'swalInactive',
        title: 'swalTitle'
      },
      confirmButtonText:
        'Software already started'
    });
    $(".swal2-confirm").prop( "disabled", true );
  }else{
  Swal.fire({
    title: $(this).attr("title"),
    icon: 'info',
    html: $(this).attr("desc")+"<br>"+$(this).attr("iframe")+"<hr><h5 style='text-align:center;'>This software is coming soon...</h5>",
    showCloseButton: true,
    showCancelButton: false,
    focusConfirm: true,
    focusClose:false,
    customClass: {
      content: 'swalContent',
      closeButton: 'swalClose',
      title: 'swalTitle'
    },
    confirmButtonText:
      'Open'
  });
  $(".swalTitle").css({
    "font-size":"24px!important"
  })
  $(".swal2-confirm").css("display","none");
  } 
  });
}

function showLoggedOutPopup(className){
  $(className).on("click", function (e) {
  var endUrl = "https://websoft365.com/index.php?tool="+$(this).attr("title").split(" ").join("_").toLowerCase().replace(/\W/g, '').replace("__","_")
  if (history.pushState) {
    window.history.pushState({path:endUrl},'',endUrl);
  }
  Swal.fire({
    title: $(this).attr("title"),
    icon: 'info',
    html: $(this).attr("desc")+$(this).attr("iframe")+`<div class="popup_social-icons">
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://websoft365.com/index.php?tool=${$(this).attr('title').toLowerCase().replace(/ /g,'_').replace(/\W/g, '').replace("__","_")}"
        target="_blank">
        <img class="popup_img" src="../../assets/facebook-icon.png" alt="">
    </a>
    <a href="https://twitter.com/intent/tweet?text=https://websoft365.com/index.php?tool=${$(this).attr('title').toLowerCase().replace(/ /g,'_').replace(/\W/g, '').replace("__","_")}" target="_blank">
        <img class="popup_img" src="../../assets/twitter-icon.png" alt="">
    </a>
    <a href="http://vk.com/share.php?url=https://websoft365.com/index.php?tool=${$(this).attr('title').toLowerCase().replace(/ /g,'_').replace(/\W/g, '').replace("__","_")}" target="_blank">
        <img class="popup_img" src="../../assets/vk-icon.png" alt="">
    </a>
    <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://websoft365.com/index.php?tool=${$(this).attr('title').toLowerCase().replace(/ /g,'_').replace(/\W/g, '').replace("__","_")}"
        target="_blank">
        <img class="popup_img" src="../../assets/linkedin-icon.png" alt="">
    </a>
</div>`+"<hr><h5 style='text-align:center'>You must register or login to use this software.</h5>",
    showCloseButton: true,
    showCancelButton: true,
    cancelButtonColor: '#e2af14',
    focusConfirm: true,
    focusClose:false,
    customClass: {
      content: 'swalContent',
      cancelButton: 'swalRegister',
      confirmButton: 'swalLogin',
      closeButton: 'swalClose',
      title: 'swalTitle'
    },
    confirmButtonText:
      '<b style="font-weight:900">Login</b>',
    cancelButtonText:
      '<b style="font-weight:900">Register for FREE</b>'
  });
  $(".swalTitle").css({
    "font-size":"24px!important"
  })
  $(".popup_img").css({
    "width":"36px"
  })
  $(".popup_social-icons").css({
    "text-align":"center",
    "margin-top":"1rem"
  })
  $(".swal2-container").click(function(e) {
    if (history.pushState) {
      var indexUrl = "https://websoft365.com/index.php"
      window.history.pushState({path:indexUrl},'',indexUrl);
    }
  });
  $(".swalClose").click(function(e){
    if (history.pushState) {
      var indexUrl = "https://websoft365.com/index.php"
      window.history.pushState({path:indexUrl},'',indexUrl);
    }
  })
  $('.swal2-popup').click(function(event){
    event.stopPropagation();
  });
  $(".swalRegister").on("click", function (e) {
    window.location.href="register.php";
  });
  $(".swalLogin").on("click", function (e) {
    window.location.href="login.php";
  });
  });
}

function setMediaText(){
  if(window.innerWidth<900){
    $.ajax({
      type: "post",
      url: "../backend/index.php?action=getFooterInfo",
      data: {
        data: JSON.stringify(dummyJson)
      },
      success: function (response) {
        console.log(response)
        if (response.status == "OK") {
            var self = this;
            $("#usedSoftware").append(`<h6 style="margin-bottom:0;padding-bottom:0;margin-top:5vh;">This website is best to use on desktop computers. In desktop computers, there are ${response.footerinfo.nr_of_tools} software and tools available.</h6>`);
        } else {
          console.log("error");
        }
      }, error: function(x){
        console.log(x);
      }
    });
  }
}

function filterTools(activeArray, inactiveArray){
    var val=$("#selectCategory").val();
    switch(val){
      case "Show all":
        $("#toolList .tool").remove()
        $("#activeToolList .tool").remove()
        $(inactiveArray).each(function(index){
          $("#toolList").append(`
            <div class="tool side-corner-tag" id='${this.title.split(" ").join("_").toLowerCase().replace(/\W/g, '').replace("__","_")}' style="text-align:center!important" title="${this.title}" desc="${nl2br(this.description)}" iframe="${iframe}">
              <img src="../backend/uploads/tool_images/${this.hash}.png" class="tool_img" style="height:auto; width:100%; border:solid 4p grey;" alt="">
              <p><span>Coming soon</span></p>
              <h6>${this.title}</h6>
            </div>
          `);
        });
        $(activeArray).each(function(index){
          $("#activeToolList").append(`
            <div class="tool side-corner-tag" id='${this.title.split(" ").join("_").toLowerCase().replace(/\W/g, '').replace("__","_")}' style="text-align:center!important" title="${this.title}" desc="${nl2br(this.description)}" iframe="${iframe}" folder="${this.folder}" status="${this.status}" toolid="${this.toolid}">
              <img src="../backend/uploads/tool_images/${this.hash}.png" class="tool_img" style="height:auto; width:100%; border:solid 4p grey;" alt="">
              <h6>${this.title}</h6>
            </div>
          `);
        });
      break;
      case "Webmaster":
        $("#toolList .tool").remove()
        $("#activeToolList .tool").remove()
        var keyArray = inactiveArray.filter(function(item) { return item.webmaster=="1"; });
        var activeKeyArray = activeArray.filter(function(item) { return item.webmaster=="1"; });
        $(keyArray).each(function(index){
          $("#toolList").append(`
            <div class="tool side-corner-tag" id='${this.title.split(" ").join("_").toLowerCase().replace(/\W/g, '').replace("__","_")}' style="text-align:center!important" title="${this.title}" desc="${nl2br(this.description)}" iframe="${iframe}">
              <img src="../backend/uploads/tool_images/${this.hash}.png" class="tool_img" style="height:auto; width:100%; border:solid 4p grey;" alt="">
              <p><span>Coming soon</span></p>
              <h6>${this.title}</h6>
            </div>
          `);
        });
        $(activeKeyArray).each(function(index){
          $("#activeToolList").append(`
            <div class="tool side-corner-tag" id='${this.title.split(" ").join("_").toLowerCase().replace(/\W/g, '').replace("__","_")}' style="text-align:center!important" title="${this.title}" desc="${nl2br(this.description)}" iframe="${iframe}" folder="${this.folder}" status="${this.status}" toolid="${this.toolid}">
              <img src="../backend/uploads/tool_images/${this.hash}.png" class="tool_img" style="height:auto; width:100%; border:solid 4p grey;" alt="">
              <h6>${this.title}</h6>
            </div>
          `);
        });
      break;
      case "Social Media":
        $("#toolList .tool").remove()
        $("#activeToolList .tool").remove()
        var keyArray = inactiveArray.filter(function(item) { return item.social_media=="1"; });
        var activeKeyArray = activeArray.filter(function(item) { return item.social_media=="1"; });
        $(keyArray).each(function(index){
          $("#toolList").append(`
            <div class="tool side-corner-tag" id='${this.title.split(" ").join("_").toLowerCase().replace(/\W/g, '').replace("__","_")}' style="text-align:center!important" title="${this.title}" desc="${nl2br(this.description)}" iframe="${iframe}">
              <img src="../backend/uploads/tool_images/${this.hash}.png" class="tool_img" style="height:auto; width:100%; border:solid 4p grey;" alt="">
              <p><span>Coming soon</span></p>
              <h6>${this.title}</h6>
            </div>
          `);
        });
        $(activeKeyArray).each(function(index){
          $("#activeToolList").append(`
            <div class="tool side-corner-tag" id='${this.title.split(" ").join("_").toLowerCase().replace(/\W/g, '').replace("__","_")}' style="text-align:center!important" title="${this.title}" desc="${nl2br(this.description)}" iframe="${iframe}" folder="${this.folder}" status="${this.status}" toolid="${this.toolid}">
              <img src="../backend/uploads/tool_images/${this.hash}.png" class="tool_img" style="height:auto; width:100%; border:solid 4p grey;" alt="">
              <h6>${this.title}</h6>
            </div>
          `);
        });
      break;
      case "Business":
        $("#toolList .tool").remove()
        $("#activeToolList .tool").remove()
        var keyArray = inactiveArray.filter(function(item) { return item.business=="1"; });
        var activeKeyArray = activeArray.filter(function(item) { return item.business=="1"; });
        $(keyArray).each(function(index){
          $("#toolList").append(`
            <div class="tool side-corner-tag" id='${this.title.split(" ").join("_").toLowerCase().replace(/\W/g, '').replace("__","_")}' style="text-align:center!important" title="${this.title}" desc="${nl2br(this.description)}" iframe="${iframe}">
              <img src="../backend/uploads/tool_images/${this.hash}.png" class="tool_img" style="height:auto; width:100%; border:solid 4p grey;" alt="">
              <p><span>Coming soon</span></p>
              <h6>${this.title}</h6>
            </div>
          `);
        });
        $(activeKeyArray).each(function(index){
          $("#activeToolList").append(`
            <div class="tool side-corner-tag" id='${this.title.split(" ").join("_").toLowerCase().replace(/\W/g, '').replace("__","_")}' style="text-align:center!important" title="${this.title}" desc="${nl2br(this.description)}" iframe="${iframe}" folder="${this.folder}" status="${this.status}" toolid="${this.toolid}">
              <img src="../backend/uploads/tool_images/${this.hash}.png" class="tool_img" style="height:auto; width:100%; border:solid 4p grey;" alt="">
              <h6>${this.title}</h6>
            </div>
          `);
        });
      break;
    }
    $(".tool").css("cursor","pointer");
        if(isLoggedIn){
          showLoggedInPopup();
        }else{
          showLoggedOutPopup();
        }
}

function filterToolsByCategory(activeArray, inactiveArray){
  var val=$("#selectCategory").val();
  switch(val){
    case "Show all":
      var keyArray = inactiveArray;
      var activeKeyArray = activeArray;
      searchToolsByCategory(keyArray, activeKeyArray);
    break;
    case "Webmaster":
      $("#toolList .tool").remove()
      $("#activeToolList .tool").remove()
      var keyArray = inactiveArray.filter(function(item) { return item.webmaster=="1"; });
      var activeKeyArray = activeArray.filter(function(item) { return item.webmaster=="1"; });
      searchToolsByCategory(keyArray, activeKeyArray);
    break;
    case "Social Media":
      $("#toolList .tool").remove()
      $("#activeToolList .tool").remove()
      var keyArray = inactiveArray.filter(function(item) { return item.social_media=="1"; });
      var activeKeyArray = activeArray.filter(function(item) { return item.social_media=="1"; });
      searchToolsByCategory(keyArray, activeKeyArray);
    break;
    case "Business":
      $("#toolList .tool").remove()
      $("#activeToolList .tool").remove()
      var keyArray = inactiveArray.filter(function(item) { return item.business=="1"; });
      var activeKeyArray = activeArray.filter(function(item) { return item.business=="1"; });
      searchToolsByCategory(keyArray, activeKeyArray);
    break;
  }
  $(".tool").css("cursor","pointer");
      if(isLoggedIn){
        showLoggedInPopup();
      }else{
        showLoggedOutPopup();
      }
}

tabTemplate = "<li><a href='#{href}'>#{label}</a><i class='fa fa-times close_this_tab'></i></li>",
tabCounter = 2;

function createTab(folder, title, toolid, opened_manually){
  if(window.innerWidth>900||$(".ui-tabs-anchor").length<3&&window.innerWidth<900){
    if(group_type=="FREE"&&window.innerWidth>900&&$(".ui-tabs-anchor").length>2){
      Swal.fire("Maximum tab amount has been reached!","You are a FREE member, therefore, you can open 2 tabs at a time. Buy the PRO membership to open unlimited tabs at the same time.","error")
      return true;
    }
    var tabs = $( "#tabs" ).tabs();
    var label = title;
    id = "tabs-"+toolid,
    li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
    tabContentHtml = `<div id="${id}" class="tool_page"><iframe class="iframe-${toolid}" frameborder="0" scrolling="yes" style="width:100%;height:100vh;border:0px;" src="${folder}?userid=${jsonData['userid']}"></iframe><div>`;
    tabs.find( ".ui-tabs-nav" ).append( li );
    $( "#tabs" ).tabs().append( "<div id='" + id + "'><p>" + tabContentHtml + "</p></div>" );
    $( "#tabs" ).tabs().tabs( "refresh" );
    tabCounter++;
    $("#tabs").append();
    $( "#tabs" ).tabs().find( ".ui-tabs-nav" ).sortable({
      axis: "x",
      stop: function() {
        tabs.tabs( "refresh" );
      }
    });
    $(`.iframe-${toolid}`).on('load', function(){
      $(this).contents().find('#wrapper').attr("class",`wrapper-${toolid}`)
    });
    var tabs_sum = parseInt($("#tabs_ul_container li").length)
    if(window.innerWidth<900){
      $(".ui-tabs-tab").css("width",100/tabs_sum-2+"%")
      $(".ui-tabs-tab a").css({
        "white-space": "nowrap",
        "overflow": "hidden",
        "text-overflow": "ellipsis",
        "text-align":"center",
        "width":"90%"
      })
    }else{
      var sum_tab_width=0;
    for(i=0;i<$(".ui-tabs-tab").length;$(".ui-tabs-tab").length){
        sum_tab_width+=parseFloat($(".ui-tabs-tab").eq(i).width())
        i++
    }
    if(sum_tab_width>window.innerWidth){
      console.log("IMHEREEEEE")
      $(".ui-tabs-tab").css("width",110/tabs_sum-1+"%")
      $(".ui-tabs-tab a").css({
        "white-space": "nowrap",
        "overflow": "hidden",
        "text-overflow": "ellipsis",
        "text-align":"center",
        "width":"90%"
      })
      $(".ui-tabs-tab[aria-labelledby='ui-id-1']").css({
        "width":"107.537px"
      })
      $(".ui-tabs-tab[aria-labelledby='ui-id-1'] a").css({
        "width": "100%",
        "white-space": "inherit",
        "overflow": "inherit"
      })
    }
    }
    var margin_left="0px"
    if(tabs_sum==3){
      margin_left="-6px"
    }
    $(".close_this_tab").css({
      "font-size": "20px",
      "margin-top": "3px",
      "margin-right": "3px",
      "margin-left":margin_left
    })
    if(opened_manually==true){
      $( "#tabs" ).tabs( "option", "active", $(".ui-tabs-tab").length-1 );
      $(`li[role="tab"]`).css("background","#e6e6e6 url('images/ui-bg_glass_75_e6e6e6_1x400.png') 50% 50% repeat-x")
      $("li[aria-labelledby='ui-id-1']").css("background","#ffc107")
      $(`a[href="#tabs-${toolid}"]`).parent().css("background","lightgreen")
    }
    openTabs.push(toolid);
    updateTab();
  }else{
    Swal.fire("Maximum tab amount has been reached!","To open a new tab, please close another one.","error")
    $("#swal2-content").css({
      "padding-bottom": "20px",
      "text-align": "center"
    })
  }
}

function loadTabs(){
  $( "#tabs" ).tabs();
  $( "#tabs" ).removeClass("ui-widget");
  $.ajax({
    type: "post",
    url: "../backend/index.php?action=getOpenTools",
    data: {
      data: JSON.stringify(jsonData)
    },
    success: function (response) {
      console.log(response)
      if (response.status == "OK") {
          var self = this;
          var toolArray = response.toolids.split`,`.map(x=>+x);
          $(toolArray).each(function(i){
            if(responseArray[0].find(x => x.toolid === String(toolArray[i]))){
              var tool = responseArray[0].find(x => x.toolid === String(toolArray[i]));
              var opened_manually = false
              createTab(tool.folder, tool.title, tool.toolid, opened_manually);
            }
          });
      } else {
        console.log("error");
      }
    }, error: function(x){
      console.log(x);
    }
  });
    //window.location.hash = $("div[aria-hidden='false']").attr("id")+"?userid="+jsonData["userid"]
  removeTab();
};

function removeTab(){
  $( "#tabs" ).tabs().on( "click", ".close_this_tab", function() {
    var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
    $( "#" + panelId ).remove();
    $( "#tabs" ).tabs().tabs( "refresh" );
    openTabs = openTabs.filter(e => e !== panelId.replace('tabs-',''));
    var tabs_sum = parseInt($("#tabs_ul_container li").length)
  if(window.innerWidth<900){
    $(".ui-tabs-tab").css("width",100/tabs_sum-2+"%")
    $(".ui-tabs-tab a").css({
      "white-space": "nowrap",
      "overflow": "hidden",
      "text-overflow": "ellipsis",
      "text-align":"center",
      "width":"90%"
    })
  }else{
    $(".ui-tabs-tab").css("width","fit-content")
    $(".ui-tabs-tab a").css({
      "width": "90%",
      "white-space": "inherit",
      "overflow": "inherit"
    })
    $(".ui-tabs-tab[aria-labelledby='ui-id-1']").css({
      "width":"107.537px"
    })
    $(".ui-tabs-tab[aria-labelledby='ui-id-1'] a").css({
      "width": "100%",
      "white-space": "inherit",
      "overflow": "inherit"
    })
  }
  var margin_left="0px"
  if(tabs_sum==3){
    margin_left="-6px"
  }
  $(".close_this_tab").css({
    "font-size": "20px",
    "margin-top": "3px",
    "margin-right": "3px",
    "margin-left":margin_left
  })
  if($("#tabs_ul_container li").length==1){
    $("#tabs").css("overflow","auto")
  }
    var active = $( "#tabs" ).tabs( "option", "active" );
    $(`li[role="tab"]`).css("background","#e6e6e6 url('images/ui-bg_glass_75_e6e6e6_1x400.png') 50% 50% repeat-x")
    $("li[aria-labelledby='ui-id-1']").css("background","#ffc107")
    $(`li[role='tab']:eq(${active})`).css("background","lightgreen")
    updateTab();
  });
};

function ifTabExists(tab){
  if($("#tabs-"+tab).length>0){return true;}
  }

function updateTab(){
  jsonData["toolids"]=openTabs.join();
  $.ajax({
    type: "post",
    url: "../backend/index.php?action=updateOpenTools",
    data: {
      data: JSON.stringify(jsonData)
    },
    success: function (response) {
      console.log(response)
      if (response.status == "OK") {
        console.log("success");
      } else {
        console.log("error");
      }
    }, error: function(x){
      console.log(x);
    }
  });
  jqueryUiClickListener()
  reloadIframe()
}

function searchTools(activeArray, inactiveArray){
    var searchVal = $("#searchBox").val();
    if(!searchVal==""){
      var activeSearchArray = activeArray.filter(o => o.title.toLowerCase().includes(searchVal.toLowerCase()));
      var inactiveSearchArray = inactiveArray.filter(o => o.title.toLowerCase().includes(searchVal.toLowerCase()));  
    }else{
      var activeSearchArray = activeArray;
      var inactiveSearchArray = inactiveArray;
    }
    console.log(activeSearchArray);
    console.log(inactiveSearchArray);
    filterTools(activeSearchArray, inactiveSearchArray);
}

function searchToolsByCategory(activeArray, inactiveArray){
  var searchVal = $("#searchBox").val();
  if(!searchVal==""){
    var activeSearchArray = activeArray.filter(o => o.title.toLowerCase().includes(searchVal.toLowerCase()));
    var inactiveSearchArray = inactiveArray.filter(o => o.title.toLowerCase().includes(searchVal.toLowerCase()));  
  }else{
    var activeSearchArray = activeArray;
    var inactiveSearchArray = inactiveArray;
  }
  $("#toolList .tool").remove()
        $("#activeToolList .tool").remove()
        $(activeSearchArray).each(function(index){
          $("#toolList").append(`
            <div class="tool side-corner-tag" style="text-align:center!important" title="${this.title}" desc="${nl2br(this.description)}" iframe="${iframe}">
              <img src="../backend/uploads/tool_images/${this.hash}.png" class="tool_img" style="height:auto; width:100%; border:solid 4p grey;" alt="">
              <p><span>Coming soon</span></p>
              <h6>${this.title}</h6>
            </div>
          `);
        });
        $(inactiveSearchArray).each(function(index){
          $("#activeToolList").append(`
            <div class="tool side-corner-tag" style="text-align:center!important" title="${this.title}" desc="${nl2br(this.description)}" iframe="${iframe}" folder="${this.folder}" status="${this.status}" toolid="${this.toolid}">
              <img src="../backend/uploads/tool_images/${this.hash}.png" class="tool_img" style="height:auto; width:100%; border:solid 4p grey;" alt="">
              <h6>${this.title}</h6>
            </div>
          `);
        });
}

function popupUrlHandler(){
  if(window.location.href.split("?tool=")[1] && $(`#${window.location.href.split("?tool=")[1]}`).length>0){
    var tool_name_hash ="#"+window.location.href.split("?tool=")[1]
    console.log(tool_name_hash)
    Swal.fire({
      title: $(tool_name_hash).attr("title"),
      icon: 'info',
      html: $(tool_name_hash).attr("desc")+$(tool_name_hash).attr("iframe")+`<div class="popup_social-icons">
      <a href="https://www.facebook.com/sharer/sharer.php?u=https://websoft365.com/index.php?tool=${$(tool_name_hash).attr('title').toLowerCase().replace(/ /g,'_').replace(/\W/g, '').replace("__","_")}"
          target="_blank">
          <img class="popup_img" src="../../assets/facebook-icon.png" alt="">
      </a>
      <a href="https://twitter.com/intent/tweet?text=https://websoft365.com/index.php?tool=${$(tool_name_hash).attr('title').toLowerCase().replace(/ /g,'_').replace(/\W/g, '').replace("__","_")}" target="_blank">
          <img class="popup_img" src="../../assets/twitter-icon.png" alt="">
      </a>
      <a href="http://vk.com/share.php?url=https://websoft365.com/index.php?tool=${$(tool_name_hash).attr('title').toLowerCase().replace(/ /g,'_').replace(/\W/g, '').replace("__","_")}" target="_blank">
          <img class="popup_img" src="../../assets/vk-icon.png" alt="">
      </a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://websoft365.com/index.php?tool=${$(tool_name_hash).attr('title').toLowerCase().replace(/ /g,'_').replace(/\W/g, '').replace("__","_")}"
          target="_blank">
          <img class="popup_img" src="../../assets/linkedin-icon.png" alt="">
      </a>
  </div>`+"<hr><h5 style='text-align:center'>You must register or login to use this software.</h5>",
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonColor: '#e2af14',
      focusConfirm: true,
      focusClose:false,
      customClass: {
        content: 'swalContent',
        cancelButton: 'swalRegister',
        confirmButton: 'swalLogin',
        closeButton: 'swalClose',
        title: 'swalTitle'
      },
      confirmButtonText:
        '<b style="font-weight:900">Login</b>',
      cancelButtonText:
        '<b style="font-weight:900">Register for FREE</b>'
    });
    $(".swalTitle").css({
      "font-size":"24px!important"
    })
    $(".popup_img").css({
      "width":"36px"
    })
    $(".popup_social-icons").css({
      "text-align":"center",
      "margin-top":"1rem"
    })
    $(".swal2-container").click(function(e) {
      if (history.pushState) {
        var indexUrl = "https://websoft365.com/index.php"
        window.history.pushState({path:indexUrl},'',indexUrl);
      }
    });
    $(".swalClose").click(function(e){
      if (history.pushState) {
        var indexUrl = "https://websoft365.com/index.php"
        window.history.pushState({path:indexUrl},'',indexUrl);
      }
    })
    $('.swal2-popup').click(function(event){
      event.stopPropagation();
    });
    $(".swalRegister").on("click", function (e) {
      window.location.href="register.php";
    });
    $(".swalLogin").on("click", function (e) {
      window.location.href="login.php";
    });
  }
}

function resetPageDescription(){
  $(".page_description").html(`
  <h4><b>WebSoft365.com will save money for you.</b></h4>
  <h4>Many internet users are ending up paying hundreds of dollars every month for different software and
    tools, therefore, WebSoft365 provides a solution for these internet users. Our mission is to provide you
    hundreds of online software & tools for a low fee. Therefore, WebSoft365.com developer team works hard
    every day to create new online software & tools for internet users. Many of the software and tools can
    be used for free without a paid membership.</h4>
<h4>We are open to new ideas. If you have new ideas of any useful software or online tools, you can click on
    the "Ask for Software" button in the top menu bar to fill out a form and we will consider creating a new
    software by your ideas.</h4>
<h4 class="last_desc">WebSoft365.com provides a number of software and tools to you, such as Unblockable
    Popup Generator, Easy Drag, and Drop Image Creator, Keyword and Email list tools, Countdown Clock
    Generator, Drag & drop online file manager and FTP software, Online HTML Editor Software, Image and file
    Converter, Image Resizer software, Icon & logo designer software, Automated Trigger Messages, Photo Edit
    - Photoshop Alternative Easy to use PDF Tools, Online Video Editor Software Online Banner Creator Tool,
    3D Book Cover Creator, Online Button Generator, Online Video Downloader, Responsive Web Design Tester,
    3D Software Box Creator, Digital Flipbook Maker, and much more.</h4>
  `)
}

function changeUrlOnDropdown(){
  $("#select_tool").on("change",function(e){
    var select_tool_value = $("#select_tool").val()
    window.location=select_tool_value
  })
}


function jqueryUiClickListener(){
  $(".ui-tabs-anchor").click(function(e){
    console.log("clicked")
      var new_href = $(this).attr("href")
      console.log(new_href)
      if(new_href=="#tabs-1"){
        $("#tabs").css("overflow","auto")
      }else{
        $("#tabs").css("overflow","hidden")
    }
    $(`li[role="tab"]`).css("background","#e6e6e6 url('images/ui-bg_glass_75_e6e6e6_1x400.png') 50% 50% repeat-x")
    $("li[aria-labelledby='ui-id-1']").css("background","#ffc107")
    var toolid = $(this).attr("href").split("-")[1]
    $(`a[href="#tabs-${toolid}"]`).parent().css("background","lightgreen")
  })
}

function reloadIframe(){
  $(".ui-tabs-anchor").one("click",function(e){
    var new_href = $(this).attr("href")
    if(new_href=="#tabs-32"){
      $( '.iframe-32' ).attr( 'src', function ( i, val ) { return val; });
    }
  })
}

function uploadToolOrder(){
  var tool_order_array = []
  $(".ui-sortable div").each(function(e){
    tool_order_array.push($(this).attr("toolid"))
  })
  jsonData["toolids"]=tool_order_array.join(",")
  $.ajax({
    type: "post",
    url: "../backend/index.php?action=uploadToolOrder",
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