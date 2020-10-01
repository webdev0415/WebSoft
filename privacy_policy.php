<?php
    session_start();
    if (isset($_SESSION['logged_in'])) {
        if($_SESSION['suspended'] == 1){
            header("location: /suspended.php"); 
        }
    }
?>
<!doctype html>
<html>

<head>
    <?php include "embed_header.php"; ?>
    <title>WebSoft365</title>
        <!-- Favicon -->
        <link rel="apple-touch-icon" sizes="57x57" href="assets/icons/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="assets/icons/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="assets/icons/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="assets/icons/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="assets/icons/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="assets/icons/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="assets/icons/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="assets/icons/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/icons/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="assets/icons/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="assets/icons/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/icons/favicon-16x16.png">
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <!-- Own CSS -->
    <link rel="stylesheet" href="css/main.css">
</head>

<body>
    <?php include "embed_body.php"; ?>
    <div id="navigation"></div>

    <!------------------------------ CONTENT ------------------------------>
    <div id="privacy_policy" class="content">
        <div class="privacy_body">
            <h5>WebSoft365</h5>
            <h3>GDPR PRIVACY POLICY</h3>
            <p>&nbsp;</p>
            <p>This privacy policy (&ldquo;Privacy Policy&rdquo;) governs the use by you (&ldquo;you&rdquo; or
                &ldquo;your&rdquo;) of the website www.WebSoft365.com (hereinafter referred to as the
                &ldquo;Website&ldquo;) and Services (as defined in the Website Terms of Use) provided by WebSoft365, a
                business based in and governed by the laws of Austria (&ldquo;WebSoft365&rdquo;, &ldquo;us&rdquo;,
                &ldquo;we&rdquo; or &ldquo;our&rdquo;).</p>
            <p>WebSoft365 is committed to safeguarding your privacy, as such this Privacy Policy, together with the
                Website Terms of Use, sets out the basis on which any personal information we collect from you, or that
                you provide to us, will be processed by us.</p>
            <p>Please read this Privacy Policy carefully to ensure that you understand the terms and conditions
                contained herein. Your acceptance of WebSoft365&rsquo;s Privacy Policy is deemed to occur upon your
                first use of the Website and Services. If you do not accept and agree with this Privacy Policy, please
                refrain from using and/or accessing WebSoft365&rsquo;s Website and Services immediately.</p>
            <p>&nbsp;</p>
            <p class="title"><b>Application of Privacy Policy</b></p>
            <p>This Privacy Policy applies only to your use of WebSoft365&rsquo;s Website and Services. The Website may
                contain links to other websites, of which we have no control over how your information is collected,
                stored, or used by other websites and/or resources. We, therefore, advise you to check the privacy
                policies of any such websites and/or resources before providing any information to them.</p>
            <p>This Privacy Policy covers personal information that could identify you and information that could not
                (collectively &ldquo;Personal Information&rdquo;). By using the Website and Services, you consent to the
                processing of your personal information as described in our Privacy Policy, and you warrant that all
                information provided by you to us is accurate. In the context of the law and this notice,
                &ldquo;process&rdquo; shall mean collect, store, transfer, use or otherwise act on data.</p>
            <p>&nbsp;</p>
            <p class="title"><b>Collection of Personal Information</b></p>
            <p>When you use WebSoft365&rsquo;s Website and Services, we may collect, use, store or transfer some or all
                of the following Personal Information:</p>
            <p>(i) Your first name, last name, title, date of birth, country of residence and other identifiers that you
                may have provided at some time;</p>
            <p>(ii) Your contact information which includes data such as billing address, email address, telephone
                numbers and any other data you have provided to us for the purpose of communication or the rendering of
                the Services to you;</p>
            <p>(iii) Your financial data such as your bank account and payment card details;</p>
            <p>(iv) Information that you provide to us for the purpose of subscribing to our email notifications and/or
                newsletters. This notification type data may be collected for the purposes of sending you the relevant
                notifications and/or newsletters.</p>
            <p>(v) Transaction data, which includes details about payments or communications to and from you as well as
                data about the Services you have subscribed for; and</p>
            <p>(vi) Technical data includes your Internet protocol address, browser type, and version, time zone setting
                and location, browser plug-in types and versions, operating system and platform, and other technology on
                the devices you use to access the Website.</p>
            <p>&nbsp;</p>
            <p class="title"><b>How Personal Information Is Used</b></p>
            <p>WebSoft365&rsquo;s use of your Personal Information will always have a lawful basis, being either that
                (i) we have a contractual obligation with you as pertains to the provision of the Services; or (ii)
                because you have consented to our use of your Personal Information; or (iii) for our legitimate
                interests; or (iv) we have a legal obligation to divulge your Personal Information. More specifically,
                WebSoft365 may use your Personal Information for the following purposes:</p>
            <p>(i) Personal Information we process because we have a contractual obligation with you:</p>
            <p>When you subscribe to a Service on WebSoft365&rsquo;s Website, or otherwise agree to the Website Terms of
                Use (&ldquo;ToU&rdquo;), a contract is formed between you and WebSoft365. In order to carry out our
                obligations under that contract, we must process the Personal Information you provide to us. We may use
                your Personal Information to: verify your identity for security purposes; sell Services to you; and/or
                provide you with our Services. WebSoft365 shall continue to process your Personal Information until the
                contract between us ends or is terminated by either party in accordance with the ToU.</p>
            <p>(ii) Personal Information we process with your consent:</p>
            <p>When there is no contractual relationship between WebSoft365 and you, and through certain actions such as
                when you browse the Website or ask us to provide you with more information about our Services, you
                provide your consent for WebSoft365 to process your Personal Information. Wherever possible, WebSoft365
                aims to obtain your explicit consent to process your Personal Information. We may continue to process
                your Personal Information on this basis until you withdraw your consent. You may withdraw your consent
                at any time by sending us an email at websoft365com@gmail.com. However, if you do so, please note that
                you may not be able to use the Website or make use of the Services further.</p>
            <p>(iii) Personal Information we process for the purposes of legitimate interests:</p>
            <p>WebSoft365 may process Personal Information on the basis that there is a legitimate interest (for
                example, for recordkeeping purposes, obtaining insurance advice and professional advice.) either to you
                or to us. Where we process your Personal Information on this basis, we shall do so after having given
                careful consideration to whether: (a) the same objective could be achieved through other means; (b)
                processing or not processing the Personal Information might cause you harm; (c) you would expect
                WebSoft365 to process your Personal Information, and (d) you would consider it reasonable for us to
                process your Personal Information.</p>
            <p>(iv) Personal Information we process because we have a legal obligation:</p>
            <p>WebSoft365 may have to process your Personal Information in order to comply with a statutory obligation,
                which may include, but not be limited to providing your Personal Information to legal authorities upon a
                legal request to do so.</p>
            <p>(v) Personal Information we process for the purposes of connecting you with our service providers:</p>
            <p>To facilitate the provision of the Services by WebSoft365 to you, we work with a number of service
                providers, who process data on our behalf. Our service providers include payment gateway providers (i.e.
                Paddle), subscription management providers, email service providers, and analytical tool providers.</p>
            <p>&nbsp;</p>
            <p class="title"><b>Use of Social Login Credentials</b></p>
            <p>Our Website offers you the ability to register and log in using your third party social media account
                details (i.e. Facebook). Where you choose to do this, we will receive certain profile information about
                you from your social media provider. The profile Information we receive may vary depending on the social
                media provider concerned, but will often include your name, e-mail address, friends list, profile
                picture as well as other information you choose to make public.</p>
            <p>We will use the information we receive only for the purposes that are described in this Privacy Policy or
                that are otherwise made clear to you on the Website. Please note that we do not control, and are not
                responsible for, other uses of your Personal Information by your third party social media provider. We
                recommend that you review their privacy policy to understand how they collect, use and share your
                Personal Information, and how you can set your privacy preferences on their website.</p>
            <p>&nbsp;</p>
            <p class="title"><b>Storing Personal Information</b></p>
            <p>Subscription plan information and payment information is stored and secured respectively, on
                www.paddle.com. All Personal Information is stored on a dedicated server and in a backup vault, and all
                other data pertaining to the Services are processed and stored securely on Amazon Web Services.</p>
            <p>&nbsp;</p>
            <p class="title"><b>Sharing Personal Information</b></p>
            <p>WebSoft365 may sometimes contract with third-party service providers to supply specific components of the
                Services to you or to provide us with information about your use of the Website and our Services. These
                may include payment processing facilities, email delivery, marketing efforts, behavioral analytics, and
                messaging applications. In some cases, the third parties may require access to some or all of your
                Personal Information. Where any of your Personal Information is required for such a purpose, WebSoft365
                shall take all reasonable steps to ensure that your Personal Information will be handled safely,
                securely, and in accordance with your rights, our obligations, and the obligations of the third party
                under the law. Personal Information will only be shared and used within the bounds of the law.</p>
            <p>WebSoft365 may also share information with your consent, to comply with applicable laws, to protect your
                rights or to fulfill business obligations.</p>
            <p>&nbsp;</p>
            <p class="title"><b>Your rights under the General Data Protection Regulation</b></p>
            <p>For the purposes of complying with the General Data Protection Regulation 2016/679 (&ldquo;GDPR&rdquo;),
                WebSoft365 is considered as the data controller in relation to your Personal Information. We have listed
                below, the principal rights you have under the GDPR:</p>
            <p>(i) the right to access - you can ask for copies of your Personal Information;</p>
            <p>(ii) the right to rectification - you can ask us to rectify inaccurate Personal Information and to
                complete incomplete Personal Information;</p>
            <p>(iii) the right to erasure - you can ask us to erase your Personal Information from our systems;</p>
            <p>(iv) the right to restrict processing - you can ask users to restrict the processing of your Personal
                Information;</p>
            <p>(v) the right to object to processing - you can object to the processing of your Personal Information;
            </p>
            <p>(vi) the right to data portability - you can ask us to transfer your Personal Information to another
                organization or to you;</p>
            <p>(vii) the right to complain to a supervisory authority - you can complain about our processing of your
                Personal Information to the applicable authorities; and</p>
            <p>(viii) the right to withdraw consent &ndash; you can request that we withdraw your consent to store and
                process your Personal Information except to the extent that the basis of our processing your Personal
                Information is required by law.</p>
            <p>You may exercise any of your rights in relation to your Personal Information by written notice to us,
                using the contact details set out below.</p>
            <p>Should you have any cause for complaint about our use of your Personal Information, please contact us
                using the details provided below and we will endeavor to solve the problem for you. For further
                information about your rights, please contact the Information Commissioner&rsquo;s Office.</p>
            <p>&nbsp;</p>
            <p class="title"><b>Cookies</b></p>
            <p>As provided under WebSoft365&rsquo;s ToU, when you first visit the Website, we may ask you to confirm
                whether you wish for cookies to be used by us. If you choose not to accept them, we shall not use them
                for your visit except to record that you have not consented to their use for any other purpose. However,
                please note that should you choose not to use cookies or you prevent their use through your browser
                settings, you might not be able to use all the functionalities available on the Website.</p>
            <p>WebSoft365 may use cookies for the following purposes:</p>
            <p>(i) authentication and status - we use cookies to identify you when you visit the Website and as you
                navigate through the pages of the Website;</p>
            <p>(ii) personalization - we use cookies to store information about your preferences as you navigate through
                the Website;</p>
            <p>(iii) security - we use cookies as an element of the security measures used to protect user accounts,
                including preventing fraudulent use of login credentials, and to protect the Website and Services; and
            </p>
            <p>(iv) analysis - we use cookies to help us to analyze the use and performance of the Website and Services.
            </p>
            <p>&nbsp;</p>
            <p class="title"><b>Data from third parties</b></p>
            <p>WebSoft365 may collect or receive information that third-party service providers may provide about you
                when using the Website and Services or obtain information from other sources and combine that with
                information we collect through the Services. The following information is collected and/or obtained from
                third parties:</p>
            <p>(i) Google Analytics: We use certain analytical tools, including but not limited to Google Analytics on
                the Website so as to help us analyze how users use the Website and Services by noting: when you use the
                Website and Services, the events that occur within the Website and Services. The information collected
                will be collected directly by the applicable analytical tool we are using. Such information is collected
                as a means to provide, improve, and develop the Website and Services we offer, so as to create a safer
                and trusted environment when you use the Website and Services; and to improve our advertising and
                marketing initiatives/campaigns.</p>
            <p>(ii) Amazon Web Services: We use this service as a means of hosting WebSoft365&rsquo;s Website. Amazon
                Web Services may collect all information you provide us with, and all information we automatically
                collect as a means of facilitating the functions of the Website.</p>
            <p>(iii) Paddle: We use these tools as payment gateway providers. The paddle may collect the information you
                provide to us as a means of processing payments you make on the Website for the Services.</p>
            <p>We may disclose the information you have provided to us and the information that is automatically
                collected:</p>
            <p>(i) as required by law, such as to comply with a subpoena or similar legal process; and/or</p>
            <p>(ii) when we believe in good faith that disclosure is necessary to protect our rights, protect your
                safety or the safety of others, investigate fraud, or respond to a government request;</p>
            <p>&nbsp;</p>
            <p class="title"><b>Information from Minors</b></p>
            <p>The Website and Services are only available to users over the age of 18 years. We do not knowingly
                solicit data from or market to children under 18 years of age. By using the Website and Services, you
                represent that you are at least 18 years old or that you are the parent or guardian of such a minor and
                consent to such minor dependent&rsquo;s use of the Website and Services. If WebSoft365 discovers that
                Personal Information from users less than 18 years of age has been collected, we will deactivate the
                Member Account and take reasonable measures to promptly delete such data from our records. Should you
                become aware of any data we have collected from children under age 18 years, please contact us at
                websoft365com@gmail.com.</p>
            <p>&nbsp;</p>
            <p class="title"><b>Opt-out rights</b></p>
            <p>You can stop all collection of Personal Information by WebSoft365 by not accessing the Website and
                Services, or you can also request to opt-out via email, at websoft365com@gmail.com.</p>
            <p>&nbsp;</p>
            <p class="title"><b>Security</b></p>
            <p>We are concerned about safeguarding the confidentiality of your Personal Information. We provide
                physical, electronic, and procedural safeguards to protect information we process and maintain. For
                example, we (i) use Secure Systems Layer (SSL) protocol to provide a secure connection between your web
                browser and WebSoft365&rsquo;s server to allow for the safe exchange of Personal Information; and (ii)
                limit access to the Personal Information to authorized employees and contractors who need to know that
                information in order to operate, develop or improve the Website. Please be aware that, although we
                endeavor to provide reasonable security for Personal Information we process and maintain, no security
                system can prevent all potential security breaches.</p>
            <p>&nbsp;</p>
            <p class="title"><b>The retention period for Personal Information</b></p>
            <p>Except as otherwise mentioned in this Privacy Policy, we shall endeavor to keep your Personal Information
                only for as long as it is required for us to be able to provide you with the Services you have requested
                or paid for. Should you terminate the Services provided by WebSoft365 to you, or close your Member
                Account, we shall delete all your Personal Information from the Website.</p>
            <p>Notwithstanding the above, we may retain your Personal Information to comply with the law, including for
                the period demanded by our tax authorities; and to support a claim or defense in court.</p>
            <p>&nbsp;</p>
            <p class="title"><b>Changes made to this Privacy Policy</b></p>
            <p>This Privacy Policy may be updated from time to time for any reason. WebSoft365 will notify you of any
                changes to our Privacy Policy by posting the new Privacy Policy here and/or informing you via email or
                text message. You shall be responsible for reviewing and becoming familiar with any such modifications.
                We agree that changes cannot be retroactive. If you object to any changes, you may discontinue your use
                of the Website and Services. You are advised to consult this Privacy Policy regularly for any changes,
                as continued use is deemed approval of all changes.</p>
            <p>&nbsp;</p>
            <p class="title"><b>Contact us</b></p>
            <p>Should you have any questions or concerns regarding privacy while using the Website and/or the Services,
                please send us a detailed message to websoft365com@gmail.com, and we will use our best endeavors to
                resolve your concerns.</p>
            <p>&nbsp;</p>
            <p>Effective Date: 03-15-2020</p>
        </div>
    </div>
    <?php include "components/policy_modal.php"; ?>
    <!------------------------------ CONTENT ------------------------------>

    <footer id="footer"></footer>
    <script src="js/jquery.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/analytics.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@7.25.0/dist/sweetalert2.all.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/promise-polyfill@7.1.0/dist/promise.min.js"></script>
    <script src="js/main.js"></script>
    <script src="js/privacy_policy.js"></script>
</body>

</html>