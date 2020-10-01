<?php
class Database{
    private $pdo;
    public $lastInsertedId;
    
    public function __construct($dbHost, $dbName, $dbUser, $dpPass){
        $this->pdo = new PDO("mysql:host=".$dbHost.";dbname=".$dbName.";charset=utf8", $dbUser, $dpPass);
    }

    public function query( $sql){
        $resultTable = array();
        
        try{
            foreach ($this->pdo->query($sql) as $row) {
                $resultTable[] = $row;
            }
        } catch (PDOException $ex){
            error_log("PDO ERROR: querying database: " . $ex->getMessage()."\n".$sql);
            return $resultTable;
        }
        
        return $resultTable;
    }

    public function getPDO(){
        return $this->pdo;
    }
    
    public function order( $sql){
        try{
            $this->pdo->query($sql);
        } catch (PDOException $ex) {
            error_log("PDO ERROR: querying database: " . $ex->getMessage()."\n".$sql);
        }
    }
    
    public function lastInsertedId(){
        return $this->pdo->lastInsertId('id');
    }
}

