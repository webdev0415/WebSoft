<?php
include_once "config/config.php";

class Newsletter{
    public function __construct() {
        $this->resultArray = array();
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }

    public function sendNewEmail($data){
        $mailer = new Mailer();
        if($mailer->sendMail($data)){
            return true;
        }else{
            return false;
        }
    }
    public function sendNewsletter(){
        if(isset($_GET['id']) && !empty($_GET['id'])){
            $newsletter_id = $_GET['id'];
            $sql = "SELECT * FROM newsletter WHERE id=:newsletter_id";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':newsletter_id', $newsletter_id);
            $tempArray = array();
            if($stmt->execute()){
                while ($row = $stmt->fetch()) {
                    $subject=$row["subject"];
                    $text_content=$row["text_content"];
                    $html_content=$row["html_content"];
                    $html_content = '<div style="width:70%;margin-left:10%;background-color:lightgrey;padding:5%;border-radius:3px;opacity:.9;">
                    <img src="https://websoft365.com/assets/websoft_logo7.png" width="30%"/>'
                    . $html_content .'';
                    $group_type=$row["group_type"];
                    $packet_size=$row["packet_size"];
                    $newsletter_counter=$row["counter"];
                }
            }else{
                return false;
            }


            $groups_array= explode(",",$group_type);
            $groups="";

            for ($y = 0; $y < count($groups_array); $y++) {
                if($y!=count($groups_array)-1){
                    $groups.=" group_type='".$groups_array[$y]."' AND newsletter=1 OR";
                }else{
                    $groups.=" group_type='".$groups_array[$y]."' AND newsletter=1";
                }
            }
            $sql = "SELECT * FROM users WHERE".$groups."";
            $stmt = $this->database->getPDO()->prepare($sql);
            $tempArray = array();
            $user_count=0;
            if($stmt->execute()){
                while ($row = $stmt->fetch()) {
                    $anotherArray = array();
                    $anotherArray["firstname"] = htmlspecialchars_decode($row["firstname"]);
                    $anotherArray["lastname"] = htmlspecialchars_decode($row["lastname"]);
                    $anotherArray["email"] = htmlspecialchars_decode($row["email"]);
                    $anotherArray["group_type"] = htmlspecialchars_decode($row["group_type"]);
                    $anotherArray["userid"] = htmlspecialchars_decode($row["userid"]);
                    $anotherArray["hash"] = htmlspecialchars_decode($row["hash"]);
                    $user_count++;
                    $tempArray["users"][] = $anotherArray;
                }
            }else{
                return false;
            }
            $new_subject="";
            $new_text_content="";
            $new_html_content="";
            $current_counter=0;
            $new_email="";
            $is_last_load=false; 
            if($user_count-$newsletter_counter<$packet_size){
                $packet_size = $user_count-$newsletter_counter;
                $is_last_load=true;
            }
            for ($x = 0; $x < $packet_size; $x++) {
                $new_email = $tempArray["users"][$x+$newsletter_counter]["email"];
                $data->email = $new_email;
                $new_subject = str_replace("&amp;lt;realname&amp;gt;",$tempArray["users"][$x+$newsletter_counter]["firstname"],$subject);
                $new_subject = str_replace("&lt;realname&gt;",$tempArray["users"][$x+$newsletter_counter]["firstname"],$new_subject);
                $data->subject = str_replace("<realname>",$tempArray["users"][$x+$newsletter_counter]["firstname"],$new_subject);
                $new_text_content = str_replace("&lt;realname&gt;",$tempArray["users"][$x+$newsletter_counter]["firstname"],$text_content);
                $new_text_content = str_replace("&amp;lt;realname&amp;gt;",$tempArray["users"][$x+$newsletter_counter]["firstname"],$new_text_content);
                $data->bodyText = str_replace("<realname>",$tempArray["users"][$x+$newsletter_counter]["firstname"],$new_text_content);
                $new_html_content = "".$html_content."<div>If you would like to unsubscribe from our newsletter, please click <a href='https://websoft365.com/backend/unsubscribe.php?userid={$tempArray["users"][$x+$newsletter_counter]["userid"]}&hash={$tempArray["users"][$x+$newsletter_counter]["hash"]}'>here</a>.</div></div>";
                $new_html_content = str_replace("&amp;lt;realname&amp;gt;",$tempArray["users"][$x+$newsletter_counter]["firstname"],$new_html_content);
                $new_html_content = str_replace("&lt;realname&gt;",$tempArray["users"][$x+$newsletter_counter]["firstname"],$new_html_content);
                $data->bodyHtml = str_replace("<realname>",$tempArray["users"][$x+$newsletter_counter]["firstname"],$new_html_content);
                $this->sendNewEmail($data);
                $current_counter++;
            }
            $total_counter = $newsletter_counter+$current_counter;
            $sql = "UPDATE newsletter SET counter=:total_counter WHERE id=:newsletter_id";
            $stmt = $this->database->getPDO()->prepare($sql);
            $stmt->bindParam(':newsletter_id', $newsletter_id);
            $stmt->bindParam(':total_counter', $total_counter);
            $tempArray = array();
            if($stmt->execute()){
                if($is_last_load==true){
                    $dir="cron";
                    $contents = file_get_contents($dir);
                    $contents = str_replace("* * * * * wget https://websoft365.com/backend/newsletter.php?id={$newsletter_id}\n", '', $contents);
                    file_put_contents($dir, $contents);
                }
                return true;
            }else{
                return false;
            }
        }
    }
}
$verify = new Newsletter();
$verify->sendNewsletter();