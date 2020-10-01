<?php
// https://mt4talk.com/webhooks/paddle.php
if (!defined('FORUM_ROOT'))
	define('FORUM_ROOT', '../');

define('FORUM_DISABLE_CSRF_CONFIRM', true);

//$_SERVER['HTTP_HOST'] = 'localhost:8080';


require FORUM_ROOT.'include/common.php';


//$row = 1;
//if (($handle = fopen("orders.csv", "r")) !== FALSE) {
//    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
//        $row++;
//        $res = strpos(file_get_contents("paddle_users.json"), $data[2]);
//        if (!$res) {
//            echo (int)(bool)$res . " - " . $data[2] . "\n";
//        }
//    }
//    fclose($handle);
//}


//$data = json_decode(file_get_contents("paddle_users.json"), true);
//$users = $data['response'];
//echo count($users);
//foreach ($users as $user) {
//    $query = "
//        UPDATE users SET
//            paddle_subscription_id=".(int)$user['subscription_id'].",
//            paddle_subscription_expired='".$forum_db->escape($user['next_payment']['date'])."',
//            paddle_latest_event_time='".$user['signup_date']."',
//            paddle_subscription_plan_id=".(int)$user['plan_id']."
//        WHERE email='".$user['user_email']."'";
//    echo $query.PHP_EOL;
//    $res = $forum_db->query($query);
//    echo $forum_db->affected_rows();
//
//}
//
//
//$forum_db->end_transaction();
//$forum_db->close();


//
//define('FORUM_PAGE', 'PADDLE_WEBHOOK');
//
//file_put_contents("/var/log/paddle.log", date("Y/m/d H:i:s") . " " . json_encode($_POST) . PHP_EOL, FILE_APPEND);
//
//validate_paddle($_POST);
//
//switch ($_POST['alert_name']) {
//    case  "subscription_created":
//    case  "subscription_payment_succeeded":
//        process_subscription_created($_POST);
//        break;
//
//}
//
//
//
//function validate_paddle($params)
//{
//    $public_key = '-----BEGIN PUBLIC KEY-----
//MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAp65/jTU7FYv4szX7cQ1Y
//f5T0F78wQ+VwL5+IvC2D0SSXOzIZLVZWqd4XSSdxgVigPDfVBkU/Z6UESG/7fnks
//TteTAA707W71S6AErF55KeHGh3+HljB+D2dCQJmKbMi/wu9GJL4rI5UKcwmcdt5+
//czLLMSxaP5jdDuanv19e4SzVk+GmqFQguzfZVPhnRwDXJAJjw2H3ye/A8tcEFmTq
//AgvixEheo1Axwif99bgagaX6lBk7CDXR1KeSVfTQEadU7HbOFVmSx5bOS5k9fHog
//4jJvEFP2VKx7AXTQ6RUvHjQRFN8wGZiEWc76R6ztTD4an3DK9ceUb84CwdG8Sv5f
//L80wOBDUMvXnEgi6y71gYAOAsvVL8Hq6vIpoclPRMJqdVryCgY3hlSaWoGDlfu28
//z6q5EsSqGBZmdCkoHNgKXzyXKKs/selDkN3k0NAGipVqcryFTqAcM4XfRsHu5NVf
//jobMp9BPpOU44GyJEFNV9i2GAj4X0EWQIT+3wh91PiYxtifeTN9q2EBD/XnLeP64
//mNhG/Gk952ngaJMh+bir910zFRfhOsu4nWlVWRv4zl+rrKsjrLP2o4GNJQxTkfei
//kdAr+8rsi86v9gFVjCM2IIA+RqRIEVX9kjzPHM5QGPbwpZrmtthQQ8oWkU11gCeZ
//oDOpsfRV+n/QEK8eVhX449MCAwEAAQ==
//-----END PUBLIC KEY-----';
//
//    // Get the p_signature parameter & base64 decode it.
//    $signature = base64_decode($params['p_signature']);
//
//    unset($params['p_signature']);
//
//    // ksort() and serialize the fields
//    ksort($params);
//    foreach($params as $k => $v) {
//        if(!in_array(gettype($v), array('object', 'array'))) {
//            $params[$k] = "$v";
//        }
//    }
//    $data = serialize($params);
//
//    // Veirfy the signature
//    $verification = openssl_verify($data, $signature, $public_key, OPENSSL_ALGO_SHA1);
//    if ($verification != 1)  exit ("wrong signature");
//
//}
//
//function process_subscription_created($fields)
//{
//    global $forum_db;
//
//    $db_user_id = "";
//    if (!empty($fields['passthrough'])) {
//        $res = $forum_db->query("SELECT id FROM users WHERE id=".(int)$fields['passthrough']);
//        $row = $res->fetch_row();
//        if ($row[0] == (int)$fields['passthrough']) {
//            $db_user_id = $row[0];
//        }
//    }
//
//    if (empty($db_user_id)) {
//        $res = $forum_db->query("SELECT id FROM users WHERE email='" . $forum_db->escape($fields['email']) . "'");
//        $row = $res->fetch_row();
//        if (!empty($row[0])) {
//            $db_user_id = $row[0];
//        }
//    }
//
//    if (empty($db_user_id)) {
//        exit ("We don't know this user: {$fields['email']}");
//    }
//
//    $group_id = get_group_id($fields['subscription_plan_id']);
//
//    //update user in DB
//    $res = $forum_db->query("
//        UPDATE users SET
//            group_id=$group_id,
//            paddle_subscription_id=".(int)$fields['subscription_id'].",
//            paddle_subscription_expired='".$forum_db->escape($fields['next_bill_date'])."',
//            paddle_latest_event_time=CURRENT_TIMESTAMP,
//            paddle_subscription_plan_id=".(int)$fields['subscription_plan_id']."
//        WHERE id=$db_user_id");
//    echo "User with id $db_user_id switched to group $group_id";
//
//
//}
//
//function get_group_id($subscription_plan_id)
//{
//    switch ($subscription_plan_id) {
//        case "525395": // yearly
//            return 13;
//            break;
//        case "525397": //montly
//            return 12;
//            break;
//    }
//    return null;
//}

$data = file("paddle.log");
foreach ($data as $line) {
    $json = substr($line, 20);
    $info = json_decode($json, 1);
    if (empty($info['passthrough'])) {
        $where = "email = '${info['email']}'";
    } else {
        $where = "id = ${info['passthrough']}";
    }
    if ($info['alert_name'] == 'subscription_created') {
        $query = "
            UPDATE users SET
              paddle_cancel_url = '".$info['cancel_url']."'
            WHERE $where
        ";
        $res = $forum_db->query($query);
        echo "User with id ${info['passthrough']} updated with cancel_url ${info['cancel_url']}" . PHP_EOL;
    }
}

$forum_db->end_transaction();
$forum_db->close();

