import Paint from './paint.class.js'
var canvas2;
var ctx2;
var colors = "#ff0000";
var width = "2";
var paint;
var screenshot;
var action_type;
var id_attachment;
var base64;
var dummyJson = []
var jsonData = {}
var button_class="#float-1"
var modal_class=".m_modal"
var iframe_src = window.frameElement.src
var user_email;
$(document).ready(function () {
    getUserDetails()
    setButton()
    var sPositions = localStorage.positions || "{}",
    positions = JSON.parse(sPositions);
    $.each(positions, function (id, pos) {
        $(id).css(pos)
    })
    createCanvas()
});

function getUserDetails(){
    var userid = getParameterByName("userid",iframe_src)
        window.parent.$.ajax({
            type: "post",
            url: "../../../backend/index.php?action=getUserDetailsById",
            data: {
              data: `{"userid":${userid}}`
            },
            success: function (response) {
            console.log(response)     
                if(response.status==="OK"){
                    var user = response.users
                    user_email = user.email
                }
            }
        })
}

function setButton(){

    var button_border = getParameterByName("button_border",iframe_src)
    var border_width = "0px"
    if(button_border=="true"){
        border_width = "1.5px"
    }

    var buttonPosition = getParameterByName("buttonPosition",iframe_src)
    switch(buttonPosition){
        case "button_pos_right":
            $(button_class).removeClass("float4")
            $(button_class).removeClass("float3")
            $(button_class).removeClass("float2")
            $(button_class).addClass("float")
            break;
        case "button_pos_left":
            $(button_class).removeClass("float")
            $(button_class).removeClass("float3")
            $(button_class).removeClass("float2")
            $(button_class).addClass("float4")
            break;
        case "button_pos_right_bottom":
            $(button_class).removeClass("float4")
            $(button_class).removeClass("float")
            $(button_class).removeClass("float3")
            $(button_class).addClass("float2")
            break;
        case "button_pos_left_bottom":
            $(button_class).removeClass("float4")
            $(button_class).removeClass("float")
            $(button_class).removeClass("float2")
            $(button_class).addClass("float3")
    }
    var domain_name = getParameterByName("domain_name",iframe_src)
    if(domain_name=="null"){
        $(".modal-body").html("")
        $(".modal-body").html(`<h5>You have no available domains. If you want to create a new project, please add a new domain.</h5>`)
    }
    var colorpicker_btn = getParameterByName("colorpicker_btn",iframe_src)
    var colorpicker_btn_text = getParameterByName("colorpicker_btn_text",iframe_src)
    var colorpicker_btn_border = getParameterByName("colorpicker_btn_border",iframe_src)
    $(`${button_class}`).css({
        "background-color":`#${colorpicker_btn}`,
        "color":`#${colorpicker_btn_text}`,
        "border":`#${colorpicker_btn_border} solid ${border_width}`,
        "display":"block"
    })

    var modalPosition = getParameterByName("modalPosition",iframe_src)
    if(modalPosition=="open_top"){
        createModal(button_class.replace("#",""),"float-2-modal")
    }else{
        createModal(button_class.replace("#",""),"float-1-modal")
    }

    var branding = getParameterByName("branding",iframe_src)
    if(branding=="false"){
        $(".powered_by").css("display","none")
    }else{
        $(".powered_by").css("display","block")
    }

    var comment_field = getParameterByName("comment_field",iframe_src)
    if(comment_field=="false"){
        $("#comment_field").remove()
        $(".top_comment_wrapper").remove()
        $(".top_text_wrapper").removeClass("col-6")
        $(".top_text_wrapper").addClass("col-12")
    }

    var comment_required = getParameterByName("comment_required",iframe_src)
    if(comment_required=="true"){
        $("#comment_field").prop("required","true")
        $(".comment_field_top").prop("required","true")
    }
    
    var name_field = getParameterByName("name_field",iframe_src)
    if(name_field=="false"){
        $("#name_field").remove()
    }

    var name_required = getParameterByName("name_required",iframe_src)
    if(name_required=="true"){
        $(".name_field_top").prop("required","true")
        $("#name_field").prop("required","true")
    }
    
    var email_field = getParameterByName("email_field",iframe_src)
    if(email_field=="false"){
        $("#email_field").remove()
    }

    var email_required = getParameterByName("email_required",iframe_src)
    if(email_required=="true"){
        $("#email_field").prop("required","true")
        $(".email_field_top").prop("required","true")
    }

    if(comment_field=="false"&&name_field=="false"&&email_field=="false"){
        $(".openFeedback").css("display","none")
    }

    var hide_button_mobile = getParameterByName("hide_button_mobile",iframe_src)
    if(hide_button_mobile!="false"){
        $(".websoft_reportBug").css({
            
        })
    }

    var report_modal_main_button = getParameterByName("report_modal_main_button",iframe_src).replace(/_/g," ").replace("x63","?")
    var report_modal_title = getParameterByName("report_modal_title",iframe_src).replace(/_/g," ").replace("x63","?")
    var report_modal_text = getParameterByName("report_modal_text",iframe_src).replace(/_/g," ").replace("x63","?")
    var report_modal_button_1 = getParameterByName("report_modal_button_1",iframe_src).replace(/_/g," ").replace("x63","?")
    var report_modal_button_2 = getParameterByName("report_modal_button_2",iframe_src).replace(/_/g," ").replace("x63","?")
    if(report_modal_main_button!=""){
        $(".float_button").html(report_modal_main_button)
    }else{
        $(".float_button").html("Bug report/feedback")
    }

    if(report_modal_title!=""){
        $(".report_modal_title").html(report_modal_title)
    }else{
        $(".report_modal_title").html("Bug report/feedback")
    }

    if(report_modal_text!=""){
        $(".report_modal_text").html(report_modal_text)
    }else{
        $(".report_modal_text").html("Have you found a bug or do you have any comments/suggestions about this site?")
    }
    
    if(report_modal_button_1!=""){
        $(".report_modal_button_1").html('<img src="/assets/Camera-2-icon.png"></img>'+report_modal_button_1)
    }else{
        $(".report_modal_button_1").html('<img src="/assets/Camera-2-icon.png"></img> Bug report')
    }
    
    if(report_modal_button_2!=""){
        $(".report_modal_button_2").html('<img src="/assets/Align-JustifyLeft-icon.png"></img>'+report_modal_button_2)
    }else{
        $(".report_modal_button_2").html('<img src="/assets/Align-JustifyLeft-icon.png"></img> Feedback')
    }
   
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function createModal(button, modal){
    var modal2 = document.getElementById(modal);
    
    // Get the button that opens the modal
    var btn = document.getElementById(button);
    
    // Get the <span> element that closes the modal
    
    
    // When the user clicks the button, open the modal 
    btn.onclick = function() {
      modal2.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    modalCloseListener(modal)
    modalCloseListener2(modal)
    $(".openFeedback").on("click",function(){
        screenshot = false
        $(".top_feedback_wrapper").css("padding-top", "14px")
        displayBugReportFeedback()
    })
    }

    function modalCloseListener(modal){
        window.onclick = function(event) {
            if (event.target == document.getElementById(modal)) {
                document.getElementById(modal).style.display = "none";
                $(".modal_base_wrapper").css("display","block")
                $(".modal_feedback_wrapper").css("display","none")
            }
          }
    }

    function modalCloseListener2(modal){
        $(".close").click(function(){
            $(`#${modal}`).css("display","none")
            $(".modal_base_wrapper").css("display","block")
            $(".modal_feedback_wrapper").css("display","none")
        })
    }

    function openFeedback(){
        $(".report_modal_button_2").click(function(){
            $(".modal-body").html("")
        })
    }

    function displayBugReportFeedback(){
        if(screenshot == true){
            $(".attachment_message").remove()
            $(".feedback_wrapper_float1 form").prepend(`<div class="form-group attachment_message" style="margin-top: 5px;"><img class="attachment_icon" style="width:18px;float:left;margin-right: 10px;" src="img/attachment-icon.png"></img><h6 style="text-align:left;">Screenshot attached!</h6></div>`)
            $(".top_feedback_wrapper").prepend(`<div class="form-group attachment_message" style="margin-top: 5px;"><img class="attachment_icon" style="width:18px;float:left;margin-right: 10px;" src="img/attachment-icon.png"></img><h6 style="text-align:left;">Screenshot attached!</h6></div>`)
            $(".top_feedback_wrapper").css("padding-top", "0px")
        }else{
            $(".attachment_message").remove()
        }
            $(".modal_base_wrapper").css("display","none")
            $(".modal_feedback_wrapper").css("display","block")
            $(".modal_base_wrapper").css("display","none")
            $(".modal_feedback_wrapper").css("display","block")
            submitBugReportFeedback()
    }

    function submitBugReportFeedback(){
        sendBugReport()
    }

// ----------------------------------------- PAINT MENU ---------------------------------------------------------------

function createCanvas(){
        $(".create_report_screenshot").click(function(){
            domtoimage.toPng(document.getElementsByTagName("BODY")[0])
            .then(function(dataUrl) {
            $(".m_modal").css("display","none")
            canvas2 = document.createElement('canvas');
            canvas2.id = 'newCanvas';
            document.body.appendChild(canvas2); // adds the canvas to the body element
            var img = new Image();
            img.src = dataUrl;
            var containerWidth =  $(window).width();
            var containerHeight = $(window).height();
            document.querySelector(`#newCanvas`).setAttribute("width", containerWidth)
            document.querySelector(`#newCanvas`).setAttribute("height", containerHeight)
            canvas2 = document.getElementById("newCanvas")
            ctx2 = canvas2.getContext("2d")
            img.onload = () => {
                ctx2.drawImage(img, 0, 0, img.width, img.height, // source rectangle
                    0, 0, canvas2.width, canvas2.height);
            }
            $("#newCanvas").css("position","relative")
            reportBug()
            })
        })
    }

    function reportBug(){
        paint = new Paint("newCanvas")
        paint.init()
        $("body").append(`<div id="paintMenuWrapper"><div class="paintMenu">
        <div class="menuItem palette undo" id="erasing" title="Undo">
            <img src="/assets/309080.svg" alt="" class="menuImg">
        </div>
        <div id="colorpickerTextColor2" class="input-group input-group-sm colorpicker-component text-option menuSectionWrapper">
            <div class="colorText2_input_wrapper">
                <label class="input-group-addon">Color</label>
                <input id="colorText2" class="jscolor colorText2" value="#00CC99">
            </div>
            <div class="colorText2_wrapper">
                <div id="colorText2_choose" class="input-group-addon" onclick="document.getElementById('colorText2').jscolor.show()"></div>
            </div>
        </div>
        <div class="menuSectionWrapper drawWrapper">
            <form>
                <select id="sizeOfText" type="range" name="amountRange" value="1" oninput="this.form.amountInput.value=this.value" class="sizeOfText" title="Choose size">
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="14">14</option>
                    <option value="16">16</option>
                    <option value="18">18</option>
                </select>
            </form>
            <div class="menuItem text" id="text" data-command="type" title="Type text"><img src="/assets/ft14-text.svg" alt="" class="menuImg"></div>
            <div class="menuItem pencil active" id="pencil" data-command="draw" title="Draw tool"><img src="/assets/Anonymous-Pencil-icon.svg" alt="" class="menuImg"></div>
        </div>
        <div class="menuSectionWrapper shapesWrapper">
            <div class="menuItem shapeItemLine" data-command="line" title="Line tool">
                <div class="shape shapeline palette" id="shapeline"></div>
            </div>
            <div class="menuItem shapeItem1" data-command="rectangle" title="Rectangle tool">
                <div class="shape shaperectangle palette" id="shaperectangle"></div>
            </div>
            <div class="menuItem shapeItem2" data-command="circle" title="Circle tool">
                <div class="shape shapecircle palette" id="shapecircle"></div>
            </div>
            <div class=" shape shapearrow palette menuItem" id="shapearrow" data-command="arrow" title="Arrow tool">
                <img src="/assets/Sideways_Arrow_Icon.svg.png" alt="" class="menuImg">
            </div>
        </div>
        <div class="menuSectionWrapper ready_wrapper">
            <button class="btn btn-warning btn-sm" id="doneEditing">DONE</button>
        </div>
    </div>
    </div>`)
    $(".paintMenu").css({
        "position": "absolute",
         "z-index": "9999!important",
         "top": "0",
         "background-color": "white",
         "padding": "3px",
         "padding-top": "1px",
         "padding-bottom": "1px",
         "border-radius": "3px",
         "margin-left":"16%"
      });
      var editor_bar_position = getParameterByName("editor_bar_position",iframe_src)
        if(editor_bar_position=="bottom"){
            $(".paintMenu").css({
                "margin-top":"0",
                "top": "auto",
                "bottom": "0"
            })
        }
      $("#colorText2_choose").css({
            "width": "20px",
            "height": "20px",
            "background-color": "red",
            "border-radius": "3px",
            "display":"inline-block",
            "margin-top":"4px",
            "margin-left":"12px"
      })
        $("body").css({
          "text-align":"center"
        })
        $("#doneEditing").on("click",function(){
            base64 = canvas2.toDataURL().split(",")[1];
            $("#newCanvas").remove()
            $(".paintMenu").remove()
            $("script[src='js/jscolor.js']").remove()
            var modalPosition = getParameterByName("modalPosition",iframe_src)
                if(modalPosition=="open_top"){
                    $("#float-2-modal").css("display","block")
                }else{
                    $("#float-1-modal").css("display","block")
                }
            screenshot = true
            displayBugReportFeedback()
        })
        loadScriptToHead("js/jscolor.js")
        colorChangeListener("#colorText2","#colorText2_choose")
        changeWidth()
        selectDataElements()
        undoClickListener()
        typeText()
        paint.activeTool = "draw"
        paint.selectedColor = colors
    }

    function loadScriptToHead(url){
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;    
        
        document.getElementsByTagName('head')[0].appendChild(script);
        return true
    }

    function colorChangeListener(from,to){

        $(from).on("change",function(e){
            colors = $(from).css("background-color")
            paint.selectedColor = colors;
            ctx2.fillStyle = colors;
            var bckgrnd_color = $(from).css("background-color")
            $(to).css("background-color",bckgrnd_color)
        })
    }

    function changeWidth() {
        $(`#sizeOfText`).change(function(e) {
            width = $(`#sizeOfText`).val()
            paint.lineWidth = width;
        });
    };

    function selectDataElements() {
        jQuery("body").find("[data-command]").each(function(e) {
            $(this).on("click", function(e) {
                e.preventDefault()
                if (!$(this).hasClass("active")) {
                    if ($(".active")[0]) {
                        $(".active").removeClass("active")
                    }
                    $(this).addClass("active")
                } else {
                    $(this).removeClass("active")
                }
                var selectedTool = $(this).attr("data-command")
                if(selectedTool == "type"){
                    typeText()
                }else{
                paint.activeTool = selectedTool
                }
            })
        })
    }

    function undoClickListener() {
        $(`#erasing`).on("click", function() {
            paint.undoPaint()
        })
    }

    function typeText(){
        paint.activeTool = ""
        var mouseX = 0;
        var mouseY = 0;
        var startingX = 0;

        var recentWords = []
        var undoList = []

        function saveState(){
            undoList.push(canvas2.toDataURL())
        }

        saveState()

        function undo(){
            undoList.pop()
            var imgData = undoList[undoList.length - 1]
            var image = new Image()
            image.src = imgData
            image.onload = function () {
                ctx2.clearRect(0,0,canvas2.width, canvas2.height)
                ctx2.drawImage(image,0,0,canvas2.width,canvas2.height,0,0,canvas2.width,canvas2.height)
            }
        }
        
        canvas2.addEventListener("click", function(e){
            mouseX = e.pageX - canvas2.offsetLeft;
            mouseY = e.pageY - canvas2.offsetTop;
            startingX = mouseX

            return false
        },false)

        canvas2.addEventListener("keydown", function(e){
            console.log("keydown")
            ctx2.font = 10+parseInt(width)+"px Arial"

            if(e.keyCode === 8){
                undo()
                var recentWord = recentWords[recentWords.length-1]
                mouseX -= ctx2.measureText(recentWord).width
                recentWords.pop()
            }else if(e.keyCode === 13){
                mouseX = startingX
                mouseY += 20
            }else{
            ctx2.fillText(e.key, mouseX, mouseY)
            mouseX+=ctx2.measureText(e.key).width
        }
        },false)
    }

    function sendBugReport(){
        $(".bugReportFeedbackForm").submit(function(e){
            e.preventDefault()
            window.parent.uploadBugReportSettings()
            $("button[type=submit]").prop( "disabled", true );
            displayBrowserInfo()
            jsonData["user_email"]=user_email
            jsonData["base64"]=base64
            jsonData["comment"]=$("#comment_field").val()
            jsonData["name"]=$("#name_field").val()
            jsonData["email"]=$("#email_field").val()
            jsonData["status"]="open"
            jsonData["domain_name"]=getParameterByName("domain_name",iframe_src)
            jsonData["source_url"]=getParameterByName("domain_name",iframe_src)
            jsonData["userid"]=getParameterByName("userid",iframe_src)
            jsonData["current_date"]=new Date().toLocaleString();
            console.log(jsonData)
            window.parent.parent.$.ajax({
                type: "post",
                url: "../../../backend/bug_report_tool.php?action=sendBugReport",
                data: {
                data: JSON.stringify(jsonData)
                },
                success: function (response) {
                    $("button[type=submit]").prop( "disabled", false );
                console.log(response);
                if (response.status == "OK") {
                    Swal.fire('Success','Thank you for your bug report.','success');
                    $(button_class).css("display","block")
                    $(modal_class).css("display","none")
                    $("#reports_ul").find("li")
                    window.parent.checkReportDomainCount(getParameterByName("domain_name",iframe_src))
                    
                } else {
                    Swal.fire('Error','Something went wrong...','error');
                }
                return true;
                },
                error: function(e){
                    $("button[type=submit]").prop( "disabled", false );
                    console.log(e)
                    return false;
                }
            });
        })
    }

    function displayBrowserInfo(){
        var unknown = '-';
        var width;
        var height;

        // screen
        var screenSize = '';
        if (screen.width) {
            width = (screen.width) ? screen.width : '';
            height = (screen.height) ? screen.height : '';
            screenSize += '' + width + " x " + height;
        }

        // browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Opera Next
        if ((verOffset = nAgt.indexOf('OPR')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 4);
        }
        // Edge
        else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
            browser = 'Microsoft Edge';
            version = nAgt.substring(verOffset + 5);
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // MSIE 11+
        else if (nAgt.indexOf('Trident/') != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mobile version
        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // cookie
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }

        // system
        var os = unknown;
        var clientStrings = [
            {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
            {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
            {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
            {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
            {s:'Windows Vista', r:/Windows NT 6.0/},
            {s:'Windows Server 2003', r:/Windows NT 5.2/},
            {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
            {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
            {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
            {s:'Windows 98', r:/(Windows 98|Win98)/},
            {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
            {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {s:'Windows CE', r:/Windows CE/},
            {s:'Windows 3.11', r:/Win16/},
            {s:'Android', r:/Android/},
            {s:'Open BSD', r:/OpenBSD/},
            {s:'Sun OS', r:/SunOS/},
            {s:'Chrome OS', r:/CrOS/},
            {s:'Linux', r:/(Linux|X11(?!.*CrOS))/},
            {s:'iOS', r:/(iPhone|iPad|iPod)/},
            {s:'Mac OS X', r:/Mac OS X/},
            {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {s:'QNX', r:/QNX/},
            {s:'UNIX', r:/UNIX/},
            {s:'BeOS', r:/BeOS/},
            {s:'OS/2', r:/OS\/2/},
            {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }
        
        // flash (you'll need to include swfobject)
        /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
        var flashVersion = 'no check';
        if (typeof swfobject != 'undefined') {
            var fv = swfobject.getFlashPlayerVersion();
            if (fv.major > 0) {
                flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
            }
            else  {
                flashVersion = unknown;
            }
        }

    window.jscd = {
        screen: screenSize,
        browser: browser,
        browserVersion: version,
        browserMajorVersion: majorVersion,
        mobile: mobile,
        os: os,
        osVersion: osVersion,
        cookies: cookieEnabled,
        flashVersion: flashVersion
    };

    jsonData["os"]=jscd.os +' '+ jscd.osVersion
    jsonData["screen_size"]=jscd.screen
    jsonData["browser"]=jscd.browser +' '+ jscd.browserMajorVersion+' (' + jscd.browserVersion + ')'
}