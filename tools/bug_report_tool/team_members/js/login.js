var dummyJson = {};
dummyJson["dummy"] = "dummy";
$(document).ready(function () {
  console.log("yolo")
  callSubmitListener();
  $("#navigation").load("/components/navbar_team_member_access.php");
  $(function () {
      $("#footer").load("/components/footer.php");
    });
    setTimeout(function () {
      getFooterInfo();
    }, 500); 
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
            url: "../../../backend/bug_report_tool.php?action=teamMemberLogin",
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
                    window.location.href = "https://websoft365.com/tools/bug_report_tool/team_members/index.php";
                } else if (response.status == "WRONG PASSWORD") {
                    $("#error").remove();
                    $("#login_form_submit").append(`<div id="error"><h6 style="color:red"><b>Warning! The following errors must be corrected before you can login:</b></h6>
                    <h6><li>Incorrect PIN. If you forgot your PIN please click <a href="../forgot_password.php">here</a>.</li></h6></div>`);
                }
            }, error: function(x){
              $("button[type=submit]").prop( "disabled", false );
            }
        });
        return false;
    });

}

function getFooterInfo(){
    $.ajax({
      type: "post",
      url: "../../../backend/index.php?action=getFooterInfo",
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
  }