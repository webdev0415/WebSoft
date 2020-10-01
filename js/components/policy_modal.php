<?php
if(!isset($_SESSION['policy_accepted'])&&!isset($_SESSION['logged_in'])){
    echo '<div id="accept_policy_modal">
    <div id="float-1-modal" class="m_modal modal">
        <!-- Modal content -->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="report_modal_title">Your privacy</h4>
            </div>
            <div class="modal-body">
                <h6>This website uses cookies to ensure you get the best experience on our website. By continuing to browse our site you agree to our use of data and cookies.</h6>
                <form id="accept_cookies_form">
                    <div class="row">
                        <div class="col-12 col-sm-5 no-padding-rl">
                            <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input"
                                                            id="accept_privacy_modal" required>
                                                        <label class="custom-control-label" for="accept_privacy_modal">Accept
                                                            <a href="privacy_policy.php">Privacy Policy/Cookie Policy</a>
                                                        </label>
                                                    </div>
                            </div>
                        <div class="col-12 col-sm-5 no-padding-rl">
                            <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input"
                                                            id="accept_terms_modal" required>
                                                        <label class="custom-control-label" for="accept_terms_modal">Accept
                                                            <a href="terms_of_use.php">Terms of Use</a>
                                                            </label>
                                                    </div>
                            </div>
                        <div class="col-12 col-sm-2 no-padding-rl">
                            <button type="submit" class="btn btn-warning" id="submit_policy">Got it!</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>';
}
?>