<?php
include_once "config/config.php";

class Unsubscribe{
    public function __construct() {
        $this->resultArray = array();
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }
    public function checkUserData(){
        if(isset($_GET['userid']) && !empty($_GET['userid']) AND isset($_GET['hash']) && !empty($_GET['hash'])){
        $userid = ($_GET['userid']);
        $hash = ($_GET['hash']);
        $sql = "SELECT * FROM users WHERE userid = :userid AND hash = :hash";
        $stmt = $this->database->getPDO()->prepare($sql);
        $stmt->bindParam(':userid', $userid);
        $stmt->bindParam(':hash', $hash);
            if($stmt->execute()){
                $row = $stmt->fetch();
                if($stmt->rowCount()){
                    $sql2 = "UPDATE users SET newsletter = 0 WHERE userid = :userid AND hash = :hash";
                    $stmt2 = $this->database->getPDO()->prepare($sql2);
                    $stmt2->bindParam(':userid', $userid);
                    $stmt2->bindParam(':hash', $hash);
                    if($stmt2->execute()){
                        header("Location: /unsubscribe_success.php");
                        return true;
                    }
                }
            }
        }
    }
}
$unsubscribe = new Unsubscribe();
$unsubscribe->checkUserData();