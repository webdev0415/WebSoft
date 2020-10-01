<?php

/**
 * Die JSON View hat die Aufgabe Daten den Client zu übermitteln
 * und zwar im Format JSON, welches ein gängiges Datenformat ist um zwischen
 * Client und Server zu kommunzieren.
 * 
 * Dazu ist es notwendig dem Apacheserver mitzuteilen, welchen Http Header
 * er für den Http Response verwenden soll um eine Korrekte Darstellung beim 
 * Client zu erzielen (z.b. ein Browser, ein Ajax Script, etc.)
 *
 * @author helmuth
 */
class JsonView {
    
    /**
     * unser Konstruktor bereitet das Objekt darauf vor arbeiten zu können.
     * Dazu werden hier die Header gesetzt um JSON aus zu geben
     */
    public function __construct() {
        header('Content-Type: application/json; charset=utf-8');
    }
    
    /**
     * die Stream Methode schickt Daten an den Client ab.
     * Dazu reicht in diesem Fall die Ausgabe des JSON-Strings
     * den wir durch json_encode aus jeder beliebigen Php Variable erzeugen können
     * (theoretisch beliebig)
     * @param type $data
     */
    public function streamOutput($data){
        
        //umwandlung in json string - ACHTUNG: json_encode vs. json_decode
        $jsonOutput = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        //tatsächliche Ausgabe an den Client
        echo $jsonOutput;
        
    }
}
