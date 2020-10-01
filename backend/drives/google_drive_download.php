<?php
// bootstrap code

$command = $_POST['command'];

if('handle-google-drive-file' === $command) {
    $file_id = $_POST['file_id'];
    $file_name = $_POST['file_name'];
    $extension = $_POST['extension'];
    $mime_type = $_POST['mime_type'];
    $access_token = $_POST['access_token'];
    
    // if this is a Google Docs file type (Google Docs, 
    // Spreadsheets, Presentations, etc.) we convert it
    // to a PDF using the export function of the API before saving it.
    // we could convert it to other file types that are also supported
    // by the API.
    if (stripos($mime_type, 'google')) {
        $getUrl = 'https://www.googleapis.com/drive/v2/files/' . $file_id .
        '/export?mimeType=application/text/plain';
        $authHeader = 'Authorization: Bearer ' . $access_token;
        $file_name = $file_name . " (converted)";
        $extension = 'txt';
        $file_mime_type = 'text/plain';
    }
    else { // otherwise we download it the normal way
        $getUrl = 'https://www.googleapis.com/drive/v2/files/' . $file_id . 
        '?alt=media';
        $authHeader = 'Authorization: Bearer ' . $access_token;
    }

    $ch = curl_init($getUrl);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_BINARYTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 20);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [$authHeader]);


    $data = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_errno($ch);
    curl_close($ch);

    // 1. the file name could already have an extension in some cases,
    // that must be handled if needed.
    // 2. A file with the same name may exist, that must be handled.
    $file_save_path = "uploaded_files/file.txt";

    file_put_contents($file_save_path, $data);
    
    echo 'File successfully retrieved and stored!';
}
?>