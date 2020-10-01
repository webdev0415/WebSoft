<?php
//In einem Config File sammeln wir alle Dateien zusammen in denen Klassen liegen
//um an einer Stelle rasch weitere Files hinzuzufügen. Somit wissen wir immer
//sofort, an welcher Stelle wir agieren müssen

//mit diesem Befehle aktivieren wir Detaillierte Fehlermeldungen des PhP Interpreters
error_reporting(E_ALL);

//durch den include Befehl wird eine Datei in eine Andere Datei eingefügt
//als würde an den inhalt mit copy-past einfügen.
//
//Daher ist die Reihenfolge der includes unter Umständen ausschlaggebend
//in diesem Fall hier fordern wir nur dateien an die Klassen enthalten und keine
//Logik ausführen sobald sie includet sind. Die Klasse wird erst durch die
//Instanzierung ein Objekt erzeugen.
include "controller/BugReportToolController.php";
include "views/JsonView.php";
include "service/Database.php";
include "models/BugReportTool.php";
include "models/Mailer.php";

define ("DBHost", "websoft365-1.cmqtatgyjf6h.eu-central-1.rds.amazonaws.com");
define ("DBName", "bug_report_tool");
define ("DBUser", "admin");
define ("DBPass", "Zolika1969");