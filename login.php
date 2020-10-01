<?php
    session_start();
    if (isset($_SESSION['logged_in'])) {
        if($_SESSION['logged_in'] == 1){
            header("location: index.php"); 
        }
    }
?>
<!doctype html>
<html>

<head>
    <?php include "embed_header.php"; ?>
    <title>Websoft365.com - Login</title>
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
    <div id="login" class="content">
        <div id="login_body">
            <div id="login_form">
                <h2>Log In to WebSoft 365!</h2>
                <form id="login_form_submit">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-12 col-sm-6">
                                <label for="email">Email address</label>
                                <input type="email" class="form-control" id="email" aria-describedby="email"
                                    placeholder="Email address" name="email" />
                            </div>
                            <div class="col-12 col-sm-6">

                            </div>
                        </div>
                        <div class="row password_row">
                            <div class="col-12">
                                <label for="password">Password</label>
                                <div class="row">
                                    <div class="col-12 col-sm-6 no-padding-rl">
                                        <input type="password" class="form-control" id="password"
                                            aria-describedby="password" placeholder="Password" name="password" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row cb_regbutton">
                            <div class="col-12 checkboxes">
                                <div class="row">
                                    <div class="col-12 col-md-4 no-padding-rl">
                                        <div class="custom-control custom-checkbox ta-left">
                                            <input type="checkbox" class="custom-control-input" id="accept_privacy"
                                                required>
                                            <label class="custom-control-label" for="accept_privacy">Accept <a
                                                    href='privacy_policy.php'>Privacy Policy/Cookie Policy</a></label>
                                        </div>
                                    </div>
                                    <div class="col-12 no-padding-rl">
                                        <div class="input-group custom-control custom-checkbox ta-left">
                                            <input type="checkbox" class="custom-control-input" id="accept_terms"
                                                required>
                                            <label class="custom-control-label" for="accept_terms">Accept <a
                                                    href='terms_of_use.php'>Terms of Use</a></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6">
                                <button type="submit" class="btn btn-primary register">Login</button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-sm-6 forgot_password">
                                <small id="passwordSmall" class="form-text text-muted click_here">Forgot your password?
                                    <a href="forgot_password.php">Click here!</a></small>
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
    <script src="js/login.js"></script>
</body>

</html>