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
    <div id="admin_upload" class="content">
    <?php include "components/admin_header.php"; ?>
        <div class="admin_upload_body">
            <h4>Upload Upcoming Tool</h4>
            <form id="tool-input">
                <div class="row">
                    <div class="col-12 col-lg-3 upload_section">
                            <div id="canvas_container">
                                <canvas id="toolCanvas"></canvas>
                            </div>
                            <input type="file" id="tool_pic" name="file" accept="image/*" style="display: none;">
                            <input type="button" class="btn btn-primary select_img" value="Browse..." onclick="document.getElementById('tool_pic').click();" />
                    </div>
                    <div class="col-12 col-lg-9 info">
                        <div class="new_tool_container">
                                <div class="form-group">
                                    <label for="toolName">Name</label>
                                    <input class="form-control" id="toolName"
                                        aria-describedby="toolName" placeholder="Tool's Name">
                                </div>
                                <div class="form-group">
                                    <label for="toolDesc">Description</label>
                                    <textarea class="form-control" id="toolDesc" rows="6"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="toolKey">Keywords (comma separated)</label>
                                    <input class="form-control" id="toolKey"
                                        aria-describedby="toolKey" placeholder="Keywords">
                                </div>
                                <div class="form-group">
                                    <label for="toolFolder">Folder Location</label>
                                    <div class="row">
                                        <div class="col-9">
                                            <input class="form-control" id="toolFolder"
                                            aria-describedby="toolFolder" placeholder="Path">
                                        </div>
                                        <div class="col-3" id="pendingContainer">
                                            <input class="form-check-input" type="checkbox" value="" id="pending_status">
                                            <label class="form-check-label" for="pending_status">
                                            Pending
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="toolVideo">Video</label>
                                    <input class="form-control" id="toolVideo"
                                        aria-describedby="toolVideo" placeholder="URL">
                                </div>
                                <div class="row">
                                    <div class="col-2">
                                        <button type="submit" class="btn btn-primary submitTool">Submit</button>
                                    </div>
                                    <select class="form-control form-control-sm col-2" id="selectPlatform">
                                    <option>Desktop</option>
                                    <option>Mobile</option>
                                    <option>Desktop & Mobile</option>
                                    </select>
                                    <div class="col-2 form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="category_webmaster">
                                        <label class="form-check-label" for="category_webmaster">
                                        Webmaster
                                        </label>
                                    </div>
                                    <div class="col-2 form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="category_social">
                                        <label class="form-check-label" for="category_social">
                                        Social Media
                                        </label>
                                    </div>
                                    <div class="col-2 form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="category_business">
                                        <label class="form-check-label" for="category_business">
                                        Business
                                        </label>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="row">
            <div class="col-4 toolStateContainer activeToolListContainer">
                <h5>Ready Tools</h5>
                <div id="activeToolList" class="row"></div>
            </div>
            <div class="col-4 toolStateContainer activeToolListContainer">
                <h5>Pending</h5>
                <div id="pendingToolList" class="row"></div>
            </div>
            <div class="col-4 toolStateContainer">
                <h5>Upcoming Tools</h5>
                <div id="toolList" class="row"></div>
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
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.js">
    </script>
    <script src="js/main.js"></script>
    <script src="js/admin_upload.js"></script>
</body>

</html>