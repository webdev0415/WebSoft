<?php
include_once "config/config.php";

class VerifyChange{
    public function __construct() {
        $this->resultArray = array();
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }
    public function checkUserData(){
        if(isset($_GET['email']) && !empty($_GET['email']) AND isset($_GET['hash']) && !empty($_GET['hash'])){
        $email = ($_GET['email']);
        $hash = ($_GET['hash']);
        $sql = "SELECT * FROM users WHERE email = :email AND hash = :hash";
        $stmt = $this->database->getPDO()->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':hash', $hash);
            if($stmt->execute()){
                $row = $stmt->fetch();
                if($stmt->rowCount() && !htmlspecialchars_decode($row["active"])){
                    $sql2 = "UPDATE users SET active = 1 WHERE email = :email AND hash = :hash";
                    $stmt2 = $this->database->getPDO()->prepare($sql2);
                    $stmt2->bindParam(':email', $email);
                    $stmt2->bindParam(':hash', $hash);
                    if($stmt2->execute()){
                        session_start();
                        $_SESSION['logged_in'] = true;
                        $_SESSION['email'] = $row['email'];
                        $_SESSION['created'] = $row['created'];
                        header("Location: /index.php?email_changed=true");
                        return true;
                    }
                }
            }
        }
    }
}
$verify = new VerifyChange();
$verify->checkUserData();