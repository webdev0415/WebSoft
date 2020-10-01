<?php
session_start();
if ($_SESSION['group_type'] != "ADMIN") {
    header("Location: /index.php");
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
    <div id="profile_admin" class="content">
        <div class="row">
            <div class="col-12 col-lg-3">
                <div id="canvas_container">   
                        <canvas id="profileCanvas"></canvas>
                </div>
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
                <div id="accordionAdmin">
                    <h1 id="admin_area_title">Admin area</h1>
                        <div class="card">
                            <div class="card-header" id="headingOneAdmin">
                                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOneAdmin"
                                        aria-expanded="false" aria-controls="collapseOneAdmin">
                                        <h5 class="collapse_title group_type">Group type</h5>
                                    </button>
                            </div>

                            <div id="collapseOneAdmin" class="collapse" aria-labelledby="headingOne"
                                data-parent="#accordionAdmin">
                                <div class="card-body">
                                    <form action="" id="changeGroupType">
                                        <div class="row">
                                            <div class="card_section col-12">
                                                <label for="changeMembership">Change User's Membership</label>
                                                <select class="form-control" id="changeMembership">
                                                <option>FREE Member</option>
                                                <option>PRO Member (Monthly)</option>
                                                <option>PRO Member (Yearly)</option>
                                                <option>SUPER PRO Member (Monthly)</option>
                                                <option>SUPER PRO Member (Yearly)</option>
                                                </select>
                                            </div>
                                            <div class="col-12 col-sm-6 grouptype_button">
                                                <button id="changeGrouptypeButton" type="submit" class="btn btn-primary">Send</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header" id="headingTwoAdmin">
                                    <button class="btn btn-link collapsed" data-toggle="collapse"
                                        data-target="#collapseTwoAdmin" aria-expanded="false" aria-controls="collapseTwoAdmin">
                                        <h5 class="collapse_title" id="sub_id">Subscription ID:</h5>
                                    </button>
                            </div>
                            <div id="collapseTwoAdmin" class="collapse" aria-labelledby="headingTwo"
                                data-parent="#accordionAdmin">
                                <div class="card-body">
                                <form action="" id="changeSubId">
                                    <div class="row">
                                        <div class="card_section col-12">
                                            <label for="new_subid">Change Subscription ID</label>
                                            <input class="form-control" id="new_subid" aria-describedby="new_subid"
                                                placeholder="New Subscription ID" name="subid" required/>
                                        </div>
                                        <div class="col-12 col-sm-6">
                                            <button id="changeSubidButton" type="submit" class="btn btn-primary">Send</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingThreeAdmin">
                                    <button class="btn btn-link collapsed" data-toggle="collapse"
                                        data-target="#collapseThreeAdmin" aria-expanded="false"
                                        aria-controls="collapseThreeAdmin">
                                        <h5 class="collapse_title" id="exp_date">Expiration date:</h5>
                                    </button>
                            </div>
                            <div id="collapseThreeAdmin" class="collapse" aria-labelledby="headingThreeAdmin"
                                data-parent="#accordionAdmin">
                                <div class="card-body">
                                <form action="" id="changeExpDate">
                                    <div class="row">
                                        <div class="card_section col-12">
                                            <label for="new_expdate">Change Expiration Date</label>
                                            <input class="form-control" id="new_expdate" aria-describedby="new_expdate"
                                                placeholder="New Expiration Date" name="expdate" required/>
                                        </div>
                                        <div class="col-12 col-sm-6">
                                            <button id="changeExpdateButton" type="submit" class="btn btn-primary">Send</button>
                                        </div>
                                    </div>
                                </form>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingFourAdmin">
                                    <button class="btn btn-link collapsed" data-toggle="collapse"
                                        data-target="#collapseFourAdmin" aria-expanded="false"
                                        aria-controls="collapseFourAdmin">
                                        <h5 class="collapse_title">Suspend user</h5>
                                    </button>
                            </div>
                            <div id="collapseFourAdmin" class="collapse" aria-labelledby="headingFourAdmin"
                                data-parent="#accordion">
                                <div class="card-body">
                                    <form action="" id="suspendUser">
                                        <h5 class="suspend_confirm">Are you sure you want to suspend this unser?</h5>
                                        <button id="suspendUserButton" type="submit" class="btn btn-primary">Yes</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div id="to_do_access_container">
                        <div class="form-group ta-center">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="to_do_access">
                                <label class="custom-control-label" for="to_do_access">To-do list access</label>
                                <button type="button" class="btn btn-primary to_do_access_submit">Submit</button>
                            </div>
                        </div>
                </div>
                <div id="notes_container">
                    <h1 id="notes_title">Notes</h1>
                    <form id="notesForm">
                        <div class="form-group">
                            <textarea class="form-control" id="note_text" rows="6"></textarea>
                            <button id="notes_button" type="submit" class="btn btn-primary">Save</button>
                        </div>
                        <hr>
                    </form>
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
    <script src="js/profile_admin.js"></script>
</body>

</html>