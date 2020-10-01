$(document).ready(function () {
  emailActivated();
});

function emailActivated(){
  var window_location = window.location.href;
  if(window_location.includes("verified=true")){
    $(".content").prepend(`<div id="accountActivated">Your account has been successfully activated.</div>`);
  }else if(window_location.includes("email_changed=true")){
    $(".content").prepend(`<div id="accountActivated">Your email has been successfully changed.</div>`);
  }
}