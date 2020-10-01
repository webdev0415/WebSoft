import Paint from './paint.class.js'

var canvas2;
var ctx2;
var paint;
$(document).ready(function() {
    var sPositions = localStorage.positions || "{}",
    positions = JSON.parse(sPositions);
    $.each(positions, function (id, pos) {
        $(id).css(pos)
    })
    $(".float2").draggable({
        containment: "body",
        scroll: false,
        stop: function (event, ui) {
            positions[this.id] = ui.position
            localStorage.positions = JSON.stringify(positions)
            $(this).css("top",window.innerHeight-45)
        }
    });
    $(".float3").draggable({
        containment: "body",
        scroll: false,
        stop: function (event, ui) {
            positions[this.id] = ui.position
            localStorage.positions = JSON.stringify(positions)
            $(this).css("top",window.innerHeight-45)
        }
    });
    $(".float").draggable({
        containment: "body",
        scroll: false,
        stop: function (event, ui) {
            positions[this.id] = ui.position
            localStorage.positions = JSON.stringify(positions)
            $(this).css("left",window.innerWidth-110)
        }
    });
    createModal("float-1","float-1-modal")
    createModal("float-2","float-2-modal")
    $(".close").click(function(){
        $(".m_modal").css("display","none")
    })
    modalCloseListener("float-1")
    modalCloseListener("float-2")
    createCanvas()
});

function createModal(button, modal){
    var modal = document.getElementById(modal);
    
    // Get the button that opens the modal
    var btn = document.getElementById(button);
    
    // Get the <span> element that closes the modal
    
    
    // When the user clicks the button, open the modal 
    btn.onclick = function() {
      modal.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    
    }

    function modalCloseListener(modal){
        window.onclick = function(event) {
            if (event.target == document.getElementById(modal)) {
                document.getElementById(modal).style.display = "none";
            }
          }
    }

    function createCanvas(){
        $("#create_report_screenshot").click(function(){
            domtoimage.toPng(document.getElementById("body_content"))
            .then(function(dataUrl) {
            $(".m_modal").css("display","none")
            $(".body_content").css("display","none")
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
        paint.activeTool = "draw"
        paint.init()
        $("body").append(`<div id="paintMenuWrapper"><div class="paintMenu">
        <div class="menuItem palette undo" id="erasing" title="Undo">
            <img src="/assets/309080.svg" alt="" class="menuImg">
        </div>
        <div id="colorpickerTextColor2" class="input-group input-group-sm colorpicker-component text-option">
            <label class="input-group-addon" for="colorText2">Color</label>
            <input type="text" value="#ff0000" class="form-control" class="colorText2" id="colorText2" />
            <span class="input-group-addon"><i></i></span>
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
         "display":"inline-block"
      });
      $("body").css({
          "text-align":"center"
        })
    }