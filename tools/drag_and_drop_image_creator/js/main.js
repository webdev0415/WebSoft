var jsonData={}
var user_group
$(document).ready(function(){
    checkUserGroup();
    $("#row_content").height(document.body.clientHeight);
    let $canvas = $('#canvas-background');
    $canvas.height(document.body.clientHeight-150);
    $('#canvasWidth').val($canvas.width());
    $('#canvasHeight').val($canvas.height());
    // $('#canvasHeight').attr("max", $canvas.height());
    // $('#canvasWidth').attr("max", $canvas.width());
    $(".emoji-menu").width("280px");
    $(".emoji-wysiwyg-editor").html("Enter Text Here");
    $(".emoji-wysiwyg-editor").css("display", "block");
    $(".dropdown-toggle").dropdown();
    $("#fullSizeDisplay").html($('#canvasWidth').val() + " X " + $('#canvasHeight').val());
    $("#sliderDisplay").html("100%");
    $("#change_file_name").click(function(e){
                if(user_group!="FREE"){
                Swal.fire({
                    title: "Change file name",
                    html: "<input class='form-control' id='new_file_name'></input>",
                    showCloseButton: true,
                    showCancelButton: false,
                    showConfirmButton: true,
                    focusConfirm: true,
                    focusClose:false,
                    customClass: {
                      content: 'swalContent',
                      confirmButton: 'swalStart',
                      title: 'swalTitle'
                    },
                    confirmButtonText:
                      'OK'
                  });
                  $(".swalStart").click(function(e){
                      var new_file_name = $("#new_file_name").val()
                      var extension = $("#file_name_text").html().split(".")[1]
                      $("#file_name_text").html(new_file_name+"."+extension)
                  })
                }else{
                    Swal.fire("This is a PRO Feature","In order to use this feature, please upgrade to PRO.","error")
                }
            })
});
let scale_val;

$(function() {
    'use strict';
    var chosenFileEntry = null;
    
    // canvas background
    var $canvas = $('#canvas-background');
    let droppable_width = $canvas.width();
    let droppable_height = $canvas.height();
    let origin_canvas_width = $canvas.width();
    let origin_canvas_height = $canvas.height();
    let image_pos = [];
    let canvas_scale = 1;
    let canvas_color ;
    function SetImagePosition() {
        image_pos = [];
        let image_divs = $("#canvas-background").find('> div');
        $("#canvas-background").find('> div').each(function(index){
            

            let left = image_divs[index].style.left.slice(0,image_divs[index].style.left.length-2) / canvas_scale;
            let top = image_divs[index].style.top.slice(0,image_divs[index].style.top.length-2) / canvas_scale;
            let image = $(this).find('img')[0];

            let width;
            let height;
            if (image == undefined) 
            {
                width = image_divs[index].style.width.slice(0,image_divs[index].style.width.length-2) / canvas_scale;
                height = image_divs[index].style.height.slice(0,image_divs[index].style.height.length-2)/ canvas_scale;
            } else {
                width = image.style.width.slice(0,image.style.width.length-2) / canvas_scale;
                height = image.style.height.slice(0,image.style.height.length-2)/ canvas_scale;
            }
            
            image_pos.push({
                x:left,
                y:top,
                width:width,
                height:height
            });
        });
    }

     function SetImagePosOriginal(scale_a , scale_w,scale_h) {
        
        let image_divs = $("#canvas-background").find('> div');
        $("#canvas-background").find('> div').each(function(index){
            

            let left = image_divs[index].style.left.slice(0,image_divs[index].style.left.length-2) / scale_a / scale_w;
            let top = image_divs[index].style.top.slice(0,image_divs[index].style.top.length-2) / scale_a / scale_h;
            let image = $(this).find('img')[0];
            image_divs[index].style.left = left + "px";
            image_divs[index].style.top = top + "px";
            let width;
            let height;
            if (image == undefined) 
            {
                width = image_divs[index].style.width.slice(0,image_divs[index].style.width.length-2) / scale_a / scale_w;
                height = image_divs[index].style.height.slice(0,image_divs[index].style.height.length-2)/ scale_a / scale_h;
                image_divs[index].style.width = width + "px";
                image_divs[index].style.height = height + "px";

            } else  {
                // console.log($(this));
                $(this).children().width();
                let p_w = $(this).children().width();
                let p_h = $(this).children().height();
                $(this).children().width(p_w / scale_a / scale_w);
                $(this).children().height(p_h / scale_a / scale_h);
                width = image_divs[index].style.width.slice(0,image_divs[index].style.width.length-2) / scale_a / scale_w;
                height = image_divs[index].style.height.slice(0,image_divs[index].style.height.length-2)/ scale_a / scale_h;
                image_divs[index].style.width = width + "px";
                image_divs[index].style.height = height + "px";

                width = image.style.width.slice(0,image.style.width.length-2) / scale_a / scale_w;
                height = image.style.height.slice(0,image.style.height.length-2)/ scale_a / scale_h;
                image.style.width = width + "px";
                image.style.height = height + "px";
            }            
          
        });
    }
    $('#colorpickerBackground').colorpicker().on('changeColor', function(e) {
        if ($canvas) {
            canvas_color = e.color.toHex();
            $canvas.css("background-color", e.color.toHex());
        }
    });

    $('#canvasWidth').on('change', function() {
        $("#fullSizeDisplay").html($('#canvasWidth').val() + " X " + $('#canvasHeight').val());
        $canvas.width($(this).val() * canvas_scale);
        // droppable_width = $(this).val(); 
        // droppable_height = $(this).val();
        origin_canvas_height = origin_canvas_width / (droppable_width / droppable_height);
        $canvas.parent().height(origin_canvas_height * canvas_scale);


    });

    $('#canvasHeight').on('change', function() {
        $("#fullSizeDisplay").html($('#canvasWidth').val() + " X " + $('#canvasHeight').val());
        $canvas.height($(this).val() * canvas_scale);
        // $(".canvas_container").height($(this).val()*canvas_scale);
        // $(".canvas_container").css("height", ($(this).val()*canvas_scale);
        // $("#row_content").height($(this).val()*canvas_scale);
        // console.log($(this).val() * canvas_scale);
        // droppable_width = $canvas.width();
        droppable_height = $(this).val();
        origin_canvas_height = origin_canvas_width / (droppable_width / droppable_height);
        $canvas.parent().height(origin_canvas_height * canvas_scale+50);

    });

    //Canvas Zooming
    // $("#sliderCanvasZoom").slider("option", "value", 10);
    let scale = 100;
    $("#sliderCanvasZoom").slider({
        range: "max",
        min: 1,
        max: 100,
        value: 100,
        slide: function(event, ui) {
           scale_val = ui.value;
           $("#sliderDisplay").html(scale_val + "%");
            $("#rotateLayer").val(ui.value);
            // if ($activeLayer) {
            //     $activeLayer.css({ WebkitTransform: 'rotate(' + ui.value + 'deg)' });
            // }
            scale = ui.value/100;
            canvas_scale = scale;
            const x = $('#canvasWidth').val();
            const y = $('#canvasHeight').val();
            console.log("original", x, y);
            $canvas.width(x * scale_val/100);
            $canvas.height(y * scale_val/100);
            // $canvas.parent().height(origin_canvas_height * canvas_scale);
            

            // $canvas.parent().width(origin_canvas_width * canvas_scale);
            let image_divs = $("#canvas-background").find('> div');
            $("#canvas-background").find('> div').each(function(index){
                
                let x = image_pos[index].x;
                let y = image_pos[index].y;
                let width = image_pos[index].width;
                let height = image_pos[index].height;
                image_divs[index].style.left= x * scale + "px";
                image_divs[index].style.top= y * scale + "px";
                let div = $(this).find('> div')[0];
                let image = $(this).find('img')[0];
                if (image != undefined) {
                    image.style.width = width * scale+ "px";
                    image.style.height = height * scale+ "px";                 
                    div.style.width = width * scale+ "px";
                    div.style.height = height * scale+ "px";
                } else {
                    image_divs[index].style.width= width * scale + "px";
                    image_divs[index].style.height= height * scale + "px";
                    // div.css("font-size", text_font_size * scale);
                }               
            });
        }
    });
    var $activeLayer = null;

    $('.image-option').hide();
    $('.text-option').show();


    // insert text
    $('#insertText').on('click', function(e) {
        e.stopImmediatePropagation();
        var $text = $('<div class="layer text"><div class="text-body">Enter Text Here</div></div>');
        $text.css("width", 200);
        $text.appendTo($canvas);
        $text.draggable({ stack: ".layer" ,
        stop: function() {
            SetImagePosition()
        }
        }).resizable({ autoHide: true, handles: 'all',
            stop: function() {
                SetImagePosition();
            }
        });
        $text.css("z-index", 100);
        $text.find('.ui-resizable-nw').on('click', function() {
            bootbox.confirm("Do you want to delete text layer?", function(result) {
                if (result) {
                    $text.find('.ui-resizable-nw').parent().remove();
                }
            });
        });
        $text.on('click', function() {
            $activeLayer = $(this);
            console.log("click text")
            $('#blockText').val($(this).find('.text-body').text());
            $(".emoji-wysiwyg-editor").html($(this).find('.text-body').text());
            $('#colorpickerTextColor').colorpicker('setValue', $activeLayer.css("color"));
            var degress = getRotationDegrees($activeLayer);
            $("#sliderLayerRotate").slider("option", "value", degress);
            $("#rotateLayer").val(degress);

            $('.image-option').hide();
            $('.text-option').show();

        });

        $text.trigger("click");
        SetImagePosition();
    });

    $('#blockText').on('input propertychange', function() {
        if ($activeLayer) {
            $activeLayer.find('.text-body').text($(this).val());
        }
    });

    $('#fontpickerText').on('change.bfhselectbox', function() {
        if ($activeLayer) {
            $activeLayer.css("font-family", this.value);
        }
    });

    $('#fontsizepickerText').on('change.bfhselectbox', function() {
        if ($activeLayer) {
            text_font_size = this.value;
            $activeLayer.css("font-size", this.value + 'px');
        }
    });

    // Methods
    $('.text-mode-buttons').on('click', '[data-method]', function() {
        var $this = $(this);
        var data = $this.data();
        if (data.method == "setTextMode") {
            if ($activeLayer) {
                switch (data.option) {
                    case 'left':
                    case 'right':
                    case 'center':
                        $activeLayer.css('text-align', data.option);
                        break;
                    case 'bold':
                        if ($activeLayer.css('font-weight') == 'bold') {
                            $activeLayer.css('font-weight', 'normal');
                        } else {
                            $activeLayer.css('font-weight', 'bold');
                        }
                        break;
                    case 'italic':
                        if ($activeLayer.css('font-style') == 'italic') {
                            $activeLayer.css('font-style', 'normal');
                        } else {
                            $activeLayer.css('font-style', 'italic');
                        }
                        break;
                    case 'underline':
                        if ($activeLayer.css('text-decoration') == 'underline') {
                            $activeLayer.css('text-decoration', 'none');
                        } else {
                            $activeLayer.css('text-decoration', 'underline');
                        }
                        break;
                }
            }
        }
    });

    $('#colorpickerTextColor').colorpicker().on('changeColor', function(e) {
        if ($activeLayer) {
            $activeLayer.css("color", e.color.toHex());
        }
    });


    $("#sliderLayerRotate").slider({
        range: "max",
        min: -180,
        max: 180,
        value: 0,
        slide: function(event, ui) {
            $("#rotateLayer").val(ui.value);
            if ($activeLayer) {
                $activeLayer.css({ WebkitTransform: 'rotate(' + ui.value + 'deg)' });
            }
        }
    });

    $("#rotateLayer").on('change', function() {
        $("#sliderLayerRotate").slider("option", "value", $(this).val());
        if ($activeLayer) {
            $activeLayer.css({ WebkitTransform: 'rotate(' + $(this).val() + 'deg)' });
        }
    });

    $("#sliderImageOpacity").slider({
        range: "max",
        min: 0,
        max: 100,
        value: 100,
        slide: function(event, ui) {
            $("#opacityImage").val(ui.value);
            if ($activeLayer) {
                $activeLayer.css('opacity', ui.value / 100);
            }
        }
    });

    $("#opacityImage").on('change', function() {
        $("#sliderImageOpacity").slider("option", "value", $(this).val());
        if ($activeLayer) {
            $activeLayer.css('opacity', $(this).val() / 100);
        }
    });


    // Canvas
let resize_width, resize_height;
    $('#canvas-background').droppable({
        accept: ".picture",
        tolerance: "pointer",
        drop: function(ev, ui) {
            // console.log("ev", ev, "ui", ui);

            var element = $(ui.draggable).clone();
            let leftPosition  = ui.offset.left - $(this).offset().left;
            let topPosition   = ui.offset.top - $(this).offset().top;

            // console.log("element", element);
            // element[0].style.top = topPosition+"px";
            // element[0].style.left = leftPosition+"px";
            // console.log("test postiont", ui.draggable.position(), "test offset", ui.offset, $(this).offset());
            let droppable_temp_width = droppable_width * canvas_scale;
            let droppable_temp_height = droppable_height * canvas_scale;
            
            if (scale == 100) {
                if (element[0].naturalWidth+leftPosition > droppable_temp_width) {
                    leftPosition = droppable_temp_width - element[0].naturalWidth;

                }
                if (element[0].naturalHeight+topPosition > droppable_temp_height) {
                    topPosition = droppable_temp_height - element[0].naturalHeight;
                }
                
                if (element[0].naturalWidth > droppable_temp_width) {
                    leftPosition = ui.offset.left - $(this).offset().left;
                    topPosition = ui.offset.top - $(this).offset().top;
                    if ($canvas.width()/2+leftPosition > droppable_temp_width) {
                        leftPosition = droppable_temp_width - $canvas.width()/2;
                    }
                    if ($canvas.height()/2+topPosition > droppable_temp_height) {
                        topPosition = droppable_temp_height - $canvas.height()/2;
                    }
                    
                    // element.width(droppable_temp_width-150);
                     element.width($canvas.width()/2);
                }
                if (element[0].naturalHeight > droppable_temp_height) {
                    leftPosition = ui.offset.left - $(this).offset().left;
                    topPosition = ui.offset.top - $(this).offset().top;
                    if ($canvas.height()/2 + topPosition > droppable_temp_height) {
                        topPosition = droppable_temp_height - $canvas.height()/2;
                    }
                    if ($canvas.width()/2+leftPosition > droppable_temp_width) {
                        leftPosition = droppable_temp_width - $canvas.width()/2;
                    }

                    // element.height(droppable_temp_height-150);
                    element.height($canvas.height()/2);
                }
            } else {
                console.log("element", element[0].naturalWidth, element[0].naturalHeight);
                console.log("ui", ui.offset.left, ui.offset.top);
                console.log("this", $(this).offset().left, $(this).offset().top);
                console.log("canvas", $canvas.width(), $canvas.height());
                if (element[0].naturalWidth+leftPosition > $canvas.width()) {
                    leftPosition = $canvas.width() - element[0].naturalWidth;

                }
                if (element[0].naturalHeight+topPosition > $canvas.height()) {
                    topPosition = $canvas.height() - element[0].naturalHeight;
                }
                if (element[0].naturalWidth > $canvas.width()) {
                    leftPosition = ui.offset.left - $(this).offset().left;
                    topPosition = ui.offset.top - $(this).offset().top;
                    if ($canvas.width()/2+leftPosition > $canvas.width()) {
                        leftPosition = $canvas.width() - $canvas.width()/2;
                    }
                    if ($canvas.height()/2+topPosition > $canvas.height()) {
                        topPosition = $canvas.height() - $canvas.height()/2;
                    }
                    
                    // element.width(droppable_temp_width-150);
                     element.width($canvas.width()/2);
                }
                if (element[0].naturalHeight > $canvas.height()) {
                    leftPosition = ui.offset.left - $(this).offset().left;
                    topPosition = ui.offset.top - $(this).offset().top;
                    if ($canvas.height()/2 + topPosition > $canvas.height()) {
                        topPosition = $canvas.height() - $canvas.height()/2;
                    }
                    if ($canvas.width()/2+leftPosition > $canvas.width()) {
                        leftPosition = $canvas.width() - $canvas.width()/2;
                    }

                    // element.height(droppable_temp_height-150);
                    element.height($canvas.height()/2);
                }
            }
            
            if (leftPosition < 0) {
                leftPosition = 0;
            }
            if (topPosition < 0) {
                topPosition = 0;
            }

            // element.css({
            //     "position": "absolute",
            //     "left": leftPosition,
            //     "top": topPosition
            // })
            element.removeClass('picture');
            element.addClass('layer');
            // let imgWrap = $('<div class="layer image"></div>');
            // imgWrap.style.inset = "0px auto auto 0px";
            var wrapper = $('<div class="layer image"></div>').append(element);
            wrapper.css({
                "position": "absolute",
                "left": leftPosition,
                "top": topPosition,
                "z-index": 50
            })
            // wrapper.style.left = leftPosition;
            // wrapper.style.top = topPosition;
            // wrapper.style.inset = "0px auto auto 0px";
            // console.log("wrapper", wrapper);
            // wrapper.css("width", "100px");
            $(this).append(wrapper);
           
            wrapper.draggable({ 
                containment: $('#canvas-background'),
                start: function (event, ui) {
                    $canvas.find('.text').css("z-index", 100);
                    console.log(element.width(), element.height());
                    // console.log(resize_width, resize_height);
                    // console.log("resize_width", resize_width, resize_height);
                    ui.helper.width(element.width());
                    ui.helper.height(element.height());
                    // console.log("ui drag", ui.helper[0]);
                    // ui.helper.width(200);
                    // console.log("text1", $text);
                    // $text.css("z-index", 100);
                },
                stop: function() {

                    SetImagePosition();
    
                },
                stack: ".layer", 
                cursor: "move" })

              
                element.resizable({ autoHide: true, handles: 'all' ,
                start: function(event, ui) {
                    console.log("ui", ui.element.parent());
                    resize_width = ui.element.width();
                    resize_height = ui.element.height();
                    ui.helper.width(ui.element.width());
                    ui.helper.height(ui.element.height());
                    ui.element.parent().width(ui.element.width());
                    ui.element.parent().height(ui.element.height());
                    // console.log("ui resize", ui.element.width());
                },
                stop:function(){
                    console.log("image is resizing.....");
                    SetImagePosition();
                }});

                wrapper.find('.ui-resizable-nw').on('click', function() {
                bootbox.confirm("Do you want to delete image layer?", function(result) {
                    if (result) {
                        wrapper.find('.ui-resizable-nw').parent().parent().remove();
                    }
                });
            });
         
            wrapper.on('click', function() {
                $activeLayer = $(this);

                var degress = getRotationDegrees($activeLayer);
                $("#sliderLayerRotate").slider("option", "value", degress);
                $("#rotateLayer").val(degress);

                var opacity = Math.round($activeLayer.css('opacity') * 100);
                $("#sliderImageOpacity").slider("option", "value", opacity);
                $("#opacityImage").val(opacity);

                $('.text-option').show();
                $('.image-option').show();

            });

            wrapper.trigger("click");
            SetImagePosition();
        }
    });

    // Methods
    $('.image-mode-buttons').on('click', '[data-method]', function() {
        var $this = $(this);
        var data = $this.data();
        if (data.method == "setImageMode") {
            if ($activeLayer) {
                switch (data.option) {
                    case 'horizontal':
                        var scale = data.value;
                        $activeLayer.css({ WebkitTransform: 'scaleX(' + scale + ')' });
                        $this.data('value', -scale);
                        break;
                    case 'vertical':
                        var scale = data.value;
                        $activeLayer.css({ WebkitTransform: 'scaleY(' + scale + ')' });
                        $this.data('value', -scale);
                        break;
                }
            }
        }
    });

    // $("#dropdown-toggle").on("click", function(e) {    
    //     $("#dropdown-menu").show();
    // })
    $("#dropdown-toggle-p").on("click", function(e) {
        $("#dropdown-menu-p").show();
    })
    // Open
    $('#openButton').on('click', function(e) {
        e.stopImmediatePropagation();
        // $(this).parent().hide();
        try {
            var evt = mouseEvent("click", 1, 50, 1, 50);
            dispatchEvent($('#openFile').get(0), evt);
        } catch (error) {}
    });

    $('#openFile').on('click', function(e) {
        try {
            e.stopPropagation();
        } catch (error) {}
    });


    $("#openFile").on('change', function(e) {
        e.stopImmediatePropagation();
        var files = $(this).prop('files');
        if (!(files && files.length) && !$(this).val()) {
            return;
        }
        if (files && files.length) {
            $.each(files, function(i, file) {
                // $("#change_file_name").css("display","inline-block")
                var $li = $(getImg(file));
                $('#photoBasket').append($li);
                $li.find('img').draggable({
                    
                    appendTo: "body",
                    helper: "clone",
                    start: function(e, ui) {
                        ui.helper.animate({
                            width: 160,
                            height: 90
                        });
                    },
                    cursor: "move",
                    cursorAt: { left: 40, top: 25 },
                });
                $li.find('.span-close-picture').on('click', function() {
                    if (confirm("Do you want to delete picture?")) {
                        $(this).parent().remove();
                    }
                });
            });
        }
    });
    // Opern from Dropbox
    $("#LoadMutipleFromDropbox").on("click", function(e) {
        e.stopImmediatePropagation();
        // $(this).parent().hide();
        dropins.choose({

                success: function(files) {
                    if (files && files.length) {
                        $.each(files, function(i, file) {
                          if(user_group!="FREE"){
                            fetch(files[i].link)
                            .then(resp => resp.blob())
                            .then(blob => {
                                // console.log("blob", blob)
                                // loader(false);
                                var $li = $(getImg(blob));
                                $('#photoBasket').append($li);
                                $li.find('img').draggable({
                                    
                                    appendTo: "body",
                                    helper: "clone",
                                    start: function(e, ui) {
                                        ui.helper.animate({
                                            width: 160,
                                            height: 90
                                        });
                                    },
                                    cursor: "move",
                                    cursorAt: { left: 40, top: 25 },
                                });
                                $li.find('.span-close-picture').on('click', function() {
                                    if (confirm("Do you want to delete picture?")) {
                                        $(this).parent().remove();
                                    }
                                });
                                // previewAnduploadProject(blob);
                            })
                            .catch(r => r.json())
                            .catch(e => console.log(e));
                           } else{
                                Swal.fire("This is a PRO Feature","In order to use this feature, please upgrade to PRO.","error");
                                $("#change_file_name").css("display","none");
                            }
                            
                        });
                    }
                },
                cancel: function() {
                    // loader(false);
                },
                linkType: "direct", // or "direct"
                multiselect: true, // or true
                extensions: [".jpg", '.png', '.gif', '.jpeg'],
                folderselect: false, // or true
            })

    })
    //Open from Google
    $("#LoadMutipleFromGoogleDrive").on("click", function(e) {
        // e.preventDefault();
      e.stopImmediatePropagation();
      // $(this).parent().hide();
      loadImgPicker()
    })
    function getImg(file) {
        var img = 'N/A',
            url;
        if (URL && file) {
            if (/^image\/\w+$/.test(file.type)) {
                url = URL.createObjectURL(file);
                img = '<li><img class="picture" src="' + url + '" data-file="' + file + '"><span class="glyphicon glyphicon-remove span-close-picture"></span></li>';
            }
        }
        return img;
    }

    function debugBase64(base64URL, width, height){
            var win = window.open();
            win.document.write('<img src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:' + width  + '; height:' + height  + ';" allowfullscreen></img>');
            win.document.close()
        }
    $('#fullSizeBtn').on('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var link = document.createElement('a');
        let p_w = $canvas.parent().width();
        let p_h = $canvas.parent().height();
        // $canvas.width(droppable_width * 1 + 20 * 1);
        // $canvas.height(droppable_height * 1  + 20 * 1);
        console.log("drop", droppable_width, droppable_height);
        // SetImagePosOriginal(canvas_scale);   
        // $canvas.width($('#canvasWidth').val());
        // $canvas.height($('#canvasHeight').val());
        // console.log
        html2canvas(document.getElementById('canvas-background'), { allowTaint: true, useCORS: true }).then(function(canvas) {
            $('.layer').removeClass('no-border');
            
            var fileName = $('#fileName').val() + '.' + $('input[name=fileExt]:checked').val();
            // $('#saveFile').attr('href', canvas.toDataURL('image/' + $('input[name=fileExt]:checked').val()));
            // $('#saveFile').attr('download', fileName);
            // var evt = mouseEvent("click", 1, 50, 1, 50);
            // dispatchEvent($('#saveFile').get(0), evt);

            debugBase64(canvas.toDataURL('image/' + $('input[name=fileExt]:checked').val()),$('#canvasWidth').val(), $('#canvasHeight').val());
            $canvas.width($('#canvasWidth').val()*scale);
            $canvas.height($('#canvasHeight').val()*scale);
            SetImagePosOriginal(1/canvas_scale);
            // $canvas.parent().width(p_w);
            // $canvas.parent().height(p_h);
        });
    })
    // Save
    $('#saveButton').on('click', function(e) {
       
        $('#saveModal').modal();
        $('#saveModal').on('shown.bs.modal', function() {
            var fileName = 'baner' + new Date().toISOString();
            $('#fileName').val(fileName);
        });
    });

    $('#saveButtonModal').on('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $('#saveModal').modal('hide');
        $('.layer').addClass('no-border');
        let p_w = $canvas.parent().width();
        let p_h = $canvas.parent().height();


        $canvas.parent().width(droppable_width * 1 + 20 * 1);
        $canvas.parent().height(droppable_height * 1  + 20 * 1);
        let scale_w = origin_canvas_width / droppable_width;
        let scale_h = origin_canvas_height / droppable_height;
        SetImagePosOriginal(canvas_scale , scale_w,scale_h);   
        $canvas.width(droppable_width );
        $canvas.height(droppable_height);
       


        html2canvas(document.getElementById('canvas-background'), { allowTaint: true, useCORS: true }).then(function(canvas) {
            $('.layer').removeClass('no-border');
            
            var fileName = $('#fileName').val() + '.' + $('input[name=fileExt]:checked').val();
            $('#saveFile').attr('href', canvas.toDataURL('image/' + $('input[name=fileExt]:checked').val()));
            $('#saveFile').attr('download', fileName);
            var evt = mouseEvent("click", 1, 50, 1, 50);
            dispatchEvent($('#saveFile').get(0), evt);
            console.log("origin", origin_canvas_width, "canvas_scale", canvas_scale,"pw", p_w);
            $canvas.width(origin_canvas_width * canvas_scale - 1);
            $canvas.height(origin_canvas_height * canvas_scale);
            SetImagePosOriginal(1/canvas_scale , 1/scale_w, 1/scale_h);
            // $canvas.parent().width(p_w);
            // $canvas.parent().height(p_h);
        });
        
    });
    // Save to Dropbox
    $('#DropBoxUploadButton').on('click', function(e) {
       
        $('#saveToDropboxModal').modal();
        $('#saveToDropboxModal').on('shown.bs.modal', function() {
            var fileName = 'baner to dropbox' + new Date().toISOString();
            $('#fileDropboxName').val(fileName);
        });
    });

    $('#DropBoxUploadButtonModal').on('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $('#saveToDropboxModal').modal('hide');
        $('.layer').addClass('no-border');
        let p_w = $canvas.parent().width();
        let p_h = $canvas.parent().height();


        $canvas.parent().width(droppable_width * 1 + 20 * 1);
        $canvas.parent().height(droppable_height * 1  + 20 * 1);
        SetImagePosOriginal(canvas_scale);   
       
        $canvas.width(droppable_width );
        $canvas.height(droppable_height);


        html2canvas(document.getElementById('canvas-background'), { allowTaint: true, useCORS: true }).then(function(canvas) {
            $('.layer').removeClass('no-border');
            var fileName = $('#fileDropboxName').val() + '.' + $('input[name=fileExt]:checked').val();
            const options = {
                    files: [
                        {
                        url: canvas.toDataURL('image/' + $('input[name=fileExt]:checked').val()), 
                        filename: fileName
                        }
                    ],
                    success: function() {
                        console.log("Your image has been successfully uploaded to Dropbox!");
                        Swal.fire("Success","Your image has been successfully uploaded to Dropbox!","success") 
                    },
                    cancel: function() {
                    },
                    error: function(error) {
                        console.log("Error","An error has occured!","error");
                        Swal.fire("Error","An error has occured!","error") 
                    }
                }
            if(user_group!="FREE"){
                    dropins.save(options);
                }else{
                    Swal.fire("This is a PRO Feature","In order to use this feature, please upgrade to PRO.","error")
                }
            // $('#saveFile').attr('href', canvas.toDataURL('image/' + $('input[name=fileExt]:checked').val()));
            // $('#saveFile').attr('download', fileName);
            // var evt = mouseEvent("click", 1, 50, 1, 50);
            // dispatchEvent($('#saveFile').get(0), evt);
            
            $canvas.width(droppable_width * canvas_scale);
            $canvas.height(droppable_height * canvas_scale);
            SetImagePosOriginal(1/canvas_scale); 
            // $canvas.parent().width(p_w);
            // $canvas.parent().height(p_h);  

        });
        
    });

    //Save to Google Drive
    $('#googleDriveUploadButton').on('click', function(e) {
     
        $('#saveToGoogleDriveModal').modal();
        $('#saveToGoogleDriveModal').on('shown.bs.modal', function() {
            var fileName = 'baner to googleD' + new Date().toISOString();
            $('#fileGoogleDriveName').val(fileName);
        });
    });

    $('#googleDriveUploadButtonModal').on('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $('#saveToGoogleDriveModal').modal('hide');
        $('.layer').addClass('no-border');
        if(user_group!="FREE"){
                    Swal.fire("This is a PRO Feature","In order to use this feature, please upgrade to PRO.","error")
                    return true;
                }

        let p_w = $canvas.parent().width();
        let p_h = $canvas.parent().height();


        $canvas.parent().width(droppable_width * 1 + 20 * 1);
        $canvas.parent().height(droppable_height * 1  + 20 * 1);
        SetImagePosOriginal(canvas_scale);   
       
        $canvas.width(droppable_width );
        $canvas.height(droppable_height);


        html2canvas(document.getElementById('canvas-background'), { allowTaint: true, useCORS: true }).then(function(canvas) {
            $('.layer').removeClass('no-border');
            var fileName = $('#fileGoogleDriveName').val() + '.' + $('input[name=fileExt]:checked').val();
            if(oauthToken) {
                    //upload to goole drive
                uploadToGooleDrive(fileName, dataURLtoBlob(canvas.toDataURL('image/' + $('input[name=fileExt]:checked').val())));
            } else {
                loadPickerToGoogle();
            }
            
            // $('#saveFile').attr('href', canvas.toDataURL('image/' + $('input[name=fileExt]:checked').val()));
            // $('#saveFile').attr('download', fileName);
            // var evt = mouseEvent("click", 1, 50, 1, 50);
            // dispatchEvent($('#saveFile').get(0), evt);
            $('#canvas-background').width(droppable_width * canvas_scale);
            $('#canvas-background').height(droppable_height * canvas_scale);
            SetImagePosOriginal(1/canvas_scale);   
            // $canvas.parent().width(p_w);
            // $canvas.parent().height(p_h);
        });
        
    });



    $('#printButton').on('click', function(e) {
        $('.layer').addClass('no-border');
        html2canvas(document.getElementById('canvas-background'), { allowTaint: true }).then(function(canvas) {
            $('.layer').removeClass('no-border');
            var win = window.open();
            win.document.write("<br><img src='" + canvas.toDataURL() + "'/>");
            win.print();
        });
    });


    // Save Project
    $('#saveProjectButton').on('click', function(e) {
        $('#saveProjectModal').modal();
        $('#saveProjectModal').on('shown.bs.modal', function() {
            var fileName = 'project' + new Date().toISOString() + '.txt';
            $('#fileProjectName').val(fileName);
        });
    });



    $('#saveButtonProjectModal').on('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $('#saveProjectModal').modal('hide');

        var div = $('<div></div>');
        $("#canvas-background").find('.text').each(function() {
            $(this).resizable("destroy");
        });
        $("#canvas-background").find('img').each(function() {
            $(this).resizable("destroy");
        });


        $($("#canvas-background").clone()).appendTo(div);


        $(div).find('img').each(function() {
            var img = $(this).get(0);
            var imgData = getBase64Image(img);
            img.src = "data:image/png;base64," + imgData;
        });

        $("#canvas-background").find('.text').each(function() {
            $(this).resizable({ autoHide: true, handles: 'all' });
            $(this).find('.ui-resizable-nw').on('click', function() {
                if (confirm("Do you want to delete text layer?")) {
                    $(this).parent().remove();
                }
            });
        });

        $("#canvas-background").find('img').each(function() {
            $(this).resizable({ autoHide: true, handles: 'all' });
            $(this).find('.ui-resizable-nw').on('click', function() {
                if (confirm("Do you want to delete image layer?")) {
                    $(this).parent().remove();
                }
            });
        });

        var fileName = $('#fileProjectName').val();
        const fileUrl = makeTextFile(escape($(div).html()));
        $('#saveProjectFile').attr('href', makeTextFile(escape($(div).html())));
        $('#saveProjectFile').attr('download', fileName);
        var evt = mouseEvent("click", 1, 50, 1, 50);
        dispatchEvent($('#saveProjectFile').get(0), evt);

    });

    //Save Project To Dropbox
    $('#saveProjectToDropboxButton').on('click', function(e) {
        $('#saveProjectToDropboxModal').modal();
        $('#saveProjectToDropboxModal').on('shown.bs.modal', function() {
            var fileName = 'project' + new Date().toISOString() + '.txt';
            $('#fileProjectToDropboxName').val(fileName);
        });
    });
    $('#saveButtonProjectToDropboxModal').on('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $('#saveProjectToDropboxModal').modal('hide');

        var div = $('<div></div>');
        $("#canvas-background").find('.text').each(function() {
            $(this).resizable("destroy");
        });
        $("#canvas-background").find('img').each(function() {
            $(this).resizable("destroy");
        });


        $($("#canvas-background").clone()).appendTo(div);


        $(div).find('img').each(function() {
            var img = $(this).get(0);
            var imgData = getBase64Image(img);
            img.src = "data:image/png;base64," + imgData;
        });

        $("#canvas-background").find('.text').each(function() {
            $(this).resizable({ autoHide: true, handles: 'all' });
            $(this).find('.ui-resizable-nw').on('click', function() {
                if (confirm("Do you want to delete text layer?")) {
                    $(this).parent().remove();
                }
            });
        });

        $("#canvas-background").find('img').each(function() {
            $(this).resizable({ autoHide: true, handles: 'all' });
            $(this).find('.ui-resizable-nw').on('click', function() {
                if (confirm("Do you want to delete image layer?")) {
                    $(this).parent().remove();
                }
            });
        });

        var fileName = $('#fileProjectToDropboxName').val();
        const file_url = makeTextFile(escape($(div).html()));
        // console.log("file_url", file_url);
        const options = {
                    files: [
                        {
                        url: file_url, 
                        filename: fileName
                        }
                    ],
                    success: function() {
                        console.log("Success","Your image has been successfully uploaded to Dropbox!")
                        Swal.fire("Success","Your image has been successfully uploaded to Dropbox!","success") 
                    },
                    cancel: function() {
                    },
                    error: function(error) {
                        console.log("Error","An error has occured!");
                        Swal.fire("Error","An error has occured!","error") 
                    }
        }
        
        // if(user_group!="FREE"){
        //             dropins.save(options);
        //         }else{
        //             Swal.fire("This is a PRO Feature","In order to use this feature, please upgrade to PRO.","error")
        //         }
        if(user_group!="FREE"){
                    dropins.save(options);
                }else{
                    Swal.fire("This is a PRO Feature","In order to use this feature, please upgrade to PRO.","error")
                }        // $('#saveProjectFile').attr('href', makeTextFile(escape($(div).html())));
        // $('#saveProjectFile').attr('download', fileName);
        // var evt = mouseEvent("click", 1, 50, 1, 50);
        // dispatchEvent($('#saveProjectFile').get(0), evt);

    });
// Save Project to Goodgle Drive

$('#saveProjectToGoogleDriveButton').on('click', function(e) {
        $('#saveProjectToGoogleDriveModal').modal();
        $('#saveProjectToGoogleDriveModal').on('shown.bs.modal', function() {
            var fileName = 'project' + new Date().toISOString() + '.txt';
            $('#fileProjectToGoogleDriveName').val(fileName);
        });
    });



    $('#saveButtonProjectToGoogleDriveModal').on('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $('#saveProjectToGoogleDriveModal').modal('hide');

        var div = $('<div></div>');
        $("#canvas-background").find('.text').each(function() {
            $(this).resizable("destroy");
        });
        $("#canvas-background").find('img').each(function() {
            $(this).resizable("destroy");
        });


        $($("#canvas-background").clone()).appendTo(div);


        $(div).find('img').each(function() {
            var img = $(this).get(0);
            var imgData = getBase64Image(img);
            img.src = "data:image/png;base64," + imgData;
        });

        $("#canvas-background").find('.text').each(function() {
            $(this).resizable({ autoHide: true, handles: 'all' });
            $(this).find('.ui-resizable-nw').on('click', function() {
                if (confirm("Do you want to delete text layer?")) {
                    $(this).parent().remove();
                }
            });
        });

        $("#canvas-background").find('img').each(function() {
            $(this).resizable({ autoHide: true, handles: 'all' });
            $(this).find('.ui-resizable-nw').on('click', function() {
                if (confirm("Do you want to delete image layer?")) {
                    $(this).parent().remove();
                }
            });
        });
        if(user_group=="FREE"){
                    Swal.fire("This is a PRO Feature","In order to use this feature, please upgrade to PRO.","error")
                    return true;
                }
        var fileName = $('#fileProjectName').val();
        const file = makeTextFile(escape($(div).html()));
        // console.log("file", file, file.type)
        // console.log("ghghg",makeTextFile(escape($(div).html())));
        if(oauthToken) {
                    //upload to goole drive
                uploadProjectToGooleDrive(file, fileName);
            } else {
                loadPickerToGoogle();
            }
        // $('#saveProjectFile').attr('href', makeTextFile(escape($(div).html())));
        // $('#saveProjectFile').attr('download', fileName);
        // var evt = mouseEvent("click", 1, 50, 1, 50);
        // dispatchEvent($('#saveProjectFile').get(0), evt);

    });
    // Open Project
    $('#openProjectButton').on('click', function(e) {
        e.stopImmediatePropagation();
        // $(this).parent().hide();
        try {
            var evt = mouseEvent("click", 1, 50, 1, 50);
            dispatchEvent($('#openProjectFile').get(0), evt);
        } catch (error) {}
    });

    $('#openProjectFile').on('click', function(e) {
        
        try {
            e.stopPropagation();
        } catch (error) {}
    });

    $("#openProjectFile").on('change', function(e) {
        e.stopImmediatePropagation();
        var files = $(this).prop('files');
        if (!(files && files.length) && !$(this).val()) {
            return;
        }

        if (files && files.length) {
            $.each(files, function(i, file) {
                previewAnduploadProject(file);


            });
        }

    });
    // Open Project From Dropbox
    
    $('#LoadProjectFromDropbox').on("click", function(e) {
        // e.preventDefault();
        e.stopImmediatePropagation();
        // $(this).parent().hide();
        dropins.choose({

                success: function(files) {
                    // loader(true);
                    // if(user_group!="FREE"){
                    //     file_name.innerHTML = files[0].name;
                    // }
                    
                    // link = files[0].link;
                    // console.log("files", files, "link", files[0])
                    fetch(files[0].link)
                    .then(resp => resp.blob())
                    .then(blob => {
                        // console.log("blob", blob)
                        // loader(false);
                        previewAnduploadProject(blob);
                    })
                    .catch(r => r.json())
                    .catch(e => console.log(e));
                },
                cancel: function() {
                    // loader(false);
                },
                linkType: "direct", // or "direct"
                multiselect: false, // or true
                extensions: [".txt"],
                folderselect: false, // or true
            })
    })

    //Open Project From Google Drive
    $("#LoadProjectFromGoogleDrive").on("click", function(e) {
          // e.preventDefault();
          e.stopImmediatePropagation();
          // $(this).parent().hide();
          loadPicker()
    })
    
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
    function loadImgPicker() {
      if (oauthToken) {
        gapi.load('picker', {'callback': onPickerImgApiLoad});
      } else {
        gapi.load('auth', {'callback': onAuthImgApiLoad});
        gapi.load('picker', {'callback': onPickerImgApiLoad});
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
    function onAuthImgApiLoad() {
      window.gapi.auth.authorize(
      {
        'client_id': clientId,
        'scope': scope,
        'immediate': false
      },
      handleAuthImgResult);
      
    }
    function onPickerImgApiLoad() {
      pickerApiLoaded = true;
      createPickerImg();
    }
    function onPickerApiLoad() {
      pickerApiLoaded = true;
      createPicker();
    }
    function handleAuthImgResult(authResult) {
      if (authResult && !authResult.error) {
        oauthToken = authResult.access_token;
        createPickerImg();
      }
    }
    function handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        oauthToken = authResult.access_token;
        createPicker();
      }
    }
    function createPickerImg() {
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
          .setCallback(pickerImgCallback)
          .build();
        picker.setVisible(true);
      }
    }
    function createPicker() {
      if (pickerApiLoaded && oauthToken) {
        var view = new google.picker.View(google.picker.ViewId.DOCS);
        view.setMimeTypes("text/plain,image/jpeg,image/jpg");
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
    function pickerImgCallback(data) {
      
      if (data.action == google.picker.Action.PICKED) {
        var fileId = data.docs[0].id;
        var files = data.docs;
        // loader(true);
        if (files && files.length) {
                        $.each(files, function(i, file) {
                            fetch("https://www.googleapis.com/drive/v3/files/"+file.id+'?alt=media', {
                              method: "GET",
                              headers: new Headers({
                                Authorization: 'Bearer '+oauthToken,
                              })
                            })
                            .then(resp => resp.blob())
                            .then(blob => {
                                // console.log("blob", blob)
                                // loader(false);
                                if(user_group!="FREE"){
                                var $li = $(getImg(blob));
                                $('#photoBasket').append($li);
                                $li.find('img').draggable({
                                    
                                    appendTo: "body",
                                    helper: "clone",
                                    start: function(e, ui) {
                                        ui.helper.animate({
                                            width: 160,
                                            height: 90
                                        });
                                    },
                                    cursor: "move",
                                    cursorAt: { left: 40, top: 25 },
                                });
                                $li.find('.span-close-picture').on('click', function() {
                                    if (confirm("Do you want to delete picture?")) {
                                        $(this).parent().remove();
                                    }
                                });
                                }else{
                                    Swal.fire("This is a PRO Feature","In order to use this feature, please upgrade to PRO.","error")
                                    $("#change_file_name").css("display","none")
                                }
                                // previewAnduploadProject(blob);
                            })
                            .catch(e => console.log(e));
                            
                        });
                    }
    
      }
    }
      // let file_name_google = document.getElementById("file_name_text");
    function pickerCallback(data) {
      
      if (data.action == google.picker.Action.PICKED) {
        var fileId = data.docs[0].id;
        // loader(true);
        
        
        fetch("https://www.googleapis.com/drive/v3/files/"+fileId+'?alt=media', {
          method: "GET",
          headers: new Headers({
            Authorization: 'Bearer '+oauthToken,
          })
        })
        .then(response => response.blob())
        .then(blob => {
          // loader(false);
          // file_name_google.innerHTML = data.docs[0].name;
          previewAnduploadProject(blob);
        }).catch(error => {
          // loader(false);
          console.log('unable to load image from google drive');
        });
    
      }
    }

});

// Utils
function makeTextFile(text) {
    var data = new Blob([text], { type: 'text/plain' });
    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }
    var textFile = window.URL.createObjectURL(data);
    return textFile;
};




function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}


function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
        obj.css("-moz-transform") ||
        obj.css("-ms-transform") ||
        obj.css("-o-transform") ||
        obj.css("transform");
    if (matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle + 360 : angle;
}

function mouseEvent(type, sx, sy, cx, cy) {
    var evt;
    var e = {
        bubbles: true,
        cancelable: (type != "mousemove"),
        view: window,
        detail: 0,
        screenX: sx,
        screenY: sy,
        clientX: cx,
        clientY: cy,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        button: 0,
        relatedTarget: undefined
    };
    if (typeof(document.createEvent) == "function") {
        evt = document.createEvent("MouseEvents");
        evt.initMouseEvent(type,
            e.bubbles, e.cancelable, e.view, e.detail,
            e.screenX, e.screenY, e.clientX, e.clientY,
            e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
            e.button, document.body.parentNode);
    } else if (document.createEventObject) {
        evt = document.createEventObject();
        for (prop in e) {
            evt[prop] = e[prop];
        }
        evt.button = { 0: 1, 1: 4, 2: 2 }[evt.button] || evt.button;
    }
    return evt;
}

function dispatchEvent(el, evt) {
    if (el.dispatchEvent) {
        el.dispatchEvent(evt);
    } else if (el.fireEvent) {
        el.fireEvent('on' + type, evt);
    }
    return evt;
}
function uploadProjectToGooleDrive(file, fileName) {
            // As a sample, upload a text file.
            var metadata = {
                'name': fileName, // Filename at Google Drive
                'mimeType': 'text/plain', // mimeType at Google Drive
            };

            var accessToken = oauthToken; // Here gapi is used for retrieving the access token.
            var form = new FormData();
            form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            form.append('file', file);
            fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
                method: 'POST',
                headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
                body: form,
            }).then((res) => {
                return res.json();
            }).then(function(val) {
                console.log(val);
                Swal.fire("Success","Your image has been successfully uploaded to Google Drive!","success") 
            })
            .catch(err => console.log(err));
}
function uploadToGooleDrive(fileName, file) {
            // As a sample, upload a text file.
            var metadata = {
                'name': fileName, // Filename at Google Drive
                'mimeType': file.type, // mimeType at Google Drive
            };

            var accessToken = oauthToken; // Here gapi is used for retrieving the access token.
            var form = new FormData();
            form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            form.append('file', file);
            fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
                method: 'POST',
                headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
                body: form,
            }).then((res) => {
                return res.json();
            }).then(function(val) {
                console.log(val);
                Swal.fire("Success","Your image has been successfully uploaded to Google Drive!","success") 
            })
            .catch(err => console.log(err));
}
function dataURLtoBlob(dataurl) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            const blob = new Blob([u8arr], {type:mime})
            blob.name = new Date().getUTCMilliseconds()+'-compresssed_file.'+mime.split('/')[1];
            return blob;
}
function loadPickerToGoogle() {
            if(gapi.load('auth', {'callback': onAuthApiGLoad})){
                eventFire(document.getElementById('googleDriveUploadButton'), 'click');
                return true;
            }
}

        function eventFire(el, etype){
            if (el.fireEvent) {
              el.fireEvent('on' + etype);
            } else {
              var evObj = document.createEvent('Events');
              evObj.initEvent(etype, true, false);
              el.dispatchEvent(evObj);
            }
          }
        
        function onAuthApiGLoad() {
            window.gapi.auth.authorize(
            {
                'client_id': clientId,
                'scope': scope,
                'immediate': false
            },
            handleAuthResultToGoogle);
        }
        function handleAuthResultToGoogle(authResult) {
            if (authResult && !authResult.error) {
                oauthToken = authResult.access_token;
            }
        }
        function previewAnduploadProject(file) {
            if(user_group!="FREE"){
            if (file) {
                    var r = new FileReader();
                    r.onload = function(e) {
                        var $canvasBackground = $(unescape(e.target.result));
                        if ($canvasBackground.width() && $canvasBackground.width() > 400) {
                            $("#canvas-background").width($canvasBackground.width());
                        }
                        if ($canvasBackground.height() && $canvasBackground.height() > 400) {
                            $("#canvas-background").height($canvasBackground.height());
                        }
                        if ($canvasBackground.css('background-color')) {
                            $("#canvas-background").css('background-color', $canvasBackground.css('background-color'));
                        }

                        $($canvasBackground.html()).appendTo($("#canvas-background"));

                        $('.text').draggable({ stack: ".layer" }).resizable({ autoHide: true, handles: 'all' });
                        $('.text').find('.ui-resizable-nw').on('click', function() {
                            if (confirm("Do you want to delete text layer?")) {
                                $(this).parent().remove();
                            }
                        });
                        $('.text').on('click', function() {
                            $activeLayer = $(this);

                            $('#blockText').val($(this).find('.text-body').text());
                            $('#colorpickerTextColor').colorpicker('setValue', $activeLayer.css("color"));
                            var degress = getRotationDegrees($activeLayer);
                            $("#sliderLayerRotate").slider("option", "value", degress);
                            $("#rotateLayer").val(degress);

                            $('.image-option').hide();
                            $('.text-option').show();

                        });

                        $('.image').draggable({ stack: ".layer", cursor: "move" });
                        $('.image').find('img').resizable({ autoHide: true, handles: 'all' });
                        $('.image').find('.ui-resizable-nw').on('click', function() {
                            if (confirm("Do you want to delete image layer?")) {
                                $(this).parent().parent().remove();
                            }
                        });

                        $('.image').on('click', function() {
                            $activeLayer = $(this);

                            var degress = getRotationDegrees($activeLayer);
                            $("#sliderLayerRotate").slider("option", "value", degress);
                            $("#rotateLayer").val(degress);

                            var opacity = Math.round($activeLayer.css('opacity') * 100);
                            $("#sliderImageOpacity").slider("option", "value", opacity);
                            $("#opacityImage").val(opacity);

                            $('.text-option').show();
                            $('.image-option').show();

                        });


                    }
                    r.readAsText(file);
                }
            } else{
                    Swal.fire("This is a PRO Feature","In order to use this feature, please upgrade to PRO.","error")
                    $("#file_name_text").html("")
                    $("#change_file_name").css("display","none")
                }
        }
        function checkUserGroup(){
            jsonData["userid"] = String(document.location.href.split("userid=")[1])
            window.parent.$.ajax({
                type: "post",
                url: "../backend/index.php?action=getUserDetailsById",
                data: {
                data: JSON.stringify(jsonData)
                },
                success: function (response) {
                // console.log(response);
                if(response.status == "OK"){
                    user_group = response.users.group_type
                }
                }
            })
        }