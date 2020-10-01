<?php

use Kunnu\Dropbox\Dropbox;
use Kunnu\Dropbox\DropboxApp;

class BugReportToolController{

    private $jsonView;
    private $installation;
    //private $mailer;
    
    //Wir bereiten im Konstruktor die Eigenschaften des Objekts vor
    public function __construct() {
        $this->jsonView = new JsonView();
        $this->installation = null;
        //$this->mailer = new Mailer();
    }

    //Diese Methode entscheidet welche Eingabe Parameter zu welchen Aktionen führen werden
    public function route(){
    
        $jsonInput = filter_input(INPUT_POST, "data");
        $action = filter_input(INPUT_GET, 'action', FILTER_SANITIZE_SPECIAL_CHARS);
        $data = json_decode($jsonInput);
        
        if($data == null){
            $this->displayErrorMessage();
            return;
        }
        
        $creationSucessfull = $this->createInstallation("bug_report_tool");
        if($creationSucessfull){
            switch ($action) {
                case "sendBugReport":
                    if($this->installation->sendBugReport($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "getBugReports":
                    if($this->installation->getBugReports($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "deleteBugReport":
                    if($this->installation->deleteBugReport($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "getBugReportSettings":
                    if($this->installation->getBugReportSettings($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "uploadBugReportSettings":
                    if($this->installation->uploadBugReportSettings($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "getExistingBugReportDomains":
                    if($this->installation->getExistingBugReportDomains($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "changeBugReportDomainStatus":
                    if($this->installation->changeBugReportDomainStatus($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "deleteBugReportSetup":
                    if($this->installation->deleteBugReportSetup($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "getBugReportByDomainName":
                    if($this->installation->getBugReportByDomainName($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "createReportsTableByDomain":
                    if($this->installation->createReportsTableByDomain($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "getUsedBugReportDomains":
                    if($this->installation->getUsedBugReportDomains($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "getTeamMemberDetails":
                    if($this->installation->getTeamMemberDetails($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "addTeamMemberEmail":
                    if($this->installation->addTeamMemberEmail($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "deleteTeamMemberDetails":
                    if($this->installation->deleteTeamMemberDetails($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "teamMemberLogin":
                    if($this->installation->teamMemberLogin($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "teamMemberSessionChecker":
                    if($this->installation->teamMemberSessionChecker($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "getTeamMemberDomains":
                    if($this->installation->getTeamMemberDomains($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "changeReportStatus":
                    if($this->installation->changeReportStatus($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "deleteAccount":
                    if($this->installation->deleteAccount($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "setEmailSending":
                    if($this->installation->setEmailSending($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "getEmailSendingOption":
                    if($this->installation->getEmailSendingOption($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "setTeamMemberEmailSending":
                    if($this->installation->setTeamMemberEmailSending($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "getTeamMemberEmailSendingOption":
                    if($this->installation->getTeamMemberEmailSendingOption($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "teamMemberLogout":
                    if($this->installation->teamMemberLogout($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                default:
                    $this->displayErrorMessage();
                    break;
            }
             $result = $this->installation->getResult();
             $this->jsonView->streamOutput($result);
         } else {
             $this->displayErrorMessage();
         }
    }
    
    private function createInstallation($type){
        switch ( strtolower( $type ) ){
            case 'bug_report_tool':
                $this->installation = new BugReportTool();
                break;         
            case false: default:     
                return false;
        }  
        return true;
    }

    private function displayErrorMessage(){
        $errorData = array(
            "status" => "NOT OK"
        );
        $this->jsonView->streamOutput($errorData);
    }
    
    private function displayMessage($message){
        $this->jsonView->streamOutput($message);
    }
}