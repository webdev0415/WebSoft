var dummyJson = {};
responseArray = [];
dummyJson["dummy"] = "dummy";
var jsonData = {};
$(document).ready(function () {
    sessionChecker();
    $( document ).ajaxComplete(function() {
      LogoutListener();
    });
    //adjustIframeHeight();
    setPrivacyPolicyCookie()
});

async function sessionChecker() {
  $.ajax({
    type: "post",
    url: "../../backend/index.php?action=sessionChecker",
    data: {
      data: JSON.stringify(dummyJson)
    },
    success: function (response) {
      console.log(response);
      if (response.status == "LOGGED IN") {
        $("#navigation").load("/components/navbar_logged_in.php");
        getNavbarProfileImage();
        checkIfCancelled();
        checkIfToDoListUser()
      } else if (response.status == "ADMIN") {
        $("#navigation").load("/components/navbar_admin.php");
        getNavbarProfileImage();
        checkIfCancelled();
      } else {
        $("#navigation").load("/components/navbar_logged_out.php");
      }
    }
  });
  $(function () {
    $("#footer").load("/components/footer.php");
  });
  setTimeout(function () {
    readTextFile("/backend/footer_stats.json", function(text){
      var data = JSON.parse(text);
      setFooterInfo(data)
    });
    setInterval(function(){
      readTextFile("/backend/footer_stats.json", function(text){
        var data = JSON.parse(text);
        setFooterInfo(data)
      });
    }, 15000)
  }, 500);
}

function checkIfToDoListUser(){
  $.ajax({
    type: "post",
    url: "../../backend/index.php?action=checkIfToDoListUser",
    data: {
      data: JSON.stringify(dummyJson)
    },
    success: function (response) {
      console.log(response)
      if (response.status == "TODO USER") {
        $(".right_button_wrapper").prepend(`<a href="to_do_user.php" class="admin_button">
        <button type="button" class="btn btn-sm btn-warning">TO DO</button>
    </a>`)
      }
    }
  })
}

function LogoutListener() {
  $(".logout").on("click", function (e) {
    $.ajax({
      type: "post",
      url: "../../backend/index.php?action=logout",
      data: {
        data: JSON.stringify(dummyJson)
      },
      success: function (response) {
        if (response.status == "OK") {
          console.log(response);
          window.location.href = "/index.php";
        } else {
          console.log("error");
        }
      }
    });
  });
}
/*function getFooterInfo(){
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
          $("#registered_users_sum").append(`${response.footerinfo.registered_sum}`);
          $("#pro_members_sum").append(`${response.footerinfo.premium_sum}`);
          $("#sum_tools").append(`${response.footerinfo.nr_of_tools}`);
          $("#sum_upcoming_tools").append(`${response.footerinfo.nr_of_upcoming_tools}`);
      } else {
        Swal('Error','An error has occured.','error');
      }
    }, error: function(x){
      console.log(x);
    }
  });
}*/

function setFooterInfo(response){
          $("#sum_tools").html($("#sum_tools").html().split(":")[0])
          $("#sum_upcoming_tools").html($("#sum_upcoming_tools").html().split(":")[0])
          $("#registered_users_sum").html($("#registered_users_sum").html().split(":")[0])
          $("#pro_members_sum").html($("#pro_members_sum").html().split(":")[0])
          $("#registered_users_sum").append(`: ${response.footerinfo.registered_sum}`);
          $("#pro_members_sum").append(`: ${response.footerinfo.premium_sum}`);
          $("#sum_tools").append(`: ${response.footerinfo.nr_of_tools}`);
          $("#sum_upcoming_tools").append(`: ${response.footerinfo.nr_of_upcoming_tools}`);
}

function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
          callback(rawFile.responseText);
      }
  }
  rawFile.send(null);
}

function getNavbarProfileImage() {
  $.ajax({
    type: "post",
    url: "../backend/index.php?action=getProfileImage",
    data: {
      data: JSON.stringify(jsonData)
    },
    success: function (response) {
      console.log(response)
      if (response.status == "OK") {
        if(response.hash!=null){
          $(".profile_img img").remove();
          $(".profile_img").append(`<img src="../backend/uploads/profile_images/${response.hash}.png" alt="" />`);
          $(".profile_img img").css("border-radius","100%");
        }else{
          console.log("no hash");
        }
      } else {
        console.log("No prof img");
      }
    }, error: function(x){
      console.log(x);
    }
  });
}

function checkIfCancelled(){
  $.ajax({
    type: "post",
    url: "../backend/index.php?action=getUserDetails",
    data: {
      data: JSON.stringify(dummyJson)
    },
    success: function (response) {
      console.log(response);
      if(response.status == "OK"){
        var self =response.users;
        if(self.sub_cancelled==1){
          var utc = new Date().toJSON().slice(0,10);
          var lastCharOfExp = self.exp_date[self.exp_date.length -1];
          var charIncrement = parseInt(lastCharOfExp)+1
          var exp_date = self.exp_date.slice(0, -1) + charIncrement;
          console.log(exp_date);
          if(utc===exp_date){
            
          }
        }
      }
    }
  });
}

function setPrivacyPolicyCookie(){
  $("#accept_cookies_form").submit(function(e){
    e.preventDefault()
    $.ajax({
      type: "post",
      url: "../backend/index.php?action=setPrivacyPolicyCookie",
      data: {
        data: JSON.stringify(dummyJson)
      },
      success: function (response) {
        console.log(response)
        if(response.status=="OK"){
          $(".modal-content").css({
            "-webkit-animation-name": "slideOut",
            "-webkit-animation-duration": "1s",
            "animation-name": "slideOut",
            "animation-duration": "1s"
          })
          setTimeout(function(){ $(".modal-content").css("display","none") }, 1000);
        }
      }
    })
  })
}