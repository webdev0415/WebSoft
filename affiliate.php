<?php
    session_start();
    if (isset($_SESSION['logged_in'])) {
        if($_SESSION['suspended'] == 1){
            header("location: suspended.php"); 
        }
    }
?>
<!doctype html>
<html>

<head>
    <?php include "embed_header.php"; ?>
    <title>WebSoft365</title>
        <!-- Favicon -->
        <link rel="apple-touch-icon" sizes="57x57" href="assets/icons/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="assets/icons/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="assets/icons/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="assets/icons/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="assets/icons/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="assets/icons/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="assets/icons/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="assets/icons/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/icons/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="assets/icons/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="assets/icons/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/icons/favicon-16x16.png">
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <!-- Own CSS -->
    <link rel="stylesheet" href="css/main.css">
</head>

<body>
    <?php include "embed_body.php"; ?>
    <div id="navigation"></div>

    <!------------------------------ CONTENT ------------------------------>
   <div id="register" class="content">
        <div class="register_body">
            <div class="via_form">
                <h2>WebSoft365 Partner Program - 35% Commission.</h2>
              <style type="text/css">
.youtube-responsive-container {
position:relative;
padding-bottom:56.25%;
padding-top:30px;
height:0;
overflow:hidden;
}

.youtube-responsive-container iframe, .youtube-responsive-container object, .youtube-responsive-container embed {
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
}


.butn444 {
  -webkit-border-radius: 3;
  -moz-border-radius: 3;
  border-radius: 3px;
  text-shadow: 1px 1px 3px #666666;
  font-family: Arial;
  color: #ffffff;
  font-size: 17px;
  background: #52BE80;
  padding: 10px 10px 10px 10px;
  text-decoration: none;
}

.butn444:hover {
  background: #27AE60;
  text-decoration: none;
  font-family: Arial;
  color: #ffffff;
}

.butn445 {
  -webkit-border-radius: 3;
  -moz-border-radius: 3;
  border-radius: 3px;
  text-shadow: 1px 1px 3px #666666;
  font-family: Arial;
  color: #ffffff;
  font-size: 17px;
  background: #1188DC ;
  padding: 10px 10px 10px 10px;
  text-decoration: none;
}

.butn445:hover {
  background: #0668AD 
  text-decoration: none;
  font-family: Arial;
  color: #ffffff;
}
</style>
<hr />
<p style="text-align: center;"><a class="butn444" href="https://a.paddle.com/join/program/109863" target="_blank">+ Join the Partner Program »</a></p>
<hr />
<p style="text-align: center;"><a class="butn445" href="mailto:info@websoft365.com" target="_blank">@ Contact the Affiliate Manager »</a></p>
<hr />

<div class="youtube-responsive-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/MAeb2epti6Q" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>
<hr />

<div class="youtube-responsive-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/dSlXmmgwREM" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>
<hr />
<p style="text-align: center;"><a class="butn444" href="https://a.paddle.com/join/program/109863" target="_blank">+ Join the Partner Program »</a></p>
<hr />
<p style="text-align: center;"><a class="butn445" href="mailto:info@websoft365.com" target="_blank">@ Contact the Affiliate Manager »</a></p>
<hr />

            </div>
        </div>
    </div>
    <?php include "components/policy_modal.php"; ?>
    <!------------------------------ CONTENT ------------------------------>

    <footer id="footer"></footer>
    <script src="js/jquery.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/analytics.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@7.25.0/dist/sweetalert2.all.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/promise-polyfill@7.1.0/dist/promise.min.js"></script>
    <script src="js/main.js"></script>
    <script src="js/search.js"></script>
</body>

</html>
