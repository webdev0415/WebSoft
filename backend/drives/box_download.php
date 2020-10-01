<?php
//set the headers
$headers = array('Authorization: BoxAuth api_key=API_KEY&auth_token=AUTH_TOKEN');

//set the options
curl_setopt($curl, CURLOPT_URL, "https://api.box.com/2.0/files/".$fileid."/content");
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); //returns to a variable instead of straight to page
curl_setopt($curl, CURLOPT_HEADER, true); //returns headers as part of output
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE); //I needed this for it to work
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2); //I needed this for it to work

$headers = curl_exec($curl); //because the returned page is blank, this will include headers only

//parses the headers string into an array
$items = array();
$item = strtok($headers, " ");

while ($item !== false) {
  $items[] = $item;
  $item = strtok(" ");
}

//redirects to the 14th item in the array (link value) - 17 characters because of
//dodgy header parsing above.
header('Location: '.substr($items[14], 0, -17));

echo curl_error($curl);

curl_close($curl);