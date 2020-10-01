<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//require 'res/phpmailer/Exception.php';
//require 'res/phpmailer/PHPMailer.php';
//require 'res/phpmailer/SMTP.php';


class Mailer{

    public function sendMail($data){
        if(isset($data->email)){$email = htmlspecialchars($data->email);}else{return false;}
        if(isset($data->subject)){$subject = htmlspecialchars($data->subject);}else{return false;}
        if(isset($data->bodyText)){$bodyText = htmlspecialchars($data->bodyText);}else{return false;}
        if(isset($data->bodyHtml)){$bodyHtml = $data->bodyHtml;}else{return false;}
        // If necessary, modify the path in the require statement below to refer to the
        // location of your Composer autoload.php file.
        require 'vendor/autoload.php';
        // Replace sender@example.com with your "From" address.
        // This address must be verified with Amazon SES.
        $sender = 'noreply@websoft365.com';
        $senderName = 'WebSoft365';
        
        // Replace recipient@example.com with a "To" address. If your account
        // is still in the sandbox, this address must be verified.
        $recipient = $email;
        
        // Replace smtp_username with your Amazon SES SMTP user name.
        $usernameSmtp = 'AKIA425N4OADWPYAAMNS';
        
        // Replace smtp_password with your Amazon SES SMTP password.
        $passwordSmtp = 'BFDDxJzDJvo4L9WFsdS+8hlXX6VUubWOYK9+wkTp1AUW';
        
        // Specify a configuration set. If you do not want to use a configuration
        // set, comment or remove the next line.
        //$configurationSet = 'ConfigSet';
        
        // If you're using Amazon SES in a region other than US West (Oregon),
        // replace email-smtp.us-west-2.amazonaws.com with the Amazon SES SMTP
        // endpoint in the appropriate region.
        $host = 'email-smtp.us-east-1.amazonaws.com';
        $port = 587;
        
        // The HTML-formatted body of the email
        
        $mail = new PHPMailer(true);
        try {
            // Specify the SMTP settings.
            $mail->CharSet = 'UTF-8';
            $mail->SMTPDebug = 0;
            $mail->isSMTP();
            $mail->setFrom($sender, $senderName);
            $mail->Username   = $usernameSmtp;
            $mail->Password   = $passwordSmtp;
            $mail->Host       = $host;
            $mail->Port       = $port;
            $mail->SMTPAuth   = true;
            $mail->SMTPSecure = 'tls';
            //$mail->addCustomHeader('X-SES-CONFIGURATION-SET', $configurationSet);
        
            // Specify the message recipients.
            $mail->addAddress($recipient);
            // You can also add CC, BCC, and additional To recipients here.
        
            // Specify the content of the message.
            $mail->isHTML(true);
            $mail->Subject    = $subject;
            $mail->Body       = $bodyHtml;
            $mail->AltBody    = $bodyText;
            $mail->Send();
            #echo "Email sent!" , PHP_EOL;
            return true; 
        } catch (Exception $e) {
            #echo "Email not sent. {$mail->ErrorInfo}", PHP_EOL; //Catch errors from Amazon SES.
            return false;
        }
    }
}
