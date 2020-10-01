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
    <div id="profile" class="content">
        <div class="row">
            <div class="col-12 col-lg-3">
                <form id="image-input">
                    <div id="canvas_container">   
                        <canvas id="profileCanvas"></canvas>
                    </div>
                    <input type="file" id="profile_pic" name="file" accept="image/*" style="display: none;">
                    <input type="button" class="btn btn-primary select_img" value="Browse..." onclick="document.getElementById('profile_pic').click();" />
                    <br>
                    <button type="submit" class="btn btn-primary" id="uploadImageButton">Upload</button>
                </form>
            </div>
            <div class="col-12 col-lg-9 info">
                <h1 id="username">Name</h1>
                <h4 id="email">Email address</h4>
                <hr>
                <div class="user_action">
                    <div id="accordion">

                        <div class="card">
                            <div class="card-header" id="headingTwo">
                                    <button class="btn btn-link collapsed" data-toggle="collapse"
                                        data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        <h5 class="collapse_title">Change password</h5>
                                    </button>
                            </div>
                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"
                                data-parent="#accordion">
                                <div class="card-body">
                                <form id="changePassword">
                                    <div class="row">
                                            <div class="card_section col-12">
                                                <label for="password">New password</label>
                                                <input type="password" class="form-control" id="new_password" aria-describedby="password"
                                                    placeholder="New password" name="password" required/>
                                            </div>
                                            <div class="card_section col-12">
                                                <label for="confirm_password">Confirm new password</label>
                                                <input type="password" class="form-control" id="confirm_password" aria-describedby="confirm_password"
                                                    placeholder="Confirm new password" name="confirm_password" required/>
                                            </div>
                                            <div class="col-12 col-sm-6">
                                                <button id="changePasswordButton" type="submit" class="btn btn-primary">Send</button>
                                            </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingThree">
                                    <button class="btn btn-link collapsed" data-toggle="collapse"
                                        data-target="#collapseThree" aria-expanded="false"
                                        aria-controls="collapseThree">
                                        <h5 class="collapse_title">Delete account</h5>
                                    </button>
                            </div>
                            <div id="collapseThree" class="collapse" aria-labelledby="headingThree"
                                data-parent="#accordion">
                                <div class="card-body">
                                    <h5 class="delete_confirm">Are you sure you want to delete this account?</h5>
                                    <button id="deleteAccountButton" type="submit" class="btn btn-primary">Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="user_info">
                    <h5 id="account_type">Account type: </h5>
                </div>
            </div>
        </div>
    </div>

    <!------------------------------ CONTENT ------------------------------>

    <footer id="footer"></footer>
    <script src="js/jquery.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/analytics.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@7.25.0/dist/sweetalert2.all.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/promise-polyfill@7.1.0/dist/promise.min.js"></script>
    <script src="js/main.js"></script>
    <script src="js/profile.js"></script>
</body>

</html>