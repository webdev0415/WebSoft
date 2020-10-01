<?php

class BugReportTool{

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
    
    public function deleteAccount($data){
        session_start();
        if(isset($_SESSION['userid'])){
            $userid = $_SESSION['userid'];
            $sql = "DELETE FROM bug_report_team_members WHERE userid = :userid";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':userid', $userid);
            if($stmt->execute()){
                $sql2 = "SELECT * FROM bug_report_settings WHERE userid = :userid";
                $stmt2 = $this->database->getPDO()->prepare($sql2);
                $stmt2->bindParam(':userid', $userid);
                if($stmt2->execute()){
                    while ($row = $stmt2->fetch()) {
                        $domain_name = $row["domain_name"];
                        error_log($domain_name);
                        $domain_name_formatted = str_replace('.', '_', $domain_name);
                        $sql3 = "DROP TABLE ".$domain_name_formatted."";
                        error_log($sql3);
                        $stmt3 = $this->database->getPDO()->prepare($sql3);
                        $stmt3->execute();
                    }
                    $sql = "DELETE FROM bug_report_settings WHERE userid = :userid";
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
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    public function createReportsTableByDomain($domain_name){
        $table_name = str_replace('.', '_', $domain_name);
        $sql = "
        CREATE TABLE IF NOT EXISTS ".$table_name."(
            id int AUTO_INCREMENT,
            mimetype varchar(400),
            created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            hash varchar(600),
            comment varchar(2000),
            userid int(11),
            name varchar(600),
            email varchar(600),
            domain_name varchar(600),
            status varchar(100),
            source_url varchar(600),
            browser varchar(600),
            os varchar(600),
            screen_size varchar(600),
            PRIMARY KEY (id)
        );
        ";
        $stmt = $this->database->getPDO()->prepare($sql);
        if($stmt->execute()){
            $this->setResult("OK");
            return true;
        }else{
            return false;
        }
    }

    public function sendBugReport($data){
        $data2 = $data;
        if(isset($data->base64)){$base64 = htmlspecialchars($data->base64);}else{$base64 = "";}
        if(isset($data->comment)){$comment = htmlspecialchars($data->comment);}else{$comment="";}
        if(isset($data->name)){$name = htmlspecialchars($data->name);}else{$name="";}
        if(isset($data->email)){$email = htmlspecialchars($data->email);}else{$email="";}
        if(isset($data->status)){$status = htmlspecialchars($data->status);}else{return false;}
        if(isset($data->domain_name)){$domain_name = htmlspecialchars($data->domain_name);}else{return false;}
        if(isset($data->source_url)){$source_url = htmlspecialchars($data->source_url);}else{return false;}
        if(isset($data->os)){$os = htmlspecialchars($data->os);}else{return false;}
        if(isset($data->screen_size)){$screen_size = htmlspecialchars($data->screen_size);}else{return false;}
        if(isset($data->browser)){$browser = htmlspecialchars($data->browser);}else{return false;}
        if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
        $table_name = str_replace('.', '_', $domain_name);
        if($this->createReportsTableByDomain($domain_name)){
            if(!$this->createEmailSettings($userid)){return false;}
            $hash = md5(rand(0,1000));
            $data->hash=$hash;
            $mimetype = "image/png";
                if($base64!=""){
                    $this->generateReportImage($base64, $hash);
                }
                $sql = "SELECT * FROM bug_report_email_settings WHERE userid = :userid";
                $stmt = $this->database->getPDO()->prepare($sql);
                $stmt->bindParam(':userid', $userid);
                if($stmt->execute()){
                    while ($row = $stmt->fetch()) {
                        $frequency = $row["frequency"];
                    }
                }else{
                    return false;
                }
                if($frequency=="everytime"){$this->sendBugReportEmail($data2);
                    $sql = "SELECT * FROM bug_report_team_members WHERE domain1 = :domain_name OR domain2 = :domain_name OR domain3 = :domain_name OR domain4 = :domain_name OR domain5 = :domain_name";
                    $stmt = $this->database->getPDO()->prepare($sql);
                    $stmt->bindParam(':domain_name', $domain_name);
                    if($stmt->execute()){
                        if($stmt->rowCount() >= 1){
                            while ($row = $stmt->fetch()) {
                                $data2->email=$row["email"];
                                $this->sendBugReportEmail($data2);
                            }
                        }
                    }else{
                        return false;
                    }
                }

                    $sql = "INSERT INTO ".$table_name." (mimetype, hash, comment, name, email, status, domain_name, source_url, os, screen_size, browser, userid) VALUE (:mimetype, :hash, :comment, :name, :email, :status, :domain_name, :source_url, :os, :screen_size, :browser, :userid)";
                    $stmt = $this->database->getPDO()->prepare($sql);
                    $stmt->bindParam(':mimetype', $mimetype);
                    $stmt->bindParam(':hash', $hash);
                    $stmt->bindParam(':comment', $comment);
                    $stmt->bindParam(':name', $name);
                    $stmt->bindParam(':email', $email);
                    $stmt->bindParam(':status', $status);
                    $stmt->bindParam(':domain_name', $domain_name);
                    $stmt->bindParam(':source_url', $source_url);
                    $stmt->bindParam(':os', $os);
                    $stmt->bindParam(':screen_size', $screen_size);
                    $stmt->bindParam(':browser', $browser);
                    $stmt->bindParam(':userid', $userid);
                    if($stmt->execute()){
                        $tempArray = array();
                        $tempArray["status"] = "OK";
                        $this->resultArray = $tempArray;
                        return true;
                    }else{
                        $this->setResult("hallo3");
                        return true;
                    }
                }
    }

    public function createDailyEmail($data){
        if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
        if(isset($data->email)){$email = htmlspecialchars($data->email);}else{return false;}
        $email = str_replace(".","_",$email);
        $fp = fopen('cron', 'a');//opens file in append mode  
        fwrite($fp, "2 5 * * * wget 'https://websoft365.com/backend/daily_bug_report.php?userid={$userid}&email={$email}'\n");  
        fclose($fp);
        return true;
    }

    public function createEmailSettings($userid){
        $frequency = "everytime";
        $sql = "INSERT INTO bug_report_email_settings (userid,frequency) VALUES (:userid,:frequency) ON DUPLICATE KEY UPDATE userid=userid";
        $stmt = $this->database->getPDO()->prepare($sql);
        $stmt->bindParam(':userid', $userid);
        $stmt->bindParam(':frequency', $frequency);
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }

    public function generateReportImage($b64, $hash)
    {
        $bin = base64_decode($b64);
        $im = imageCreateFromString($bin);
        if (!$im) {
            return false;
        }
        $img_file = "uploads/bug_reports/".$hash.".png";
        imagepng($im, $img_file, 9);
        return true;
    }

    public function getBugReportByDomainName($data){
        if(isset($data->domain_name)){$domain_name = htmlspecialchars($data->domain_name);}else{return false;}
            $table_name = str_replace('.', '_', $domain_name);
            $sql = "SELECT * FROM ".$table_name."";
            $stmt = $this->database->getPDO()->prepare($sql);
            if($stmt->execute()){
                $tempArray = array();
                while ($row = $stmt->fetch()) {
                    $anotherArray = array();
                    $anotherArray["comment"] = htmlspecialchars_decode($row["comment"]);
                    $anotherArray["name"] = htmlspecialchars_decode($row["name"]);
                    $anotherArray["email"] = htmlspecialchars_decode($row["email"]);
                    $anotherArray["id"] = htmlspecialchars_decode($row["id"]);
                    $anotherArray["status"] = htmlspecialchars_decode($row["status"]);
                    $anotherArray["domain_name"] = htmlspecialchars_decode($row["domain_name"]);
                    $anotherArray["created"] = htmlspecialchars_decode($row["created"]);
                    $anotherArray["source_url"] = htmlspecialchars_decode($row["source_url"]);
                    $anotherArray["os"] = htmlspecialchars_decode($row["os"]);
                    $anotherArray["screen_size"] = htmlspecialchars_decode($row["screen_size"]);
                    $anotherArray["browser"] = htmlspecialchars_decode($row["browser"]);
                    $anotherArray["hash"] = htmlspecialchars_decode($row["hash"]);
                    $tempArray["status"] = "OK";
                    $tempArray["bug_reports"][] = $anotherArray;
                }
                $this->resultArray = $tempArray;
                return true;
            }else{
                return false;
            }
    }

    public function deleteReport($data){
        if(isset($data->id)){$id = htmlspecialchars($data->id);}else{return false;}
        if(isset($data->domain_name)){$domain_name = htmlspecialchars($data->domain_name);}else{return false;}
            $sql = "DELETE FROM ".$domain_name." WHERE id = :id";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':id', $id);
            if($stmt->execute()){
                $this->setResult("OK");
                        return true;
            }else{
                return false;
            }
    }

    public function getBugReportSettings($data){
        if(isset($data->domain_name)){$domain_name = htmlspecialchars($data->domain_name);}else{return false;}
            $sql = 'SELECT * FROM bug_report_settings WHERE domain_name = :domain_name';
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':domain_name', $domain_name);
            if($stmt->execute()){
                $tempArray = array();
                while ($row = $stmt->fetch()) {
                    $anotherArray = array();
                    $anotherArray["userid"] = htmlspecialchars_decode($row["userid"]);
                    $anotherArray["domain_name"] = htmlspecialchars_decode($row["domain_name"]);
                    $anotherArray["button_color"] = htmlspecialchars_decode($row["button_color"]);
                    $anotherArray["button_text_color"] = htmlspecialchars_decode($row["button_text_color"]);
                    $anotherArray["button_border_color"] = htmlspecialchars_decode($row["button_border_color"]);
                    $anotherArray["button_position"] = htmlspecialchars_decode($row["button_position"]);
                    $anotherArray["modal_box_position"] = htmlspecialchars_decode($row["modal_box_position"]);
                    $anotherArray["editor_bar_position"] = htmlspecialchars_decode($row["editor_bar_position"]);
                    $anotherArray["hide_button_mobile"] = htmlspecialchars_decode($row["hide_button_mobile"]);
                    $anotherArray["button_border"] = htmlspecialchars_decode($row["button_border"]);
                    $anotherArray["comment_field"] = htmlspecialchars_decode($row["comment_field"]);
                    $anotherArray["comment_required"] = htmlspecialchars_decode($row["comment_required"]);
                    $anotherArray["name_field"] = htmlspecialchars_decode($row["name_field"]);
                    $anotherArray["name_required"] = htmlspecialchars_decode($row["name_required"]);
                    $anotherArray["email_field"] = htmlspecialchars_decode($row["email_field"]);
                    $anotherArray["email_required"] = htmlspecialchars_decode($row["email_required"]);
                    $anotherArray["branding"] = htmlspecialchars_decode($row["branding"]);
                    $anotherArray["main_button"] = htmlspecialchars_decode($row["main_button"]);
                    $anotherArray["title"] = htmlspecialchars_decode($row["title"]);
                    $anotherArray["text"] = htmlspecialchars_decode($row["text"]);
                    $anotherArray["button1_text"] = htmlspecialchars_decode($row["button1_text"]);
                    $anotherArray["button2_text"] = htmlspecialchars_decode($row["button2_text"]);
                    $tempArray["status"] = "OK";
                    $tempArray["settings"] = $anotherArray;
                }
                $this->resultArray = $tempArray;
                return true; 
            }else{
                return false;
            }
    }

    public function uploadBugReportSettings($data){
        if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
        if(isset($data->domain_name)){$domain_name = htmlspecialchars($data->domain_name);}else{return false;}
        if(isset($data->button_color)){$button_color = htmlspecialchars($data->button_color);}else{return false;}
        if(isset($data->button_text_color)){$button_text_color = htmlspecialchars($data->button_text_color);}else{return false;}
        if(isset($data->button_border_color)){$button_border_color = htmlspecialchars($data->button_border_color);}else{return false;}
        if(isset($data->button_position)){$button_position = htmlspecialchars($data->button_position);}else{return false;}
        if(isset($data->modal_box_position)){$modal_box_position = htmlspecialchars($data->modal_box_position);}else{return false;}
        if(isset($data->editor_bar_position)){$editor_bar_position = htmlspecialchars($data->editor_bar_position);}else{return false;}
        if(isset($data->hide_button_mobile)){$hide_button_mobile = htmlspecialchars($data->hide_button_mobile);}else{return false;}
        if(isset($data->button_border)){$button_border = htmlspecialchars($data->button_border);}else{return false;}
        if(isset($data->comment_field)){$comment_field = htmlspecialchars($data->comment_field);}else{return false;}
        if(isset($data->comment_required)){$comment_required = htmlspecialchars($data->comment_required);}else{return false;}
        if(isset($data->name_field)){$name_field = htmlspecialchars($data->name_field);}else{return false;}
        if(isset($data->name_required)){$name_required = htmlspecialchars($data->name_required);}else{return false;}
        if(isset($data->email_field)){$email_field = htmlspecialchars($data->email_field);}else{return false;}
        if(isset($data->email_required)){$email_required = htmlspecialchars($data->email_required);}else{return false;}
        if(isset($data->branding)){$branding = htmlspecialchars($data->branding);}else{return false;}
        if(isset($data->main_button)){$main_button = htmlspecialchars($data->main_button);}else{$main_button="";}
        if(isset($data->title)){$title = htmlspecialchars($data->title);}else{$title="";}
        if(isset($data->text)){$text = htmlspecialchars($data->text);}else{$text="";}
        if(isset($data->button1_text)){$button1_text = htmlspecialchars($data->button1_text);}else{$button1_text="";}
        if(isset($data->button2_text)){$button2_text = htmlspecialchars($data->button2_text);}else{$button2_text="";}
            $sql = "INSERT INTO bug_report_settings 
            (userid,
            domain_name,
            button_color,
            button_text_color,
            button_border_color,
            button_position,
            modal_box_position,
            editor_bar_position,
            hide_button_mobile,
            button_border,
            comment_field,
            comment_required,
            name_field,
            name_required,
            email_field,
            email_required,
            branding,
            main_button,
            title,
            text,
            button1_text,
            button2_text) 
            VALUES 
            (:userid,
            :domain_name,
            :button_color,
            :button_text_color,
            :button_border_color,
            :button_position,
            :modal_box_position,
            :editor_bar_position,
            :hide_button_mobile,
            :button_border,
            :comment_field,
            :comment_required,
            :name_field,
            :name_required,
            :email_field,
            :email_required,
            :branding,
            :main_button,
            :title,
            :text,
            :button1_text,
            :button2_text) ON DUPLICATE KEY UPDATE 
            userid = :userid,
            domain_name = :domain_name,
            button_color = :button_color,
            button_text_color = :button_text_color,
            button_border_color = :button_border_color,
            button_position = :button_position,
            modal_box_position = :modal_box_position,
            editor_bar_position = :editor_bar_position,
            hide_button_mobile = :hide_button_mobile,
            button_border = :button_border,
            comment_field = :comment_field,
            comment_required = :comment_required,
            name_field = :name_field,
            name_required = :name_required,
            email_field = :email_field,
            email_required = :email_required,
            branding = :branding,
            main_button = :main_button,
            title = :title,
            text = :text,
            button1_text = :button1_text,
            button2_text = :button2_text";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':userid', $userid);
            $stmt->bindParam(':domain_name', $domain_name);
            $stmt->bindParam(':button_color', $button_color);
            $stmt->bindParam(':button_text_color', $button_text_color);
            $stmt->bindParam(':button_border_color', $button_border_color);
            $stmt->bindParam(':button_position', $button_position);
            $stmt->bindParam(':modal_box_position', $modal_box_position);
            $stmt->bindParam(':editor_bar_position', $editor_bar_position);
            $stmt->bindParam(':hide_button_mobile', $hide_button_mobile);
            $stmt->bindParam(':button_border', $button_border);
            $stmt->bindParam(':comment_field', $comment_field);
            $stmt->bindParam(':comment_required', $comment_required);
            $stmt->bindParam(':name_field', $name_field);
            $stmt->bindParam(':name_required', $name_required);
            $stmt->bindParam(':email_field', $email_field);
            $stmt->bindParam(':email_required', $email_required);
            $stmt->bindParam(':branding', $branding);
            $stmt->bindParam(':main_button', $main_button);
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':text', $text);
            $stmt->bindParam(':button1_text', $button1_text);
            $stmt->bindParam(':button2_text', $button2_text);
            if($stmt->execute()){
                $this->setResult("OK");
                return true; 
            }else{
                return false;
            }
    }

    public function getExistingBugReportDomains($data){
        if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
            $sql = 'SELECT * FROM bug_report_settings WHERE userid = :userid';
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':userid', $userid);
            if($stmt->execute()){
                $tempArray = array();
                while ($row = $stmt->fetch()) {
                    $anotherArray = array();
                    $anotherArray["active"] = htmlspecialchars_decode($row["active"]);
                    $anotherArray["domain_name"] = htmlspecialchars_decode($row["domain_name"]);
                    $tempArray["bug_report_domains"][] = $anotherArray;
                }
                $tempArray["status"] = "OK";
                $this->resultArray = $tempArray;
                return true;
            }else{
                return false;
            }
        }

        public function changeBugReportDomainStatus($data){
            if(isset($data->domain_name)){$domain_name = htmlspecialchars($data->domain_name);}else{return false;}
            if(isset($data->active)){$active = htmlspecialchars($data->active);}else{return false;}
            $sql = 'UPDATE bug_report_settings SET active = :active WHERE domain_name = :domain_name';
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':domain_name', $domain_name);
            $stmt->bindParam(':active', $active);
            if($stmt->execute()){
                $this->setResult("OK");
                return true;
            }else{
                return false;
            }
        }

        public function deleteBugReportSetup($data){
            if(isset($data->domain_name)){$domain_name = htmlspecialchars($data->domain_name);}else{return false;}
            $sql = 'DELETE FROM bug_report_settings WHERE domain_name = :domain_name';
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':domain_name', $domain_name);
            if($stmt->execute()){
                $domain_name = str_replace(".","_",$domain_name);
                $sql = 'DROP TABLE IF EXISTS '.$domain_name.'';
                $stmt = $this->database->getPDO()->prepare($sql);
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

        public function addTeamMemberEmail($data){
            if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
            if(isset($data->email)){$email = htmlspecialchars($data->email);}else{return false;}
            if(isset($data->pin)){$pin = htmlspecialchars($data->pin);}else{return false;}
            if(isset($data->user_email)){$user_email = htmlspecialchars($data->user_email);}else{return false;}
            if(isset($data->domain1)){$domain1 = htmlspecialchars($data->domain1);}else{$domain1="";}
            if(isset($data->domain2)){$domain2 = htmlspecialchars($data->domain2);}else{$domain2="";}
            if(isset($data->domain3)){$domain3 = htmlspecialchars($data->domain3);}else{$domain3="";}
            if(isset($data->domain4)){$domain4 = htmlspecialchars($data->domain4);}else{$domain4="";}
            if(isset($data->domain5)){$domain5 = htmlspecialchars($data->domain5);}else{$domain5="";}
            $domain_array = array();
            if($domain1!=""){array_push($domain_array,$domain1);}
            if($domain2!=""){array_push($domain_array,$domain2);}
            if($domain3!=""){array_push($domain_array,$domain3);}
            if($domain4!=""){array_push($domain_array,$domain4);}
            if($domain5!=""){array_push($domain_array,$domain5);}
            $data->domain_array=$domain_array;
            $password = password_hash($data->pin, PASSWORD_BCRYPT);
            $sql = "INSERT INTO bug_report_team_members (userid, email, pin, domain1, domain2, domain3, domain4, domain5) VALUE (:userid, :email, :pin, :domain1, :domain2, :domain3, :domain4, :domain5)";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':userid', $userid);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':pin', $password);
            $stmt->bindParam(':domain1', $domain1);
            $stmt->bindParam(':domain2', $domain2);
            $stmt->bindParam(':domain3', $domain3);
            $stmt->bindParam(':domain4', $domain4);
            $stmt->bindParam(':domain5', $domain5);
            if($stmt->execute()){
                if($this->sendTeamMemberEmail($data)){
                    $this->setResult("OK");
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }

        public function getTeamMemberDetails($data){
            if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
            $sql = "SELECT * FROM bug_report_team_members WHERE userid=:userid";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':userid', $userid);
            if($stmt->execute()){
                $tempArray = array();
                while ($row = $stmt->fetch()) {
                    $anotherArray = array();
                    $anotherArray["userid"] = htmlspecialchars_decode($row["userid"]);
                    $anotherArray["email"] = htmlspecialchars_decode($row["email"]);
                    $anotherArray["pin"] = htmlspecialchars_decode($row["pin"]);
                    $anotherArray["domain1"] = htmlspecialchars_decode($row["domain1"]);
                    $anotherArray["domain2"] = htmlspecialchars_decode($row["domain2"]);
                    $anotherArray["domain3"] = htmlspecialchars_decode($row["domain3"]);
                    $anotherArray["domain4"] = htmlspecialchars_decode($row["domain4"]);
                    $anotherArray["domain5"] = htmlspecialchars_decode($row["domain5"]);
                    $tempArray["team_members"][] = $anotherArray;
                }
                $tempArray["status"] = "OK";
                $this->resultArray = $tempArray;
                return true;
            }else{
                return false;
            }
        }

        public function deleteTeamMemberDetails($data){
            if(isset($data->email)){$email = htmlspecialchars($data->email);}else{return false;}
            $sql = "DELETE FROM bug_report_team_members WHERE email=:email";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':email', $email);
            if($stmt->execute()){
                $email = str_replace(".","_",$email);
                $dir="cron";
                $contents = file_get_contents($dir);
                $contents = str_replace("2 5 * * * wget 'https://websoft365.com/backend/daily_bug_report_team_member.php?email={$email}'\n", '', $contents);
                file_put_contents($dir, $contents);
                $this->setResult("OK");
                return true;
            }else{
                return false;
            }
        }

        public function sendTeamMemberEmail($data){
                            $email = $data->email;
                            $pin = $data->pin;
                            $domain_array = $data->domain_array;
                            $user_email = $data->user_email;
                            $comma_separated = implode(", ", $domain_array);
                            $ampersand_separated = implode("amp38", $domain_array);
                            $subject = 'WebSoft365.com Bug Report and Feedback Tool Member Access Invitation';
                            $bodyText = 'Hello! '.$user_email.' invited you to access WebSoft365.com Bug Report and Feedback Tool report pages.
                            You have access to the report pages for the following domains:'.$comma_separated.'
                            Your email is: '.$email.'
                            Your PIN code is: '.$pin.'
                            To access our site, please click on the link below: https://websoft365.com/tools/bug_report_tool/team_members/login.php
                            Best regards,
                            WebSoft365.com ';
                            $bodyHtml = '
                            <p>Hello!</p>
                            <p>'.$user_email.' invited you to access WebSoft365.com Bug Report and Feedback Tool report pages.</p>
                            <br>
                            <p>You have access to the report pages for the following domains: '.$comma_separated.'</p>
                            <p>Your email is: '.$email.'</p>
                            <p>Your PIN code is: '.$pin.'</p>
                            <p>To access our site, please click on the link below:</p>
                            <a href="https://websoft365.com/tools/bug_report_tool/team_members/login.php">https://websoft365.com/tools/bug_report_tool/team_members/login.php</a>
                            <br>
                            <p>Best regards,</p>
                            <p>WebSoft365.com</p>';
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

                public function existEmail($data){
                    $enteredEmail = $data->email;
                    $sql = "SELECT * FROM bug_report_team_members WHERE email = :email";
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

                public function teamMemberLogin($data){
                    if(isset($data->pin)){$pin2 = htmlspecialchars($data->pin);}else{return false;}
                    if(isset($data->email)){$email = htmlspecialchars($data->email);}else{return false;}
                        if(!$this->existEmail($data)){
                            $this->setResult("NOT FOUND");
                            return true;
                        }
                        $sql = "SELECT * FROM bug_report_team_members WHERE email = :email";
                        $stmt = $this->database->getPDO()->prepare($sql);
                        $stmt->bindParam(':email', $email);
                        if($stmt->execute()){
                            $result = $stmt->fetch();
                            $realPassword = $result['pin'];
                            if(password_verify($pin2, $realPassword)){
                                session_start();
                                $_SESSION['member_logged_in'] = true;
                                $_SESSION['member_email'] = $result['email'];
                                $this->setResult("OK");
                                return true;
                            }else{
                                return false;
                            }
                        }else{
                            $this->setResult("WRONG PASSWORD");
                            return true;
                        }
                        return false;
                }

                public function teamMemberSessionChecker($data){
                    session_start();
                    if(isset($_SESSION['member_email'])){
                        $email = ($_SESSION['member_email']);
                        $sql = "SELECT * FROM bug_report_team_members WHERE email = :email";
                        $stmt = $this->database->getPDO()->prepare($sql);
                        $stmt->bindParam(':email', $email);
                        if($stmt->execute()){
                            $result = $stmt->fetch();
                                $this->setResult("LOGGED IN");
                                return true;
                        }else{ 
                            $this->setResult("LOGGED OUT");
                            return true;   
                        }
                    }
                }

                public function getTeamMemberDomains($data){
                    session_start();
                    if(isset($_SESSION['member_email'])){
                        $email = ($_SESSION['member_email']);
                        $sql = "SELECT * FROM bug_report_team_members WHERE email = :email";
                        $stmt = $this->database->getPDO()->prepare($sql);
                        $stmt->bindParam(':email', $email);
                        if($stmt->execute()){
                            $tempArray = array();
                            while ($row = $stmt->fetch()) {
                                $anotherArray = array();
                                $anotherArray["domain1"] = htmlspecialchars_decode($row["domain1"]);
                                $anotherArray["domain2"] = htmlspecialchars_decode($row["domain2"]);
                                $anotherArray["domain3"] = htmlspecialchars_decode($row["domain3"]);
                                $anotherArray["domain4"] = htmlspecialchars_decode($row["domain4"]);
                                $anotherArray["domain5"] = htmlspecialchars_decode($row["domain5"]);
                                $anotherArray["email"] = htmlspecialchars_decode($row["email"]);
                                $tempArray["team_member_domains"][] = $anotherArray;
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

                public function deleteBugReport($data){
                    if(isset($data->id)){$id = htmlspecialchars($data->id);}else{return false;}
                    if(isset($data->domain_name)){$domain_name = htmlspecialchars($data->domain_name);}else{return false;}
                    $domain_name_modified = str_replace('.', '_', $domain_name);
                    $sql = "DELETE FROM ".$domain_name_modified." WHERE id = :id";
                    $stmt = $this->database->getPDO()->prepare($sql);
                    $stmt->bindParam(':id', $id);
                    if($stmt->execute()){
                        $this->setResult("OK");
                        return true;
                    }else{
                        return false;
                    }
                }

                public function changeReportStatus($data){
                    if(isset($data->id)){$id = htmlspecialchars($data->id);}else{return false;}
                    if(isset($data->domain_name)){$domain_name = htmlspecialchars($data->domain_name);}else{return false;}
                    if(isset($data->status)){$status = htmlspecialchars($data->status);}else{return false;}
                    $domain_name_modified = str_replace('.', '_', $domain_name);
                    $sql = "UPDATE ".$domain_name_modified." SET status = :status WHERE id = :id";
                    $stmt = $this->database->getPDO()->prepare($sql);
                    $stmt->bindParam(':id', $id);
                    $stmt->bindParam(':status', $status);
                    if($stmt->execute()){
                        $this->setResult("OK");
                        return true;
                    }else{
                        return false;
                    }
                }

                public function setEmailSending($data){
                    if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
                    if(isset($data->frequency)){$frequency = htmlspecialchars($data->frequency);}else{return false;}
                    if(isset($data->email)){$email = htmlspecialchars($data->email);}else{return false;}
                    $sql = "UPDATE bug_report_email_settings SET frequency = :frequency WHERE userid = :userid";
                    $stmt = $this->database->getPDO()->prepare($sql);
                    $stmt->bindParam(':userid', $userid);
                    $stmt->bindParam(':frequency', $frequency);
                    if($stmt->execute()){
                        if($frequency=="daily"){
                            $email = str_replace(".","_",$email);
                            $dir="cron";
                            $contents = file_get_contents($dir);
                            $contents = str_replace("2 5 * * * wget 'https://websoft365.com/backend/daily_bug_report.php?userid={$userid}&email={$email}'\n", '', $contents);
                            file_put_contents($dir, $contents);
                            $this->createDailyEmail($data);
                        }else{
                            $email = str_replace(".","_",$email);
                                $dir="cron";
                                $contents = file_get_contents($dir);
                                $contents = str_replace("2 5 * * * wget 'https://websoft365.com/backend/daily_bug_report.php?userid={$userid}&email={$email}'\n", '', $contents);
                                file_put_contents($dir, $contents);
                        }
                        $this->setResult("OK");
                        return true;
                    }else{
                        return false;
                    }
                }



                public function getEmailSendingOption($data){
                    if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
                    $sql = "SELECT * FROM bug_report_email_settings WHERE userid=:userid";
                    $stmt = $this->database->getPDO()->prepare($sql);
                    $stmt->bindParam(':userid', $userid);
                    if($stmt->execute()){
                        $tempArray = array();
                        while ($row = $stmt->fetch()) {
                            $tempArray["frequency"] = htmlspecialchars_decode($row["frequency"]);
                        }
                        $tempArray["status"] = "OK";
                        $this->resultArray = $tempArray;
                        return true;
                    }else{
                        return false;
                    }
                }

                public function teamMemberLogout($data){
                    session_start();
                    if (isset($_SESSION['member_logged_in'])) {
                        unset($_SESSION['member_logged_in']); 
                    }
                    if (isset($_SESSION['member_email'])) {
                        unset($_SESSION['member_email']); 
                    }
                    $this->setResult("OK");
                    return true;
                }

                public function setTeamMemberEmailSending($data){
                    if(isset($data->frequency)){$frequency = htmlspecialchars($data->frequency);}else{return false;}
                    if(isset($data->email)){$email = htmlspecialchars($data->email);}else{return false;}
                    $sql = "UPDATE bug_report_team_members SET frequency = :frequency WHERE email = :email";
                    $stmt = $this->database->getPDO()->prepare($sql);
                    $stmt->bindParam(':email', $email);
                    $stmt->bindParam(':frequency', $frequency);
                    if($stmt->execute()){
                        if($frequency=="daily"){
                            $email = str_replace(".","_",$email);
                            $dir="cron";
                            $contents = file_get_contents($dir);
                            $contents = str_replace("2 5 * * * wget 'https://websoft365.com/backend/daily_bug_report_team_member.php?email={$email}'\n", '', $contents);
                            file_put_contents($dir, $contents);
                            $this->createDailyEmailTm($data);
                        }else{
                            $email = str_replace(".","_",$email);
                                $dir="cron";
                                $contents = file_get_contents($dir);
                                $contents = str_replace("2 5 * * * wget 'https://websoft365.com/backend/daily_bug_report_team_member.php?email={$email}'\n", '', $contents);
                                file_put_contents($dir, $contents);
                        }
                        $this->setResult("OK");
                        return true;
                    }else{
                        return false;
                    }
                }

                public function createDailyEmailTm($data){
                    if(isset($data->email)){$email = htmlspecialchars($data->email);}else{return false;}
                    $email = str_replace(".","_",$email);
                    $fp = fopen('cron', 'a');//opens file in append mode  
                    fwrite($fp, "2 5 * * * wget 'https://websoft365.com/backend/daily_bug_report_team_member.php?email={$email}'\n");  
                    fclose($fp);
                    return true;
                }

                public function getTeamMemberEmailSendingOption($data){
                    if(isset($data->email)){$email = htmlspecialchars($data->email);}else{return false;}
                    $sql = "SELECT * FROM bug_report_team_members WHERE email=:email";
                    $stmt = $this->database->getPDO()->prepare($sql);
                    $stmt->bindParam(':email', $email);
                    if($stmt->execute()){
                        $tempArray = array();
                        while ($row = $stmt->fetch()) {
                            $tempArray["frequency"] = $row["frequency"];
                        }
                        $tempArray["status"] = "OK";
                        $this->resultArray = $tempArray;
                        return true;
                    }else{
                        return false;
                    }
                }

                public function sendBugReportEmail($data){
                    if(isset($data->base64)){$base64 = "Down below.";
                    if(isset($data->hash)){$hash = htmlspecialchars($data->hash);}else{return false;}
                        $screenshot = '<img style="width:100%;margin-top:30px;" src="https://websoft365.com/backend/uploads/bug_reports/'.$hash.'.png"/>';
                    }else{$base64 = "No screenshot.";}
                    if(isset($data->comment)){$comment = htmlspecialchars($data->comment);}else{$comment="";}
                    if(isset($data->name)){$name = htmlspecialchars($data->name);}else{$name="";}
                    if(isset($data->email)){$email = htmlspecialchars($data->email);}else{$email="";}
                    if(isset($data->status)){$status = htmlspecialchars($data->status);}else{return false;}
                    if(isset($data->domain_name)){$domain_name = htmlspecialchars($data->domain_name);}else{return false;}
                    if(isset($data->source_url)){$source_url = htmlspecialchars($data->source_url);}else{return false;}
                    if(isset($data->os)){$os = htmlspecialchars($data->os);}else{return false;}
                    if(isset($data->screen_size)){$screen_size = htmlspecialchars($data->screen_size);}else{return false;}
                    if(isset($data->browser)){$browser = htmlspecialchars($data->browser);}else{return false;}
                    if(isset($data->userid)){$userid = htmlspecialchars($data->userid);}else{return false;}
                    if(isset($data->current_date)){$current_date = htmlspecialchars($data->current_date);}else{return false;}
                    if(isset($data->user_email)){$user_email = htmlspecialchars($data->user_email);}else{return false;}
                    $subject = 'New bug report / feedback '.$domain_name.'';
                    $bodyText = 'New feedback in your project: '.$domain_name.' Comment '.nl2br($comment).' Source URL '.$source_url.' Reported at '.$current_date.' Reported by '.$name.' '.$email.' Browser '.$browser.' OS '.$os.' Screen size '.$screen_size.' Screenshot '.$base64.' '.$screenshot.' Login to manage reports NOTE: After you log in to the report page, you will be able to change the email alert settings. Best regards, WebSoft365.com';
                    $bodyHtml = '
                        <div style="width:70%;margin-left:10%;background-color:lightgrey;padding:5%;border-radius:3px;opacity:.9;">
                        <img src="https://websoft365.com/assets/websoft_logo7.png" width="30%"/>
                            <p>New feedback in your project: '.$domain_name.'</p>
                            <br>
                            <p><b>Comment</b></p>
                            <p>'.nl2br($comment).'</p>
                            <p><b>Source URL</b></p>
                            <p>'.$source_url.'</p>
                            <p><b>Reported at</b></p>
                            <p>'.$current_date.'</p>
                            <p><b>Reported by</b></p>
                            <p>'.$name.'</p>
                            <p>'.$email.'</p>
                            <table cellpadding="0" cellspacing="0" width="640" border="0" style=”margin-left: 0px;”>     
                                <tr>         
                                    <td>
                                        <p><b>Browser</b></p>
                                        <p>'.$browser.'</p>            
                                    </td>
                                    <td>
                                        <p><b>OS</b></p>
                                        <p>'.$os.'</p>            
                                    </td>     
                                </tr>
                                <tr>         
                                    <td>
                                        <p><b>Screen size</b></p>
                                        <p>'.$screen_size.'</p>            
                                    </td>
                                    <td>
                                        <p><b>Screenshot</b></p>
                                        <p>'.$base64.'</p>            
                                    </td>     
                                </tr> 
                            </table>
                            '.$screenshot.'
                            <div style="margin-bottom:30px;margin-top:30px;">
                            <a href="https://websoft365.com" style="margin-left:37%;height:30px;padding:15px;background-color:#3085D6;color:white;text-decoration:none;border-radius:5px;font-size:16px;">Login to manage reports</a>
                            </div>
                            <br>
                            <p>NOTE: After you log in to the report page, you will be able to change the email alert settings.</p>
                            <br>
                            <div> 
                            <p>Best regards,</p>
                            <p>WebSoft365.com</p>
                            </div>
                        <div>';
                    $data->email=$user_email;
                    $data->subject=$subject;
                    $data->bodyText=$bodyText;
                    $data->bodyHtml=$bodyHtml;
                    if($this->sendNewEmail($data)){
                        $this->setResult("OK");
                        error_log("in");
                        return true;
                    }else{
                        return false;
                    }
                }
}