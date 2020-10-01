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
    <title>WebSoft365.com - Ask for Software & tools!</title>
    <meta name="description" content="If you have an idea of great online software or tools, please fill out the form and we will consider creating it.">
    <meta name="keywords" content="ask, software, ask for software, have an idea, great online software or tools, great online software, Tools idea, software ideas">
    <meta name="robots" content="index, follow">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="language" content="English">
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
    <div id="ask" class="content">
        <div class="ask_body">
            <div class="ask_form">
                <h2>Ask for Software!</h2>
                <form id="sendSoftwareIdea">
                    <div class="form-group">
                        <h5 class="ask_text">If you have an idea of great online software or tools, please fill out the
                            form and we will consider creating it.</h5>
                        <div class="row">
                            <div class="col-12 col-sm-6">
                                <label for="email">Email address</label>
                                <input class="form-control" id="email" aria-describedby="email" name="email"
                                    placeholder="Email address" required/>
                            </div>
                        </div>
                        <div class="row description">
                            <div class="col-12 col-sm-6">
                                <label for="name">Name of your Software or Tools idea</label>
                                <input class="form-control" id="name" aria-describedby="name" name="name"
                                    placeholder="Name of your Software or Tools idea" required/>
                            </div>
                        </div>
                        <div class="row description">
                            <div class="col-12 col-sm-6">
                                <label for="description">Detailed Description of your Software or Tools idea</label>
                                <textarea id="description" v-model="text" class="form-control" name="description"
                                    placeholder="Detailed Description of your Software or Tools idea" rows="3"
                                    max-rows="6" required></textarea>
                            </div>
                        </div>
                        <div class="row cb_regbutton">
                            <div class="col-12 col-md-6">
                                <button type="submit" class="btn btn-primary register" id="sendIdea">Send</button>
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
    <script src="js/ask.js"></script>
</body>

</html>