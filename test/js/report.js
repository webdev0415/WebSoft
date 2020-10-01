
import Paint from './paint.class.js'

//--------------------------------------------VARIABLES----------------------------------------------

var canvas2;
var ctx2;
var colors = "#ff0000";
var width = "2";
var paint;
var action_type;
var id_attachment;

//--------------------------------------------INIT----------------------------------------------

function loadScriptToBody(url){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;    
    
    document.getElementsByTagName('body')[0].appendChild(script);
}
function loadLinkToHead(url){
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;    
    
    document.getElementsByTagName('head')[0].appendChild(link);
    return true
}
function loadScriptToHead(url){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;    
    
    document.getElementsByTagName('head')[0].appendChild(script);
    return true
}
async function loadScripts(){
    loadScriptToHead("https://cdn.jsdelivr.net/npm/sweetalert2@9")
    loadScriptToHead("https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js")
    loadScriptToHead("https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js")
    loadLinkToHead("/components/report/report.css")
}

loadScripts().then(setTimeout(function(){loadProgram()},1000))

//--------------------------------------------MAIN PROGRAM ----------------------------------------------

function loadProgram(){
    $("body").prepend(`<div class="reportField"></div>`)
    $(".reportField").load("/components/report/report.php");
    $(".websoft_reportBug").click(function(e) {
        e.preventDefault()
        makeIDsUnique()
        setUpCanvas()
        $(".action_text").html("")
        action_type = "report_bug"
        $(".websoft_reportBug").attr("disabled", "disabled");
        setBugActionText()
        selectDataElements()
    });
    $(".websoft_recommendFeature").click(function(e) {
        e.preventDefault()
        makeIDsUnique()
        $(".action_text").html("")
        action_type = "recommend_feature"
        setUpCanvas()
        $(".websoft_recommendFeature").prop("disabled", true);
        setFeatureActionText()
        recommendFeature()
        selectDataElements()
    });

    function makeIDsUnique(){
        id_attachment =  String(Math.floor(Math.random()*1000))+String(Math.floor(Math.random()*1000))
        $(".reportField").find("[id]").each(function(){ this.setAttribute("id",this.id+id_attachment) });
    }

    function setUpCanvas(){
        domtoimage.toPng(document.getElementsByTagName("BODY"))
            .then(function(dataUrl) {
                $(".reportField").addClass("reportActive")
                $(`#colorText2${id_attachment}`).css("display","none")
                setTimeout(function() {
                    //$("#page-content-wrapper").css("display","none")
                    var img = new Image();
                    img.src = dataUrl;
                    /*var containerWidth = document.querySelector(`#innerCanvasWrapper${id_attachment}`).clientWidth
                    var containerHeight = (document.querySelector(`#page-content-wrapper`).clientHeight / document.querySelector(`#page-content-wrapper`).clientWidth) * containerWidth
                    document.querySelector(`#screenShotCanvas${id_attachment}`).setAttribute("width", containerWidth)
                    document.querySelector(`#screenShotCanvas${id_attachment}`).setAttribute("height", containerHeight)*/
                    canvas2 = document.getElementById(`screenShotCanvas${id_attachment}`)
                    ctx2 = canvas2.getContext("2d")
                    ctx2.fillStyle=colors
                    img.onload = () => {
                        ctx2.drawImage(img, 0, 0, img.width, img.height, // source rectangle
                            0, 0, canvas2.width, canvas2.height);
                    }
                    reportBug()
                }, 2500);
            })
            .catch(function(error) {
                console.error('oops, something went wrong!', error);
            });
        /*  var containerWidth = document.querySelector("#innerCanvasWrapper").clientWidth
            var containerHeight = (document.querySelector("#page-content-wrapper").clientHeight / document.querySelector("#page-content-wrapper").clientWidth) * containerWidth
            console.log(containerWidth)
            console.log(containerHeight)
            html2canvas($('#page-content-wrapper')[0], {
                width: "900px",
                height: "600px"
            }).then(function(canvas) {
                $("#reportField").addClass("reportActive")
                setTimeout(function() {
                canvas2 = document.querySelector("#innerCanvasWrapper").appendChild(canvas2)
                //canvas2.setAttribute("id", "screenShotCanvas");
                //document.querySelector("#screenShotCanvas").setAttribute("width", containerWidth)
                //document.querySelector("#screenShotCanvas").setAttribute("height", containerHeight)
                ctx2 = canvas2.getContext("2d")
                ctx2.fillStyle=colors
                reportBug()
                }, 2000);
        });*/

        /*window.html2canvas(document.querySelector("#page-content-wrapper"), {
            onrendered: function(canvas) {
                var extra_canvas = document.createElement("canvas");
                extra_canvas.setAttribute('width', 70);
                extra_canvas.setAttribute('height', 70);
                var ctx = extra_canvas.getContext('2d');
                ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 70, 70);
                var dataURL = extra_canvas.toDataURL();
                var img = $(document.createElement('img'));
                img.attr('src', dataURL);
                // insert the thumbnail at the top of the page
                $('body').prepend(img);
            },
        });*/

        setTimeout(function() {
            $(".screenshotCanvasWrapper,.reportTextWrapper").css("display", "block")
            $(".screenshot_canvas,.report_text").css("display", "block")
        }, 2000);
    }

    function reportBug() {
        paint = new Paint(`screenShotCanvas${id_attachment}`)
        paint.activeTool = "draw"
        paint.init()
        if(action_type=="report_bug"){
            sendBugReport()
        }else{
            sendFeatureReport()
        }
        changeColors()
        changeWidth()
        selectDataElements()
        undoClickListener()
        changeButtonColor()
        closeReport()
    }

    function closeReport(){
        $(".closeReport").click(function(e) {
            e.preventDefault()
            $(".action_text").html("")
            $(`#reportBug${id_attachment}`).prop("disabled", false);
            $(`#recommendFeature${id_attachment}`).prop("disabled", false);
            $(`#reportField${id_attachment}`).removeClass("reportActive")
            $(`#reportField${id_attachment}`).addClass("contentActive")
            $(`#page-content-wrapper`).css("display","block")
            $(".screenshotCanvasWrapper,.reportTextWrapper").css("display", "none")
            document.querySelector("canvas").remove()
        });
    }

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
        $(`#erasing${id_attachment}`).on("click", function() {
            paint.undoPaint()
        })
    }

    function changeColors() {
        paint.selectedColor = colors;
        $(`#colorpickerTextColor2${id_attachment}`).colorpicker().on('changeColor', function(e) {
            colors = e.color.toHex()
            paint.selectedColor = colors;
            ctx2.fillStyle = colors;
        });
    };

    function changeWidth() {
        $(`#sizeOfText${id_attachment}`).change(function(e) {
            width = $(`#sizeOfText${id_attachment}`).val()
            paint.lineWidth = width;
        });
    };

    function drawArrowhead(context, from, to, radius) {
        var x_center = to.x;
        var y_center = to.y;

        var angle;
        var x;
        var y;

        context.beginPath();

        angle = Math.atan2(to.y - from.y, to.x - from.x)
        x = radius * Math.cos(angle) + x_center;
        y = radius * Math.sin(angle) + y_center;

        context.moveTo(x, y);

        angle += (1.0 / 3.0) * (2 * Math.PI)
        x = radius * Math.cos(angle) + x_center;
        y = radius * Math.sin(angle) + y_center;

        context.lineTo(x, y);

        angle += (1.0 / 3.0) * (2 * Math.PI)
        x = radius * Math.cos(angle) + x_center;
        y = radius * Math.sin(angle) + y_center;

        context.lineTo(x, y);

        context.closePath();

        context.fill();
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
            console.log("click")
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

    var base64 = null;

    function sendBugReport(){
        $(`#reportForm${id_attachment}`).submit(function(e){
            e.preventDefault()
            uploadCanvasImage(canvas2)
            $("button[type=submit]").prop( "disabled", true );
            /*canvas2.toBlob(function(result){
                // Define the FileReader which is able to read the contents of Blob
                var reader = new FileReader();

                // The magic always begins after the Blob is successfully loaded
                reader.onload = function () {
                // Since it contains the Data URI, we should remove the prefix and keep only Base64 string
                b64 = reader.result.split(",")[1];
                console.log(b64); //-> "V2VsY29tZSB0byA8Yj5iYXNlNjQuZ3VydTwvYj4h"
                };

                // Since everything is set up, let’s read the Blob and store the result as Data URI
                reader.readAsDataURL(result);
            },'image/png');*/
            jsonData["base64"]=base64
            jsonData["report_text"]=$(".report_text").val()
            jsonData["toolid"]=$(`#wrapper${id_attachment}`).attr("class").split("-")[1]
            console.log(jsonData)
            $.ajax({
                type: "post",
                url: "../../backend/index.php?action=sendBugReport",
                data: {
                data: JSON.stringify(jsonData)
                },
                success: function (response) {
                    $("button[type=submit]").prop( "disabled", false );
                console.log(response);
                if (response.status == "OK") {
                    Swal.fire('Success','Thank you for your bug report.','success');
                } else {
                    Swal.fire('Error','Something went wrong...','error');
                }
                
                },
                error: function(e){
                    $("button[type=submit]").prop( "disabled", false );
                    console.log(e)
                }
            });
        })
    }

    function sendFeatureReport(){
        $(`#reportForm${id_attachment}`).submit(function(e){
            e.preventDefault()
            uploadCanvasImage(canvas2)
            $("button[type=submit]").prop( "disabled", true );
            /*canvas2.toBlob(function(result){
                // Define the FileReader which is able to read the contents of Blob
                var reader = new FileReader();

                // The magic always begins after the Blob is successfully loaded
                reader.onload = function () {
                // Since it contains the Data URI, we should remove the prefix and keep only Base64 string
                b64 = reader.result.split(",")[1];
                console.log(b64); //-> "V2VsY29tZSB0byA8Yj5iYXNlNjQuZ3VydTwvYj4h"
                };

                // Since everything is set up, let’s read the Blob and store the result as Data URI
                reader.readAsDataURL(result);
            },'image/png');*/
            jsonData["base64"]=base64
            jsonData["report_text"]=$(".report_text").val()
            jsonData["toolid"]=$(`#wrapper${id_attachment}`).attr("class").split("-")[1]
            console.log(jsonData)
            $.ajax({
                type: "post",
                url: "../../backend/index.php?action=sendRecommendation",
                data: {
                data: JSON.stringify(jsonData)
                },
                success: function (response) {
                    $("button[type=submit]").prop( "disabled", false );
                console.log(response);
                if (response.status == "OK") {
                    Swal.fire('Success','Thank you for your recommendation.','success');
                } else {
                    Swal.fire('Error','Something went wrong...','error');
                }
                
                },
                error: function(e){
                    $("button[type=submit]").prop( "disabled", false );
                    console.log(e)
                }
            });
        })
    }

    function uploadCanvasImage(input){
        base64 = input.toDataURL().split(",")[1];
    }

    function changeButtonColor(){
        $(".report_text").on("input",function(e){
            $("#submitReport").css("background-color","#2B76A2")
            $("#submitReport").css("color","white")
        })
    }

    function setBugActionText(){
        $(".action_text").append(`<h4><b>Did you find a bug in this software?</b></h4>
        <h4>Send your bug report to the development team.</h4>`)
        $(".screenshot_text").html(`Screenshot will be automatically attached to the bug report.`)
        $(".report_text").attr("placeholder","Type your bug report here...")
    }

    function setFeatureActionText(){
        $(".action_text").append(`<h4><b>Do you have a new idea for this software? Send your idea to us.</b></h4>
        <h4>Send your feature recommendation to the development team.</h4>
        `)
        $(".screenshot_text").html(`Screenshot will be automatically attached to the feature recommendation.`)
        $(".report_text").attr("placeholder","Type your feature recommendation here...")
    }

    /* DRAWLINE ---------------------------------------------------------------------------

    function drawLine() {
        $("#pencil").on("click", function(e) {
            canvas.addEventListener("mousedown", dragStartLine)
            canvas.addEventListener("mousemove", dragLine)
            canvas.addEventListener("mouseup", dragStopLine)
        })
    }

    function dragStartLine(e) {
        painting = true;
        dragLine(e)
    }

    function dragLine(e) {
        if (!painting) { return }
        ctx.lineTo(e.clientX, e.clientY)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(e.clientX, e.clientY)
    }

    function dragStopLine() {
        painting = false;
        ctx.beginPath()
    }
    */
}