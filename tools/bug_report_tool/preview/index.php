<!doctype html>
<html>

<head>
    <title>WebSoft365 - Bug report tool</title>
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
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <link rel="stylesheet" href="/css/font-awesome.min.css">
    <!-- Own CSS -->
    <link rel="stylesheet" href="css/index.css">
</head>
<body>
  <a href="#" class="float_button float websoft_reportBug" id="float-1" style="display:none">
  Bug report/feedback
  </a>
  <div id="float-1-modal" class="m_modal modal">
  <!-- Modal content -->
  <div class="modal-content">
    <div class="modal-header">
      <h4 class="report_modal_title">Bug report/feedback</h4>
      <span class="close">&times;</span>
    </div>
    <div class="modal-body">
      <div class="modal_base_wrapper">
        <p class="report_modal_text">Have you found a bug or do you have any comments/suggestions about this site?</p>
        <a class="modal-button report_modal_button_1 create_report_screenshot" id="create_report_screenshot"><img src="/assets/Camera-2-icon.png">Bug report</a>
        <a class="modal-button report_modal_button_2 openFeedback"><img src="/assets/Align-JustifyLeft-icon.png">Feedback</a>
        <div class="powered_by">
          <h6>FREE Bug report/Feedback tool!</h6>
          <h6>Powered by <a href="https://websoft365.com/index.php?tool=bug_report_feedback_tool_free" target="_blank">WebSoft365.com</a></h6>
        </div>
      </div>
      <div class="modal_feedback_wrapper feedback_wrapper_float1">
        <form class="bugReportFeedbackForm">
          <div class="form-group">
            <textarea class="form-control" id="comment_field" placeholder="Write your comment here..." rows="3"></textarea>
          </div>
          <div class="form-group">
            <input type="text" class="form-control" id="name_field" placeholder="Enter name">
          </div>
          <div class="form-group">
            <input type="email" class="form-control" id="email_field" placeholder="Enter email">
          </div>
            <button type="submit" id="bugReportFeedbackSubmit" class="btn btn-primary" style="width:100%">Submit</button>
        </form>
        <div class="powered_by">
            <h6>FREE Bug report/Feedback tool!</h6>
            <h6>Powered by <a href="https://websoft365.com/index.php?tool=bug_report_feedback_tool_free" target="_blank">WebSoft365.com</a></h6>
          </div>
      </div>
    </div>
  </div>
  </div>
  <div id="float-2-modal" class="m_modal modal2">
  <div class="modal-content">
    <div class="modal-header">
      <h4 class="report_modal_title">Bug report/feedback</h4>
      <span class="close">&times;</span>
    </div>
    <div class="modal-body">
      <div class="modal_base_wrapper">
        <p class="report_modal_text">Have you found a bug or do you have any comments/suggestions about this site</p>
        <div class="row">
          <div class="col-6 float2_button_container">
            <a class="report_modal_button_1 modal-button create_report_screenshot"><img src="/assets/Camera-2-icon.png">Bug report</a>
            <a class="report_modal_button_2 modal-button openFeedback"><img src="/assets/Align-JustifyLeft-icon.png">Feedback</a>
            </div>
            <div class="col-6">
            <div class="powered_by">
              <h6>FREE Bug report/Feedback tool!</h6>
              <h6>Powered by <a href="https://websoft365.com/index.php?tool=bug_report_feedback_tool_free" target="_blank">WebSoft365.com</a></h6>
            </div>
          </div>
        </div>
      </div>
      <div class="modal_feedback_wrapper top_feedback_wrapper">
        <form class="bugReportFeedbackForm">
          <div class="row">
            <div class="col-6 top_comment_wrapper">
              <div class="form-group">
                <textarea class="form-control comment_field_top" id="comment_field" placeholder="Write your comment here..." rows="3"></textarea>
              </div>
            </div>
            <div class="col-6 top_text_wrapper">
              <div class="form-group">
                <input type="text" class="form-control name_field_top" id="name_field" placeholder="Enter name">
              </div>
              <div class="form-group">
                <input type="email" class="form-control email_field_top" id="email_field" placeholder="Enter email">
              </div>
              <button type="submit" id="bugReportFeedbackSubmit" class="btn btn-primary" style="width:100%">Submit</button>
            </div>
          </div>
        </form>
        <div class="powered_by backlink_top_wrapper">
          <h6>FREE Bug report/Feedback tool! Powered by <a href="https://websoft365.com/index.php?tool=bug_report_feedback_tool_free" target="_blank">WebSoft365.com</a></h6>
        </div>
      </div>
    </div>
  </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.5.0.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js" type="text/javascript"></script>
  <script src="js/index.js" type="module"></script>
</body>
</html>