$(document).ready(function () {
    fillInContact();
    submitContact();
    getUserDetails();
});

  function submitContact() {

    $("#contactForm").submit(function (e) {
      e.preventDefault();
      $("button[type=submit]").prop( "disabled", true );
      $("#name").prop( "disabled", false );
      $("#email").prop( "disabled", false );
      $("#subject").prop( "disabled", false );
      $("#contactForm").serializeArray().map(function (x) {
        jsonData[x.name] = x.value;
      });
      var window_location = window.location.href;
      if(window_location.includes("?")){
      $("#name").prop( "disabled", true );
      $("#email").prop( "disabled", true ); 
      $("#subject").prop( "disabled", true );
      }
      console.log(jsonData);
      $.ajax({
        type: "post",
        url: "../backend/index.php?action=sendContactEmail",
        data: {
          data: JSON.stringify(jsonData)
        },
        success: function (response) {
          console.log(response);
          if (response.status == "OK") {
            $.ajax({
              type: "post",
              url: "../backend/index.php?action=sendContactResponse",
              data: {
                data: JSON.stringify(jsonData)
              },
              success: function (response) {
                console.log(response);
                $("button[type=submit]").prop( "disabled", false );
                if (response.status == "OK") {
                      window.location.href = 'contact_success.php';
                } else {
                  $("#contactForm").append(`<div id="error"><h6 style="color:red"><b>An error has occured:</b></h6>
                  <h6><li>Please try again later.</li></h6></div>`);
                }
              }, error: function(x){
                console.log(x);
                Swal.fire("Error","An error has occured.","error")
                $("button[type=submit]").prop( "disabled", false );
              }
            });
          } else {
            $("#contactForm").append(`<div id="error"><h6 style="color:red"><b>An error has occured:</b></h6>
            <h6><li>Please try again later.</li></h6></div>`);
          }
        }, error: function(x){
          console.log(x);
          Swal.fire("Error","An error has occured.","error")
          $("button[type=submit]").prop( "disabled", false );
        }
      });
    });
  }

  function fillInContact(){
    var window_location = window.location.href;
    if(window_location.includes("?")){
      $(".contact_text").html("Contact the WebSoft365 team.");
      const urlParams = new URLSearchParams(window.location.search);
        var name = urlParams.get('name');
        var email = urlParams.get('email');
        var membership = urlParams.get('membership');
        var price;
        switch(membership){
          case "PRO_MONTHLY":
            price = "€16.99 / Month";
            membership = "Monthly Pro Membership";
          break;
          case "PRO_YEARLY":
            price = "€99.99 / Year";
            membership = "Yearly Pro Membership";
          break;
          case "SUPER_PRO_MONTHLY":
            price = "€29.99 / Month";
            membership = "Monthly Super Pro Membership";
          break;
          case "SUPER_PRO_YEARLY":
            price = "€179.99 / Year";
            membership = "Yearly Super Pro Membership";
          break;
        }
        $("#name").val(name);
        $("#name").prop( "disabled", true );
        $("#email").val(email);
        $("#email").prop( "disabled", true );
        $("#subject").val("Upgrade Membership Plan to "+membership);
        $("#subject").prop( "disabled", true );
        $("#message").val("Dear WebSoft365 Team, please upgrade my current Membership Plan to "+membership+".");
        $(".message_container").append(`<div class="checkbox_agree" style="padding-top:1vh;" class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="accept_privacy"
            required>
        <label class="custom-control-label" for="accept_privacy">By sending this email, you agree, that the website admin will upgrade your plan to ${membership} (${price}).</label>
    </div>`);
    if(window.innerWidth<600){
      $(".checkbox_agree").css("margin-left","5vw");
    }
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
        if(response.status == "OK"){
          var self =response.users;
          $("#name").val(self.firstname+" "+self.lastname);
          $("#name").prop( "disabled", true );
          $("#email").val(self.email);
          $("#email").prop( "disabled", true );
        }else{
          console.log("error");
        }
      }
    });
}