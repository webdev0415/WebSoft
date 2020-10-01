$(document).ready(function () {
  getUserDetails();
  changeEmailListener();
  changePasswordListener();
  deleteAccountListener();
  checkPassword();
  previewImage();
  uploadProfileImage();
  getProfileImage();
});

String.prototype.replaceAll = function(str1, str2, ignore)
{
   return this.replace(new RegExp(str1.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function(c){return "\\" + c;}), "g"+(ignore?"i":"")), str2);
};

function getUserDetails() {
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
          $("#username").html(self.firstname+" "+self.lastname);
          $("#email").html(self.email);
          $("#account_type").append(`${self.group_type.replaceAll("_"," ")}`);
          document.title += " "+self.firstname+" "+self.lastname;
          if(self.exp_date !=""){
            $(".user_info").append(`<h5>PRO Membership will expire in: ${self.exp_date}</h5>`);
          }
          if(self.sub_id !="N/A"){
            $("#sub_id").append(`<h5 id="sub_id">Subscription ID: ${self.sub_id}</h5>`);
          }
        }else{

        }
      }
    });
}

function changeEmailListener() {
  $("#changeEmail").submit(function (e) {
    e.preventDefault();
    $("button[type=submit]").prop( "disabled", true );
    jsonData["email"]=$("#new_email").val();
    console.log(jsonData);
    $.ajax({
      type: "post",
      url: "../../backend/index.php?action=changeEmail",
      data: {
        data: JSON.stringify(jsonData)
      },
      success: function (response) {
        $("button[type=submit]").prop( "disabled", false );
        console.log(response)
        if (response.status == "OK") {
          Swal('Success','Your email has been successfully changed.','success');
        } else {
          console.log("error");
        }
      }, error: function(x){
        $("button[type=submit]").prop( "disabled", false );
        console.log(x);
      }
    });
  });
}

function changePasswordListener() {
  $("#changePassword").submit(function (e) {
    e.preventDefault();
    $("button[type=submit]").prop( "disabled", true );
    jsonData["password"]=$("#new_password").val();
    $.ajax({
      type: "post",
      url: "../backend/index.php?action=changePassword",
      data: {
        data: JSON.stringify(jsonData)
      },
      success: function (response) {
        $("button[type=submit]").prop( "disabled", false );
        console.log(response)
        if (response.status == "OK") {
          Swal('Success','Your password has been successfully changed.','success');
        } else {
          Swal('Success','Your password has been successfully changed.','success');
        }
      }, error: function(x){
        $("button[type=submit]").prop( "disabled", false );
        console.log(x);
      }
    });
  });
}

function deleteAccountListener() {
  $("#deleteAccountButton").on("click", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "../backend/index.php?action=deleteAccount",
      data: {
        data: JSON.stringify(jsonData)
      },
      success: function (response) {
        console.log(response)
        if (response.status == "OK") {
          deleteBugReportAccount()
          setTimeout(function () {
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
          }, 3000);
        } else {
          console.log("error");
        }
      }
    });
  });
}

function deleteBugReportAccount(){
  $.ajax({
    type: "post",
    url: "../backend/bug_report_tool.php?action=deleteAccount",
    data: {
      data: JSON.stringify(jsonData)
    },
    success: function (response) {
      console.log(response)
      if (response.status == "OK") {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          html: 'Your account has been successfully deleted.<br>Redirecting to our homepage...',
          showConfirmButton: false
        })
      }
    }
  })
}

function checkPassword() {
  var new_password = document.getElementById("new_password"),
    confirm_password = document.getElementById("confirm_password");

  function validatePassword() {
    if (new_password.value != confirm_password.value) {
      confirm_password.setCustomValidity("Passwords don't match.");
    } else {
      confirm_password.setCustomValidity('');
    }
  }
  new_password.onchange = validatePassword;
  confirm_password.onkeyup = validatePassword;
}

function uploadProfileImage() {
  $("#image-input").submit(function (e) {
    e.preventDefault();
    $("button[type=submit]").prop( "disabled", true );
    jsonData["base64"]=base64;
    console.log(jsonData);
    $.ajax({
      type: "post",
      url: "../backend/index.php?action=uploadProfileImage",
      data: {
        data: JSON.stringify(jsonData)
      },
      success: function (response) {
        $("button[type=submit]").prop( "disabled", false );
        console.log(response)
        if (response.status == "OK") {
          Swal('Success','Your image has been successfully uploaded.','success');
        } else {
          Swal('Error','Unfortunately, we could not upload your image.','error');
        }
      }, error: function(x){
        $("button[type=submit]").prop( "disabled", false );
        console.log(x);
      }
    });
  });
}

var base64 = null;

function previewImage(){
  $("#profile_pic").change(function(e){
    var img = new Image();
    img.onload = draw;
    img.onerror = failed;
    img.src = URL.createObjectURL(this.files[0]);
  });
}
function draw() {
  $("#canvas_container").css("background-image","none")
  var canvas = document.getElementById('profileCanvas');
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
  uploadCanvasImage(canvas);
}
function failed() {
  console.error("The provided file couldn't be loaded as an Image media");
}
function uploadCanvasImage(input){
  base64 = input.toDataURL().split(",")[1];
  console.log(base64);
}

function getProfileImage() {
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
            $("#canvas_container").css("background-image","none")
            var canvas = document.getElementById('profileCanvas');
            var ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = "../backend/uploads/profile_images/"+response.hash+".png";
            img.onload = () => {
              $("#canvas_container").css("background-image","none")
              var canvas = document.getElementById('profileCanvas');
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
        } else {
          console.log("No prof img");
        }
      }, error: function(x){
        console.log(x);
      }
    });
}