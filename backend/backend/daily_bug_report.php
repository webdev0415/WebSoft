<?php
include_once "config/bug_report_tool_config.php";
class DailyBugReport{
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
    public function sendBugReport(){
        if(isset($_GET['userid']) && !empty($_GET['userid']) && isset($_GET['email']) && !empty($_GET['email'])){
        $userid = $_GET['userid'];
        $email = str_replace("_",".",$_GET['email']);
        $sql = "SELECT * FROM bug_report_settings WHERE userid = :userid";
        $stmt = $this->database->getPDO()->prepare($sql);
        $stmt->bindParam(':userid', $userid);
            if($stmt->execute()){
                $tempArray = array();
                while ($row = $stmt->fetch()) {
                    $tempArray[] = htmlspecialchars_decode($row["domain_name"]);
                }
                for($x=0;$x<count($tempArray);$x++){
                    $bug_report_list = array();
                    $sql = "SELECT * FROM ".str_replace(".","_",$tempArray[$x])."";
                    $stmt = $this->database->getPDO()->prepare($sql);
                    if($stmt->execute()){
                        while ($row = $stmt->fetch()) {
                            $current_reports = array();
                            $current_reports["id"]=$row["id"];
                            $current_reports["comment"]=$row["comment"];
                            $current_reports["created"]=$row["created"];
                            $bug_report_list[] = $current_reports;                            
                        }
                        $this->sendBugReportEmail($bug_report_list, $email, $tempArray[$x]);
                        $this->sendTeamMemberEmail($userid);
                    }else{
                        return false;
                    }
                }
            }
        }
    }
    public function sendBugReportEmail($report_array, $email, $domain_name){
        $id_array=array();
        $name_array=array();
        $reports="";
        for($x=0;$x<count($report_array);$x++){
            $d = new DateTime($report_array[$x]["created"]);
            if(date_format($d,'Y-m-d') == date('Y-m-d')) {
                //it's today, let's make ginger snaps
                $id_array[]=$report_array[$x]["id"];
                $name_array[]=$report_array[$x]["comment"];
                $reports .= "<tr><td>#{$report_array[$x]['id']}</td><td>{$report_array[$x]['comment']}</td></tr>";
            }
        }
        if(count($id_array)<1){return false;}
        $data->email = $email;
        $data->subject = "WebSoft365 - Daily Bug Reports";
        $data->bodyText =   "Daily bug report list for your project: '.$domain_name.' Login to manage reports NOTE: After you log in to the report page, you will be able to change the email alert settings. Best regards, WebSoft365.com";
        $data->bodyHtml = '<div style="width:70%;margin-left:10%;background-color:lightgrey;padding:5%;border-radius:3px;opacity:.9;">
        <img src="https://websoft365.com/assets/websoft_logo7.png" width="30%"/>
            <p>Daily bug report list for your project: '.$domain_name.'</p>
            <br>
            <table cellpadding="0" cellspacing="0" width="640" border="0" style=”margin-left: 0px;”>     
                '.$reports.'
            </table>
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
        $this->sendNewEmail($data);
        return true;
    }
    public function sendTeamMemberEmail($userid){
        $sql = "SELECT * FROM bug_report_team_members WHERE userid = :userid";
        $stmt = $this->database->getPDO()->prepare($sql);
        $stmt->bindParam(':userid', $userid);
        if($stmt->execute()){
            $team_members = array();
            while ($row = $stmt->fetch()) {
                $current_member["domain1"]=htmlspecialchars_decode($row["domain1"]);
                $current_member["domain2"]=htmlspecialchars_decode($row["domain2"]);
                $current_member["domain3"]=htmlspecialchars_decode($row["domain3"]);
                $current_member["domain4"]=htmlspecialchars_decode($row["domain4"]);
                $current_member["domain5"]=htmlspecialchars_decode($row["domain5"]);
                $current_member["email"]=htmlspecialchars_decode($row["email"]);
                $team_members[] = $current_member;
            }
            for($x=0;$x<count($team_members);$x++){
                $domain_array=array();
                if($team_members[$x]["domain1"]!=""){
                    $domain_array[]=$team_members[$x]["domain1"];
                }
                if($team_members[$x]["domain2"]!=""){
                    $domain_array[]=$team_members[$x]["domain2"];
                }
                if($team_members[$x]["domain3"]!=""){
                    $domain_array[]=$team_members[$x]["domain3"];
                }
                if($team_members[$x]["domain4"]!=""){
                    $domain_array[]=$team_members[$x]["domain4"];
                }
                if($team_members[$x]["domain5"]!=""){
                    $domain_array[]=$team_members[$x]["domain5"];
                }
                $bug_report_list = array();
                for($x=0;$x<count($domain_array);$x++){
                    $sql = "SELECT * FROM ".str_replace(".","_",$domain_array[$x])."";
                    $stmt = $this->database->getPDO()->prepare($sql);
                    if($stmt->execute()){
                        while ($row = $stmt->fetch()) {
                            $current_reports = array();
                            $current_reports["id"]=htmlspecialchars_decode($row["id"]);
                            $current_reports["comment"]=htmlspecialchars_decode($row["comment"]);
                            $current_reports["created"]=htmlspecialchars_decode($row["created"]);
                            $bug_report_list[] = $current_reports;
                        }
                        $this->sendTeamMemberEmail2($bug_report_list, $team_members[$x]["email"], $domain_array[$x]);
                    }else{
                        return false;
                    }
                }
            }
        }
    }
    public function sendTeamMemberEmail2($report_array, $email, $domain_name){
        $id_array=array();
        $name_array=array();
        $reports="";
        for($x=0;$x<count($report_array);$x++){
            $d = new DateTime($report_array[$x]["created"]);
            if(date_format($d,'Y-m-d') == date('Y-m-d')) {
                //it's today, let's make ginger snaps
                $id_array[]=$report_array[$x]["id"];
                $name_array[]=$report_array[$x]["comment"];
                $reports .= "<tr><td>#{$report_array[$x]['id']}</td><td>{$report_array[$x]['comment']}</td></tr>";
            }
        }
        if(count($id_array)<1){return false;}
        $data->email = $email;
        $data->subject = "WebSoft365 - Daily Bug Reports";
        $data->bodyText =   "Daily bug report list for your project: '.$domain_name.' Login to manage reports NOTE: After you log in to the report page, you will be able to change the email alert settings. Best regards, WebSoft365.com";
        $data->bodyHtml = '<div style="width:70%;margin-left:10%;background-color:lightgrey;padding:5%;border-radius:3px;opacity:.9;">
        <img src="https://websoft365.com/assets/websoft_logo7.png" width="30%"/>
            <p>Daily bug report list for your project: '.$domain_name.'</p>
            <br>
            <table cellpadding="0" cellspacing="0" width="640" border="0" style=”margin-left: 0px;”>     
                '.$reports.'
            </table>
            <div style="margin-bottom:30px;margin-top:30px;">
            <a href="https://websoft365.com/tools/bug_report_tool/team_members/login.php" style="margin-left:37%;height:30px;padding:15px;background-color:#3085D6;color:white;text-decoration:none;border-radius:5px;font-size:16px;">Login to manage reports</a>
            </div>
            <br>
            <p>NOTE: After you log in to the report page, you will be able to change the email alert settings.</p>
            <br>
            <div> 
            <p>Best regards,</p>
            <p>WebSoft365.com</p>
            </div>
        <div>';
        $this->sendNewEmail($data);
        return true;
    }
}
$daily_report = new DailyBugReport();
$daily_report->sendBugReport();