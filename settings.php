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
    <title>WebSoft365.com - Settings - </title>
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
    <div id="navigation"></div>

    <!------------------------------ CONTENT ------------------------------>
    <div id="settings" class="content">
        <div class="row" id="settings_row">
            <div class="col-12 col-sm-6 settings_wrapper copy_texts_card">
                <div class="settings_inner">
                    <div class="form-group code_text">
                        <label for="copyCode">Simply copy code snippet below and paste it into your site just before closing &lt;/body&gt; tag.<br> This code will make all chosen software tools visible on your website.</label>
                        <textarea class="form-control copy_input" id="copyCode" rows="3"><!-- WebSoft365 Bug report tool & Feedback tool code start -->&#13;&#10;<script type='text/javascript' src='https://websoft365.com/tools/bug_report_tool/main/index.php'></script>&#13;&#10;<!-- WebSoft365 Bug report tool & Feedback tool code end --></textarea>
                        <button type="button" class="btn btn-warning btn-sm" id="copy_text_btn">Copy</button>
                    </div>
                    <div class="form-group copy_privacy_text">
                        <label for="copyPrivacyText">It's highly recommended to copy and paste the below information into your website's Privacy Policy / Cookies Policy page.</label>
                        <textarea class="form-control copy_input" id="copyPrivacyText" rows="3">We use WebSoft365.com software tools on our website. Their services use cookies to identify and track visitors to provide better service. Their cookie policy can be found at: https://websoft365.com/privacy_policy.php</textarea>
                        <button type="button" class="btn btn-warning btn-sm" id="copy_privacy_text_btn">Copy</button>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 settings_wrapper domains_card">
                <div class="settings_inner">
                    <h3>Add your domain names to WebSoft365.com</h3>
                    <hr>
                    <h5>Some of the software and tools in the webmaster category will be limited to these domain names.
                    </h5>
                    <form id="domainsForm">
                        <div class="domains">
                        <label for="domain1" class="domain_label1">1. Domain</label>
                            <div class="row">
                                <div class="col-4 col-sm-3 select_wrapper">
                                      <select class="form-control select_protocol" protocol="lol">
                                        <option>https://</option>
                                        <option>http://</option>
                                      </select>
                                  </div>
                                  <div class="col-8 col-sm-9 domain_name_wrapper">
                                    <input class="form-control" id="domain1" aria-describedby="domain1" name="domain1"
                                        placeholder="Domain Name" /><button class="btn btn-danger delete_domain" type="button" id="domain1_delete">Delete</button>
                                </div>
                            </div>
                        </div>
                    </form>
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
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
    <script src="https://cdn.jsdelivr.net/npm/promise-polyfill@7.1.0/dist/promise.min.js"></script>
    <script src="js/main.js"></script>
    <script src="js/settings.js"></script>
</body>

</html>