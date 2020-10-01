
i=0;
var originalText;
$(document).ready(function () {
    document.getElementById('input_file').addEventListener('change', getFile2);
    clearClickListener();
    $("#driveButtons").load("../../components/load_from_drive.php");
    removeBlankLines();
  });

  function clearClickListener(){
    $("#clear_field").on("click", function (e) {
        $("#content-target").val("");
    });
    copyText("copy_result","result_text")
    downloadLocal()
}

function removeBlankLines(){
  $("#remove_lines").change(function(e){
    if(i<1){
      originalText = $('#result_text').val();
      i++;
    }
    if ($(this).is(':checked')) {
      var text = $('#result_text').val();
        text = text.replace(/^\s*[\r\n]/gm, '');
        $('#result_text').val(text);
    }else{
      $('#result_text').val(originalText);
    }
    });
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

function downloadLocal(data, filename, type){
  $("#upload_local_drive").on("click", function (e) {
         var file = new Blob([data], {type: type});
         var filename = "youtube_subtitle"
         if (window.navigator.msSaveOrOpenBlob) // IE10+
             window.navigator.msSaveOrOpenBlob(file, filename);
         else { // Others
             var a = document.createElement("a"),
                     url = URL.createObjectURL(file);
             a.href = url;
             a.download = filename;
             document.body.appendChild(a);
             a.click();
             setTimeout(function() {
                 document.body.removeChild(a);
                 window.URL.revokeObjectURL(url);  
             }, 0); 
         }
     });
 }

 function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                setText(allText);
                return allText;
            }
        }
    }
    rawFile.send(null);
}

function setText(text){
    $("#content-target").html(text);
}

function getFile2(event) {
  const input = event.target
if ('files' in input && input.files.length > 0) {
  placeFileContent(
  document.getElementById('content-target'),
  input.files[0])
}
}

function placeFileContent(target, file) {
  readFileContent(file).then(content => {
  target.value = content
}).catch(error => console.log(error))
}

function readFileContent(file) {
  const reader = new FileReader()
return new Promise((resolve, reject) => {
  reader.onload = event => resolve(event.target.result)
  reader.onerror = error => reject(error)
  reader.readAsText(file)
})
}