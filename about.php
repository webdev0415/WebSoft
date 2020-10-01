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
    <title>WebSoft365.com - About</title>
    <?php include "embed_header.php"; ?>
    <meta name="description" content="WebSoft365.com provides a collection of online software & tools that you can use on any computer worldwide. All software works online, therefore, you don't have to download or install anything on your computer.">
    <meta name="keywords" content="hundreds of online software, computer worldwide, works online, software & tools, collection of online software, hundreds of dollars, different software and tools">
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

    <div id="about" class="content">
        <div class="login_body">
            <div class="login_form">
                <h2 class="title">About</h2>
                <form>
                    <div class="form-group">
                        <h4>WebSoft365.com provides a collection of online software & tools that you can use on any
                            computer worldwide. All software works online, therefore, you don't have to download or
                            install anything on your computer.</h4>

                        <h4>Many internet users ending up paying hundreds of dollars every month for different software
                            and tools. WebSoft365.com is the solution for you to save money.</h4>

                        <h4>Our mission is to provide you hundreds of online software & tools for one low monthly or
                            yearly membership fee. Therefore WebSoft365.com developer team works hard every day to
                            provide new online software & tools for every user. Many of the tools in the Webmaster
                            category can be used for free without a paid PRO membership but in that case, it's required
                            a link back to WebSoft365.com.</h4>

                        <h4>We are also open to new ideas. If you have new ideas of any useful software or online tools,
                            you can click on the <a href="ask.php">"Ask for Software"</a> button in the menu bar to fill
                            out a form and we will consider creating a new software by your ideas.</h4>
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
    <script src="js/about.js"></script>
</body>

</html>