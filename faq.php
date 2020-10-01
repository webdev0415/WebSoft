<?php
session_start();
if (!$_SESSION['logged_in'] || $_SESSION['suspended'] == 1) {
    header("Location: /index.php");
    
}
?>
<!doctype html>
<html>

<head>
    <?php include "embed_header.php"; ?>
    <title>WebSoft365.com - Profile - </title>
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
    <div id="faq" class="content">
        <div class="row">
            <div class="col-12">
                <h1 id="username">WebSoft365 FAQ - Frequently Asked Questions.</h1>
                <hr>
                <div class="user_action">
                    <div id="accordion">

                        <div class="card">
                            <div class="card-header" id="headingTwo">
                                    <button class="btn btn-link collapsed" data-toggle="collapse"
                                        data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        <h5 class="collapse_title">How do I cancel my paid PRO subscription?</h5>
                                    </button>
                            </div>
                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"
                                data-parent="#accordion">
                                <div class="card-body">
                                <h6>You can cancel your paid PRO subscription if you go to the PRO Membership page at <a href="https://websoft365.com/buy.php">https://websoft365.com/buy.php</a> and downgrade your subscription to the FREE plan.</h6>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header" id="headingThree">
                                    <button class="btn btn-link collapsed" data-toggle="collapse"
                                        data-target="#collapseThree" aria-expanded="false"
                                        aria-controls="collapseThree">
                                        <h5 class="collapse_title">How do I change my current subscription to other subscriptions?</h5>
                                    </button>
                            </div>
                            <div id="collapseThree" class="collapse" aria-labelledby="headingThree"
                                data-parent="#accordion">
                                <div class="card-body">
                                    <h6>You can change your current subscription to other subscriptions if you visit the PRO Membership page at <a href="https://websoft365.com/buy.php">https://websoft365.com/buy.php</a> and choose any available subscription.</h6>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header" id="headingFour">
                                    <button class="btn btn-link collapsed" data-toggle="collapse"
                                        data-target="#collapseFour" aria-expanded="false"
                                        aria-controls="collapseFour">
                                        <h5 class="collapse_title">How do I connect my Google drive or other online drives to my Websoft365 account?</h5>
                                    </button>
                            </div>
                            <div id="collapseFour" class="collapse" aria-labelledby="headingFour"
                                data-parent="#accordion">
                                <div class="card-body">
                                    <h6>You can connect your Google Drive or other online drives to you WebSoft365 account if you go to the settings page at <a href="https://websoft365.com/settings.php">https://websoft365.com/settings.php</a></h6>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header" id="headingFive">
                                    <button class="btn btn-link collapsed" data-toggle="collapse"
                                        data-target="#collapseFive" aria-expanded="false"
                                        aria-controls="collapseFive">
                                        <h5 class="collapse_title">How many domain names I can use the tools in the webmaster category?</h5>
                                    </button>
                            </div>
                            <div id="collapseFive" class="collapse" aria-labelledby="headingFive"
                                data-parent="#accordion">
                                <div class="card-body">
                                    <h6>If you visit the setting page at <a href="https://websoft365.com/settings.php">https://websoft365.com/settings.php</a>, you can add up to 5 domain names to your WebSoft365 account.</h6>
                                    <ul>
                                        <li>With a free membership, you can add only 1 domain name to your WebSift365 account.</li>
                                        <li>With a PRO membership, you can add up to 2 domain names.</li>
                                        <li>With a Super PRO membership, you can add up to 5 domain names.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header" id="headingSix">
                                    <button class="btn btn-link collapsed" data-toggle="collapse"
                                        data-target="#collapseSix" aria-expanded="false"
                                        aria-controls="collapseSix">
                                        <h5 class="collapse_title">I have a great software or tool idea. How can I recommend my ideas to the WebSoft365 developer team?</h5>
                                    </button>
                            </div>
                            <div id="collapseSix" class="collapse" aria-labelledby="headingSix"
                                data-parent="#accordion">
                                <div class="card-body">
                                    <h6>If you have any software ideas, you can send your idea to the Websoft365 developer team if you goto the Ask for Software page at <a href="https://websoft365.com/ask.php">https://websoft365.com/ask.php</a></h6>
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
    <script src="js/jquery.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/analytics.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@7.25.0/dist/sweetalert2.all.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/promise-polyfill@7.1.0/dist/promise.min.js"></script>
    <script src="js/main.js"></script>
</body>

</html>