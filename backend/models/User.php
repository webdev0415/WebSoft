<?php

class User{

    private $resultArray;
    private $database;

    public function __construct() {
        $this->resultArray = array();
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }

    public function random_string($len=8) {
        $hex = md5("yourSaltHere" . uniqid("", true));
        $pack = pack('H*', $hex);
        $tmp =  base64_encode($pack);
        $uid = preg_replace("#(*UTF8)[^A-Za-z0-9]#", "", $tmp);
        $len = max(4, min(128, $len));
        while (strlen($uid) < $len)
            $uid .= gen_uuid(22);
        return substr($uid, 0, $len);
    }

    public function setResult($message){
        $tempArray = array();
        $tempArray["status"] = $message;
        $this->resultArray = $tempArray;
        return true; 
    }

    public function getResult(){
        return $this->resultArray;
    }

    public function sendNewEmail($data){
        $mailer = new Mailer();
        if($mailer->sendMail($data)){
            return true;
        }else{
            return false;
        }
    }

    public function existEmail($data){
        $enteredEmail = $data->email;
        $sql = "SELECT * FROM users WHERE email = :email";
        $stmt = $this->database->getPDO()->prepare($sql);
        $stmt->bindParam(':email', $enteredEmail);
        if($stmt->execute()){
            if($stmt->rowCount() >= 1){
                $this->setResult("OK");
                return true;
            }
        }
        return false;
    }

    public function createUser($data){
        if($this->existEmail($data)){
            $this->setResult("EMAIL EXISTS");
            return true;
        }
            if(isset($data->firstname)){$firstname = htmlspecialchars($data->firstname);}else{return false;}
            if(isset($data->lastname)){$lastname = htmlspecialchars($data->lastname);}else{return false;}
            if(isset($data->email)){$email = htmlspecialchars($data->email);}else{return false;}
            if(isset($data->password)){$password = $data->password;}else{return false;}
            if(isset($data->newsletter)){$newsletter = $data->newsletter;}else{return false;}
            $newsletter = 1;
            $hash = md5(rand(0,1000));
            $data->hash=$hash;
            $password = password_hash($data->password, PASSWORD_BCRYPT);

            $sql = "INSERT INTO users (firstname, lastname, email, password, hash, newsletter) 
            VALUES(:firstname, :lastname, :email, :password, :hash, :newsletter)";

            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':firstname', $firstname);
            $stmt->bindParam(':lastname', $lastname);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $password);
            $stmt->bindParam(':hash', $hash);
            $stmt->bindParam(':newsletter', $newsletter);
            if($stmt->execute()){
                $this->sendActivationEmail($data);
                return true;
            }else{
                return false;
            }
    }

    public function login($data){
        if(!$this->existEmail($data)){
            $this->setResult("NOT FOUND");
            return true;   
        }
        $enteredEmail = $data->email;
        $enteredPassword = $data->password;
        
        $sql = "SELECT * FROM users WHERE email = :email";
        $stmt = $this->database->getPDO()->prepare($sql);
        $stmt->bindParam(':email', $enteredEmail);
        if($stmt->execute()){
            $result = $stmt->fetch();
            if(!$result['active']){
                $this->setResult("NOT ACTIVE");
                return true;
            }elseif($result['active']){
                $realPassword = $result['password'];
                if(password_verify($enteredPassword, $realPassword)){
                    $sql = "UPDATE users SET last_login = (NOW() + INTERVAL 2 HOUR) WHERE email = :email";
                    $stmt = $this->database->getPDO()->prepare($sql);
                    $stmt->bindParam(':email', $enteredEmail);
                    if($stmt->execute()){
                        session_set_cookie_params(86000);
                        session_start();
                        $_SESSION['logged_in'] = true;
                        $_SESSION['suspended'] = $result['suspended'];
                        $_SESSION['group_type']= $result['group_type'];
                        $_SESSION['email'] = $result['email'];
                        $_SESSION['userid'] = $result['userid'];
                        $_SESSION['created'] = $result['created'];
                        $this->setResult("OK");
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    $this->setResult("WRONG PASSWORD");
                    return true;
                }
            }
        return false;
        }
    }

    public function sessionChecker($data){
        session_start();
        if(isset($_SESSION['email'])){
            $email = ($_SESSION['email']);
            $sql = "SELECT * FROM users WHERE email = :email";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':email', $email);
            if($stmt->execute()){
                $result = $stmt->fetch();
                if($result['group_type']=="ADMIN"){
                    $this->setResult("ADMIN");
                    return true;
                }else{
                    $this->setResult("LOGGED IN");
                    return true;
                }
            }else{ 
                $this->setResult("LOGGED OUT");
                return true;   
            }
        }
    }
    public function logout($data){
        session_start();
        if (isset($_SESSION['logged_in'])) {
            unset($_SESSION['logged_in']); 
        }
        if (isset($_SESSION['suspended'])) {
            unset($_SESSION['suspended']); 
        }
        if (isset($_SESSION['group_type'])) {
            unset($_SESSION['group_type']); 
        }
        if (isset($_SESSION['email'])) {
            unset($_SESSION['email']); 
        }
        if (isset($_SESSION['userid'])) {
            unset($_SESSION['userid']); 
        }
        if (isset($_SESSION['created'])) {
            unset($_SESSION['created']); 
        }
        $_SESSION["policy_accepted"] = true;
        $_SESSION["message"] = "Du hast dich erfolgreich ausgeloggt!";
        $this->setResult("OK");
        return true;
    }

    public function displayUsers($data){
            $sql = "SELECT * FROM users";
            $stmt = $this->database->getPDO()->prepare($sql);
            $tempArray = array();
            if($stmt->execute()){
                while ($row = $stmt->fetch()) {
                    $anotherArray = array();
                    $anotherArray["userid"] = htmlspecialchars_decode($row["userid"]);
                    $anotherArray["firstname"] = htmlspecialchars_decode($row["firstname"]);
                    $anotherArray["lastname"] = htmlspecialchars_decode($row["lastname"]);
                    $anotherArray["created"] = htmlspecialchars_decode($row["created"]);
                    $anotherArray["email"] = htmlspecialchars_decode($row["email"]);
                    $anotherArray["group_type"] = htmlspecialchars_decode($row["group_type"]);
                    $anotherArray["sub_id"] = htmlspecialchars_decode($row["sub_id"]);
                    $anotherArray["active"] = htmlspecialchars_decode($row["active"]);
                    $anotherArray["last_login"] = htmlspecialchars_decode($row["last_login"]);
                    //$anotherArray["hash"] = htmlspecialchars_decode($row["hash"]);
                    $tempArray["status"] = "OK";
                    $tempArray["users"][] = $anotherArray;
                }
            }
            $this->resultArray = $tempArray;
            return true;
    }

    public function getFooterInfo($data){
        $sql = "SELECT * FROM users";
        $stmt = $this->database->getPDO()->prepare($sql);
        if($stmt->execute()){
            $tempArray = array();
            $premium_sum = 0;
            $registered_sum = $stmt->rowCount();
            $nr_of_upcoming_tools = 0;
            while ($row = $stmt->fetch()) {
                if(htmlspecialchars_decode($row["group_type"]) != "FREE" && htmlspecialchars_decode($row["group_type"]) != "ADMIN"){
                    $premium_sum++;
                }
            }
            $sql = "SELECT * FROM tools";
            $stmt = $this->database->getPDO()->prepare($sql);
            if($stmt->execute()){
                while ($row = $stmt->fetch()) {
                    if(htmlspecialchars_decode($row["status"]) == "inactive" || htmlspecialchars_decode($row["status"]) == "pending"){
                        $nr_of_upcoming_tools++;
                    }
                }
                $nr_of_tools = $stmt->rowCount();
                $nr_of_tools = $nr_of_tools - $nr_of_upcoming_tools;
                $tempArray = array();
                $anotherArray = array();
                $anotherArray["premium_sum"] = $premium_sum;
                $anotherArray["registered_sum"] = $registered_sum;
                $anotherArray["nr_of_tools"] = $nr_of_tools;
                $anotherArray["nr_of_upcoming_tools"] = $nr_of_upcoming_tools;
                $tempArray["footerinfo"] = $anotherArray;
                $tempArray["status"] = "OK";
                $this->resultArray = $tempArray;
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    public function getUserDetailsById($data){
        if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
                $sql = "SELECT * FROM users WHERE userid = :userid";
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':userid', $userid);
                if($stmt->execute()){
                    $tempArray = array();
                    if($stmt->rowCount() >= 1){
                        while ($row = $stmt->fetch()) {
                            $anotherArray = array();
                            $anotherArray["email"] = htmlspecialchars_decode($row["email"]);
                            $anotherArray["firstname"] = htmlspecialchars_decode($row["firstname"]);
                            $anotherArray["lastname"] = htmlspecialchars_decode($row["lastname"]);
                            $anotherArray["group_type"] = htmlspecialchars_decode($row["group_type"]);
                            $anotherArray["sub_id"] = htmlspecialchars_decode($row["sub_id"]);
                            $anotherArray["exp_date"] = htmlspecialchars_decode($row["exp_date"]);
                            $anotherArray["to_do"] = htmlspecialchars_decode($row["to_do"]);
                            $tempArray["users"] = $anotherArray;
                            $tempArray["status"] = "OK";
                        }
                        $this->resultArray = $tempArray;
                        return true;
                    }else{
                        $this->setResult("NOT OK");
                    }
                    return true;
                }else{
                $this->setResult("NOT OK");
                }
        return true;
    }

    public function getUserDetails($data){
            session_start();
            if(isset($_SESSION['email'])){
                $email = $_SESSION ['email'];
                $sql = "SELECT * FROM users WHERE email = :email";
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':email', $email);
                if($stmt->execute()){
                    $tempArray = array();
                    if($stmt->rowCount() >= 1){
                        while ($row = $stmt->fetch()) {
                            $anotherArray = array();
                            $anotherArray["email"] = htmlspecialchars_decode($row["email"]);
                            $anotherArray["userid"] = htmlspecialchars_decode($row["userid"]);
                            $anotherArray["firstname"] = htmlspecialchars_decode($row["firstname"]);
                            $anotherArray["lastname"] = htmlspecialchars_decode($row["lastname"]);
                            $anotherArray["group_type"] = htmlspecialchars_decode($row["group_type"]);
                            $anotherArray["exp_date"] = htmlspecialchars_decode($row["exp_date"]);
                            $anotherArray["sub_id"] = htmlspecialchars_decode($row["sub_id"]);
                            $anotherArray["sub_cancelled"] = htmlspecialchars_decode($row["sub_cancelled"]);
                            $anotherArray["newsletter"] = htmlspecialchars_decode($row["newsletter"]);
                            $tempArray["users"] = $anotherArray;
                            $tempArray["status"] = "OK";
                        }
                        $this->resultArray = $tempArray;
                        return true;
                    }else{
                        $this->setResult("NOT OK");
                    }
                }else{
                $this->setResult("NOT OK");
                }
        }else{
        $this->setResult("NOT OK");
        }
        return true;
    }

    public function changeEmail($data){
            if(isset($data->email)){$newEmail = htmlspecialchars($data->email);}else{return false;}
            session_start();
            if(isset($_SESSION['userid'])){
                $userid = $_SESSION['userid'];
                $sql = "UPDATE users SET email = :newemail WHERE userid = :userid";
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':newemail', $newEmail);
                $stmt->bindParam(':userid', $userid);
                if($stmt->execute()){
                    $_SESSION['email'] = $newEmail;
                    $this->sendEmailChangeEmail($data);
                    return true;
                }else{
                    return false;
                }
        }else{
        $this->setResult("NOT OK");
        return true;
        }
    }

    public function changePassword($data){
        if(isset($data->password)){$password = htmlspecialchars($data->password);}else{return false;}
        session_start();
            if(!isset($_SESSION['userid'])){
                return false;
            }else{
                $userid = $_SESSION['userid'];
                $newPassword = password_hash($data->password, PASSWORD_BCRYPT);
                $sql = "UPDATE users SET password = :newpassword WHERE userid = :userid";
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':newpassword', $newPassword);
                $stmt->bindParam(':userid', $userid);
                if($stmt->execute()){
                    $this->sendPasswordEmail($data);
                    return true;
                }else{
                    return false;
                }
        }
    }

    public function changeForgottenPasswordById($data){
        if(isset($data->password)){$password = htmlspecialchars($data->password);}else{return false;}
        if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
        if(isset($data->hash)){$hash = htmlspecialchars($data->hash);}else{return false;}
        $sql = "SELECT * FROM users WHERE userid = :userid AND hash = :hash";
        $stmt = $this->database->getPDO()->prepare($sql);
        $stmt->bindParam(':userid', $userid);
        $stmt->bindParam(':hash', $hash);
            if($stmt->execute()){
                $row = $stmt->fetch();
                if(!$stmt->rowCount()){
                return false;
                }else{
                $newPassword = password_hash($data->password, PASSWORD_BCRYPT);
                $sql2 = "UPDATE users SET password = :newpassword WHERE userid = :userid";
                $stmt2 = $this->database->getPDO()->prepare($sql2);
                $stmt2->bindParam(':newpassword', $newPassword);
                $stmt2->bindParam(':userid', $userid);
                if($stmt2->execute()){
                    $this->sendPasswordEmailById($data);
                    return true;
                }else{
                    return false;
                }
            }
        }
    }

    public function changePasswordById($data){
        if(isset($data->password)){$password = htmlspecialchars($data->password);}else{return false;}
        if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
        session_start();
            if(!isset($_SESSION['userid'])){
                return false;
            }else{
                $newPassword = password_hash($data->password, PASSWORD_BCRYPT);
                $sql = "UPDATE users SET password = :newpassword WHERE userid = :userid";
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':newpassword', $newPassword);
                $stmt->bindParam(':userid', $userid);
                if($stmt->execute()){
                    $this->sendPasswordEmailById($data);
                    return true;
                }else{
                    return false;
                }
        }
    }

    public function deleteAccount($data){
        session_start();
            if(isset($_SESSION['userid'])){
                $userid = $_SESSION['userid'];
                $sql = "DELETE FROM users WHERE userid = :userid";
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':userid', $userid);
                if($stmt->execute()){
                        $this->setResult("OK");
                        return true;
                }else{
                return false;
                }
        }else{
        return false;
        }
    }

    public function deleteAccountById($data){
        if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
                $sql = "DELETE FROM users WHERE userid = :userid";
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':userid', $userid);
                if($stmt->execute()){
                        $this->setResult("OK");
                        return true;
                }else{
                return false;
                }
    }

    public function sendPasswordEmail($data){
        if(isset($_SESSION['email'])){
            $userid = $_SESSION['userid'];
            $sql = "SELECT * FROM users WHERE userid = :userid";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':userid', $userid);
            if($stmt->execute()){
                while ($row = $stmt->fetch()) {
                    $password = $data->password;
                    $firstname = htmlspecialchars_decode($row["firstname"]);
                    $subject = 'Password Change';
                    $bodyText =  'Dear '.$firstname.'!
                    You have successfully changed your password on https://websoft365.com.
                    Your new password: '.$password.'
                    If you have not changed your password and you think, that this is a mistake, please contact us, at websoft365@gmail.com.';
                    $bodyHtml = '<p>Dear '.$firstname.',</p>
                    <p>You have successfully changed your password on <a href="https://websoft365.com">https://websoft365.com</a>.
                    <br>
                    Your new password: '.$password.'
                    <br>
                    <p>If you haven&#39;t changed your password and you think, that this is a mistake, please contact us at <a href="mailto:websoft365@gmail.com">websoft365@gmail.com</a>.
                    </p>';
                    $data->email = htmlspecialchars_decode($row["email"]);
                    $data->subject = $subject;
                    $data->bodyText = $bodyText;
                    $data->bodyHtml = $bodyHtml;
                    
                    if($this->sendNewEmail($data)){
                        $this->setResult("OK");
                        return true;
                    }else{
                        return false;
                    }
                }
            }else{
                return false;
            }
        }
    }

    public function sendPasswordEmailById($data){
            if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
            $sql = "SELECT * FROM users WHERE userid = :userid";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':userid', $userid);
            if($stmt->execute()){
                while ($row = $stmt->fetch()) {
                    $password = $data->password;
                    $firstname = htmlspecialchars_decode($row["firstname"]);
                    $subject = 'Password Change';
                    $bodyText =  'Dear '.$firstname.'!
                    You have successfully changed your password on https://websoft365.com.
                    Your new password: '.$password.'
                    If you have not changed your password and you think, that this is a mistake, please contact us, at websoft365@gmail.com.';
                    $bodyHtml = '<p>Dear '.$firstname.',</p>
                    <p>You have successfully changed your password on <a href="https://websoft365.com">https://websoft365.com</a>.
                    <br>
                    Your new password: '.$password.'
                    <br>
                    <p>If you haven&#39;t changed your password and you think, that this is a mistake, please contact us at <a href="mailto:websoft365@gmail.com">websoft365@gmail.com</a>.
                    </p>';
                    $data->email = htmlspecialchars_decode($row["email"]);
                    $data->subject = $subject;
                    $data->bodyText = $bodyText;
                    $data->bodyHtml = $bodyHtml;
                    
                    if($this->sendNewEmail($data)){
                        $this->setResult("OK");
                        return true;
                    }else{
                        return false;
                    }
                }
        }
    }

    public function sendForgotPasswordEmail($data){
            if(isset($data->email)){$email = htmlspecialchars($data->email);}else{return false;}
            $sql = "SELECT * FROM users WHERE email = :email";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':email', $email);
            if($stmt->execute()){
                while ($row = $stmt->fetch()) {
                    $firstname = htmlspecialchars_decode($row["firstname"]);
                    $userid = htmlspecialchars_decode($row["userid"]);
                    $hash = htmlspecialchars_decode($row["hash"]);
                    $subject = 'Password Change';
                    $bodyText =  'Dear '.$firstname.'!
                    You have requested to have a new password assigned to your account at https://websoft365.com/. If you didn&#39;t request this or if you don&#39;t want to change your password you should just ignore this message. Only if you visit the activation page below will your password be changed.
                    ';
                    $bodyHtml = '<p>Dear '.$firstname.',</p>
                    <p>You have requested to have a new password assigned to your account at <a href="https://websoft365.com">https://websoft365.com</a>.
                    <br>
                    If you didn&#39;t request this or if you don&#39;t want to change your password you should just ignore this message.
                    <br>
                    <p>Only if you visit the activation page below will your password be changed:<br>
                    https://www.websoft365.com/change_password.php?userid='.$userid.'&hash='.$hash.'
                    </p>';
                    $data->email = htmlspecialchars_decode($row["email"]);
                    $data->subject = $subject;
                    $data->bodyText = $bodyText;
                    $data->bodyHtml = $bodyHtml;
                    
                    if($this->sendNewEmail($data)){
                        $this->setResult("OK");
                        return true;
                    }else{
                        return false;
                    }
                }
            }else{
                return false;
            }
        }

    public function sendActivationEmail($data){
                if(isset($data->firstname)){$firstname = htmlspecialchars($data->firstname);}else{return false;}
                if(isset($data->lastname)){$lastname = htmlspecialchars($data->lastname);}else{return false;}
                if(isset($data->email)){$email = htmlspecialchars($data->email);}else{return false;}
                if(isset($data->password)){$password = $data->password;}else{return false;}
                if(isset($data->hash)){$hash = $data->hash;}else{return false;}
                $subject = 'Email confirmation';
                $bodyText = 'Dear '.$firstname.'!
                Thank you for registering to https://websoft365.com. To verify your email address, click on the link below:
                https://www.websoft365.com/backend/verify.php?email='.$email.'&hash='.$hash.'';
                $bodyHtml = '<p>Dear '.$firstname.',</p>
                <p>Thank you for registering to <a href="https://websoft365.com">https://websoft365.com</a>. To verify your email address, click on the link below:
                <br>
                https://www.websoft365.com/backend/verify.php?email='.$email.'&hash='.$hash.'
                </p>';
                $data->subject = $subject;
                $data->bodyText = $bodyText;
                $data->bodyHtml = $bodyHtml;
                $this->setResult("OK");
                $this->sendNewEmail($data);
                return true;
    }

        public function resendActivationEmail($data){
            if(isset($data->email)){$email = htmlspecialchars($data->email);}else{return false;}
            $sql = "SELECT * FROM users WHERE email = :email";
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':email', $email);
                if($stmt->execute()){
                        while ($row = $stmt->fetch()) {
                        $hash = htmlspecialchars_decode($row["hash"]);
                        $firstname = htmlspecialchars_decode($row["firstname"]);
                        $subject = 'Email confirmation';
                        $bodyText = 'Dear '.$firstname.'!
                        Thank you for registering to https://websoft365.com. To verify your email address, click on the link below:
                        https://www.websoft365.com/backend/verify.php?email='.$email.'&hash='.$hash.'';
                        $bodyHtml ='<p>Dear '.$firstname.',</p>
                        <p>Thank you for registering to <a href="https://websoft365.com">https://websoft365.com</a>. To verify your email address, click on the link below:
                        <br>
                        https://www.websoft365.com/backend/verify.php?email='.$email.'&hash='.$hash.'
                        </p>';
                        $data->subject = $subject;
                        $data->bodyText = $bodyText;
                        $data->bodyHtml = $bodyHtml;
                        $this->setResult("OK");
                        $this->sendNewEmail($data);
                        return true;
                }
    
            }

        }

    public function sendEmailChangeEmail($data){
        if(isset($_SESSION['email'])){
            $userid = $_SESSION['userid'];
            $sql = "SELECT * FROM users WHERE userid = :userid";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':userid', $userid);
            if($stmt->execute()){
                while ($row = $stmt->fetch()) {
                    $firstname = htmlspecialchars_decode($row["firstname"]);
                    $hash = htmlspecialchars_decode($row["hash"]);
                    $email = htmlspecialchars_decode($row["email"]);
                    $subject = 'Email Address Change';
                    $bodyText =  'Dear '.$firstname.'!
                    You have successfully changed your email address on https://websoft365.com. To verify your email address, click on the link below:
                    https://www.websoft365.com/backend/verify_change.php?email='.$email.'&hash='.$hash.'';
                    $bodyHtml = '<p>Dear '.$firstname.',</p>
                    <p>You have successfully changed your email address on <a>https://websoft365.com</a>. To verify your email address, click on the link below:
                    <br>
                    https://www.websoft365.com/backend/verify_change.php?email='.$email.'&hash='.$hash.'
                    </p>';
                    $data->email = $email;
                    $data->subject = $subject;
                    $data->bodyText = $bodyText;
                    $data->bodyHtml = $bodyHtml;
                    $this->setResult("OK");
                    $this->sendNewEmail($data);
                    return true;
                }
            }else{
            $this->setResult("NOT OK");
            return true;
            }
        }
    }

    public function sendContactEmail($data){
        if(isset($data->name)){$name = htmlspecialchars($data->name);}else{return false;}
        if(isset($data->subject)){$subject = htmlspecialchars($data->subject);}else{return false;}
        if(isset($data->email)){$email = htmlspecialchars($data->email);}else{return false;}
        if(isset($data->message)){$message = $data->message;}else{return false;}
        $bodyText =  
        'New email from: '.$name.'
        Email address: '.$email.'
        Message: '.$message.'
        ';
        $bodyHtml = 
        '<p>New email from: '.$name.'</p>
        <br>
        <p>Email address: '.$email.'</p>
        <br>
        <p>Message: '.$message.'</p>
        ';
        $data->email = 'websoft365com@gmail.com';
        $data->bodyText = $bodyText;
        $data->bodyHtml = $bodyHtml;
        $data->subject = $subject;
        $this->setResult("OK");
        $this->sendNewEmail($data);
        return true;
    }

    public function sendContactResponse($data){
        if(isset($data->name)){$name = htmlspecialchars($data->name);}else{return false;}
        if(isset($data->subject)){$subject = htmlspecialchars($data->subject);}else{return false;}
        if(isset($data->email)){$email = htmlspecialchars($data->email);}else{return false;}
        if(isset($data->message)){$message = $data->message;}else{return false;}
        $subject = 'Re: '.$subject.'';
        $bodyText =  
        'Dear '.$name.',
        Thank you for your email.
        This is an automated notification to let you know, that we have received your email.
        One of our colleagues will reply to your email message as soon as possible.
        Best regards,
        WebSoft365.com
        ';
        $bodyHtml = 
        '<p>Dear '.$name.',</p>
        <br>
        <p>Thank you for your email.</p>
        <br>
        <p>This is an automated notification to let you know, that we have received your email.</p>
        <p>One of our colleagues will reply to your email message as soon as possible.</p>
        <br>
        <p>Best regards,</p>
        <p>WebSoft365.com</p>
        ';
        $data->bodyText = $bodyText;
        $data->bodyHtml = $bodyHtml;
        $data->subject = $subject;
        $this->setResult("OK");
        $this->sendNewEmail($data);
        return true;
    }

    public function sendIdeaEmail($data){
        if(isset($data->name)){$name = htmlspecialchars($data->name);}else{return false;}
        if(isset($data->description)){$description = htmlspecialchars($data->description);}else{return false;}
        if(isset($data->email)){$email = htmlspecialchars($data->email);}else{return false;}
        $subject = 'New WebSoft365 Software Idea';
        $bodyText =  
        'New email from: '.$email.'
        Name of Software or Tools idea: '.$name.'
        Detailed Description of Software or Tools idea '.$description.'
        ';
        $bodyHtml = 
        '<p>New email from: '.$email.'</p>
        <br>
        <p>Name of Software or Tools idea: '.$name.'</p>
        <br>
        <p>Detailed Description of Software or Tools idea: '.$description.'</p>
        ';
        $data->email = 'websoft365com@gmail.com';
        $data->subject = $subject;
        $data->bodyText = $bodyText;
        $data->bodyHtml = $bodyHtml;
        $this->setResult("OK");
        $this->sendNewEmail($data);
        return true;
    }

    public function sendIdeaEmailResponse($data){
        if(isset($data->name)){$name = htmlspecialchars($data->name);}else{return false;}
        if(isset($data->description)){$description = htmlspecialchars($data->description);}else{return false;}
        if(isset($data->email)){$email = htmlspecialchars($data->email);}else{return false;}
        $subject = 'Re: New WebSoft365 Software Idea';
        $bodyText =  
        '
        Dear '.$name.',
        Thank you for recommending a software idea to websoft365.com.
        We will carefully review your software or tools idea. If we think, that it is a good idea, then we will create and release it to the websoft365.com members.
        Note: We cannot promise you any time frame. However, we will start working on it as soon as the WebSoft365 management team approves your idea.
        Best regards,
        WebSoft365.com
        ';
        $bodyHtml = 
        '<p>Dear '.$name.',</p>
        <br>
        <p>Thank you for recommending a software idea to <a href="https://websoft365.com">websoft365.com.</a></p>
        <br>
        <p>We will carefully review your software or tools idea. If we think, that it is a good idea, then we will create and release it to the websoft365.com members.</p>
        <p><b>Note:</b> We cannot promise you any time frame. However, we will start working on it as soon as the WebSoft365 management team approves your idea.</p>
        <br>
        <p>Best regards,</p>
        <p>WebSoft365.com</p>
        ';
        $data->subject = $subject;
        $data->bodyText = $bodyText;
        $data->bodyHtml = $bodyHtml;
        $this->setResult("OK");
        $this->sendNewEmail($data);
        return true;
    }

    public function changeUserMembership($data){
        if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
        if(isset($data->group_type)){$group_type = htmlspecialchars($data->group_type);}else{return false;}
        $sql = "UPDATE users SET group_type = :group_type WHERE userid = :userid";
        $stmt = $this->database->getPDO()->prepare($sql);
        $stmt->bindParam(':userid', $userid);
        $stmt->bindParam(':group_type', $group_type);
        if($stmt->execute()){
                $this->setResult("OK");
                return true;
        }else{
            return false;
        }
    }
    public function suspendUser($data){
        if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
        $sql = "UPDATE users SET suspended = 1 WHERE userid = :userid";
        $stmt = $this->database->getPDO()->prepare($sql);
        $stmt->bindParam(':userid', $userid);
        if($stmt->execute()){
                $this->setResult("OK");
                return true;
        }else{
            return false;
        }
    }

    public function createNote($data){
        session_start();
        if(isset($data->note)){$note = htmlspecialchars($data->note);}else{return false;}
        if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
        $created_by = $_SESSION['userid'];
        $sql = "INSERT INTO notes (userid, note, created_by) 
        VALUES(:userid, :note, :created_by)";
        $stmt = $this->database->getPDO()->prepare($sql);
        $stmt->bindParam(':userid', $userid);
        $stmt->bindParam(':note', $note);
        $stmt->bindParam(':created_by', $created_by);
        if($stmt->execute()){
                $this->getLastNoteId($data);
                return true;
        }else{
            return false;
        }
    }

    public function getLastNoteId($data){
        if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
        $sql = "SELECT * FROM notes WHERE userid = :userid ORDER BY nr DESC LIMIT 1";
        $stmt = $this->database->getPDO()->prepare($sql);
        $stmt->bindParam(':userid', $userid);
        if($stmt->execute()){
            $row = $stmt->fetch();
            $tempArray = array();
            $tempArray["status"] = "OK";
            $tempArray["nr"] = htmlspecialchars_decode($row["nr"]);
            $this->resultArray = $tempArray;
            return true;
        }else{
            return false;
        }
    }

    public function displayNotes($data){
        if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
        $sql = "SELECT * FROM notes WHERE userid = :userid";
        $stmt = $this->database->getPDO()->prepare($sql);
        $stmt->bindParam(':userid', $userid);
        if($stmt->execute()){
            $tempArray = array();
                while ($row = $stmt->fetch()) {
                    $anotherArray = array();
                    $anotherArray["userid"] = htmlspecialchars_decode($row["userid"]);
                    $anotherArray["note"] = htmlspecialchars_decode($row["note"]);
                    $anotherArray["created_by"] = htmlspecialchars_decode($row["created_by"]);
                    $anotherArray["nr"] = htmlspecialchars_decode($row["nr"]);
                    $tempArray["status"] = "OK";
                    $tempArray["notes"][] = $anotherArray;
                }
                $this->resultArray = $tempArray;
                return true;
        }else{
            return false;
        }
    }

    public function deleteNote($data){
        if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
        if(isset($data->nr)){$nr = htmlspecialchars($data->nr);}else{return false;}
        $sql = "DELETE FROM notes WHERE nr = :nr";
        $stmt = $this->database->getPDO()->prepare($sql);
        $stmt->bindParam(':nr', $nr);
        if($stmt->execute()){
                $this->setResult("OK");
                return true;
        }else{
            return false;
        }
    }

    public function changeSubIdById($data){
        if(isset($data->sub_id)){$sub_id = htmlspecialchars($data->sub_id);}else{return false;}
        if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
        session_start();
            if(!isset($_SESSION['userid'])){
                return false;
            }else{
                $sql = "UPDATE users SET sub_id = :sub_id WHERE userid = :userid";
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':sub_id', $sub_id);
                $stmt->bindParam(':userid', $userid);
                if($stmt->execute()){
                    $this->setResult("OK");
                    return true;
                }else{
                    return false;
                }
        }
    }

    public function changeExpDateById($data){
        if(isset($data->exp_date)){$exp_date = htmlspecialchars($data->exp_date);}else{return false;}
        if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
        session_start();
            if(!isset($_SESSION['userid'])){
                return false;
            }else{
                $sql = "UPDATE users SET exp_date = :exp_date WHERE userid = :userid";
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':exp_date', $exp_date);
                $stmt->bindParam(':userid', $userid);
                if($stmt->execute()){
                    $this->setResult("OK");
                    return true;
                }else{
                    return false;
                }
        }
    }

    public function uploadProfileImage($data){
        if(isset($data->base64)){$base64 = htmlspecialchars($data->base64);}else{return false;}
        session_start();
        if(isset($_SESSION['userid'])){
            $userid = $_SESSION['userid'];
            $hash = md5(rand(0,1000));
            $mimetype = "image/png";
                if($this->generateProfileImage($base64, $hash, $userid)){
                    $sql = "INSERT INTO profile_images (mimetype, hash, userid) VALUES (:mimetype, :hash, :userid) ON DUPLICATE KEY UPDATE hash = :hash";
                    $stmt = $this->database->getPDO()->prepare($sql);
                    $stmt->bindParam(':mimetype', $mimetype);
                    $stmt->bindParam(':hash', $hash);
                    $stmt->bindParam(':userid', $userid);
                    if($stmt->execute()){
                        $this->setResult("OK");
                        return true;
                    }else{
                        $this->setResult("hallo3");
                    return true;
                    }
                }
        }else{
            $this->setResult("hallo");
            return true;
        }
        $this->setResult("hallo2");
        return true;
    }

    public function generateProfileImage($b64, $hash, $userid)
    {
        $sql = "SELECT * FROM profile_images WHERE userid = :userid";
        $stmt = $this->database->getPDO()->prepare($sql);
        $stmt->bindParam(':userid', $userid);
        if($stmt->execute()){
            $row = $stmt->fetch();
            $file_name = htmlspecialchars_decode($row["hash"]);
            $this->deleteProfileImage($file_name);
        }
        $bin = base64_decode($b64);
        $im = imageCreateFromString($bin);
        if (!$im) {
            return false;
        }
        $img_file = "uploads/profile_images/".$hash.".png";
        imagepng($im, $img_file, 9);
        return true;
    }

    public function deleteProfileImage($file_name){
        $img_file = "uploads/profile_images/".$file_name.".png";
        unlink($img_file);
        return true;
    }

    public function getProfileImage($data){
        session_start();
        if(isset($_SESSION['userid'])){
            $userid = $_SESSION ['userid'];
            $sql = "SELECT * FROM profile_images WHERE userid = :userid";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':userid', $userid);
            if($stmt->execute()){
                $result = $stmt->fetch();
                $tempArray = array();
                $tempArray["status"] = "OK";
                $tempArray["hash"] = $result["hash"];
                $this->resultArray = $tempArray;
                return true; 
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    public function uploadToolData($data){
        if(isset($data->base64)){$base64 = htmlspecialchars($data->base64);}else{return false;}
        if(isset($data->description)){$description = htmlspecialchars($data->description);}else{return false;}
        if(isset($data->title)){$title = htmlspecialchars($data->title);}else{return false;}
        if(isset($data->platform)){$platform = htmlspecialchars($data->platform);}else{return false;}
        if(isset($data->folder)){$folder = htmlspecialchars($data->folder);}else{return false;}
        if(isset($data->video_url)){$video_url = htmlspecialchars($data->video_url);}else{$video_url="N/A";}
        if(isset($data->status)){$status = htmlspecialchars($data->status);}else{return false;}
        if(isset($data->keywords)){$keywords = htmlspecialchars($data->keywords);}else{return false;}
        if($video_url==""){$video_url="N/A";}
        session_start();
        if(isset($_SESSION['userid'])){
            $userid = $_SESSION['userid'];
            $hash = md5(rand(0,1000));
            $mimetype = "image/png";
                if($this->generateToolImage($base64, $hash, $toolid)){
                    $sql = "INSERT INTO tools (mimetype, hash, userid, description, title, video_url, platform, folder, status, keywords) VALUE (:mimetype, :hash, :userid, :description, :title, :video_url, :platform, :folder, :status, :keywords)";
                    $stmt = $this->database->getPDO()->prepare($sql);
                    $stmt->bindParam(':mimetype', $mimetype);
                    $stmt->bindParam(':hash', $hash);
                    $stmt->bindParam(':userid', $userid);
                    $stmt->bindParam(':description', $description);
                    $stmt->bindParam(':title', $title);
                    $stmt->bindParam(':video_url', $video_url);
                    $stmt->bindParam(':platform', $platform);
                    $stmt->bindParam(':folder', $folder);
                    $stmt->bindParam(':status', $status);
                    $stmt->bindParam(':keywords', $keywords);
                    if($stmt->execute()){
                        $this->uploadToolCategory($data);
                        return true;
                    }else{
                        $this->setResult("hallo3");
                    return true;
                    }
                }
        }else{
            $this->setResult("hallo");
            return true;
        }
        $this->setResult("hallo2");
        return true;
    }

    public function updateToolData($data){
        if(isset($data->base64)){$base64 = htmlspecialchars($data->base64);}else{return false;}
        if(isset($data->description)){$description = htmlspecialchars($data->description);}else{return false;}
        if(isset($data->title)){$title = htmlspecialchars($data->title);}else{return false;}
        if(isset($data->toolid)){$toolid = htmlspecialchars($data->toolid);}else{return false;}
        if(isset($data->platform)){$platform = htmlspecialchars($data->platform);}else{return false;}
        if(isset($data->folder)){$folder = htmlspecialchars($data->folder);}else{return false;}
        if(isset($data->video_url)){$video_url = htmlspecialchars($data->video_url);}else{$video_url="N/A";}
        if($video_url==""){$video_url="N/A";}
        if(isset($data->status)){$status = htmlspecialchars($data->status);}else{return false;}
        if(isset($data->keywords)){$keywords = htmlspecialchars($data->keywords);}else{return false;}
        session_start();
        if(isset($_SESSION['userid'])){
            $userid = $_SESSION['userid'];
            $hash = md5(rand(0,1000));
            $mimetype = "image/png";
                if($this->generateToolImage($base64, $hash, $toolid)){
                    $sql = "UPDATE tools SET hash = :hash, userid = :userid, description = :description, title = :title, video_url = :video_url, platform = :platform, folder = :folder, status = :status, keywords = :keywords WHERE toolid = :toolid";
                    $stmt = $this->database->getPDO()->prepare($sql);
                    $stmt->bindParam(':toolid', $toolid);
                    $stmt->bindParam(':hash', $hash);
                    $stmt->bindParam(':userid', $userid);
                    $stmt->bindParam(':description', $description);
                    $stmt->bindParam(':title', $title);
                    $stmt->bindParam(':video_url', $video_url);
                    $stmt->bindParam(':platform', $platform);
                    $stmt->bindParam(':folder', $folder);
                    $stmt->bindParam(':status', $status);
                    $stmt->bindParam(':keywords', $keywords);
                    if($stmt->execute()){
                        $this->updateToolCategory($data);
                        return true;
                    }else{
                        $this->setResult("hallo3");
                    return true;
                    }
                }
        }else{
            $this->setResult("hallo");
            return true;
        }
        $this->setResult("hallo2");
        return true;
    }

    public function generateToolImage($b64, $hash, $toolid)
    {
        $sql = "SELECT * FROM tools WHERE toolid = :toolid";
        $stmt = $this->database->getPDO()->prepare($sql);
        $stmt->bindParam(':toolid', $toolid);
        if($stmt->execute()){
            $row = $stmt->fetch();
            $file_name = $row["hash"];
            $this->deleteToolImage($file_name);
        }
        $bin = base64_decode($b64);
        $im = imageCreateFromString($bin);
        if (!$im) {
            return false;
        }
        $img_file = "uploads/tool_images/".$hash.".png";
        imagepng($im, $img_file, 9);
        return true;
    }

    public function deleteToolImage($file_name){
        $img_file = "uploads/tool_images/".$file_name.".png";
        unlink($img_file);
        return true;
    }

    public function getTools($data){
        $sql = "SELECT * FROM tools INNER JOIN tool_categories ON tools.toolid = tool_categories.toolid";
        $stmt = $this->database->getPDO()->prepare($sql);
        if($stmt->execute()){
            $tempArray = array();
            while ($row = $stmt->fetch()) {
                $anotherArray = array();
                $anotherArray["title"] = htmlspecialchars_decode($row["title"]);
                $anotherArray["description"] = htmlspecialchars_decode($row["description"]);
                $anotherArray["hash"] = htmlspecialchars_decode($row["hash"]);
                $anotherArray["toolid"] = htmlspecialchars_decode($row["toolid"]);
                $anotherArray["webmaster"] = htmlspecialchars_decode($row["webmaster"]);
                $anotherArray["social_media"] = htmlspecialchars_decode($row["social_media"]);
                $anotherArray["business"] = htmlspecialchars_decode($row["business"]);
                $anotherArray["video_url"] = htmlspecialchars_decode($row["video_url"]);
                $anotherArray["platform"] = htmlspecialchars_decode($row["platform"]);
                $anotherArray["folder"] = htmlspecialchars_decode($row["folder"]);
                $anotherArray["status"] = htmlspecialchars_decode($row["status"]);
                $anotherArray["keywords"] = htmlspecialchars_decode($row["keywords"]);
                $tempArray["status"] = "OK";
                $tempArray["tools"][] = $anotherArray;
            }
            $this->resultArray = $tempArray;
            return true;
        }else{
            return false;
        }
}

    public function getProfileImageById($data){
        if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
        session_start();
        if(isset($_SESSION['userid'])){
            $sql = "SELECT * FROM profile_images WHERE userid = :userid";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':userid', $userid);
            if($stmt->execute()){
                $result = $stmt->fetch();
                $tempArray = array();
                $tempArray["status"] = "OK";
                $tempArray["hash"] = $result["hash"];
                $this->resultArray = $tempArray;
                return true; 
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    public function uploadUserDomains($data){
        if(isset($data->domain1)){$domain1 = htmlspecialchars($data->domain1);}else{$domain1="";}
        if(isset($data->domain2)){$domain2 = htmlspecialchars($data->domain2);}else{$domain2="";}
        if(isset($data->domain3)){$domain3 = htmlspecialchars($data->domain3);}else{$domain3="";}
        if(isset($data->domain4)){$domain4 = htmlspecialchars($data->domain4);}else{$domain4="";}
        if(isset($data->domain5)){$domain5 = htmlspecialchars($data->domain5);}else{$domain5="";}
        session_start();
        if(isset($_SESSION['userid'])){
            $userid=$_SESSION['userid'];
            if($this->checkIfDomainExists($data)){
                $this->setResult("DOMAIN EXISTS");
                return true;
            }
            $sql = "INSERT INTO user_domains (domain1, domain2, domain3, domain4, domain5, userid) VALUES (:domain1, :domain2, :domain3, :domain4, :domain5, :userid) ON DUPLICATE KEY UPDATE domain1 = :domain1, domain2 = :domain2, domain3 = :domain3, domain4 = :domain4, domain5 = :domain5";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':userid', $userid);
            $stmt->bindParam(':domain1', $domain1);
            $stmt->bindParam(':domain2', $domain2);
            $stmt->bindParam(':domain3', $domain3);
            $stmt->bindParam(':domain4', $domain4);
            $stmt->bindParam(':domain5', $domain5);
            if($stmt->execute()){
                $result = $stmt->fetch();
                $this->setResult("OK");
                return true; 
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    public function checkIfDomainExists($data){
        if(isset($data->domain1)){$domain1 = htmlspecialchars($data->domain1);}else{$domain1="";}
        if(isset($data->domain2)){$domain2 = htmlspecialchars($data->domain2);}else{$domain2="";}
        if(isset($data->domain3)){$domain3 = htmlspecialchars($data->domain3);}else{$domain3="";}
        if(isset($data->domain4)){$domain4 = htmlspecialchars($data->domain4);}else{$domain4="";}
        if(isset($data->domain5)){$domain5 = htmlspecialchars($data->domain5);}else{$domain5="";}
        $domain_array = array();
        if($domain1!=""){
            $domain_array[]=$domain1;
        }
        if($domain2!=""){
            $domain_array[]=$domain2;
        }
        if($domain3!=""){
            $domain_array[]=$domain3;
        }
        if($domain4!=""){
            $domain_array[]=$domain4;
        }
        if($domain5!=""){
            $domain_array[]=$domain5;
        }
        for($i=0;$i<count($domain_array);$i++){
            for($x=1;$x<6;$x++){
                $sql = "SELECT * FROM user_domains WHERE domain".$x." = '".$domain_array[$i]."'";
                $stmt = $this->database->getPDO()->prepare($sql);
                if($stmt->execute()){
                    if($stmt->rowCount() >= 1){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public function getUserDomains($data){
        if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
            $sql = "SELECT * FROM user_domains WHERE userid = :userid";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':userid', $userid);
            if($stmt->execute()){
                $row = $stmt->fetch();
                $tempArray = array();
                $anotherArray = array();
                $anotherArray["domain1"] = htmlspecialchars_decode($row["domain1"]);
                $anotherArray["domain2"] = htmlspecialchars_decode($row["domain2"]);
                $anotherArray["domain3"] = htmlspecialchars_decode($row["domain3"]);
                $anotherArray["domain4"] = htmlspecialchars_decode($row["domain4"]);
                $anotherArray["domain5"] = htmlspecialchars_decode($row["domain5"]);
                $tempArray["status"] = "OK";
                $tempArray["domains"] = $anotherArray;
                $this->resultArray = $tempArray;
                return true; 
            }else{
                return false;
            }
    }

    public function uploadDriveCode($data){
        if(isset($data->org)){$org = htmlspecialchars($data->org);}else{return false;}
        if(isset($data->code)){$code = htmlspecialchars($data->code);}else{return false;}
        session_start();
        if(isset($_SESSION['userid'])){
            $userid = $_SESSION['userid'];
            $gdrive_code = "";
            $dropbox_code = "";
            $pcloud_code = "";
            $onedrive_code = "";
            $box_code = "";
            switch($org){
                case "gdrive":
                    $gdrive_code = $code;
                    $duplicate = " ON DUPLICATE KEY UPDATE gdrive_code = :gdrive_code";
                break;
                case "dropbox":
                    $dropbox_code = $code;
                    $duplicate = " ON DUPLICATE KEY UPDATE dropbox_code = :dropbox_code";
                break;
                case "pcloud":
                    $pcloud_code = $code;
                    $duplicate = " ON DUPLICATE KEY UPDATE pcloud_code = :pcloud_code";
                break;
                case "onedrive":
                    $onedrive_code = $code;
                    $duplicate = " ON DUPLICATE KEY UPDATE onedrive_code = :onedrive_code";
                break;
                case "box":
                    $box_code = $code;
                    $duplicate = " ON DUPLICATE KEY UPDATE box_code = :box_code";
                break;
            }
            $sql = "INSERT INTO drives (userid, gdrive_code, dropbox_code, pcloud_code, onedrive_code, box_code) VALUES (:userid, :gdrive_code, :dropbox_code, :pcloud_code, :onedrive_code, :box_code)".$duplicate;
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':userid', $userid);
            $stmt->bindParam(':gdrive_code', $gdrive_code);
            $stmt->bindParam(':dropbox_code', $dropbox_code);
            $stmt->bindParam(':pcloud_code', $pcloud_code);
            $stmt->bindParam(':onedrive_code', $onedrive_code);
            $stmt->bindParam(':box_code', $box_code);
            if($stmt->execute()){
                $result = $stmt->fetch();
                $this->setResult("OK");
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    public function checkIfDrivesAreSet($data){
        session_start();
        if(isset($_SESSION['userid'])){
            $userid = $_SESSION['userid'];
            $sql = "SELECT * FROM drives WHERE userid = :userid";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':userid', $userid);
            if($stmt->execute()){
                $result = $stmt->fetch();
                $tempArray = array();
                $tempArray["status"] = "OK";
                if($result['gdrive_code']!=""){
                    $tempArray["gdrive_code"] = isset($result['gdrive_code']);
                }else{
                    $tempArray["gdrive_code"] = false;
                }
                if($result['dropbox_code']!=""){
                    $tempArray["dropbox_code"] = isset($result['dropbox_code']);
                }else{
                    $tempArray["dropbox_code"]=false;
                }
                if($result['pcloud_code']!=""){
                    $tempArray["pcloud_code"] = isset($result['pcloud_code']);
                }else{
                    $tempArray["pcloud_code"]=false;
                }
                if($result['onedrive_code']!=""){
                    $tempArray["onedrive_code"] = isset($result['onedrive_code']);
                }else{
                    $tempArray["onedrive_code"]=false;
                }
                if($result['box_code']!=""){
                    $tempArray["box_code"] = isset($result['box_code']);
                }else{
                    $tempArray["box_code"]=false;
                }
                $this->resultArray = $tempArray;
                return true; 
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    public function uploadToolCategory($data){
        if(isset($data->webmaster)){$webmaster = htmlspecialchars($data->webmaster);}else{return false;}
        if(isset($data->social_media)){$social_media = htmlspecialchars($data->social_media);}else{return false;}
        if(isset($data->business)){$business = htmlspecialchars($data->business);}else{return false;}
        $sql = "SELECT toolid FROM tools ORDER BY toolid DESC LIMIT 1";
        $stmt = $this->database->getPDO()->prepare($sql);
        if($stmt->execute()){
            $result = $stmt->fetch();
            $toolid = $result['toolid'];
            $sql2 = "INSERT INTO tool_categories (toolid, webmaster, social_media, business) VALUE (:toolid, :webmaster, :social_media, :business)";
            $stmt2 = $this->database->getPDO()->prepare($sql2);
            $stmt2->bindParam(':toolid', $toolid);
            $stmt2->bindParam(':webmaster', $webmaster);
            $stmt2->bindParam(':social_media', $social_media);
            $stmt2->bindParam(':business', $business);
            if($stmt2->execute()){
                $this->setResult("OK");
                return true;
            }
        }
    }

    public function updateToolCategory($data){
        if(isset($data->webmaster)){$webmaster = htmlspecialchars($data->webmaster);}else{return false;}
        if(isset($data->social_media)){$social_media = htmlspecialchars($data->social_media);}else{return false;}
        if(isset($data->business)){$business = htmlspecialchars($data->business);}else{return false;}
        if(isset($data->toolid)){$toolid = htmlspecialchars($data->toolid);}else{return false;}
        $sql2 = "UPDATE tool_categories SET webmaster = :webmaster, social_media = :social_media, business = :business WHERE toolid = :toolid";
                        $stmt2 = $this->database->getPDO()->prepare($sql2);
                        $stmt2->bindParam(':webmaster', $webmaster);
                        $stmt2->bindParam(':social_media', $social_media);
                        $stmt2->bindParam(':business', $business);
                        $stmt2->bindParam(':toolid', $toolid);
                        if($stmt2->execute()){
                            $this->setResult("OK");
                            return true;
                        }else{
                            return false;
                        }
    }

    public function changeSubToFree($data){
        session_start();
        if(isset($_SESSION['email'])){
            $email = ($_SESSION['email']);
            $sql = "UPDATE users SET sub_cancelled = 0, group_type = 'FREE' WHERE email = :email";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':email', $email);
            if($stmt->execute()){
                $this->setResult("OK");
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    public function updateOpenTools($data){
        session_start();
        if(isset($data->toolids)){$toolids = htmlspecialchars($data->toolids);}else{return false;}
        if(isset($_SESSION['email'])){
            $userid = ($_SESSION['userid']);
            $sql = "INSERT INTO open_tabs (userid, toolids) VALUES (:userid, :toolids) ON DUPLICATE KEY UPDATE toolids = :toolids";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':userid', $userid);
            $stmt->bindParam(':toolids', $toolids);
            if($stmt->execute()){
                $this->setResult("OK");
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
    public function getOpenTools($data){
        if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
            $sql = "SELECT * FROM open_tabs WHERE userid = :userid";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':userid', $userid);
            if($stmt->execute()){
                $result = $stmt->fetch();
                $tempArray = array();
                $tempArray["status"] = "OK";
                $tempArray["toolids"] = $result['toolids'];
                $this->resultArray = $tempArray;
                return true;
            }else{
                return false;
            }
        }

        public function deleteDomain($data){
            if(isset($data->domain_name)){$domain_name = htmlspecialchars($data->domain_name);}else{return false;}
            session_start();
            if(isset($_SESSION['userid'])){
                $userid = $_SESSION['userid'];
                switch ($domain_name) {
                    case 'domain1':
                        $sql = 'UPDATE user_domains SET domain1 = "" WHERE userid = :userid';
                        break;
                    case 'domain2':
                        $sql = 'UPDATE user_domains SET domain2 = "" WHERE userid = :userid';
                        break;
                    case 'domain3':
                        $sql = 'UPDATE user_domains SET domain3 = "" WHERE userid = :userid';
                        break;
                    case 'domain4':
                        $sql = 'UPDATE user_domains SET domain4 = "" WHERE userid = :userid';
                        break;
                    case 'domain5':
                        $sql = 'UPDATE user_domains SET domain5 = "" WHERE userid = :userid';
                        break;
                }
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':userid', $userid);
                if($stmt->execute()){
                    $this->setResult("OK");
                    return true; 
                }else{
                    return false;
                }
            }
        }

        public function setColorPickerColors($data){
            if(isset($data->hex)){$hex = htmlspecialchars($data->hex);}else{return false;}
            if(isset($data->comment)){$comment = htmlspecialchars($data->comment);}else{return false;}
            session_start();
            if(isset($_SESSION['userid'])){
                $userid = $_SESSION['userid'];
                $sql = "INSERT INTO colorpicker_saved_colors (userid,hex,comment) VALUES (:userid,:hex,:comment)";
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':userid', $userid);
                $stmt->bindParam(':hex', $hex);
                $stmt->bindParam(':comment', $comment);
                if($stmt->execute()){
                    $sql = "SELECT * FROM colorpicker_saved_colors WHERE userid=:userid";
                    $stmt = $this->database->getPDO()->prepare($sql);
                    $stmt->bindParam(':userid', $userid);
                    if($stmt->execute()){
                        $tempArray = array();
                        while ($row = $stmt->fetch()) {
                            $tempArray["id"] = htmlspecialchars_decode($row["id"]);
                        }
                        $tempArray["status"] = "OK";
                        $this->resultArray = $tempArray;
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            }
        }

        public function getColorPickerColors($data){
            session_start();
            if(isset($_SESSION['userid'])){
                $userid = $_SESSION['userid'];
                $sql = "SELECT * FROM colorpicker_saved_colors WHERE userid=:userid";
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':userid', $userid);
                if($stmt->execute()){
                    $tempArray = array();
                    while ($row = $stmt->fetch()) {
                        $anotherArray = array();
                        $anotherArray["hex"] = htmlspecialchars_decode($row["hex"]);
                        $anotherArray["comment"] = htmlspecialchars_decode($row["comment"]);
                        $anotherArray["id"] = htmlspecialchars_decode($row["id"]);
                        $tempArray["status"] = "OK";
                        $tempArray["colors"][] = $anotherArray;
                    }
                    $this->resultArray = $tempArray;
                    return true;
                }else{
                    return false;
                }
            }
        }

        public function deleteColorPickerColor($data){
            if(isset($data->id)){$id = htmlspecialchars($data->id);}else{return false;}
            session_start();
            if(isset($_SESSION['userid'])){
                $sql = "DELETE FROM colorpicker_saved_colors WHERE id=:id";
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':id', $id);
                if($stmt->execute()){
                    $this->setResult("OK");
                    return true;
                }else{
                    return false;
                }
            }
        }

        public function copyImageToServer($data){
            if(isset($data->url)){$url = htmlspecialchars($data->url);}else{return false;}
            session_start();
            if(isset($_SESSION['userid'])){
                $userid = $_SESSION['userid'];
                // prevent hackers from uploading PHP scripts and pwning your system
                $img = "uploads/colorpicker/colorpicker".$userid.".png";
                file_put_contents($img, file_get_contents($url));
                $tempArray = array();
                $tempArray["status"] = "OK";
                $tempArray["link"] = $img;
                $this->resultArray = $tempArray;
                return true;
            }else{
                return false;
            } 
        }

        public function sendTestNewsletter($data){
            if(isset($data->email)){$email = htmlspecialchars($data->email);}else{return false;}
            if(isset($data->subject)){$subject = htmlspecialchars($data->subject);}else{return false;}
            if(isset($data->html)){$html = $data->html;}else{return false;}
            if(isset($data->text)){$text = $data->text;}else{return false;}
            session_start();
            if(isset($_SESSION['userid'])){
                $userid = $_SESSION['userid'];
                $data->subject = $subject;
                $data->bodyText = $text;
                $data->bodyHtml = '<div style="width:70%;margin-left:10%;background-color:lightgrey;padding:5%;border-radius:3px;opacity:.9;">
                <img src="https://websoft365.com/assets/websoft_logo7.png" width="30%"/>'.$html.'';
                $this->setResult("OK");
                $this->sendNewEmail($data);
                return true;
            }else{
                return false;
            } 
        }

        public function getSubscribedUserCountByGroup($data){
            session_start();
            if(isset($_SESSION['userid'])){
                $sql = "SELECT * FROM users WHERE newsletter=1";
                $stmt = $this->database->getPDO()->prepare($sql);
                if($stmt->execute()){
                    $tempArray = array();
                    $free_cnt=0;
                    $monthly_pro_cnt=0;
                    $yearly_pro_cnt=0;
                    $monthly_s_pro_cnt=0;
                    $yearly_s_pro_cnt=0;
                    $free_n_active=0;
                    while ($row = $stmt->fetch()) {
                        switch(htmlspecialchars_decode($row["group_type"])){
                            case "FREE":
                                $free_cnt++;
                            break;
                            case "PRO_MONTHLY":
                                $monthly_pro_cnt++;
                            break;
                            case "PRO_YEARLY":
                                $yearly_pro_cnt++;
                            break;
                            case "SUPER_PRO_MONTHLY":
                                $monthly_s_pro_cnt++;
                            break;
                            case "SUPER_PRO_YEARLY":
                                $yearly_s_pro_cnt++;
                            break;
                        }
                        if(htmlspecialchars_decode($row["group_type"])=="FREE"&&htmlspecialchars_decode($row["active"])==1){
                            $free_n_active++;
                        }
                    }
                    $tempArray["status"] = "OK";
                    $tempArray["free"] = $free_cnt;
                    $tempArray["free_n_active"] = $free_n_active; 
                    $tempArray["pro_monthly"] = $monthly_pro_cnt;
                    $tempArray["pro_yearly"] = $yearly_pro_cnt;
                    $tempArray["super_pro_monthly"] = $monthly_s_pro_cnt; 
                    $tempArray["super_pro_yearly"] = $yearly_s_pro_cnt; 
                    $this->resultArray = $tempArray;
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            } 
        }

        public function changeNewsletterSubscription($data){
            if(isset($data->newsletter)){$newsletter = htmlspecialchars($data->newsletter);}else{return false;}
            session_start();
            if(isset($_SESSION['userid'])){
                $userid = $_SESSION['userid'];
                $sql = "UPDATE users SET newsletter = :newsletter WHERE userid = :userid";
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':userid', $userid);
                $stmt->bindParam(':newsletter', $newsletter);
                if($stmt->execute()){
                    $this->setResult("OK");
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            } 
        }

        public function setPrivacyPolicyCookie($data){
            session_start();
            $_SESSION['policy_accepted'] = true;
            $this->setResult("OK");
            return true;
        }

        public function sendNewsletter($data){
            if(isset($data->subject)){$subject = $data->subject;}else{return false;}
            if(isset($data->text_content)){$text_content = $data->text_content;}else{return false;}
            if(isset($data->html_content)){$html_content = $data->html_content;}else{return false;}
            if(isset($data->group_type)){$group_type = $data->group_type;}else{return false;}
            if(isset($data->packet_size)){$packet_size = $data->packet_size;}else{return false;}
            $sql = "INSERT INTO newsletter (subject, text_content, html_content, group_type, packet_size) 
            VALUES(:subject, :text_content, :html_content, :group_type, :packet_size)";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':subject', $subject);
            $stmt->bindParam(':text_content', $text_content);
            $stmt->bindParam(':html_content', $html_content);
            $stmt->bindParam(':group_type', $group_type);
            $stmt->bindParam(':packet_size', $packet_size);
            if($stmt->execute()){
                $sql = "SELECT * FROM newsletter";
                $stmt = $this->database->getPDO()->prepare($sql);
                if($stmt->execute()){
                    $crontab_id=0;
                    while ($row = $stmt->fetch()) {
                        $crontab_id=$row['id'];
                    }
                    $fp = fopen('cron', 'a');//opens file in append mode  
                    fwrite($fp, "* * * * * wget https://websoft365.com/backend/newsletter.php?id={$crontab_id}\n");  
                    fclose($fp);
                    $this->setResult("OK");
                    return true;
                }
            }else{
                return false;
            }
        }

        public function updateToDoAccess($data){
            if(isset($data->to_do)){$to_do = $data->to_do;}else{return false;}
            if(isset($data->userid)){$userid = $data->userid;}else{return false;}
            $sql = "UPDATE users SET to_do = :to_do WHERE userid = :userid";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':to_do', $to_do);
            $stmt->bindParam(':userid', $userid);
            if($stmt->execute()){
                $this->setResult("OK");
                return true;
            }else{
                return false;
            }
        }

        public function checkIfToDoListUser($data){
            session_start();
            if(isset($_SESSION['userid'])){
                $userid = ($_SESSION['userid']);
                $sql = "SELECT * FROM users WHERE to_do = 1 AND userid = :userid";
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':userid', $userid);
                if($stmt->execute()){
                    if($stmt->rowCount() >= 1){
                        $this->setResult("TODO USER");
                    }else{
                        $this->setResult("NOT TODO USER");
                    }
                    return true;
                }else{
                    return false;
                }
            }
        }

        public function displayToDoListUsers($data){
            $sql = "SELECT * FROM users WHERE to_do = 1";
            $stmt = $this->database->getPDO()->prepare($sql);
            if($stmt->execute()){
                $tempArray = array();
                while ($row = $stmt->fetch()) {
                    $anotherArray = array();
                    $anotherArray["userid"] = htmlspecialchars_decode($row["userid"]);
                    $anotherArray["firstname"] = htmlspecialchars_decode($row["firstname"]);
                    $anotherArray["lastname"] = htmlspecialchars_decode($row["lastname"]);
                    $anotherArray["created"] = htmlspecialchars_decode($row["created"]);
                    $anotherArray["email"] = htmlspecialchars_decode($row["email"]);
                    $anotherArray["group_type"] = htmlspecialchars_decode($row["group_type"]);
                    $anotherArray["sub_id"] = htmlspecialchars_decode($row["sub_id"]);
                    $anotherArray["active"] = htmlspecialchars_decode($row["active"]);
                    $anotherArray["last_login"] = htmlspecialchars_decode($row["last_login"]);
                    //$anotherArray["hash"] = htmlspecialchars_decode($row["hash"]);
                    $tempArray["status"] = "OK";
                    $tempArray["users"][] = $anotherArray;
                }
            }
            $this->resultArray = $tempArray;
            return true;
        }

        public function displayToDoLists($data){
            if(isset($data->userid)){$userid = $data->userid;}else{return false;}
            $sql = "SELECT * FROM to_do_items WHERE userid = :userid";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':userid', $userid);
            if($stmt->execute()){
                $tempArray = array();
                while ($row = $stmt->fetch()) {
                    $anotherArray = array();
                    $anotherArray["nr"] = $row["nr"];
                    $anotherArray["note"] = $row["note"];
                    $anotherArray["title"] = $row["title"];
                    $anotherArray["status"] = $row["status"];
                    $anotherArray["priority"] = $row["priority"];
                    $anotherArray["user_note"] = $row["user_note"];
                    $tempArray["status"] = "OK";
                    $tempArray["list_items"][] = $anotherArray;
                }
                $this->resultArray = $tempArray;
                return true;
            }else{
                return false;
            }
        }

        public function addToDo($data){
            if(isset($data->userid)){$userid = $data->userid;}else{return false;}
            if(isset($data->title)){$title = $data->title;}else{return false;}
            if(isset($data->note)){$note = $data->note;}else{return false;}
            $sql = "INSERT INTO to_do_items (userid, note, title) VALUES (:userid, :note, :title)";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':userid', $userid);
            $stmt->bindParam(':note', $note);
            $stmt->bindParam(':title', $title);
            if($stmt->execute()){
                if(!$this->sendToDoEmail($data)){return false;}
                $sql = "SELECT * FROM to_do_items WHERE userid=:userid";
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':userid', $userid);
                if($stmt->execute()){
                    while ($row = $stmt->fetch()) {
                        $tempArray["status"] = "OK";
                        $tempArray["nr"] = $row["nr"];
                    }
                    $this->resultArray = $tempArray;
                    return true;
                }
            }
        }

        public function generateToDoImage($b64, $hash)
        {
            $b64 = preg_replace('#data:image/[^;]+;base64,#', '', $b64);
            $bin = base64_decode($b64);
            $im = imageCreateFromString($bin);
            if (!$im) {
                return false;
            }
            $img_file = "uploads/to_do/".$hash.".png";
            imagepng($im, $img_file, 9);
            return true;
        }

        public function sendToDoEmail($data){
            if(isset($data->title)){$title = $data->title;}else{return false;}
            if(isset($data->note)){$note = $data->note;}else{return false;}
            if(isset($data->userid)){$userid = $data->userid;}else{return false;}
            $sql = "SELECT * FROM users WHERE userid = :userid";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':userid', $userid);
            if($stmt->execute()){
                $email="";
                while ($row = $stmt->fetch()) {
                    $email = $row["email"];
                }
                    $subject = 'WebSoft365 - New To-do!';
                    $bodyText =  'You have received a new to-do on WebSoft365.com. Title: '.$title.' Description: '.$note.'';
                    $bodyHtml = '<div style="width:70%;margin-left:10%;background-color:lightgrey;padding:5%;border-radius:3px;opacity:.9;">
                    <img src="https://websoft365.com/assets/websoft_logo7.png" width="30%"/>
                    <p>You have received a new to-do on WebSoft365.com.</p> 
                    <p>Title: '.nl2br($title).'</p>
                    <p>Description: '.nl2br($note).'</p>
                    <p>To view this to-do, click on the following link: <a href="https://websoft365.com/to_do_user.php" target="_blank">https://websoft365.com/to_do_user.php</p>
                    </div>';
                    $data->email = $email;
                    $data->subject = $subject;
                    $data->bodyText = $bodyText;
                    $data->bodyHtml = $bodyHtml;
                    
                    if($this->sendNewEmail($data)){
                        $this->setResult("OK");
                        return true;
                    }else{
                        return false;
                    }
            }
        }

        public function deleteToDo($data){
            if(isset($data->nr)){$nr = $data->nr;}else{return false;}
            $sql = "DELETE FROM to_do_items WHERE nr = :nr";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':nr', $nr);
            if($stmt->execute()){
                $this->setResult("OK");
                return true;
            }
        }
        public function updateToDo($data){
            if(isset($data->nr)){$nr = $data->nr;}else{return false;}
            if(isset($data->note)){$note = $data->note;}else{return false;}
            if(isset($data->title)){$title = $data->title;}else{return false;}
            $sql = "UPDATE to_do_items SET note = :note, title = :title WHERE nr = :nr";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':nr', $nr);
            $stmt->bindParam(':note', $note);
            $stmt->bindParam(':title', $title);
            if($stmt->execute()){
                $this->setResult("OK");
                return true;
            }
        }

        public function changeToDoStatus($data){
            if(isset($data->nr)){$nr = $data->nr;}else{return false;}
            if(isset($data->status)){$status = $data->status;}else{return false;}
            if(isset($data->user_note)){$user_note = $data->user_note;}else{$user_note="";}
            $sql = "UPDATE to_do_items SET status = :status, user_note = :user_note WHERE nr = :nr";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':nr', $nr);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':user_note', $user_note);
            if($stmt->execute()){
                if($status=="resolved"){
                    $sql = "SELECT * FROM to_do_items INNER JOIN users ON to_do_items.userid = users.userid WHERE to_do_items.nr = :nr";
                    $stmt = $this->database->getPDO()->prepare($sql);
                    $stmt->bindParam(':nr', $nr);
                    if($stmt->execute()){
                        while ($row = $stmt->fetch()) {
                            $data->title = $row["title"];
                            $data->note = $row["note"];
                            $data->firstname = $row["firstname"];
                            $data->lastname = $row["lastname"];
                        }
                        error_log("itt");
                        $this->sendToDoResolvedEmail($data);
                    }
                }
                if($status=="to_be_corrected"){
                    $sql = "SELECT * FROM to_do_items INNER JOIN users ON to_do_items.userid = users.userid WHERE to_do_items.nr = :nr";
                    $stmt = $this->database->getPDO()->prepare($sql);
                    $stmt->bindParam(':nr', $nr);
                    if($stmt->execute()){
                        while ($row = $stmt->fetch()) {
                            $data->title = $row["title"];
                            $data->note = $row["note"];
                            $data->email = $row["email"];
                        }
                        $this->sendToDoCorrectionEmail($data);
                    }
                }
                $this->setResult("OK");
                return true;
            }
        }

        public function sendToDoResolvedEmail($data){
            if(isset($data->title)){$title = $data->title;}else{return false;}
            if(isset($data->note)){$note = $data->note;}else{return false;}
            if(isset($data->firstname)){$firstname = $data->firstname;}else{return false;}
            if(isset($data->lastname)){$lastname = $data->lastname;}else{return false;}
            $sql = "SELECT * FROM users WHERE group_type = 'ADMIN'";
            $stmt = $this->database->getPDO()->prepare($sql);
            if($stmt->execute()){
                $subject = 'WebSoft365 - To-do resolved!';
                $bodyText =  "A to-do's status from ".$firstname." ".$lastname." has been changed to 'Resolved'. Title: ".$title." Description: ".$note."";
                $bodyHtml = "<div style='width:70%;margin-left:10%;background-color:lightgrey;padding:5%;border-radius:3px;opacity:.9;'>
                <img src='https://websoft365.com/assets/websoft_logo7.png' width='30%'/>
                <p>A to-do's status from ".$firstname." ".$lastname." has been changed to 'Resolved'.</p> 
                <p>Title: ".nl2br($title)."</p>
                <p>Description: ".nl2br($note)."</p>
                <p>To view all to-dos, click on the following link: <a href='https://websoft365.com/to_do.php' target='_blank'>https://websoft365.com/to_do.php</p>
                </div>";
                $data->subject = $subject;
                $data->bodyText = $bodyText;
                $data->bodyHtml = $bodyHtml;
                while ($row = $stmt->fetch()) {
                    $data->email = $row["email"];
                    if(!$this->sendNewEmail($data)){return false;}
                }
                return true;
        }
    }

        public function sendToDoCorrectionEmail($data){
            if(isset($data->title)){$title = $data->title;}else{return false;}
            if(isset($data->note)){$note = $data->note;}else{return false;}
            if(isset($data->email)){$email = $data->email;}else{return false;}
                $subject = 'WebSoft365 - To-do to be corrected!';
                $bodyText =  "One of your to-do's status has been changed to 'To be corrected'. Title: ".$title." Description: ".$note."";
                $bodyHtml = "<div style='width:70%;margin-left:10%;background-color:lightgrey;padding:5%;border-radius:3px;opacity:.9;'>
                <img src='https://websoft365.com/assets/websoft_logo7.png' width='30%'/>
                <p>One of your to-do's status has been changed to 'To be corrected'.</p> 
                <p>Title: ".nl2br($title)."</p>
                <p>Description: ".nl2br($note)."</p>
                <p>To view this to-do, click on the following link: <a href='https://websoft365.com/to_do_user.php' target='_blank'>https://websoft365.com/to_do_user.php</p>
                </div>";
                $data->subject = $subject;
                $data->bodyText = $bodyText;
                $data->bodyHtml = $bodyHtml;
                $data->email = $email;
                if($this->sendNewEmail($data)){
                    $this->setResult("OK");
                    return true;
                }else{
                    return false;
                }
        }

        public function changeToDoPriority($data){
            if(isset($data->nr)){$nr = $data->nr;}else{return false;}
            if(isset($data->priority)){$priority = $data->priority;}else{return false;}
            $sql = "UPDATE to_do_items SET priority = :priority WHERE nr = :nr";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':nr', $nr);
            $stmt->bindParam(':priority', $priority);
            if($stmt->execute()){
                $this->setResult("OK");
                return true;
            }
        }


        public function uploadToolOrder($data){
            session_start();
            if(isset($data->toolids)){$toolids = $data->toolids;}else{return false;}
            if(isset($_SESSION['userid'])){
                $userid = $_SESSION['userid'];
                $sql = "INSERT INTO tool_order (userid, toolids) VALUES (:userid, :toolids) ON DUPLICATE KEY UPDATE toolids = :toolids";
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':toolids', $toolids);
                $stmt->bindParam(':userid', $userid);
                if($stmt->execute()){
                    $this->setResult("OK");
                    return true;
                }else{
                    return false;
                }
            }
        }

        public function getToolOrder($data){
            session_start();
            if(isset($_SESSION['userid'])){
                $userid = $_SESSION['userid'];
                $sql = "SELECT * FROM tool_order WHERE userid=:userid";
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':userid', $userid);
                if($stmt->execute()){
                    $tempArray = array();
                    while ($row = $stmt->fetch()) {
                        $tempArray["status"] = "OK";
                        $tempArray["tool_order"] = $row["toolids"];
                    }
                    $this->resultArray = $tempArray;
                    return true;
                }else{
                    return false;
                }
            }
        }

        public function uploadToDoOrder($data){
            if(isset($data->userid)){$userid = $data->userid;}else{return false;}
            if(isset($data->nrs)){$nrs = $data->nrs;}else{return false;}
                $sql = "INSERT INTO to_do_order (userid, nrs) VALUES (:userid, :nrs) ON DUPLICATE KEY UPDATE nrs = :nrs";
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':nrs', $nrs);
                $stmt->bindParam(':userid', $userid);
                if($stmt->execute()){
                    $this->setResult("OK");
                    return true;
                }else{
                    return false;
                }
        }

        public function getToDoOrder($data){
            if(isset($data->userid)){$userid = $data->userid;}else{return false;}
                $sql = "SELECT * FROM to_do_order WHERE userid=:userid";
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':userid', $userid);
                if($stmt->execute()){
                    $tempArray = array();
                    while ($row = $stmt->fetch()) {
                        $tempArray["status"] = "OK";
                        $tempArray["to_do_order"] = $row["nrs"];
                    }
                    $this->resultArray = $tempArray;
                    return true;
                }else{
                    return false;
                }
        }
}

