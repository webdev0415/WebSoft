<?php
session_start();
if(!$_SESSION['member_logged_in']) {
    header("Location: https://websoft365.com/tools/bug_report_tool/team_members/login.php");   
}
?>
<html>
    <head>
        <title>Bug Report Tool - Team member access</title>
        <!-- Favicon -->
        <link rel="apple-touch-icon" sizes="57x57" href="/assets/icons/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/assets/icons/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/assets/icons/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/icons/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/assets/icons/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/assets/icons/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/assets/icons/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/icons/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192" href="/assets/icons/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/assets/icons/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png">
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="/css/bootstrap.min.css">
        <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
        <link href="css/index.css" rel="stylesheet">
        <script src="js/jscolor.js"></script>
        <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.21/datatables.min.css"/>
    </head>
    <body>
        <div id="navigation"></div>
        <div id="bug_report_tool_setup">
            <h2>Bug report tool & Feedback tool</h2>
            <div class="row">
                <div class="col-7 button_container">
                    <div class="bug_report_button" id="email_alert_settings">
                        <h4>Email alert settings</h4>
                        <hr>
                        <div class="form-group emailAlertWrapper">
                           <label for="emailAlertOption">How often would you like to receive email alerts?</label>
                           <select class="form-control" id="emailAlertOption">
                              <option value="everytime">I want to receive separate email alerts on every new bug report.</option>
                              <option value="daily">I want to receive an email alert once a day with all new reports.</option>
                              <option value="never">I don't want to receive email alerts. I will check the reports myself by logging into the software.</option>
                           </select>
                           <button class="btn btn-primary" id="setEmailSendingButton">Save</button>
                        </div>
                    </div>
                </div>
                <div class="col-5 button_container">
                    <div class="bug_report_button" id="reports_btn">
                        <h4>Reports</h4>
                        <hr>
                        <div id="reports_content">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Open</th>
                                    <th>Closed</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="report_tbody">
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
            </div>
                        <div id="report_modal" class="modal">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 id="report_page_title">Bug reports</h4>
                                    <span class="close close_report_modal" style="margin-left:0px!important;">&times;</span>
                                </div>
                                <div class="modal-body">
                                    <table id="reportList">
                                        <thead>
                                        <tr>
                                            <td><input type="checkbox" id="checkAllReports"></td>
                                            <td>Nr.</td>
                                            <td></td>
                                            <td>Created</td>
                                            <td>Updated</td>
                                            <td>Status</td>
                                            <td>Actions</td>
                                        </tr>
                                        </thead>
                                        <tbody id="reportListBody">
                                        
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
        </div>
        <footer id="footer"></footer>
    <script src="/js/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
    <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.21/datatables.min.js"></script>
    <script src="js/index.js"></script>
    </body>
</html>