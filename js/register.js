$(document).ready(function () {
  createUser();
  checkPassword();
});

function createUser() {

  $("#reg").submit(function (e) {
    e.preventDefault();
    $("button[type=submit]").prop( "disabled", true );
    $("#reg").serializeArray().map(function (x) {
      jsonData[x.name] = x.value;
    });
    jsonData["newsletter"]=$("#receive_newsletter").prop("checked")
    console.log(jsonData);
    $.ajax({
      type: "post",
      url: "../../backend/index.php?action=createUser",
      data: {
        data: JSON.stringify(jsonData)
      },
      success: function (response) {
        $("button[type=submit]").prop( "disabled", false );
        console.log(response);
        if (response.status == "OK") {
          window.location.href="/success.php";
        } else if(response.status=="EMAIL EXISTS") {
          if ($('#error').length){
            document.getElementById("#error").remove(); 
          }
          $("#reg").append(`<div id="error"><h6 color="red"><b>Error:</b></h6>
            <h6><li>This email has already been registered to our system. If you forgot your password, click <a href="forgot_password.php">here</a>.</li></h6></div>`);
        }else{
          Swal('Error','An error has occured.','error');
        }
      }, error: function(x){
        $("button[type=submit]").prop( "disabled", false );
        console.log(x);
      }
    });
  });
}

function checkPassword() {
  var password = document.getElementById("password"),
    confirm_password = document.getElementById("password2");

  function validatePassword() {
    if (password.value != confirm_password.value) {
      confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
      confirm_password.setCustomValidity('');
    }
  }

  password.onchange = validatePassword;
  confirm_password.onkeyup = validatePassword;
}
