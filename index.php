<?php
    require_once('backend/tools.php');
    session_start();
    if (isset($_SESSION['logged_in'])) {
        if($_SESSION['suspended'] == 1){
            header("location: /suspended.php"); 
        }
    }
    $title_text = "WebSoft365.com - Online Software & Tools.";
    $desc_text = "WebSoft365.com provides a collection of online software & tools that you can use on any computer worldwide.";
    $key_text = "Popup Generator, Image Creator, Keyword tool, Email list tools, 24-hour countback, file manager, FTP software, HTML Editor, file Converter, Image Resizer, logo designer, Trigger Messages, Photo Edit, Photoshop Alternative, PDF Tools.";
    $page_description_title = "<h4><b>WebSoft365.com will save money for you.</b></h4>";
    $page_description_text = '<h4>Many internet users are ending up paying hundreds of dollars every month for different software and
    tools, therefore, WebSoft365 provides a solution for these internet users. Our mission is to provide you
    hundreds of online software & tools for a low fee. Therefore, WebSoft365.com developer team works hard
    every day to create new online software & tools for internet users. Many of the software and tools can
    be used for free without a paid membership.</h4>
<h4>We are open to new ideas. If you have new ideas of any useful software or online tools, you can click on
    the "Ask for Software" button in the top menu bar to fill out a form and we will consider creating a new
    software by your ideas.</h4>
<h4 class="last_desc">WebSoft365.com provides a number of software and tools to you, such as Unblockable
    Popup Generator, Easy Drag, and Drop Image Creator, Keyword and Email list tools, Countdown Clock
    Generator, Drag & drop online file manager and FTP software, Online HTML Editor Software, Image and file
    Converter, Image Resizer software, Icon & logo designer software, Automated Trigger Messages, Photo Edit
    - Photoshop Alternative Easy to use PDF Tools, Online Video Editor Software Online Banner Creator Tool,
    3D Book Cover Creator, Online Button Generator, Online Video Downloader, Responsive Web Design Tester,
    3D Software Box Creator, Digital Flipbook Maker, and much more.</h4>';

    $toolArrayOptions = "";
    $newToolArray = array();
    $newTools = new Tools();
    $newToolArray = $newTools->getTools();
    foreach($newToolArray['tools'] as $result) {
        $new_title = $result['title'];
        $new_title2 = strtolower($new_title);
        $new_title2 = str_replace(' ', '_', $new_title2);
        $new_title2 = str_replace('_&', '', $new_title2);
        $new_title2 = str_replace('(', '', $new_title2);
        $new_title2 = str_replace(')', '', $new_title2);
        $toolArrayOptions .= "<option value='https://websoft365.com/index.php?tool={$new_title2}'>{$new_title}</option>";
    }

    if(isset($_GET['tool']) && !empty($_GET['tool'])){
        $tool = ($_GET['tool']);
        $toolArray = array();
        $tools = new Tools();
        $toolArray = $tools->getTools();
        foreach($toolArray['tools'] as $result) {
            $title = $result['title'];
            $title = strtolower($title);
            $title = str_replace(' ', '_', $title);
            $title = str_replace('_&', '', $title);
            $title = str_replace('(', '', $title);
            $title = str_replace(')', '', $title);
            if($title==$tool){
                $title_text=$result['title'];

                $desc_array = explode('.', $result['description']);
                $desc_text = "{$desc_array[0]}.{$desc_array[1]}.";

                $key_text = $result['keywords'];

                $page_description_text = "";
                $page_description_title = "<h4>{$result['title']}</h4>";
                for ($i = 0; $i < count($desc_array); $i++) {
                    $page_description_text .= "<h4>{$desc_array[$i]}</h4>";
                }
            }
        }   
    }
?>
<!doctype html>
<html>

<head>
    <?php include "embed_header.php"; ?>
    <title><?php echo $title_text;?></title>
    <meta name="description"
        content="<?php echo $desc_text;?>">
    <meta name="keywords"
        content="<?php echo $key_text;?>">
    <meta name="robots" content="index, follow">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="language" content="English">
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
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <link rel="stylesheet" href="css/sweetalert2.min.css">
    <!-- Own CSS -->
    <link rel="stylesheet" href="css/main.css">
    <!-- Drives -->
</head>

<body>
    <?php include "embed_body.php"; ?>
    <div id="navigation"></div>
    <!------------------------------ CONTENT ------------------------------>
    <div id="tabs" class="content">
        <div id="tabs-1">
        <div id="index">
            <div class="page_title row">
                <div class="col-12 col-lg-8 title_text_container">
                    <h4 class="title_text">WebSoft365.com provides a collection of online software & tools that you can use on any computer
                        worldwide.</h4>
                    <h4 class="title_text title_2">All software works online, therefore, you don't have to download or install anything
                        on your computer.</h4>
                </div>
                <div class="col-lg-2" id="searchTool">
                        <div class="filterContainer">
                        <label for="searchBox" class="filterText">Search for Software</label>
                        <div class="row search_row">
                            <div class="col-8 search_field_container">
                            <input class="form-control-sm" id="searchBox" aria-describedby="searchTool" placeholder="Search...">
                            </div>
                            <div class="col-4 search_button_container">
                            <button type="button" class="btn btn-primary btn-sm search_button">Search</button>
                            </div>
                        </div>
                        </div>
                </div>
                <div class="col-lg-2" id="filterCategory">
                    <div class="filterContainer">
                    <label for="selectCategory" class="filterText">Filter By Category</label>
                    <select class="form-control form-control-sm" id="selectCategory">
                        <option>Show all</option>
                        <option>Webmaster</option>
                        <option>Social Media</option>
                        <option>Business</option>
                    </select>
                    </div>
                </div>
            </div>
            <div id="activeSoftware">
                <div class="row" id="activeToolList">
                </div>
            </div>
            <div id="usedSoftware">
                <div class="row" id="toolList">
                </div>
            </div>
            <div class="page_description">
                <?php echo $page_description_title;?>
                <?php echo $page_description_text;?>
            </div>
            <div class="tool_dropdown">
                <div class="form-group">
                    <select class="form-control" id="select_tool">
                        <option>WebSoft365.com Software and Tool List</option>
                        <?php echo $toolArrayOptions;?>
                    </select>
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
    <script src="js/dist/sweetalert2.all.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/promise-polyfill@7.1.0/dist/promise.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="js/main.js"></script>
    <script src="js/index.js"></script>
</body>

</html>