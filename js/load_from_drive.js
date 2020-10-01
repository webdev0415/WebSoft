var file_name;
var file_type;
var file_data;
$(document).ready(function () {
    document.getElementById('input_file').addEventListener('change', getFile2);
    copyResultText();
    downloadLocal();
});
 
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

 // GOOGLE DRIVE --------------------------------------------------------------------------------------------------------

 var developerKey = 'AIzaSyAww_Wl1E3Xvn1z4bVh4BZgmdJt80Hu4iQ';

 // The Client ID obtained from the Google API Console. Replace with your own Client ID.
 var clientId = "384916262889-8a7lhm8mdtkq90orc3botm3d4t6s8b1c.apps.googleusercontent.com"

 // Replace with your own project number from console.developers.google.com.
 // See "Project number" under "IAM & Admin" > "Settings"
 var appId = "384916262889";
 var scope = ['https://www.googleapis.com/auth/drive.file'];

 var pickerApiLoaded = false;
 var oauthToken;

 // Use the Google API Loader script to load the google.picker script.
 function loadPicker() {
   gapi.load('auth', {'callback': onAuthApiLoad});
   gapi.load('picker', {'callback': onPickerApiLoad});
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
     console.log(oauthToken);
   }
 }

 // Create and render a Picker object for searching images.
 function createPicker() {
   if (pickerApiLoaded && oauthToken) {
     var view = new google.picker.View(google.picker.ViewId.DOCS);
     //view.setMimeTypes("text");
     var picker = new google.picker.PickerBuilder()
         .enableFeature(google.picker.Feature.NAV_HIDDEN)
         .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
         .setAppId(appId)
         .setOAuthToken(oauthToken)
         .addView(view)
         .addView(new google.picker.DocsUploadView())
         .setDeveloperKey(developerKey)
         .setCallback(pickerCallback)
         .build();
      picker.setVisible(true);
   }
 }

/* function pickerCallback(data) {
    if (data.action == google.picker.Action.PICKED) { 
    $.ajax({
        method: 'POST',
        url: '../../backend/drives/google_drive.php',
        dataType: 'json',
        crossDomain: true,
        data: {
          oAuthToken:oauthToken,
          fileId: data.docs[0].id,
          name: data.docs[0].name,
          mimeType:data.docs[0].mimeType
        },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      success: function (response) {
        console.log(response);
      },
      error: function (response) {
        console.log(response);
      }
    });
    }
   }*/

   function pickerCallback(data) {
    if (data.action == google.picker.Action.PICKED) { 
        console.log("yo");
        if(data.docs[0].name.includes(".txt")||data.docs[0].name.includes(".sbv")){
            processGoogleDriveFile(data.docs[0]);
        }else{
            console.log("error");
            swal.fire('Error','Please select a file with a ".txt" or ".sbv" extension.','error');
        }
    }
   }

   function processGoogleDriveFile(file) {
    var data = {
        file_id : file.id,
        file_name : file.title,
        extension: file.fileExtension,
        mime_type : file.mimeType,
        // the function below is provided by the library
        // from https://gist.github.com/Daniel15/5994054
        access_token : gapi.auth.getToken().access_token,
        command : 'handle-google-drive-file',
    };
    
    $.ajax({
        url: '../../backend/drives/google_drive.php',
        type: 'post',
        data: data,
        error: function (data) {
            console.log(data);
        },
        success: function (data) {
            console.log(data);
        }
    });
    readTextFile("../../backend/drives/uploaded_files/file.txt")
}

 function showPickerDialog(){
     loadPicker()
 }







/*const urlParams = new URLSearchParams(window.location.search);
 const code = urlParams.get('code');
 const redirect_uri = "" // replace with your redirect_uri;
 const client_secret = ""; // replace with your client secret
 const scope = "https://www.googleapis.com/auth/drive";
 var access_token= "";
 var client_id = ""// replace it with your client id;
 

 $.ajax({
     type: 'POST',
     url: "https://www.googleapis.com/oauth2/v4/token",
     data: {code:code
         ,redirect_uri:redirect_uri,
         client_secret:client_secret,
     client_id:client_id,
     scope:scope,
     grant_type:"authorization_code"},
     dataType: "json",
     success: function(resultData) {
        
         
        localStorage.setItem("accessToken",resultData.access_token);
        localStorage.setItem("refreshToken",resultData.refreshToken);
        localStorage.setItem("expires_in",resultData.expires_in);
        window.history.pushState({}, document.title, "/GitLoginApp/" + "upload.html");
        
        
        
        
     }
});

 function stripQueryStringAndHashFromPath(url) {
     return url.split("?")[0].split("#")[0];
 }   

 var Upload = function (file) {
     this.file = file;
 };
 
 Upload.prototype.getType = function() {
     localStorage.setItem("type",this.file.type);
     return this.file.type;
 };
 Upload.prototype.getSize = function() {
     localStorage.setItem("size",this.file.size);
     return this.file.size;
 };
 Upload.prototype.getName = function() {
     return this.file.name;
 };
 Upload.prototype.doUpload = function () {
     var that = this;
     var formData = new FormData();
 
     // add assoc key values, this will be posts values
     formData.append("file", this.file, this.getName());
     formData.append("upload_file", true);
 
     $.ajax({
         type: "POST",
         beforeSend: function(request) {
             request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));
             
         },
         url: "https://www.googleapis.com/upload/drive/v2/files",
         data:{
             uploadType:"media"
         },
         xhr: function () {
             var myXhr = $.ajaxSettings.xhr();
             return myXhr;
         },
         success: function (data) {
             console.log(data);
         },
         error: function (error) {
             console.log(error);
         },
         async: true,
         data: formData,
         cache: false,
         contentType: false,
         processData: false,
         timeout: 60000
     });
 };

 $("#upload_gdrive").on("click", function (e) {
     var file = $("#files")[0].files[0];
     var upload = new Upload(file);
 
     // maby check size or type here with upload.getSize() and upload.getType()
 
     // execute upload
     upload.doUpload();
 });


*/













 // DROPBOX --------------------------------------------------------------------------------------------------------

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

 var options_dropbox = {

 // Required. Called when a user selects an item in the Chooser.
 success: function(files) {
     console.log(files)
 },

 // Optional. Called when the user closes the dialog without selecting a file
 // and does not include any parameters.
 cancel: function() {

 },

 // Optional. "preview" (default) is a preview link to the document for sharing,
 // "direct" is an expiring link to download the contents of the file. For more
 // information about link types, see Link types below.
 linkType: "preview", // or "direct"

 // Optional. A value of false (default) limits selection to a single file, while
 // true enables multiple file selection.
 multiselect: false, // or true

 // Optional. This is a list of file extensions. If specified, the user will
 // only be able to select files with these extensions. You may also specify
 // file types, such as "video" or "images" in the list. For more information,
 // see File types below. By default, all extensions are allowed.
 extensions: ['.txt', '.sbv'],

 // Optional. A value of false (default) limits selection to files,
 // while true allows the user to select both folders and files.
 // You cannot specify `linkType: "direct"` when using `folderselect: true`.
 folderselect: false, // or true

 // Optional. A limit on the size of each file that may be selected, in bytes.
 // If specified, the user will only be able to select files with size
 // less than or equal to this limit.
 // For the purposes of this option, folders have size zero.
 sizeLimit: 1024, // or any positive number
 };

 function clickDropboxButton(){
    Dropbox.choose(options_dropbox);
 }

 // BOX --------------------------------------------------------------------------------------------------------

 var options = {
   clientId: "ubhbb3lpbh5mccg3xrgmlv0xcgihzdhu",
   linkType: 'shared',
   multiselect: 'false'
 };
 var boxSelect = new BoxSelect(options);

 // Register a success callback handler
 boxSelect.success(function(response) {
    console.log(response)
 var fileNames = [];
 var sharedLinks = [];

 //Parse file names and shared links from response. Store data into arrays.
 for(var i = 0; i < Object.keys(response).length; i++) {
    console.log(response)
     var obj = response[i];
     fileNames.push(obj.name);
     sharedLinks.push(obj.url);
 }

 });
 // Register a cancel callback handler
 boxSelect.cancel(function() {
   console.log("The user clicked cancel or closed the popup");
 });

 // OTHER------------------------------------------------------------------------------------------------
 function copyResultText(){
    $("#copy_result").on("click", function (e) {
        /* Get the text field */
        var copyText = document.getElementById("result_text");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /*For mobile devices*/

        /* Copy the text inside the text field */
        document.execCommand("copy");
    });
 }

// LOCAL DRIVE------------------------------------------------------------------------------------------------
function downloadLocal(data, filename, type){
 $("#upload_local_drive").on("click", function (e) {
        var file = new Blob([data], {type: type});
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