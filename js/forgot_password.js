$(document).ready(function () {
    sendPasswordEmail();
    cancelPasswordRequest();
});

  function sendPasswordEmail(){
      $("#forgotPassword").submit(function (e) {
        e.preventDefault();
        $("button[type=submit]").prop( "disabled", true );
        jsonData["email"]=$("#email").val();
        $.ajax({
          type: "post",
          url: "../backend/index.php?action=sendForgotPasswordEmail",
          data: {
            data: JSON.stringify(jsonData)
          },
          success: function (response) {
            $("button[type=submit]").prop( "disabled", false );
            console.log(response)
            if (response.status == "OK") {
              Swal('Success','Email has been sent.','success');
            } else {
              console.log("error");
            }
          },  error(x){
            $("button[type=submit]").prop( "disabled", false );
            console.log(x);
          }
        });
      });
  }

  function cancelPasswordRequest(){
    $("#cancelButton").on("click", function(e) {
      window.location.href="/login.php"
    });
}
