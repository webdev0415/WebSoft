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
    <div id="admin" class="content">
        <?php include "components/admin_header.php"; ?>
        <div class="admin_body">
            <h4>User management</h4>
            <div id="filters" class="row">
                <div class="col-12 col-sm-6">
                    <label for="search_field">Search field</label>
                    <input class="form-control" id="search_field" aria-describedby="search_field" placeholder="Search for user..." />
                </div>
                <div class="col-12 col-sm-6">
                    <label for="order_by">Order by</label>
                    <select class="form-control" id="order_by">
                        <option value="userid">User ID</option>
                        <option value="firstname">Firstname</option>
                        <option value="lastname">Lastname</option>
                        <option value="email">Email address</option>
                        <option value="sub_id">Subscription ID</option>
                    </select>
                </div>
                <div class="col-12 col-sm-6">
                    <label for="sort_order">Sort Order</label>
                    <select class="form-control" id="sort_order">
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                </div>
                <div class="col-12 col-sm-6">
                    <label for="user_group">User Group</label>
                    <select class="form-control" id="user_group">
                        <option value="ALL">All groups</option>
                        <option value="FREE">Free members</option>
                        <option value="PRO_MONTHLY">PRO Members(Monthly)</option>
                        <option value="PRO_YEARLY">PRO Members(Yearly)</option>
                        <option value="SUPER_PRO_MONTHLY">SUPER PRO Members(Monthly)</option>
                        <option value="SUPER_PRO_YEARLY">SUPER PRO Members(Yearly)</option>
                        <option value="ADMIN">Admins</option>
                    </select>
                </div>
            </div>
            <div id="user_list">
                <table class="table" id="user_table">
                    <thead>
                        <tr>
                            <th>Userid</th>
                            <th>Image</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Subscription ID</th>
                            <th class="group">Group</th>
                            <th>Created</th>
                            <th>Last login</th>
                        </tr>
                    </thead>
                    <tbody id="table_body">
                    </tbody>
                </table>
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
        <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.js"></script>
        <script src="js/main.js"></script>
        <script src="js/admin.js"></script>
</body>

</html>