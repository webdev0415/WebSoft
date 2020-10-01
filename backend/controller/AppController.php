<?php

use Kunnu\Dropbox\Dropbox;
use Kunnu\Dropbox\DropboxApp;

class AppController{

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
        
        $creationSuccessfull = $this->createInstallation("user");
        if($creationSuccessfull){
            switch ($action) {
                case "sendBookingRequest":
                    if($this->installation->sendBookingRequest($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "createUser":
                    if($this->installation->createUser($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "login":
                    if($this->installation->login($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "displayUsers":
                    if($this->installation->displayUsers($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "getUserDetails":
                    if($this->installation->getUserDetails($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "getUserDetailsById":
                    if($this->installation->getUserDetailsById($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "getFooterInfo":
                    if($this->installation->getFooterInfo($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "uploadImage":
                    if($this->installation->uploadImage($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "sessionChecker":
                    if($this->installation->sessionChecker($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "logout":
                    if($this->installation->logout($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "changeEmail":
                    if($this->installation->changeEmail($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "changePassword":
                    if($this->installation->changePassword($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "changePasswordById":
                    if($this->installation->changePasswordById($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "changeForgottenPasswordById":
                    if($this->installation->changeForgottenPasswordById($data)){
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
                case "deleteAccountById":
                    if($this->installation->deleteAccountById($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "sendPasswordEmail":
                    if($this->installation->sendPasswordEmail($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "sendEmailChangeEmail":
                    if($this->installation->sendEmailChangeEmail($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "sendActivationEmail":
                    if($this->installation->sendActivationEmail($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "resendActivationEmail":
                    if($this->installation->resendActivationEmail($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "sendContactEmail":
                    if($this->installation->sendContactEmail($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "sendContactResponse":
                    if($this->installation->sendContactResponse($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "sendIdeaEmail":
                    if($this->installation->sendIdeaEmail($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "sendIdeaEmailResponse":
                    if($this->installation->sendIdeaEmailResponse($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "sendForgotPasswordEmail":
                    if($this->installation->sendForgotPasswordEmail($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "changeUserMembership":
                    if($this->installation->changeUserMembership($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "suspendUser":
                    if($this->installation->suspendUser($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "createNote":
                    if($this->installation->createNote($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "displayNotes":
                    if($this->installation->displayNotes($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "deleteNote":
                    if($this->installation->deleteNote($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                    
                case "changeExpDateById":
                    if($this->installation->changeExpDateById($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "changeSubIdById":
                    if($this->installation->changeSubIdById($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                    break;
                case "uploadProfileImage":
                    if($this->installation->uploadProfileImage($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "getProfileImage":
                    if($this->installation->getProfileImage($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "getProfileImageById":
                    if($this->installation->getProfileImageById($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "uploadToolData":
                    if($this->installation->uploadToolData($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "updateToolData":
                    if($this->installation->updateToolData($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "getTools":
                    if($this->installation->getTools($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "uploadUserDomains":
                    if($this->installation->uploadUserDomains($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "getUserDomains":
                    if($this->installation->getUserDomains($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "uploadDriveCode":
                    if($this->installation->uploadDriveCode($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "checkIfDrivesAreSet":
                    if($this->installation->checkIfDrivesAreSet($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "ChangeSubToFree":
                    if($this->installation->ChangeSubToFree($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                case "updateOpenTools":
                    if($this->installation->updateOpenTools($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                case "getOpenTools":
                    if($this->installation->getOpenTools($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "deleteDomain":
                    if($this->installation->deleteDomain($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "setColorPickerColors":
                    if($this->installation->setColorPickerColors($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "getColorPickerColors":
                    if($this->installation->getColorPickerColors($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "deleteColorPickerColor":
                    if($this->installation->deleteColorPickerColor($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "copyImageToServer":
                    if($this->installation->copyImageToServer($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "sendTestNewsletter":
                    if($this->installation->sendTestNewsletter($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "getSubscribedUserCountByGroup":
                    if($this->installation->getSubscribedUserCountByGroup($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "changeNewsletterSubscription":
                    if($this->installation->changeNewsletterSubscription($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "setPrivacyPolicyCookie":
                    if($this->installation->setPrivacyPolicyCookie($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "sendNewsletter":
                    if($this->installation->sendNewsletter($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "updateToDoAccess":
                    if($this->installation->updateToDoAccess($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "displayToDoListUsers":
                    if($this->installation->displayToDoListUsers($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "displayToDoLists":
                    if($this->installation->displayToDoLists($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "addToDo":
                    if($this->installation->addToDo($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "deleteToDo":
                    if($this->installation->deleteToDo($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "checkIfToDoListUser":
                    if($this->installation->checkIfToDoListUser($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "updateToDo":
                    if($this->installation->updateToDo($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "changeToDoStatus":
                    if($this->installation->changeToDoStatus($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "changeToDoPriority":
                    if($this->installation->changeToDoPriority($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "uploadToolOrder":
                    if($this->installation->uploadToolOrder($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "getToolOrder":
                    if($this->installation->getToolOrder($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "uploadToDoOrder":
                    if($this->installation->uploadToDoOrder($data)){
                    }else{
                        $this->displayErrorMessage();
                        return;
                    }
                break;
                case "getToDoOrder":
                    if($this->installation->getToDoOrder($data)){
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
            case 'user':
                $this->installation = new User();
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