$(document).ready(function () {
    sendPasswordEmail();
    cancelPasswordRequest();
    checkPassword();
});

  function sendPasswordEmail(){
      $("#changePassword").submit(function (e) {
        e.preventDefault();
        $("button[type=submit]").prop( "disabled", true );
        jsonData["password"]=$("#new_password").val();
        jsonData["hash"]= window.location.href.split("hash=")[1];
        var str = window.location.href.split("=")[1];
        var userid = str.substring(0, str.length - 5);
        jsonData["userid"]= userid;
        console.log(jsonData);
        $.ajax({
          type: "post",
          url: "../backend/index.php?action=changeForgottenPasswordById",
          data: {
            data: JSON.stringify(jsonData)
          },
          success: function (response) {
            console.log(response)
            if (response.status == "OK") {
              Swal('Success','Email has been sent.','success');
            } else {
              console.log("error");
            }
          },  error(x){
            console.log(x);
            $("button[type=submit]").prop( "disabled", false );
          }
        });
      });
  }

  function cancelPasswordRequest(){
    $("#cancelButton").on("click", function(e) {
      window.location.href="/login.php"
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