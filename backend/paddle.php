<?php
include_once "config/config.php";

class Paddle{

public function __construct() {
  $this->resultArray = array();
  $this->database = new Database(DBHost, DBName, DBUser, DBPass);
}

public function validatePaddle($params){
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
	  switch ($_POST['alert_name']) {
      case "subscription_created":
          $this->process_subscription_created($fields);
          break;
      case "subscription_payment_succeeded":
          $this->process_payment_succeeded($fields);
          break;
      case "subscription_payment_refunded":
          $this->process_payment_refunded($fields);
          break;
      case "subscription_cancelled":
          $this->process_sub_cancelled($fields);
          break;
    }
  } else {
    echo "fail";
  }
}

  function process_subscription_created($fields)
  {
      $email = $fields['email'];
      $sub_id = $fields['subscription_id'];
      if (empty($email)) {
          exit ("We don't know this user: {$fields['email']}");
      }else{
        $sql = "UPDATE users SET sub_id = :sub_id WHERE email = :email";
        $stmt = $this->database->getPDO()->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':sub_id', $sub_id);
        if($stmt->execute()){
          echo "success";
        }else{
          echo "fail";
        }
      }
  }

  function process_payment_succeeded($fields)
  {
      $email = $fields['email'];
      $product_id = $fields['subscription_plan_id'];
      $group_type;
      $transaction_date = $fields['event_time'];
      switch($product_id){
        case "586761":
          $group_type="PRO_MONTHLY";
          $date = new DateTime($transaction_date);
          $date->add(new DateInterval('P30D'));
          $exp_date=$date->format('Y-m-d');
        break;
        case "586762":
          $group_type="PRO_YEARLY";
          $date = new DateTime($transaction_date);
          $date->add(new DateInterval('P365D'));
          $exp_date=$date->format('Y-m-d');
        break;
        case "588972":
          $group_type="SUPER_PRO_MONTHLY";
          $date = new DateTime($transaction_date);
          $date->add(new DateInterval('P30D'));
          $exp_date=$date->format('Y-m-d');
        break;
        case "588973":
          $group_type="SUPER_PRO_YEARLY";
          $date = new DateTime($transaction_date);
          $date->add(new DateInterval('P365D'));
          $exp_date=$date->format('Y-m-d');
        break;
      }
      if (empty($email)) {
          exit ("We don't know this user: {$fields['email']}");
      }else{
        $sql = "UPDATE users SET group_type = :group_type, exp_date = :exp_date WHERE email = :email";
        $stmt = $this->database->getPDO()->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':group_type', $group_type);
        $stmt->bindParam(':exp_date', $exp_date);
        if($stmt->execute()){
          echo "success";
        }else{
          echo "fail";
        }
      }
  }

  function process_payment_refunded($fields)
  {
      $email = $fields['email'];
      $sub_id = $fields['subscription_id'];
      if (empty($email)) {
          exit ("We don't know this user: {$fields['email']}");
      }else{
        $sql = "UPDATE users SET group_type = 'FREE' WHERE email = :email";
        $stmt = $this->database->getPDO()->prepare($sql);
        $stmt->bindParam(':email', $email);
        if($stmt->execute()){
          echo "success";
        }else{
          echo "fail";
        }
      }
  }

  function process_sub_cancelled($fields)
  {
      $email = $fields['email'];
      if (empty($email)) {
          exit ("We don't know this user: {$fields['email']}");
      }else{
        $sql = "UPDATE users SET sub_cancelled = '1' WHERE email = :email";
        $stmt = $this->database->getPDO()->prepare($sql);
        $stmt->bindParam(':email', $email);
        if($stmt->execute()){
          echo "success";
        }else{
          echo "fail";
        }
      }
  }
}
$paddle = new Paddle();
$paddle->validatePaddle($_POST);
