$(document).ready(function () {
  callSubmitListener();
});

function callSubmitListener() {
    var jsonData = {};

    $("#login_form_submit").submit(function (e) {
        e.preventDefault();
        $("button[type=submit]").prop( "disabled", true );
        $("#login_form_submit").serializeArray().map(function (x) {
            jsonData[x.name] = x.value;
        });
        console.log(jsonData);
        $.ajax({
            type: "post",
            url: "../../backend/index.php?action=login",
            data: {
                data: JSON.stringify(jsonData)
            },
            success: function (response) {
              $("button[type=submit]").prop( "disabled", false );
                console.log(response);
                if (response.status == "NOT FOUND") {
                    $("#error").remove();
                    $("#login_form_submit").append(`<div id="error">
                        <h6 style="color:red"><b>Warning! The following errors must be corrected before you can login:</b></h6>
                        <h6><li>Incorrect email address. There is no user with this email address.</li></h6></div>
                    `);
                } else if (response.status == "OK") {
                    window.location.href = "/index.php";
                } else if (response.status == "WRONG PASSWORD") {
                    $("#error").remove();
                    $("#login_form_submit").append(`<div id="error"><h6 style="color:red"><b>Warning! The following errors must be corrected before you can login:</b></h6>
                    <h6><li>Incorrect password. If you forgot your password please click <a href="../forgot_password.php">here</a>.</li></h6></div>`);
                }else{
                    $("#error").remove();
                    $("#login_form_submit").append(`<div id="error"><h6 style="color:red"><b>Warning! The following errors must be corrected before you can login:</b></h6>
                    <h6><li>This user has not been activated yet. Please check your e-mails for an activation link. If you haven't received any, click <a id="resendActivation" href="#">here</a> to resend your activation email.</li></h6></div>`);
                    resendActivationEmail();
                }
            }, error: function(x){
              $("button[type=submit]").prop( "disabled", false );
            }
        });
        return false;
    });

}

function resendActivationEmail(){
    $("#resendActivation").on("click", function (e) {
      e.preventDefault();
      $("#resendActivation").prop( "disabled", true );
      console.log("sending");
      var jsonData = {};
      jsonData["email"]=$("#email").val();
      console.log(jsonData["email"]);
        $.ajax({
          type: "post",
          url: "../../backend/index.php?action=resendActivationEmail",
          data: {
            data: JSON.stringify(jsonData)
          },
          success: function (response) {
            $("#resendActivation").prop("disabled",false);
            if (response.status == "OK") {
              console.log(response);
              Swal('Success','Your activation email has been resent to your given email address.','success');
            } else {
              console.log("error");
            }
          }, error:function(x){
            $("#resendActivation").prop("disabled",true);
          }
        });
      });
}