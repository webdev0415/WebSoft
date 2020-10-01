var imgData, pixels;
var cx, cy, cw, ch, ctx;
var viewColor, pickedColor, hex, pickHistoryColor;
var jsonData = {}
var group_type


var img = _('#color-pick-example-image'),
  canvas = _('#canvas-color-pick'),
  result = _('#preview-picked-color'),
  preview = _('.viewColor'),x = '',y = '';
  viewColor = document.querySelector(".viewColor");// the current color

$(document).ready(function(){
  getUserDetails()
  var colorPicker = new iro.ColorPicker("#color-picker-iro", {
    height: '100%',
    color: "rgb(255, 0, 0)",
    borderWidth: 1,
    borderColor: "#fff",
  });

  // var values = document.getElementById("values");

  // https://iro.js.org/guide.html#color-picker-events
  colorPicker.on(["color:init", "color:change"], function(color){
    // Show the current color in different formats
    // Using the selected color: https://iro.js.org/guide.html#selected-color-api
    $('#picked-iro-R').val(color.rgbString.split('(')[1].split(',')[0])
    $('#picked-iro-G').val(color.rgbString.split(',')[1].split(',')[0])
    $('#picked-iro-B').val(color.rgbString.split(',')[2].split(')')[0])
    $('#picked-iro-HEX').val(color.hexString)
    $('.picked_iro_hex_color').css("background-color",color.hexString)
    $('.viewColor2').css("background-color",color.hexString)
    $('#picked-iro-HSR').val(color.hslString)

    // console.log($('#picked-iro-R').val())
  });
  if(window.innerWidth<900){
    $(".nav-link[href='#color-pick-from-img']").html("COLOR FROM IMAGE")
  }
  importUrlChangeListener()
  importUrlChangeListener2()
  inputClickListener()
  saveColor()
  copyText("copy_hex","picked-iro-HEX")
  copyText("copy_hex2","pick-history")
  loadSavedColors()
  clearURLClickListener()
})

function getUserDetails(){
  window.parent.$.ajax({
    type: "post",
    url: "../../../backend/index.php?action=getUserDetails",
    data: {
      data: JSON.stringify(jsonData)
    },
    success: function (response) {
    console.log(response)     
        if(response.status==="OK"){
          group_type=response.users.group_type
          if($("#color-pick-example-image").attr("src")=="10.jpg"&&imageExist(`../../../backend/uploads/colorpicker/colorpicker${response.users.userid}.png`)){
            $("#color-pick-example-image").attr("src",`../../../backend/uploads/colorpicker/colorpicker${response.users.userid}.png`)
          }
        }
      }
    })
}

function imageExist(url) 
{
   var img = new Image();
   img.src = url;
   return img.height != 0;
}

function draw(){
  img = document.getElementById("color-pick-example-image");
  viewColor = document.querySelector(".viewColor");// the current color
  canvas = document.querySelector("#canvas-color-pick");
  pickHistoryColor = document.getElementById("preview-picked-color");

  cw = canvas.width = 400 * (img.width / img.height);
  ch = canvas.height = 400;

  console.log(cw)
  console.log(ch)

  ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, cw, ch);

  imgData = ctx.getImageData(0, 0, cw, ch);
  pixels = imgData.data;
  console.log("IMAGE RESIZED")
  $("#color-pick-example-image").css("height","400px")
  $("#color-pick-example-image").css("width","auto")
  var x = (parseFloat($("#from_image_container").css("width").replace("px",""))-parseFloat($("#color-pick-example-image").css("width").replace("px","")))/2
  $("#color-pick-example-image").css("margin-left",x)
}

if (img.complete) {
  draw()
} 

img.addEventListener('load', draw)

function readURL(input) {
    var url = input.value;
    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    if (input.files && input.files[0]&& (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
        var reader = new FileReader();

        reader.onload = function (e) {
            img.src = e.target.result;
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function importUrlChangeListener(){
  $(".input_page_2").change(function(e){
    jsonData["url"]= $(".input_page_2").val().split("&")[0].replace(" ","")
    window.parent.$.ajax({
      type: "post",
      url:"../../../backend/index.php?action=copyImageToServer",
      data: {
        data: JSON.stringify(jsonData)
      },
      success: function (response) {
      console.log(response)     
          if(response.status==="OK"){
            img.src=`../../../backend/${response.link}`
          }
        }
      })
  })
}

/*canvas.addEventListener("mousemove", function(e) {
  var m = oMousePos(canvas, e);

  var i = (m.x + m.y * cw) * 4;
  var R = pixels[i];
  var G = pixels[i + 1];
  var B = pixels[i + 2];

  pickedColor = 'rgb('+R+','+G+','+B+')';
  viewColor.style.backgroundColor = pickedColor;
  
  hex = rgbToHex(R.toString()+G.toString()+B.toString())

  $('#picked-R').val(R)
  $('#picked-G').val(G)
  $('#picked-B').val(B)
  $('#picked-HEX').val(hex)

}, false);


canvas.addEventListener("click", function(e) {

  pickHistoryColor.style.backgroundColor = pickedColor;
  $('#pick-history').val(hex)

}, false);

var rgbToHex = function (rgb) { 
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};

function oMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  return { //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  }
}*/

img.addEventListener('click', function(e){
  if(e.offsetX) {
  x = e.offsetX;
  y = e.offsetY; 
  }
  else if(e.layerX) {
  x = e.layerX;
  y = e.layerY;
  }
  useCanvas(canvas,img,function(){
  var p = canvas.getContext('2d')
  .getImageData(x, y, 1, 1).data;
  
  result.style.background =rgbToHex(p[0],p[1],p[2]);
  $("#pick-history").val(rgbToHex(p[0],p[1],p[2]))
},false);

img.addEventListener('mousemove', function(e){
  if(e.offsetX) {
  x = e.offsetX;
  y = e.offsetY; 
  }
  else if(e.layerX) {
  x = e.layerX;
  y = e.layerY;
  }
  
  useCanvas(canvas,img,function(){
  
  var p = canvas.getContext('2d')
  .getImageData(x, y, 1, 1).data;
  preview.style.background = rgbToHex(p[0],p[1],p[2]);
  $('#picked-R').val(p[0])
  $('#picked-G').val(p[1])
  $('#picked-B').val(p[2])
  $('#picked-HEX').val(rgbToHex(p[0],p[1],p[2]))
  });
  });
},false);

$(img).click();

function useCanvas(el,image,callback){
  el.width = image.width;
  el.height = image.height;
  el.getContext('2d')
  .drawImage(image, 0, 0, image.width, image.height);
  return callback();
}

function _(el){
  return document.querySelector(el);
};

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function findPos(obj) {
  var curleft = 0, curtop = 0;
  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return { x: curleft, y: curtop };
  }
  return undefined;
}

function inputClickListener(){
  $(".import_url_input").click(function(e){
    $(this).css({
    "border":"solid black 1px",
    "background-color":"white"
    })
})
}

function importUrlChangeListener2(){
  $(".input_page_1").change(function(e){
      $(".cropper-canvas img").attr("src",$(".input_page_1").val())
      $(".cropper-view-box img").attr("src",$(".input_page_1").val())
      $(".cropper-example-preview img").attr("src",$(".input_page_1").val())
  })
}

function saveColor(){
  $(".colorpicker_save_color button").click(function(e){
    if(group_type!="FREE"){
      var page = $(this).attr("page")
      var object_color
      var object_hex
      if(page=="colorpicker"){
        object_color=$(".viewColor2").css("background-color")
        object_hex=$("#picked-iro-HEX").val()
      }else{
        object_color=$("#preview-picked-color").css("background-color")
        object_hex=$("#picked-HEX").val()
      }
      Swal.fire({
        title: "Write a note to this color!",
        html: `<div class="display_color_container" style="display: flex;justify-content: center;"><div class="picked_iro_hex_color" style="background-color:${object_color};"></div><h5 style="margin-top: 7px;">${object_hex}</h5></div><textarea style="border:1px solid black;border-radius: 3px!important;padding: 10px;" class="form-control" id="save_color_comment" rows="6"></textarea>`,
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: true,
        focusConfirm: true,
        focusClose:false,
        customClass: {
          content: 'swalContent',
          confirmButton: 'swalSaveColor'
        },
        confirmButtonText:
          'Save',
      });
      $(".swalSaveColor").click(function(e){
        jsonData["hex"]=object_hex
        jsonData["comment"]=$("#save_color_comment").val()
        window.parent.$.ajax({
          type: "post",
          url: "../../../backend/index.php?action=setColorPickerColors",
          data: {
            data: JSON.stringify(jsonData)
          },
          success: function (response) {
          console.log(response)     
              if(response.status==="OK"){
                $(".savedColors").append(`<div class="col-4 col-md-1" style="padding-left:3px;padding-right:3px;"><div class="saved_color_container"><div class="saved_color_box" style="margin-top: 6px;margin-right: 10px;height:20px;width:20px;background-color:${jsonData["hex"]}"></div><h5 style="margin-top: 7px;">${jsonData["hex"]}</h5><img src="assets/img/close-icon.png" data-id="${response.id}" class="delete_color" style="width:15px;height:15px;margin-top:8px;margin-left: 3px;"/></div></div>`)
              }
              deleteSavedColor()
            }
        })
      })
    }else{
      Swal.fire("This feature can only be used as a PRO Member!","","error")
    }
  })
}

function copyText(button_id, input_id){
  var button = "#"+button_id
  $(button).click(function(e){
      e.preventDefault()
      var copyText = document.getElementById(input_id);
    
      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    
      /* Copy the text inside the text field */
      document.execCommand("copy");
      $(button).removeClass("btn-warning")
      $(button).addClass("btn-success")
      $(button).html("Copied to clipboard")
  })
}

function loadSavedColors(){
  window.parent.$.ajax({
    type: "post",
    url: "../../../backend/index.php?action=getColorPickerColors",
    data: {
      data: JSON.stringify(jsonData)
    },
    success: function (response) {
    console.log(response)     
        if(response.status==="OK"){
          var self = response.colors
          $(self).each(function(e){
            $(".savedColors").append(`<div class="col-4 col-md-1" style="padding-left:3px;padding-right:3px;"><div class="saved_color_container" data-tooltip="${self[e].comment}"><div class="saved_color_box" style="margin-top: 6px;margin-right: 10px;height:20px;width:20px;background-color:${self[e].hex}"></div><h5 style="margin-top: 7px;">${self[e].hex}</h5><img src="assets/img/close-icon.png" data-id="${self[e].id}" class="delete_color" style="width:15px;height:15px;margin-top:8px;margin-left: 3px;"/></div></div>`)
          })
          savedColorClickListener()
          deleteSavedColor()
        }
      }
    })
}

function RGBToHSL(r,g,b) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

      if (delta == 0)
      h = 0;
    // Red is max
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
      h = (b - r) / delta + 2;
    // Blue is max
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
      
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;

        l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return "hsl(" + h + "," + s + "%," + l + "%)";
}

function savedColorClickListener(){
  $(".saved_color_container").click(function(e){
    var color = $(this).find(".saved_color_box").css("background-color")
    var color_array=color.replace("rgb(","").replace(")","").replace(/ /g,"").split(",")
    var color_hex=rgbToHex(parseInt(color_array[0]),parseInt(color_array[1]),parseInt(color_array[2]))
    var color_hsl=RGBToHSL(parseInt(color_array[0]),parseInt(color_array[1]),parseInt(color_array[2]))
    $("#picked-iro-R").val(parseInt(color_array[0]))
    $("#picked-iro-G").val(parseInt(color_array[1]))
    $("#picked-iro-B").val(parseInt(color_array[2]))
    $("#picked-R").val(parseInt(color_array[0]))
    $("#picked-G").val(parseInt(color_array[1]))
    $("#picked-B").val(parseInt(color_array[2]))
    $("#picked-iro-HSR").val(color_hsl)
    $(".viewColor2").css("background-color",color)
    $(".viewColor").css("background-color",color)
    $(".picked_iro_hex_color").css("background-color",color)
    $("#preview-picked-color").css("background-color",color)
    $("#picked-iro-HEX").val(color_hex)
    $("#picked-HEX").val(color_hex)
    $("#pick-history").val(color_hex)
  })
}

function clearURLClickListener(){
  $("#clear_url_1").click(function(e){
    $(".input_page_1").val("")
  })
  $("#clear_url_2").click(function(e){
    $(".input_page_2").val("")
  })
}

function deleteSavedColor(){
  $(".delete_color").click(function(e){
    e.stopPropagation()
    jsonData["id"] = $(this).attr("data-id")
    Swal.fire({
      title: "Are you sure you want to delete this color?",
      icon: 'info',
      html: ``,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      focusConfirm: true,
      focusClose:false,
      customClass: {
        content: 'swalContent',
        confirmButton: 'swalDeleteColor'
      },
      confirmButtonText:
        'Yes',
    });
    $(".swalDeleteColor").click(function(e){
      window.parent.$.ajax({
        type: "post",
        url: "../../../backend/index.php?action=deleteColorPickerColor",
        data: {
          data: JSON.stringify(jsonData)
        },
        success: function (response) {
        console.log(response)     
            if(response.status==="OK"){
              $(`.delete_color[data-id='${jsonData["id"]}']`).parent().parent().remove()
            }
          }
        })
    })
  })
}