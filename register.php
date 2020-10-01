<?php
    session_start();
    if (isset($_SESSION['logged_in'])) {
        if($_SESSION['logged_in'])
        header("location: /index.php"); 
    }
?>
<!doctype html>
<html>

<head>
    <?php include "embed_header.php"; ?>
    <title>Websoft365.com - Register</title>
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
                
<h2>Register today for FREE!</h2>

                <form id="reg">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-12 col-md-6 order-1 order-md-1">
                                <label for="email_address">Email address</label>
                                <input type="email" class="form-control" id="email_address" aria-describedby="email"
                                    placeholder="Enter email" name="email" required />
                                <small id="emailSmall" class="form-text text-muted">Enter a valid email address! (A
                                    verification email will be sent)</small>
                            </div>
                            <div class="col-12 col-md-6 order-4 order-md-2">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" aria-describedby="password"
                                    placeholder="Password" name="password" maxlength="25"
                                    minlength="2" />
                                <small id="passwordSmall" class="form-text text-muted">Between 2 and 25
                                    characters.</small>
                            </div>
                            <div class="col-12 col-md-6 order-2 order-md-3">
                                <label for="first_name">First Name</label>
                                <input class="form-control" id="first_name" aria-describedby="firstname"
                                    name="firstname" placeholder="First name" required />
                                <small id="firstNameSmall" class="form-text text-muted">Enter your first name</small>
                            </div>
                            <div class="col-12 col-md-6 order-5 order-md-4">
                                <label for="password2">Confirm Password</label>
                                <input type="password" class="form-control" id="password2" aria-describedby="password2"
                                    placeholder="Password" maxlength="25" minlength="2"
                                    />
                                <small id="password2Small" class="form-text text-muted">Between 2 and 25
                                    characters</small>
                            </div>
                            <div class="col-12 col-md-6 order-3 order-md-5">
                                <label for="last_name">Last Name</label>
                                <input class="form-control" id="last_name" aria-describedby="lastname"
                                    placeholder="Last name" name="lastname" required />
                                <small id="lastNameSmall" class="form-text text-muted">Enter your last name</small>
                            </div>
                            <div class='col-12 col-md-6 order-6 order-md-6'>
                            <div class="row">
                            <div class="col-12">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input"
                                                        id="receive_newsletter">
                                                    <label class="custom-control-label" for="receive_newsletter">Receive the newsletters of new software release and software updates.</label>
                                                </div>
                                            </div></div>
                                <div class="row cb_regbutton">
                                    <div class="col-12 col-lg-6 col-md-6 checkboxes">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input"
                                                        id="accept_privacy" required>
                                                    <label class="custom-control-label" for="accept_privacy">Accept
                                                        <a href="privacy_policy.php">Privacy Policy/Cookie Policy</a>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input"
                                                        id="accept_terms" required>
                                                    <label class="custom-control-label" for="accept_terms">Accept
                                                        <a href="terms_of_use.php">Terms of Use</a>
                                                        </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-lg-6 col-md-6 reg_button_wrapper">
                                        <button type="submit" class="btn btn-primary register">Register for FREE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
<hr /><hr />
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
</style>
<div class="youtube-responsive-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/MAeb2epti6Q?rel=0&autoplay=1&loop=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
    <script src="js/register.js"></script>
</body>

</html>
