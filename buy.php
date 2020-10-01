<?php
    session_start();
    if (isset($_SESSION['logged_in'])) {
        if($_SESSION['suspended'] == 1){
            header("location: /suspended.php"); 
        }
    }else{
        header("location: /index.php");
    }
?>
<!doctype html>
<html>

<head>
    <?php include "embed_header.php"; ?>
    <title>WebSoft365.com - PRO Membership Page - </title>
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
    <div id="buy" class="content">
        <div class="buy_body">
            <div class="row">
                <div class="col-12 offset-md-1 col-md-10">
                    <div class="row section">
                        <div class="col-12">
                            <div class="row cards">
                                <div class="col-12 col-md-4 free_card">
                                    <div class="buy_cards">
                                        <div class="card_head">
                                            <hr class="hr">
                                            <img class="logo" src="../assets/free_icon.png" alt="">
                                            <hr class="hr">
                                            <h2>FREE</h2>
                                            <h5>Membership</h5>
                                        </div>
                                        <div class="card_body free_body">
                                            <div class="price">
                                                <h5><b>FREE</b></h5>
                                            </div>
                                            <ul>
                                                <li>Limited use of all the software
                                                    and
                                                    tools.</li>
                                                <li>Unlimited Chat & Email support.</li>
                                            </ul>
                                            <h5 class="category_title">In Webmaster Category</h5>
                                            <ul>
                                                <li>Unlimited widgets on 1 domain.
                                                </li>
                                                <li>Unlimited widgets views.</li>
                                                <li>Branded widgets.</li>
                                            </ul>
                                            <h5 class="category_title">In Social Media Category</h5>
                                            <ul>
                                                <li>Limitation in some software.</li>
                                                <li>Limitation in some tools.</li>
                                            </ul>
                                            <div class="buy_btn_container free_container">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php include "components/policy_modal.php"; ?>
    <!------------------------------ CONTENT ------------------------------>

    <footer id="footer"></footer>
    <script src="https://cdn.paddle.com/paddle/paddle.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/analytics.js"></script>
    <script src="js/main.js"></script>
    <script src="js/buy.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@7.25.0/dist/sweetalert2.all.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/promise-polyfill@7.1.0/dist/promise.min.js"></script>
</body>

</html>