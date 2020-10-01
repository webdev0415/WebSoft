<?php
    session_start();
    if (isset($_SESSION['logged_in'])) {
        if($_SESSION['suspended'] == 1){
            header("location: /suspended.php"); 
        }
    }
?>
<!doctype html>
<html>

<head>
    <?php include "embed_header.php"; ?>
    <title>WebSoft365 - Contact</title>
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
    <div id="contact" class="content">
        <div class="contact_body">
            <div class="contact_form">
                <h2>Contact</h2>
                <form id="contactForm">
                    <div class="form-group">
                        <h5 class="contact_text">To contact the WebSoft365 team, please send an e-mail to <a
                                href="mailto:websoft365@websoft365.com">websoft365@websoft365.com</a> or fill out the form
                            below.</h5>
                        <div class="row">
                            <div class="col-12 col-sm-6">
                                <label for="name">Your name</label>
                                <input class="form-control" id="name" name="name" aria-describedby="name" placeholder="Your name" required/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-sm-6">
                                <label for="email">Your e-mail address</label>
                                <input class="form-control" id="email" name="email" aria-describedby="email"
                                    placeholder="Your e-mail address" required/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-sm-6">
                                <label for="subject">Subject</label>
                                <input class="form-control" id="subject" name="subject" aria-describedby="subject"
                                    placeholder="Subject" required/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-sm-6 message_container">
                                <label for="message">Your message</label>
                                <textarea id="message" class="form-control" name="message"
                                    placeholder="Enter your message here..." rows="3"
                                    max-rows="6" required></textarea>
                            </div>
                        </div>
                        <div class="row cb_regbutton">
                            <div class="col-12 col-md-6">
                                <button type="submit" class="btn btn-primary send" id="submitContactForm">Send</button>
                            </div>
                        </div>
                    </div>
                </form>
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
    <script src="js/contact.js"></script>
</body>

</html>
