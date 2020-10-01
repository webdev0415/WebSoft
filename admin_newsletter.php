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
    <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>
    <script>
    tinymce.init({
        selector: 'textarea#editor',
        menubar: false
    });
    </script>
</head>

<body>
    <?php include "embed_body.php"; ?>
    <div id="navigation"></div>

    <!------------------------------ CONTENT ------------------------------>
    <div id="admin_newsletter" class="content">
    <?php include "components/admin_header.php"; ?>
        <div class="admin_body">
            <h4>Newsletter</h4>
            <h6>You can add &#60;realname&#62; placeholder which will be replaced to the user's name</h6>
            <form id="sendNewsLetter">
                <div class="form-group">
                    <label for="email_subject">Subject</label>
                    <input type="text" class="form-control" id="email_subject" aria-describedby="emailHelp" required>
                </div>
                <div class="form-group">
                    <textarea id="editor"></textarea>
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="free_users" group="FREE">
                    <label class="form-check-label" for="free_users">FREE</label>
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="monthly_pro_users" group="PRO_MONTHLY">
                    <label class="form-check-label" for="monthly_pro_users">Monthly Pro</label>
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="yearly_pro_users" group="PRO_YEARLY">
                    <label class="form-check-label" for="yearly_pro_users">Yearly Pro</label>
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="monthly_super_pro_users" group="SUPER_PRO_MONTHLY">
                    <label class="form-check-label" for="monthly_super_pro_users">Monthly Super Pro</label>
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="yearly_super_pro_users" group="SUPER_PRO_YEARLY">
                    <label class="form-check-label" for="yearly_super_pro_users">Yearly Super Pro</label>
                </div>
                <div class="form-group test_email_group">
                    <input type="email" class="form-control" id="test_email" aria-describedby="emailHelp" placeholder="Test email address">
                    <button type="button" class="btn btn-warning" id="send_test_email">Send Test</button>
                </div>
                <div class="form-group">
                    <label for="packet_size">Email's packet size (Emails/minute)</label>
                    <input class="form-control small_number" id="packet_size" aria-describedby="emailHelp" placeholder="Packet size" required>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary" id="submit_email">Submit</button>
                </div>
            </form>
        </div>
        
        <!------------------------------ CONTENT ------------------------------>

        <footer id="footer"></footer>
        <script src="js/jquery.min.js"></script>
        <script src="js/popper.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/analytics.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@7.25.0/dist/sweetalert2.all.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/promise-polyfill@7.1.0/dist/promise.min.js"></script>
        <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.js"></script>
        <script src="js/main.js"></script>
        <script src="js/admin_newsletter.js"></script>
</body>

</html>