<?php

// downloading file from url
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['url']))
{
    $url = $_POST['url'];
    if(!filter_var($url, FILTER_VALIDATE_URL)) {
      header('Content-Type: application/json');
      echo json_encode(['message' => 'invaild download url']);
      exit();
    }

    $filename = strtok(basename($url), '?');
    file_put_contents($filename, file_get_contents($url));

    if (file_exists($filename)) {
      $mime = mime_content_type($filename);
      $file = file_get_contents($filename);
      unlink($filename);
      header("Content-Type: $mime");
      echo $file;
      exit;
    }
}


if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
  // $subDir = "/uploads/";
   $uploadDir = "uploadsforimage";
  if(!is_dir($uploadDir)) {
     $oldmask = umask(0);
     mkdir($uploadDir, 0777);
     umask($oldmask);
  }
  //   echo json_encode(['message1'=>is_dir($uploadDir)]);
  // echo json_encode(['message'=>chmod($uploadDir, 0777)]);
  // exit;

  $tmpName = $_FILES['image']['tmp_name'];
  $fileName = $_FILES['image']['name'];
  $fileSize = $_FILES['image']['size'];
  $fileType = $_FILES['image']['type'];
  $fileNameCmps = explode("/", $fileType);
  $fileExtension = strtolower(end($fileNameCmps));

  $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
  $dest_path = $uploadDir . "/". $newFileName;
  // echo json_encode(['message'=>$dest_path]);
  // exit;

  $allowedfileExtensions = array('jpg', 'gif', 'png', 'jpeg', 'JPEG', 'BMP', 'bmp', 'eps', 'EPS', 'ICO', 'SVG', 'ico', 'svg', 'TGA', 'tga', 'tiff', 'TIFF', 'WEBMP', 'webmp', 'webp', 'WEBP');
  if (in_array($fileExtension, $allowedfileExtensions)) {

    header('Content-Type: application/json');
    if(move_uploaded_file($tmpName, $dest_path)) {
      echo json_encode([
        'path' => $_SERVER['HTTP_HOST'].'/'.$dest_path,
        'filename' => $newFileName
      ]);
      exit;
    } else {

      echo json_encode(['message' => 'image upload failed']);
      exit;
    }

  } else {
    header('Content-Type: application/json');
    echo json_encode(['message' => 'image format not supported '.$fileType.' '.$fileName]);
    exit;
  }

}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Image Resizer Tools</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"> 
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="./style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.5.0/css/all.min.css" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
</head>
<body>

<div class="top-bar">
  
  <div class="container1">
    <div class="text">
        <div class="alert alert-info">
          Desktop and laptop version has much more functions
        </div>
    </div>  <!-- Nav tabs -->
      <div class="upload_box col-md-12 col-xs-12" id="upload_box">
          <form class="upload_button" id="upload_button" action="javascript:void(0);" data-url="" method="post" enctype="multipart/form-data">
            <input class="hidden" id="inpFile" type="file" name="file" />
            <div class="dropnotes">
              <i class="fa fa-cloud-upload-alt fa-5x" style="font-size: 3rem;"></i>
              <span class="w-100 d-inline-block" style="font-size: 14px;">
                Drop Files here
              </span>
              <span id="fileUploadButton" class="btn btn-default choose_omit" title="Upload a file from your device" style="font-size: 14px;margin-top: 10px;">
                <i class="fa fa-search"></i>
                Choose File
              </span>
            </div>
            <div class="fileuplodButtom">
              <!-- <a href="javascript:void(0)" id="remoteURL_modal"> <i class="fa fa-link"></i> Enter URL</a> -->
              <a href="javascript:void(0)" onclick="showDropBoxPicker(event)" class="final_omit"> <i class="fab fa-dropbox"></i> Dropbox</a>
              <a href="javascript:void(0)" onclick="showGDrivePickerDialog(event)" class="google_omit"> <i class="fab fa-google-drive"></i> Google Drive</a>
              <!-- <a href="javascript:void(0)" onclick="launchOneDrivePicker(event)" class="omit"> <i class="fas fa-cloud" aria-hidden="true"></i> One Drive</a> -->
            </div>
          </form>
      </div>
      <div class="modal" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
            
              <!-- Modal Header -->
              <div class="modal-header">
                <h4 class="modal-title">From URL</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              
              <!-- Modal body -->
              <div class="modal-body">
                <input type="text" name="remoteURL" class="form-control"   id="remoteURL" placeholder="https://example.com/sample.png">
              </div>
              
              <!-- Modal footer -->
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="importURL()" data-dismiss="modal">Import</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
              </div>
              
            </div>
          </div>
      </div>
      <button class="btn btn-primary mb-2" id="full_size" onclick="FullSizeImg()">View full size image</button>
      <span id="full_size_text" style="font-size: 1.5rem;letter-spacing: 1px;padding-left: 1rem;"></span>
      <span id="file_name_text" style="font-size: 1.2rem;padding-left: 3rem;"></span>
      <button class="btn btn-primary mb-2" id="change_file_name">Rename</button>
      <div class="row pb-3">
        <div class="image-preview col-md-7 col-sm-12 col-xs-12" id="imagePreview">
          <div class="lds-roller">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          </div>
          <img src="" alt="Image Preview" id="image_preview_image" class="image_preview_image" />
          <span class="image_preview__default_text">Image Preview</span>

        </div>

        <div class="tab-content col-md-5 col-sm-12 col-xs-12" style="padding-left: 0;padding-right: 0;">
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#resize">Resize</a>
          </li>
          <li class="nav-item final_omit">
            <a class="nav-link" data-toggle="tab" href="#compress">Compress</a>
          </li>
          <li class="nav-item omit">
            <a class="nav-link" data-toggle="tab" href="#filter">Filter & Convert to JPG</a>
          </li>
          <li class="nav-item omit">
            <a class="nav-link" data-toggle="tab" href="#scalable-resize">Scalable Resize</a>
          </li>
          <li class="nav-item choose_omit">
            <a class="nav-link" data-toggle="tab" href="#social-resize">Social Resize</a>
          </li>
        </ul>
          <div class="image-settings container tab-pane active" id="resize">
            <div class="card">
              <div class="card-header">Settings</div>
              <div class="card-body">
                <div class="setting-item mb-3">
                  <p>Change Size:</p>
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="input-group mb-3">
                        <input type="number" class="form-control" placeholder="width" name="width_size" id="width_size" onchange="changeWidth()">
                        <div class="input-group-append">
                          <span class="input-group-text" id="width_unit">px</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="input-group mb-3">
                        <input type="number" class="form-control" placeholder="height" name="height_size" id="height_size" onchange="changeHeight()">
                        <div class="input-group-append">
                          <span class="input-group-text" id="height_unit">px</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12">
                      
                      <div class="form-group">
                        <select class="form-control" id="unit_select" value="px" onchange="selectUnit()">
                          <option value="px">px</option>
                          <option value="cm">cm</option>
                          <option value="mm">mm</option>
                          <option value="in">in</option>
                          <option value="pt">pt</option>
                          <option value="pc">pc</option>
                        </select>
                      </div> 
                    </div>
                  </div>
                </div>
                <div class="setting-item mb-3">
                  <p>File Extension: </p>
                  <div class="row">
                    
                    
                    <div class="col-sm-12">
                      
                      <div class="form-group">
                      <select class="form-control" id="format_select" value="png" onchange="selectFormat()">
                        <option value="png">PNG</option>
                        <option value="bmp">BMP</option>
                        <option value="eps">EPS</option>
                        <option value="gif">GIF</option>
                        <option value="ico">ICO</option>
                        <option value="svg">SVG</option>
                        <option value="tga">TGA</option>
                        <option value="tiff">TIFF</option>
                        <option value="wbmp">WBMP</option>
                        <option value="webp">WebP</option>
                        <option value="jpg">JPG</option>
                      </select>
                    </div> 
                    </div>
                  </div>
                </div>
                <a href="javascript:void(0)" class="dropbox-saver" id="saveDropBox" style="display: none">
                </a>
                <div class="btn-group google_omit" style="float: right;" id="myDropDown">
                  <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                  Save to 
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="javascript:void(0)" onclick="downloadImg()"> Local Drive</a>
                    <a class="dropdown-item" href="javascript:void(0)" onclick="uploadToDropBox()"> DropBox</a>
                    <a class="dropdown-item" href="javascript:void(0)" onclick="uploadImgToGoogle()" id="googleDriveUploadButton"> Google Drive</a>
                    <!-- <div id="savetodrive-div" class="ml-4 btn">
                      <div class="loader">Loading...</div>
                    </div> -->
                    <!-- <a class="dropdown-item" href="javascript:void(0)" onclick="uploadImgToOneD()">One Drive</a> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="image-settings container tab-pane fade" id="compress">
            <div class="card">
              <div class="card-header">Settings</div>
              <div class="card-body">
                <div class="setting-item mb-3">
                  <label>Taget Format: </label>
                  <div class="row">
                    <div class="col-sm-12">
                      
                      <div class="form-group">
                      <select class="form-control" id="compress_format_select" value="jpeg" onchange="selectCompressFormat()">
                        <option value="jpeg">JPG</option>
                        <option value="webp">WebP</option>
                        
                      </select>
                    </div> 
                    </div>
                  </div>
                </div>
                <div class="setting-item mb-3">
                  <label>Compression: </label>
                  <div class="row">
                    <div class="col-sm-12">
                      
                      <div class="form-group">
                      <select class="form-control" id="compress_level_select" value="1" onchange="selectLevel()">
                        <option value="">None</option>
                        <option value="0.8">Low</option>
                        <option value="0.6">Medium</option>
                        <option value="0.4">High</option>
                        <option value="0.2">Best</option>
                      </select>
                      </div> 
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card mt-3">
              <div class="card-header">Optioanl Settings</div>
                <div class="setting-item mb-3 mt-3">  
                  <div class="row">
                    <div class="col-sm-11 rangewrap">
                      <div class="form-group">
                      <input type="range" class="custom-range form-control" min="0" max="100" step="5" id="customRange3" onchange="rangechange()">
                    </div>
                    <p><span>Best compression</span><span style="float:right;">Best quality</span></p>
                  </div>
                </div>
              </div>  
            </div>
            <a href="javascript:void(0)" class="dropbox-saver" id="saveDropBox" style="display: none">
            </a>
                <div class="btn-group google_omit mt-3" style="float: right;">
                  <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                  Save to 
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="javascript:void(0)" onclick="downloadCompressImg()">Local Drive</a>
                    <a class="dropdown-item" href="javascript:void(0)" onclick="uploadToDropBox()">DropBox</a>
                    <a class="dropdown-item" href="javascript:void(0)" onclick="uploadImgToGoogle()">Google Drive</a>
                    <!-- <div id="savetodrive-div" class="ml-4 btn">
                      <div class="loader">Loading...</div>
                    </div> -->
                    <!-- <a class="dropdown-item" href="javascript:void(0)" onclick="uploadImgToOneD()">One Drive</a> -->
                  </div>
                </div>
          </div>
          <div class="image-settings container tab-pane fade" id="filter">
              <div class="card">
                <div class="card-header">Settings</div>
                <div class="card-body">
                  <div class="setting-item-filter mb-3">
                    <p>Filter Options:</p>
                    <div class="row">
                      <div class="col-sm-4">
                        <div class="custom-control custom-switch" style="margin-bottom: 1rem;">
                      <input type="checkbox" class="custom-control-input" id="blur_control" onchange="handleBlur()">
                      <label class="custom-control-label" for="blur_control">Blur</label>
                      </div>
                      </div>
                      <div class="col-sm-8">
                        <div class="form-group" id="blur_range">
                          <input type="range" class="custom-range form-control" value="0" id="blur_customRange" onchange="blurRangechange()">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-4">
                        <div class="custom-control custom-switch" style="margin-bottom: 1rem;">
                      <input type="checkbox" class="custom-control-input" id="grayscale_control" onchange="handleGrayscale()">
                      <label class="custom-control-label" for="grayscale_control">Grayscale</label>
                      </div>
                      </div>
                      <div class="col-sm-8">
                        <div class="form-group" id="grayscale_range">
                          <input type="range" class="custom-range form-control" id="grayscale_customRange" value="0" onchange="grayscaleRangechange()">
                      </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-4">
                        <div class="custom-control custom-switch" style="margin-bottom: 1rem;">
                      <input type="checkbox" class="custom-control-input" id="brightness_control" onchange="handleBrightness()">
                      <label class="custom-control-label" for="brightness_control">Brightness</label>
                      </div>
                      </div>
                      <div class="col-sm-8">
                        <div class="form-group" id="brightness_range">
                          <input type="range" class="custom-range form-control" id="brightness_customRange" value="100" onchange="brightnessRangechange()">
                      </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-4">
                        <div class="custom-control custom-switch" style="margin-bottom: 1rem;">
                      <input type="checkbox" class="custom-control-input" id="contrast_control" onchange="handleContrast()">
                      <label class="custom-control-label" for="contrast_control">Contrast</label>
                      </div>
                      </div>
                      <div class="col-sm-8">
                        <div class="form-group" id="contrast_range">
                          <input type="range" class="custom-range form-control" id="contrast_customRange" value="100" onchange="contrastRangechange()">
                      </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-4">
                        <div class="custom-control custom-switch" style="margin-bottom: 1rem;">
                      <input type="checkbox" class="custom-control-input" id="invert_control" onchange="handleInvert()">
                      <label class="custom-control-label" for="invert_control">Invert</label>
                      </div>
                      </div>
                      <div class="col-sm-8">
                        <div class="form-group" id="invert_range">
                          <input type="range" class="custom-range form-control" id="invert_customRange" value="0" onchange="invertRangechange()">
                      </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-4">
                        <div class="custom-control custom-switch" style="margin-bottom: 1rem;">
                      <input type="checkbox" class="custom-control-input" id="saturate_control" onchange="handleSaturate()">
                      <label class="custom-control-label" for="saturate_control">Saturate</label>
                      </div>
                      </div>
                      <div class="col-sm-8">
                        <div class="form-group" id="saturate_range">
                          <input type="range" class="custom-range form-control" id="saturate_customRange" value="100" onchange="saturateRangechange()">
                      </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-4">
                        <div class="custom-control custom-switch" style="margin-bottom: 1rem;">
                      <input type="checkbox" class="custom-control-input" id="sepia_control" onchange="handleSepia()">
                      <label class="custom-control-label" for="sepia_control">Sepia</label>
                      </div>
                      </div>
                      <div class="col-sm-8">
                        <div class="form-group" id="sepia_range">
                          <input type="range" class="custom-range form-control" value="0" id="sepia_customRange" onchange="sepiaRangechange()">
                      </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-4">
                        <div class="custom-control custom-switch" style="margin-bottom: 1rem;">
                      <input type="checkbox" class="custom-control-input" id="opacity_control" onchange="handleOpacity()">
                      <label class="custom-control-label" for="opacity_control">Opacity</label>
                      </div>
                      </div>
                      <div class="col-sm-8">
                        <div class="form-group" id="opacity_range">
                          <input type="range" class="custom-range form-control" id="opacity_customRange" value="100" onchange="opacityRangechange()">
                      </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-4">
                        <div class="custom-control custom-switch" style="margin-bottom: 1rem;">
                      <input type="checkbox" class="custom-control-input" id="huerotate_control" onchange="handleHuerotate()">
                      <label class="custom-control-label" for="huerotate_control">Hue-Rotate</label>
                      </div>
                      </div>
                      <div class="col-sm-8">
                        <div class="form-group" id="huerotate_range">
                          <input type="range" class="custom-range form-control" min="0" max="360" id="huerotate_customRange" value="0" onchange="huerotateRangechange()">
                      </div>
                      </div>
                    </div>
                  </div>
                  
                  <a href="javascript:void(0)" class="dropbox-saver" id="saveDropBox" style="display: none">
                </a>
                <div class="btn-group google_omit" style="float: right;">
                  <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                  Save as JPG to online drives
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="javascript:void(0)" onclick="downloadFilterImg()">Local Drive</a>
                    <a class="dropdown-item" href="javascript:void(0)" onclick="uploadToDropBox()">DropBox</a>
                    <a class="dropdown-item" href="javascript:void(0)" onclick="uploadImgToGoogle()">Google Drive</a>
                    <!-- <div id="savetodrive-div" class="ml-4 btn">
                      <div class="loader">Loading...</div>
                    </div> -->
                    <!-- <a class="dropdown-item" href="javascript:void(0)" onclick="uploadImgToOneD()">One Drive</a> -->
                  </div>
                </div>
                </div>
              </div>
          </div>
          <div id="scalable-resize" class="image-settings container tab-pane fade">
            <div class="card">
              <div class="card-header">Settings</div>
              <div class="card-body">
                <div class="setting-item mb-3">
                  <p>Scale Size:</p>
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="input-group mb-3">
                        <input type="number" class="form-control" placeholder="width" name="scale_width_size" id="scale_width_size" onchange="scaleChangeWidth()" />
                        <div class="input-group-append">
                          <span class="input-group-text" id="width_unit">px</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="input-group mb-3">
                        <input type="number" class="form-control" placeholder="height" name="scale_height_size" id="scale_height_size" onchange="scaleChangeHeight()"/>
                        <div class="input-group-append">
                          <span class="input-group-text" id="height_unit">px</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="form-group" id="blur_range">
                        <input type="range" class="custom-range form-control" id="scalar_customRange" min="0" max="500" onchange="scalarRangechange()">
                      </div>
                    </div>
                    <div id="rangeValSection"><span id="scalarRangeVal">100%</span></div>
                  </div>
                </div>
                <a href="javascript:void(0)" class="dropbox-saver" id="saveDropBox" style="display: none">
                </a>
                <div class="btn-group google_omit" style="float: right;">
                  <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                  Save to 
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="javascript:void(0)" onclick="downloadScaleImg()">Local Drive</a>
                    <a class="dropdown-item" href="javascript:void(0)" onclick="uploadToDropBox()">DropBox</a>
                    <a class="dropdown-item" href="javascript:void(0)" onclick="uploadImgToGoogle()">Google Drive</a>
                    <!-- <div id="savetodrive-div" class="ml-4 btn">
                      <div class="loader">Loading...</div>
                    </div> -->
                    <!-- <a class="dropdown-item" href="javascript:void(0)" onclick="uploadImgToOneD()">One Drive</a> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="image-settings container tab-pane fade" id="social-resize">
            <div class="card">
              <div class="card-header">Settings</div>
              <div class="card-body">
                <div class="setting-item mb-3">
                  <p>Resize to: </p>
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="form-group">
                      <select class="form-control" id="social_select" value="" onchange="selectSocial()">
                        <option>Select Predefined Sizes</option>
                        <option value="youtube_channel_icon">Youtube Channel Icon</option>
                        <option value="youtube_thumbnail">Youtube Thumbnail</option>
                        <option value="youtube_channel_cover">Youtube Channel Cover</option>
                        <option value="facebook_profile_picture">Facebook Profile Picture</option>
                        <option value="facebook_cover_image">Facebook Cover Image</option>
                        <option value="facebook_post_image">Facebook Post Image</option>
                        <option value="facebook_event_image">Facebook Event Image</option>
                        <option value="twitter_profile_picture">Twitter Profile Picture</option>
                        <option value="twitter_header_size">Twitter Header Size</option>
                        <option value="twitter_post_size">Twitter Post Size</option>
                        <option value="instragram_profile_picture">Instragram Profile Picture</option>
                        <option value="instragram_post_size">Instragram Post Size</option>
                        <option value="instragram_story_image">Instragram Stories Image</option>
                        <option value="pinterest_profile_picture">Pinterest Profile Picture</option>
                        <option value="pinterest_board_cover">Pinterest Board Cover</option>
                        <option value="linkedin_profile_image">Linkedin Profile Image</option>
                        <option value="linkedin_banner_size">Linkedin Banner Size</option>
                        <option value="linkedin_company_logo">Linkedin Company Logo</option>
                        <option value="linkedin_company_cover">Linkedin Company Cover</option>
                        <option value="turnblr_image_post">Turnblr Image Post</option>
                        <option value="snapchat_image">Snapchat Image</option>
                        <option value="whatsapp_profile_picture">WhatsApp Profile Picture</option>
                        <option value="tiktok_profile_picture">TikTok Profile Picture</option>
                        <option value="twitch_banner_size">Twitch Banner Size</option>
                        <option value="etsy_shop_icon">Etsy Shop Icon Size</option>
                        <option value="etsy_cover_photo">Etsy Cover Photo Size</option>
                        <option value="soundcloud_profile_picture">Soundcloud Profile Picture</option>
                        <option value="soundcloud_banner_size">Soundcloud Banner Size</option>
                        <option value="social_media_post">Social Media Post Size</option>
                        <option value="presentation">Presentation Size</option>
                        <option value="blog_graphic">Blog Graphic Size</option>
                      </select>
                    </div> 
                    </div>
                  </div>
                </div>
                <div class="setting-item mb-3">
                  <p>Change Size:</p>
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="input-group mb-3">
                        <input type="number" class="form-control" placeholder="width" name="social_width_size" id="social_width_size" onchange="changeSocialWidth()">
                        <div class="input-group-append">
                          <span class="input-group-text">px</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="input-group mb-3">
                        <input type="number" class="form-control" placeholder="height" name="social_height_size" id="social_height_size" onchange="changeSocialHeight()">
                        <div class="input-group-append">
                          <span class="input-group-text">px</span>
                        </div>
                    </div>
                    </div>

                  </div>
                </div>
                

                <a href="javascript:void(0)" class="dropbox-saver" id="saveDropBox" style="display: none">
                </a>
                <div class="btn-group google_omit" style="float: right;">
                  <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                  Save to 
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="javascript:void(0)" onclick="downloadSocialImg()">Local Drive</a>
                    <a class="dropdown-item" href="javascript:void(0)" onclick="uploadToDropBox()">DropBox</a>
                    <a class="dropdown-item" href="javascript:void(0)" onclick="uploadImgToGoogle()">Google Drive</a>
                    <!-- <div id="savetodrive-div" class="ml-4 btn">
                      <div class="loader">Loading...</div>
                    </div> -->
                    <!-- <a class="dropdown-item" href="javascript:void(0)" onclick="uploadImgToOneD()">One Drive</a> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>    
      </div>
  </div>
</div>


<script type="text/javascript" src="https://js.live.net/v7.2/OneDrive.js"></script>
<script type="text/javascript" src="https://unpkg.com/dropbox/dist/Dropbox-sdk.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<script src="./credential.js"></script>
<script src="https://apis.google.com/js/platform.js" async defer></script>
<script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="6g7uad726rdvf1c"></script>
<script type="text/javascript" src="https://apis.google.com/js/api.js"></script>

<script>
  //this techinque for avoid conflicting dropins and dropbox sdk
  var DropboxSdk = new Dropbox.Dropbox({ accessToken: accessToken, fetch: fetch });
  var dropins = Dropbox;
</script>
<script type="text/javascript" src="functions.js"></script>
<script type="text/javascript">
  function showGDrivePickerDialog(e){
      e.preventDefault();
      e.stopImmediatePropagation();
      loadPicker()
    }
    function loadPicker() {
      if (oauthToken) {
        gapi.load('picker', {'callback': onPickerApiLoad});
      } else {
        gapi.load('auth', {'callback': onAuthApiLoad});
        gapi.load('picker', {'callback': onPickerApiLoad});
      }
      // gapi.load('auth', {'callback': onAuthApiLoad});
      // gapi.load('picker', {'callback': onPickerApiLoad});
    }
    function onAuthApiLoad() {
      window.gapi.auth.authorize(
      {
        'client_id': clientId,
        'scope': scope,
        'immediate': false
      },
      handleAuthResult);
      
    }
    
    function onPickerApiLoad() {
      pickerApiLoaded = true;
      createPicker();
    }
    function handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        oauthToken = authResult.access_token;
        createPicker();
      }
    }
    function createPicker() {
      if (pickerApiLoaded && oauthToken) {
        var view = new google.picker.View(google.picker.ViewId.DOCS);
        view.setMimeTypes("image/png,image/jpeg,image/jpg");
        var picker = new google.picker.PickerBuilder()
          .enableFeature(google.picker.Feature.NAV_HIDDEN)
          .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
          .setAppId(projectId)
          .setOAuthToken(oauthToken)
          .addView(view)
          .addView(new google.picker.DocsUploadView())
          .setDeveloperKey(APIKey)
          .setCallback(pickerCallback)
          .build();
        picker.setVisible(true);
      }
    }
      let file_name_google = document.getElementById("file_name_text");
    function pickerCallback(data) {
      
      if (data.action == google.picker.Action.PICKED) {
        var fileId = data.docs[0].id;
        loader(true);
        
        
        fetch("https://www.googleapis.com/drive/v3/files/"+fileId+'?alt=media', {
          method: "GET",
          headers: new Headers({
            Authorization: 'Bearer '+oauthToken,
          })
        })
        .then(response => response.blob())
        .then(blob => {
          loader(false);
          file_name_google.innerHTML = data.docs[0].name;
          previewAnduploadImage(blob);
        }).catch(error => {
          loader(false);
          console.log('unable to load image from google drive');
        });
    
      }
    }
    // $("#myDropDown").on("show.bs.dropdown", function(e){
    // uploadImgToGoogle();
    // });
  </script>
</body>
</html>
