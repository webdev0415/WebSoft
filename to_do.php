<?php
session_start();
if ($_SESSION['logged_in'] != true) {
    header("Location: /index.php");
}
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
    <!-- Main Quill library -->
    <script src="//cdn.quilljs.com/1.3.6/quill.js"></script>
    <script src="//cdn.quilljs.com/1.3.6/quill.min.js"></script>
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <!-- Theme included stylesheets -->
    <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    <link href="//cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet">
    <!-- Own CSS -->
    <link rel="stylesheet" href="css/main.css">
</head>

<body>
    <?php include "embed_body.php"; ?>
    <div id="navigation"></div>

    <!------------------------------ CONTENT ------------------------------>
    <div id="to_do" class="content">
    <?php include "components/admin_header.php"; ?>
        <div id="to_do_content">
        <div id="notes_container">
        <div id="users"></div>
            <div class="row">
                <div class="col-5" style="margin-bottom: 3vh;">
                    <div class="form-group">
                                <label for="title">Title</label>
                                <input class="form-control" id="title">
                            </div>
                            <div class="form-group">
                                <label for="note_text">Content</label>
                                <div id="#toolbar"></div>
                                <div id="note_text" style="height:25vh"></div>
                            </div>
                            <div style="text-align:center;">
                                <button id="notes_button" type="submit" class="btn btn-primary">Save</button>
                            </div>
                    </div>
                    <div class="col-7" id="to_dos">
                        <div class="add_wrapper">
                            <ul id="to_do_list">
                            </ul>
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
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="js/main.js"></script>
    <script src="js/to_do.js"></script>
</body>

</html>