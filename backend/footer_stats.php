<?php
include_once "config/config.php";

class FooterStats{
    public function __construct() {
        $this->resultArray = array();
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }
    public function getFooterInfo(){
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
                $fp = fopen('footer_stats.json', 'w');
                fwrite($fp, json_encode($tempArray));
                fclose($fp);
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}
$verify = new FooterStats();
$verify->getFooterInfo();