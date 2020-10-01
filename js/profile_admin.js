$(document).ready(function () {
  getUserDetailsById();
  checkPassword();
  changePasswordListener();
  deleteAccountListener();
  changeUserMembership();
  suspendUser();
  createNote();
  displayNotes();
  changeSubIdListener();
  changeExpDateListener();
  checkDateFormat();
  getProfileImage();
  changeToDoAccess()
});

function getUserDetailsById() {
  var window_location = window.location.href;
  jsonData["userid"] = window_location.split("=")[1];
  $.ajax({
    type: "post",
    url: "../backend/index.php?action=getUserDetailsById",
    data: {
      data: JSON.stringify(jsonData)
    },
    success: function (response) {
      console.log(response);
      if (response.status == "OK") {
        var self = response.users;
        $("#username").html(self.firstname + " " + self.lastname);
        $("#email").html(self.email);
        $("#sub_id").html("Subscription ID: "+self.sub_id);
        $("#exp_date").html("Expiration date: "+self.exp_date);
        switch(self.group_type){
          case "FREE":
            $(".group_type").html("Group Type: FREE Member");
            break;
          case "PRO_MONTHLY":
            $(".group_type").html("Group Type: PRO Member (Monthly)");
            break;
          case "PRO_YEARLY":
            $(".group_type").html("Group Type: PRO Member (Yearly)");
            break;
          case "SUPER_PRO_MONTHLY":
            $(".group_type").html("Group Type: SUPER PRO Member (Monthly)");
            break;
          case "SUPER_PRO_YEARLY":
            $(".group_type").html("Group Type: SUPER PRO Member (Yearly)");
            break;
          case "ADMIN":
            $(".group_type").html("Group Type: ADMIN");
            break;
          default:
            console.log("error");
        }
        if(self.to_do=="1"){
          $("#to_do_access").prop("checked",true)
        }
      } else {

      }
    }
  });
}

function changePasswordListener() {
  $("#changePassword").submit(function (e) {
    e.preventDefault();
    $("button[type=submit]").prop( "disabled", true );
    jsonData["password"]=$("#new_password").val();
    var window_location = window.location.href;
    jsonData["userid"]=window_location.split("=")[1];
    $.ajax({
      type: "post",
      url: "../backend/index.php?action=changePasswordById",
      data: {
        data: JSON.stringify(jsonData)
      },
      success: function (response) {
        $("button[type=submit]").prop( "disabled", false );
        console.log(response)
        if (response.status == "OK") {
          Swal('Success','Your password has been successfully changed.','success');
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

function deleteAccountListener() {
  $("#deleteAccountButton").on("click", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "../../backend/index.php?action=deleteAccountById",
      data: {
        data: JSON.stringify(jsonData)
      },
      success: function (response) {
        console.log(response)
        if (response.status == "OK") {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            html: 'This account has been successfully deleted.<br>Redirecting to the admin page...',
            showConfirmButton: false
          })
          setTimeout(function () {
            window.location.href="/admin.php"
          }, 3000);
        } else {
          Swal('Error','An error has occured.','error');
        }
      }
    });
  });
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

function changeUserMembership(){
  $("#changeGroupType").submit(function (e) {
    var groupType;
    switch($("#changeMembership").val()){
      case "FREE Member":
        groupType="FREE";
        break;
      case "PRO Member (Monthly)":
        groupType="PRO_MONTHLY";
        break;
      case "PRO Member (Yearly)":
        groupType="PRO_YEARLY";
        break;
      case "SUPER PRO Member (Monthly)":
        groupType="SUPER_PRO_MONTHLY";
        break;
      case "SUPER PRO Member (Yearly)":
        groupType="SUPER_PRO_YEARLY";
        break;
    }
    e.preventDefault();
    jsonData["group_type"]=groupType;
    var window_location = window.location.href;
    jsonData["userid"]=window_location.split("=")[1];
    console.log(jsonData);
    $.ajax({
      type: "post",
      url: "../backend/index.php?action=changeUserMembership",
      data: {
        data: JSON.stringify(jsonData)
      },
      success: function (response) {
        console.log(response)
        if (response.status == "OK") {
          Swal('Success','Your password has been successfully changed.','success');
          switch(groupType){
            case "FREE":
              $(".group_type").html("Group Type: FREE Member");
              break;
            case "PRO_MONTHLY":
              $(".group_type").html("Group Type: PRO Member (Monthly)");
              break;
            case "PRO_YEARLY":
              $(".group_type").html("Group Type: PRO Member (Yearly)");
              break;
            case "SUPER_PRO_MONTHLY":
              $(".group_type").html("Group Type: SUPER PRO Member (Monthly)");
              break;
            case "SUPER_PRO_YEARLY":
              $(".group_type").html("Group Type: SUPER PRO Member (Yearly)");
              break;
            case "ADMIN":
              $(".group_type").html("Group Type: ADMIN");
              break;
            default:
              console.log("error");
          }
        } else {
          Swal('Error','An error has occured.','error');
        }
      }, error: function(x){
        console.log(x);
      }
    });
  });
}

function suspendUser(){
  $("#suspendUser").submit(function (e) {
    e.preventDefault();
    var window_location = window.location.href;
    jsonData["userid"]=window_location.split("=")[1];
    console.log(jsonData);
    $.ajax({
      type: "post",
      url: "../backend/index.php?action=suspendUser",
      data: {
        data: JSON.stringify(jsonData)
      },
      success: function (response) {
        console.log(response)
        if (response.status == "OK") {
          Swal('Success','User successfully suspended.','success');
        } else {
          Swal('Error','An error has occured.','error');
        }
      }, error: function(x){
        console.log(x);
      }
    });
  });
}

function createNote(){
  $("#notesForm").submit(function (e) {
    e.preventDefault();
    var window_location = window.location.href;
    jsonData["userid"]=window_location.split("=")[1];
    var note_value = $("#note_text").val();
    jsonData["note"]=note_value;
    console.log(jsonData);
    $.ajax({
      type: "post",
      url: "../backend/index.php?action=createNote",
      data: {
        data: JSON.stringify(jsonData)
      },
      success: function (response) {
        console.log(response)
        if (response.status == "OK") {
          $("#notes_container").append(`
          <div class="note_card" note_id=${response.nr}>
            <button type="button" class="close" aria-label="Close" note_id=${response.nr}>
              <span aria-hidden="true">&times;</span>
            </button>
            <h5 class="note" style="padding-top:2vh">${note_value}</h5><hr>
          </div>
          `);
          deleteNote();
        } else {
          Swal('Error','An error has occured.','error');
        }
      }, error: function(x){
        console.log(x);
      }
    });
  });
}

function displayNotes(){
  var window_location = window.location.href;
  jsonData["userid"]=window_location.split("=")[1];
  console.log(jsonData);
  $.ajax({
    type: "post",
    url: "../backend/index.php?action=displayNotes",
    data: {
      data: JSON.stringify(jsonData)
    },
    success: function (response) {
      console.log(response)
      if (response.status == "OK") {
        $(response.notes).each(function (index) {
          var self = this;
          $("#notes_container").append(`
          <div class="note_card">
            <button type="button" class="close" aria-label="Close" note_id=${self.nr}>
              <span aria-hidden="true">&times;</span>
            </button>
            <h5 class="note" style="padding-top:2vh">${self.note}</h5><hr>
          </div>
          `);
        });
        deleteNote();
      } else {
        ;
      }
    }, error: function(x){
      console.log(x);
    }
  });
}

function deleteNote(){
  $(".close").on("click", function (e) {
  var window_location = window.location.href;
  jsonData["userid"]=window_location.split("=")[1];
  var note_id= $(this).attr("note_id");
  jsonData["nr"]= note_id;
  console.log(jsonData);
  $.ajax({
    type: "post",
    url: "../backend/index.php?action=deleteNote",
    data: {
      data: JSON.stringify(jsonData)
    },
    success: function (response) {
      console.log(response)
      if (response.status == "OK") {
        $(".note_card[note_id="+note_id+"]").remove();
      } else {
        console.log("ERROR");
      }
    }, error: function(x){
      console.log(x);
    }
  });
});
}

function changeSubIdListener() {
  $("#changeSubId").submit(function (e) {
    e.preventDefault();
    var new_subid = $("#new_subid").val();
    jsonData["sub_id"]= new_subid;
    var window_location = window.location.href;
    jsonData["userid"]=window_location.split("=")[1];
    $.ajax({
      type: "post",
      url: "../backend/index.php?action=changeSubIdById",
      data: {
        data: JSON.stringify(jsonData)
      },
      success: function (response) {
        console.log(response)
        if (response.status == "OK") {
          Swal('Success','This user&#39;s subscription ID has been successfully changed.','success');
          $("#sub_id").html(`Subscription ID: `+new_subid);
          $("#new_subid").val("");
        } else {
          console.log("error");
        }
      }, error: function(x){
        console.log(x);
      }
    });
  });
}

function changeExpDateListener() {
  $("#changeExpDate").submit(function (e) {
    e.preventDefault();
      var exp_date =$("#new_expdate").val();
      jsonData["exp_date"]=exp_date;
      var window_location = window.location.href;
      jsonData["userid"]=window_location.split("=")[1];
      $.ajax({
        type: "post",
        url: "../backend/index.php?action=changeExpDateById",
        data: {
          data: JSON.stringify(jsonData)
        },
        success: function (response) {
          console.log(response)
          if (response.status == "OK") {
            Swal('Success','This user&#39;s expiration date has been successfully changed.','success');
            $("#exp_date").html(`Expiration date: `+exp_date);
            $("#new_expdate").val("");
          } else {
            console.log("error");
          }
        }, error: function(x){
          console.log(x);
        }
      });
  });
}

function checkDateFormat() {
  var exp_date = document.getElementById("new_expdate");
  function validateDate() {
    exp_date = $("#new_expdate").val();
    if (/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(String(exp_date))){
      exp_date.setCustomValidity("Please use the correct format! E.g.: 1999-09-19");
    } else {
      exp_date.setCustomValidity('');
    }
  }
  exp_date.onchange = validateDate;
}

function getProfileImage() {
  var window_location = window.location.href;
  jsonData["userid"]=window_location.split("=")[1];
  console.log(jsonData);
  $.ajax({
    type: "post",
    url: "../backend/index.php?action=getProfileImageById",
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
          console.log("no hash")
        }
      } else {
        console.log("No prof img");
      }
    }, error: function(x){
      console.log(x);
    }
  });
}

function changeToDoAccess(){
  $(".to_do_access_submit").click(function(e){
    jsonData["to_do"]=$("#to_do_access").prop("checked")
    jsonData["userid"]=window.location.href.split("=")[1];
    $.ajax({
      type: "post",
      url: "../backend/index.php?action=updateToDoAccess",
      data: {
        data: JSON.stringify(jsonData)
      },
      success: function (response) {
        console.log(response)
        if (response.status == "OK") {
          Swal.fire("Success","You have successfully changed this user's to do access rights.","success")
        }else{
          Swal.fire("Error","Something went wrong...","error")
        }
      }
    })
  })
}