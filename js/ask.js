$(document).ready(function () {
  sendSoftwareIdea();
  getUserDetails();
});

function sendSoftwareIdea() {
  $("#sendSoftwareIdea").submit(function (e) {
    e.preventDefault();
    $("button[type=submit]").prop( "disabled", true );
    $("#sendSoftwareIdea").serializeArray().map(function (x) {
      jsonData[x.name] = x.value;
    });
    jsonData["email"]=$("#email").val()
    $.ajax({
      type: "post",
      url: "../backend/index.php?action=sendIdeaEmail",
      data: {
        data: JSON.stringify(jsonData)
      },
      success: function (response) {
        console.log(response)
        if (response.status == "OK") {
          $.ajax({
            type: "post",
            url: "../backend/index.php?action=sendIdeaEmailResponse",
            data: {
              data: JSON.stringify(jsonData)
            },
            success: function (response) {
              $("button[type=submit]").prop( "disabled", false );
              console.log(response)
              if (response.status == "OK") {
                window.location.href = 'ask_success.php';
              } else {
                console.log("error");
              }
            }, error: function(e){
              $("button[type=submit]").prop( "disabled", false );
              Swal.fire("Error","An error has occured.","error")
            }
          });
        } else {
          $("button[type=submit]").prop( "disabled", false );
          Swal.fire("Error","An error has occured.","error")
          console.log("error");
        }
      }, error:function(e){
        $("button[type=submit]").prop( "disabled", false );
              Swal.fire("Error","An error has occured.","error")
      }
    });
  });
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
      if(response.status == "OK"){
        var self =response.users;
        $("#email").val(self.email);
        $("#email").prop( "disabled", true );
      }else{
        console.log("error");
      }
    }
  });
}