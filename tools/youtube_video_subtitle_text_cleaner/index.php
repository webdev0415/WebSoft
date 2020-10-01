<?php
if (!empty($_POST['text'])) {
  $arr = explode("\n", $_POST['text']);
  $new_arr = [];
  foreach ($arr as $line) {
    if (!preg_match("/[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}\./", $line) && !empty($line)) {
      $new_arr[] = $line;
    }
  }
}

?>

<html>
<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link href="css/jquery-ui.min.css" rel="stylesheet">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrap-colorpicker.min.css" rel="stylesheet">
    <link href="css/bootstrap-formhelpers.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css"
        integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossorigin="anonymous">
  <link rel="stylesheet" href="../../css/main.css">
  <link rel="stylesheet" href="css/style.css">

  <!-- forum_head -->
  <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
  <style>
    #input_file{
        display:none;
    }
  </style>
</head>
<body>
  <div id="wrapper">
  <div id="reportField"></div>
  <div id="page-content-wrapper">
  <div id="youtube_video_subtitle" class="tool_page">
  <div class="row">
    <div class="col-12 col-sm-3 instructions">
    <h6> Instructions:</h6>  
    <ul>
      <li>Go to your YouTube channel.</li>
      <li>Go to YouTube Studio.</li>
      <li>Go to Videos.</li>
      <li>Click on any video.</li>
      <li>Click on Subtitles.</li>
      <li>Download the automatic Subtitle.</li>
      <li>Load it to the cleaner and click Submit.</li>
      <li>Copy the result and add it to your video description.</li>
    </ul>
    </div>
    <div class="col-12 col-sm-9 tool_form">
    <div class="row">
      <div class="col-12">
        <h2>YouTube Subtitle Text Cleaner</h2>
        <h5>You can paste the YouTube Subtitle text to the form or you can load from your local drive.</h5>
      </div>
    </div>
    <form method="post">
    <div class="row">
      <div class="col-12 p-2">
        <textarea class="form-control" id="content-target" rows="10" name="text" placeholder="0:00:29.190,0:00:35.129
well analyzing all of the data all of
0:00:32.820,0:00:40.670
the figures and taking a look and see
0:00:35.129,0:00:44.219
or BTC could end up him predicts that in
0:00:40.670,0:00:53.519
2022 it is possible that one Bitcoin
"><?php echo (!empty($_POST['text'])) ? htmlentities($_POST['text']) : null;?></textarea>
      </div>
      <div class="col-12">
      <h6>You can paste the YouTube Subtitle text or load a .sbv or .txt file</h6>
      </div>
        <div class="col-12 p-2">
        <input type="submit" class="btn btn-success">
        <div class="btn-group">
        <!-- Reference buttons -->
        <input type="file" id="input_file" name="file" accept=".txt,.sbv">
         <!-- Used buttons -->
        <button type="button" class="btn btn-primary" onclick="document.getElementById('input_file').click();" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Load from file
          </button>
        </div>
        <button type="button" class="btn btn-danger" id="clear_field">Clear</button>
        <div id="file-list"></div>
      </div>
    </div>
    </form>
    <?php if (!empty($new_arr)) {  ?>
      <div class="row">
        <div class="col-12">
          <h2>Result</h2>
        </div>
        <div class="col-12">
            <textarea class="form-control" rows="10" placeholder="" value="" id="result_text"><?php echo implode($new_arr);?></textarea>
        </div>
        <div class="col-12">
        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="remove_lines"
                                                required>
                                            <label class="custom-control-label" for="remove_lines">Remove empty lines</label>
                                        </div>
        </div>
        <div class="col-12">
        <button type="button" class="btn btn-warning" id="copy_result">Copy to clipboard</button>
        <div class="btn-group">
        <button type="button" class="btn btn-primary" id="upload_local_drive" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Save
          </button>
        </div>
        </div>
      </div>
    </div>
    </div>
    </div>
      <?php
    }
    ?>
  </div>
  </div>
  <script src="/js/jquery.min.js"></script>
  <script src="/js/popper.js"></script>
  <script src="/js/bootstrap.min.js"></script>
  <script src="/js/dist/sweetalert2.all.min.js"></script>
  <script src="index.js"></script>
</body>
</html>
