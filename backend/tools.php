<?php
include_once "config/absolute_config.php";

class Tools{
    public function __construct() {
        $this->resultArray = array();
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }
    public function getTools(){
        $sql = "SELECT * FROM tools INNER JOIN tool_categories ON tools.toolid = tool_categories.toolid";
        $stmt = $this->database->getPDO()->prepare($sql);
        if($stmt->execute()){
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
                $tempArray["tools"][] = $anotherArray;
            }
            $this->resultArray = $tempArray;
            return $tempArray;
        }else{
            return false;
        }
    }
}