<?php

validatePaddle($_POST);

function validatePaddle($params){
  // Your Paddle 'Public Key'
$public_key_string = '-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAvHYl0S+BHLvnfmaKxl2E
xQwvbGFn2h6n83tI/q+jImcM7+O0ZQTqRxREacyP79FB3142QCPBHh5j3mvkP8V0
S8DZuWiFxBqACyjKTw83LBohmHVtW2fa5A0OvdT+ClonZ8pW02CPsVMAPExrasr/
gSc6N75F3ZCz1jsEykCZDv3Yg8Az4jn4GrytVe37V5rdS9oCBXzYcWchucRKuWgm
nXo0Hh2Lt5Le9mUw748jsuFzx2f9z/Kx0BITpwSeIDbqUfH0kQNFqSyvwDrxlceC
u7mWu+PQc5kf1iqs6Y6kiPGVBYecdAllTe0bcmUuyKthQqby5o4baH5Fnv0HKdIq
U2gJUPr7H1YahcUFnnPp+fm49R72+7OKmJpvDlPcpCnL7l391HX1JK1h7u+q2eZ1
XXQG5nDzhfaboD1hjXK9X2dWWMRXStOh4gNqT3l+9UjAYJUXrB5yFfpJFAnL6c8K
q0QR8AbF6kHPpi0q7kZ2RzcjCgnsBWqDn6SKhB6VLf3y//cYCDRv/7iLb7HXF9ao
nTgM5mDfuJn08lgYI52tceE5bzvFL9lzVj9Dwxw0FOp8aD6m2UUsLt/wd1CB4/Aa
hI+nBBnMMbZEXMDRGF8h1mCUP90q+RSvYrETyfKtkqIk+PKOm/1mPBHm3oQix5H0
nB+SW1Hl+hkBRsocKhthnXMCAwEAAQ==
-----END PUBLIC KEY-----';

  $public_key = openssl_get_publickey($public_key_string);
  
  // Get the p_signature parameter & base64 decode it.
  $signature = base64_decode($params['p_signature']);
  // Get the fields sent in the request, and remove the p_signature parameter
  $fields = $params;
  unset($fields['p_signature']);
  
  // ksort() and serialize the fields
  ksort($fields);
  foreach($fields as $k => $v) {
	  if(!in_array(gettype($v), array('object', 'array'))) {
		  $fields[$k] = "$v";
	  }
  }
  $data = serialize($fields);
  
  // Verify the signature
  $verification = openssl_verify($data, $signature, $public_key, OPENSSL_ALGO_SHA1);
  
  if($verification == 1) {
	  echo 'Yay! Signature is valid!';
  } else {
      echo 'fail';
  }
}
?>