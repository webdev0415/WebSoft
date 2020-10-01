<html>
   <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
      <script src="js/jscolor.js"></script>
      <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.21/datatables.min.css"/>
      <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
      <link rel="stylesheet" href="css/index.css">
   </head>
   <body>
      <div id="bug_report_tool_setup">
         <h2>Bug report tool & Feedback tool</h2>
         <div class="row">
            <div class="col-2 button_container">
               <div class="bug_report_button" id="new_project_btn">
                  <h4>Start a new project</h4>
                  <hr>
                  <div id="new_project_content">
                     <h1>+</h1>
                  </div>
               </div>
            </div>
            <div class="col-5 button_container">
               <div class="bug_report_button" id="edit_project_btn">
                  <h4>Edit projects</h4>
                  <hr>
                  <div id="edit_project_content">
                     <ul class="list-group" id="edit_project_ul"></ul>
                  </div>
               </div>
            </div>
            <div class="col-5 button_container">
               <div class="bug_report_button" id="reports_btn">
                  <h4>Reports</h4>
                  <hr>
                  <div id="reports_content">
                     <table class="table">
                        <thead>
                           <tr class="reports_content_tr">
                              <th></th>
                              <th>Open</th>
                              <th>Closed</th>
                              <th>Total</th>
                              <th></th>
                           </tr>
                        </thead>
                        <tbody id="report_tbody">
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
         <div class="row">
            <div class="col-12">
               <div id="emailAlertsAccordion">
                  <div class="card">
                     <div class="card-header" id="headingThree">
                        <button class="btn btn-link collapsed" data-toggle="collapse"
                           data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" id="email-alerts">
                           <h5 class="collapse_title_2">Email alert settings</h5>
                        </button>
                     </div>
                     <div id="collapseThree" class="collapse" aria-labelledby="headingThree">
                        <div class="card-body-three">
                        <div class="form-group emailAlertWrapper">
                           <label for="emailAlertOption">How often would you like to receive email alerts?</label>
                           <select class="form-control" id="emailAlertOption">
                              <option value="everytime">I want to receive separate email alerts on every new bug report.</option>
                              <option value="daily">I want to receive an email alert once a day with all new reports.</option>
                              <option value="never">I don't want to receive email alerts. I will check the reports myself by logging into the software.</option>
                           </select>
                           <button class="btn btn-primary" id="setEmailSendingButton">Save</button>
                        </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="row">
            <div class="col-12">
               <div id="addMemberAccordion">
                  <div class="card">
                     <div class="card-header" id="headingTwo">
                        <button class="btn btn-link collapsed" data-toggle="collapse"
                           data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" id="team-member-access">
                           <h5 class="collapse_title">Team member access</h5>
                        </button>
                     </div>
                     <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"
                        data-parent="#accordion">
                        <div class="card-body-two">
                           <h6>Send the bug report automatically to your web developer or any colleague
                              by adding their email address and a PIN code to access the bug report.
                           </h6>
                           <h6>You can add up to 2 team members (PRO Members) / 5 team members (SUPER PRO Members).</h6>
                           <div class="row card-body-row">
                              <form id="addTeamMember">
                                 <div class="col-12">
                                    <h6>To add a new team member, please enter a team member's email address and add a PIN code. Your team member will need this login to access the report.</h6>
                                    <input type="email" class="form-control report_element" placeholder="Email" id="report_email" required>
                                    <input type="email" class="form-control report_element" placeholder="Confirm email" id="report_email_confirm" required>
                                    <input type="text" class="form-control report_element" placeholder="PIN (4 digit)" id="report_pin" pattern="[0-9]{4}" maxlength="4" required>
                                    <button type="submit" class="btn btn-primary" id="report_email_submit">Add Team Member</button>
                                 </div>
                                 <div class="col-12">
                                    <ul class="report_email_domain_list"></ul>
                                 </div>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div id="new_project_modal" class="modal">
            <div class="modal-content">
               <div class="modal-header">
                  <h4 id="project_modal_title">Create new project</h4>
                  <span class="close close_new_project">&times;</span>
               </div>
               <div class="modal-body">
                  <form>
                     <div class="row settings_wrapper" id="settings_wrapper">
                        <div class="col-5 flex-column" id="change_settings_wrapper">
                           <div class="form-group domain_wrapper">
                              <label for="domainName" class="domain_name_label">Choose a domain name</label>
                              <div class="row">
                                 <div class="col-8 domainNameDropdownContainer">
                                    <select class="form-control" id="domainName"></select>
                                 </div>
                                 <div class="col-4">
                                    <a href="https://websoft365.com/settings.php" target="_parent"><button type="button" class="btn btn-warning" id="add_more_domains">+ More domains</button></a>
                                 </div>
                              </div>
                           </div>
                           <div class="form-group">
                              <div class="row">
                                 <div class="col-4">
                                    <div class="custom_item">
                                       <h6>Button color</h6>
                                       <input id="colorpicker_btn" class="jscolor settings_element" value="#00CC99">
                                       <div id="colorpicker_choose" class="chooser1" onclick="document.getElementById('colorpicker_btn').jscolor.show()"></div>
                                    </div>
                                 </div>
                                 <div class="col-4 pl-0">
                                    <div class="custom_item">
                                       <h6>Button text color</h6>
                                       <input id="colorpicker_btn_text" class="jscolor settings_element" value="#FFFFFF">
                                       <div id="colorpicker_choose_text" class="chooser1" onclick="document.getElementById('colorpicker_btn_text').jscolor.show()"></div>
                                    </div>
                                 </div>
                                 <div class="col-4 pl-0">
                                    <div class="custom_item">
                                       <h6>Button border color</h6>
                                       <input id="colorpicker_btn_border" class="jscolor settings_element" value="#FFFFFF">
                                       <div id="colorpicker_choose_border" class="chooser1" onclick="document.getElementById('colorpicker_btn_border').jscolor.show()"></div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="form-group">
                              <div class="row">
                                 <div class="col-4">
                                    <h6>Button position</h6>
                                    <select class="form-control settings_element" id="buttonPosition">
                                       <option value="button_pos_right">Right</option>
                                       <option value="button_pos_left">Left</option>
                                       <option value="button_pos_right_bottom">Right bottom</option>
                                       <option value="button_pos_left_bottom">Left bottom</option>
                                    </select>
                                 </div>
                                 <div class="col-4 pl-0">
                                    <h6>Modal box position</h6>
                                    <select class="form-control settings_element" id="modalPosition">
                                       <option value="open_bottom">Bottom</option>
                                       <option value="open_top">Top</option>
                                    </select>
                                 </div>
                                 <div class="col-4 pl-0">
                                    <h6>Editor bar position</h6>
                                    <select class="form-control settings_element" id="editorPosition">
                                       <option value="top">Top</option>
                                       <option value="bottom">Bottom</option>
                                    </select>
                                 </div>
                              </div>
                           </div>
                           <div class="form-group">
                              <div class="row">
                                 <div class="col-6">
                                    <div class="custom_item switch button_border_container">
                                       <h6>Hide button in mobile</h6>
                                       <input type="checkbox" class="settings_element" data-toggle="toggle" data-size="small" id="hide_button_mobile">
                                    </div>
                                 </div>
                                 <div class="col-6">
                                    <div class="custom_item switch button_border_container">
                                       <h6>Button border</h6>
                                       <input type="checkbox" class="settings_element" data-toggle="toggle" data-size="small" id="button_border">
                                    </div>
                                 </div>
                                 <div class="col-6">
                                    <div class="custom_item switch">
                                       <h6>Comment field</h6>
                                       <input type="checkbox" class="settings_element" checked data-toggle="toggle" data-size="small" id="comment_field_cbx">
                                    </div>
                                 </div>
                                 <div class="col-6">
                                    <div class="custom_item switch">
                                       <h6>Comment is required</h6>
                                       <input type="checkbox" class="settings_element" checked data-toggle="toggle" data-size="small" id="comment_req_cbx">
                                    </div>
                                 </div>
                                 <div class="col-6">
                                    <div class="custom_item switch">
                                       <h6>Name field</h6>
                                       <input type="checkbox" class="settings_element" checked data-toggle="toggle" data-size="small" id="name_field_cbx">
                                    </div>
                                 </div>
                                 <div class="col-6">
                                    <div class="custom_item switch">
                                       <h6>Name is required</h6>
                                       <input type="checkbox" class="settings_element" data-toggle="toggle" data-size="small" id="name_req_cbx">
                                    </div>
                                 </div>
                                 <div class="col-6">
                                    <div class="custom_item switch">
                                       <h6>Email field</h6>
                                       <input type="checkbox" class="settings_element" checked data-toggle="toggle" data-size="small" id="email_field_cbx">
                                    </div>
                                 </div>
                                 <div class="col-6">
                                    <div class="custom_item switch">
                                       <h6>Email is required</h6>
                                       <input type="checkbox" class="settings_element" data-toggle="toggle" data-size="small" id="email_req_cbx">
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="form-group">
                              <div id="accordion">
                                 <div class="card">
                                    <div class="card-header collapsed" id="headingOne" class="mb-0" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                       <h6>Edit Language Settings</h6>
                                       <button class="btn btn-primary btn-sm" id="open-close-lsettings" type="button">Open/Close</button>
                                    </div>
                                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                       <div class="card-body">
                                          <p>You can change the language of the texts in the widget to your own language.</p>
                                          <div class="modal_text_wrapper">
                                             <label for="report_modal_main_button">Main button</label>
                                             <input class="form-control settings_element" id="report_modal_main_button" value="Bug report/feedback" placeholder="Bug report/feedback" maxlength="18"></input>
                                          </div>
                                          <div class="modal_text_wrapper">
                                             <label for="report_modal_title">Form title</label>
                                             <input class="form-control settings_element" id="report_modal_title" value="Bug report/feedback" placeholder="Bug report/feedback"></input>
                                          </div>
                                          <div class="modal_text_wrapper">
                                             <label for="report_modal_text">Form text</label>
                                             <textarea class="form-control settings_element" id="report_modal_text" rows="2" placeholder="Bug report/feedback">Have you found a bug or do you have any comments/suggestions about this site?</textarea>
                                          </div>
                                          <div class="modal_text_wrapper">
                                             <label for="report_modal_button_1">Form button 1</label>
                                             <input class="form-control settings_element" id="report_modal_button_1" value="Bug report" placeholder="Bug report/feedback"></input>
                                          </div>
                                          <div class="modal_text_wrapper">
                                             <label for="report_modal_button_2">Form button 2</label>
                                             <input class="form-control settings_element" id="report_modal_button_2" value="Feedback" placeholder="Bug report/feedback"></input>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="form-group bottom-form-group">
                              <div class="row">
                                 <div class="col-6">
                                    <div class="custom_item branding_wrapper">
                                       <h6>Branding</h6>
                                       <input type="checkbox" class="settings_element" checked data-toggle="toggle" data-size="small" id="branding">
                                    </div>
                                 </div>
                                 <div class="col-6">
                                    <button type="button" class="btn btn-success" id="save_settings">Save Settings</button>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="col-7">
                           <iframe src="../preview/index.php" width="100%" height="100%" frameborder="0" id="bug_report_iframe"></iframe>
                           <div class="row code_snippet_text">
                              <div class="col-9">
                                 <h6>To use this software on your website, you must go to your settings page and copy and paste the code snippet into your site just before the closing &lt;/body&gt; tag.</h6>
                              </div>
                              <div class="col-3">
                                 <button type="button" class="btn btn-sm btn-warning add_snippet">Add code snippet</button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
         <div id="edit_project_modal" class="modal">
            <div class="modal-content">
               <div class="modal-header">
                  <h4 id="edit_project_modal_title">Edit project</h4>
                  <span class="close close_edit_project">&times;</span>
               </div>
               <div class="modal-body">
                  <form>
                     <div class="row settings_wrapper" id="settings_wrapper2">
                        <div class="col-5 flex-column" id="change_settings_wrapper2">
                           <div class="form-group domain_wrapper">
                              <label for="domainName" class="domain_name_label">Choose a domain name</label>
                              <div class="row">
                                 <div class="col-8">
                                    <select class="form-control" id="editDomainName"></select>
                                 </div>
                                 <div class="col-4">
                                    <a href="https://websoft365.com/settings.php" target="_parent"><button type="button" class="btn btn-warning" id="add_more_domains">+ More domains</button></a>
                                 </div>
                              </div>
                           </div>
                           <div class="form-group">
                              <div class="row">
                                 <div class="col-4">
                                    <div class="custom_item">
                                       <h6>Button color</h6>
                                       <input id="edit_colorpicker_btn" class="jscolor edit_settings_element" value="#00CC99">
                                       <div id="edit_colorpicker_choose" class="chooser1" onclick="document.getElementById('edit_colorpicker_btn').jscolor.show()"></div>
                                    </div>
                                 </div>
                                 <div class="col-4 pl-0">
                                    <div class="custom_item">
                                       <h6>Button text color</h6>
                                       <input id="edit_colorpicker_btn_text" class="jscolor edit_settings_element" value="#FFFFFF">
                                       <div id="edit_colorpicker_choose_text" class="chooser1" onclick="document.getElementById('edit_colorpicker_btn_text').jscolor.show()"></div>
                                    </div>
                                 </div>
                                 <div class="col-4 pl-0">
                                    <div class="custom_item">
                                       <h6>Button border color</h6>
                                       <input id="edit_colorpicker_btn_border" class="jscolor edit_settings_element" value="#FFFFFF">
                                       <div id="edit_colorpicker_choose_border" class="chooser1" onclick="document.getElementById('edit_colorpicker_btn_border').jscolor.show()"></div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="form-group">
                              <div class="row">
                                 <div class="col-4">
                                    <h6>Button position</h6>
                                    <select class="form-control edit_settings_element" id="edit_buttonPosition">
                                       <option value="button_pos_right">Right</option>
                                       <option value="button_pos_left">Left</option>
                                       <option value="button_pos_right_bottom">Right bottom</option>
                                       <option value="button_pos_left_bottom">Left bottom</option>
                                    </select>
                                 </div>
                                 <div class="col-4 pl-0">
                                    <h6>Modal box position</h6>
                                    <select class="form-control edit_settings_element" id="edit_modalPosition">
                                       <option value="open_bottom">Bottom</option>
                                       <option value="open_top">Top</option>
                                    </select>
                                 </div>
                                 <div class="col-4 pl-0">
                                    <h6>Editor bar position</h6>
                                    <select class="form-control edit_settings_element" id="edit_editorPosition">
                                       <option value="top">Top</option>
                                       <option value="bottom">Bottom</option>
                                    </select>
                                 </div>
                              </div>
                           </div>
                           <div class="form-group">
                              <div class="row">
                                 <div class="col-6">
                                    <div class="custom_item switch button_border_container">
                                       <h6>Hide button in mobile</h6>
                                       <input type="checkbox" class="edit_settings_element" data-toggle="toggle" data-size="small" id="edit_hide_button_mobile">
                                    </div>
                                 </div>
                                 <div class="col-6">
                                    <div class="custom_item switch button_border_container">
                                       <h6>Button border</h6>
                                       <input type="checkbox" class="edit_settings_element" data-toggle="toggle" data-size="small" id="edit_button_border">
                                    </div>
                                 </div>
                                 <div class="col-6">
                                    <div class="custom_item switch">
                                       <h6>Comment field</h6>
                                       <input type="checkbox" class="edit_settings_element" checked data-toggle="toggle" data-size="small" id="edit_comment_field_cbx">
                                    </div>
                                 </div>
                                 <div class="col-6">
                                    <div class="custom_item switch">
                                       <h6>Comment is required</h6>
                                       <input type="checkbox" class="edit_settings_element" checked data-toggle="toggle" data-size="small" id="edit_comment_req_cbx">
                                    </div>
                                 </div>
                                 <div class="col-6">
                                    <div class="custom_item switch">
                                       <h6>Name field</h6>
                                       <input type="checkbox" class="edit_settings_element" checked data-toggle="toggle" data-size="small" id="edit_name_field_cbx">
                                    </div>
                                 </div>
                                 <div class="col-6">
                                    <div class="custom_item switch">
                                       <h6>Name is required</h6>
                                       <input type="checkbox" class="edit_settings_element" data-toggle="toggle" data-size="small" id="edit_name_req_cbx">
                                    </div>
                                 </div>
                                 <div class="col-6">
                                    <div class="custom_item switch">
                                       <h6>Email field</h6>
                                       <input type="checkbox" class="edit_settings_element" checked data-toggle="toggle" data-size="small" id="edit_email_field_cbx">
                                    </div>
                                 </div>
                                 <div class="col-6">
                                    <div class="custom_item switch">
                                       <h6>Email is required</h6>
                                       <input type="checkbox" class="edit_settings_element" data-toggle="toggle" data-size="small" id="edit_email_req_cbx">
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="form-group">
                              <div id="accordion">
                                 <div class="card">
                                    <div class="card-header collapsed" id="headingOne2" class="mb-0" data-toggle="collapse" data-target="#collapseOne2" aria-expanded="false" aria-controls="collapseOne">
                                       <h6>Edit Language Settings</h6>
                                       <button class="btn btn-primary btn-sm" id="open-close-lsettings2" type="button">Open/Close</button>
                                    </div>
                                    <div id="collapseOne2" class="collapse" aria-labelledby="headingOne2" data-parent="#accordion">
                                       <div class="card-body">
                                          <p>You can change the language of the texts in the widget to your own language.</p>
                                          <div class="modal_text_wrapper">
                                             <label for="edit_report_modal_main_button">Main button</label>
                                             <input class="form-control edit_settings_element" id="edit_report_modal_main_button" value="Bug report/feedback" placeholder="Bug report/feedback" maxlength="18"></input>
                                          </div>
                                          <div class="modal_text_wrapper">
                                             <label for="edit_report_modal_title">Form title</label>
                                             <input class="form-control edit_settings_element" id="edit_report_modal_title" value="Bug report/feedback" placeholder="Bug report/feedback"></input>
                                          </div>
                                          <div class="modal_text_wrapper">
                                             <label for="edit_report_modal_text">Form text</label>
                                             <textarea class="form-control edit_settings_element" id="edit_report_modal_text" rows="2" placeholder="Have you found a bug or do you have any comments/suggestions about this site?">Have you found a bug or do you have any comments/suggestions about this site?</textarea>
                                          </div>
                                          <div class="modal_text_wrapper">
                                             <label for="edit_report_modal_button_1">Form button 1</label>
                                             <input class="form-control edit_settings_element" id="edit_report_modal_button_1" value="Bug report" placeholder="Bug report"></input>
                                          </div>
                                          <div class="modal_text_wrapper">
                                             <label for="edit_report_modal_button_2">Form button 2</label>
                                             <input class="form-control edit_settings_element" id="edit_report_modal_button_2" value="Feedback" placeholder="Feedback"></input>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="form-group bottom-form-group">
                              <div class="row">
                                 <div class="col-6">
                                    <div class="custom_item branding_wrapper">
                                       <h6>Branding</h6>
                                       <input type="checkbox" class="edit_settings_element" checked data-toggle="toggle" data-size="small" id="edit_branding">
                                    </div>
                                 </div>
                                 <div class="col-6">
                                    <button type="button" class="btn btn-success" id="edit_save_settings">Save Settings</button>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="col-7">
                           <iframe src="../preview/index.php" width="100%" height="100%" frameborder="0" id="edit_bug_report_iframe"></iframe>
                           <div class="row code_snippet_text">
                              <div class="col-9">
                                 <h6>To use this software on your website, you must go to your settings page and copy and paste the code snippet into your site just before the closing &lt;/body&gt; tag.</h6>
                              </div>
                              <div class="col-3">
                                 <button type="button" class="btn btn-sm btn-warning add_snippet">Add code snippet</button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
         <div id="report_modal" class="modal">
            <div class="modal-content">
               <div class="modal-header">
                  <h4 id="report_page_title">Bug reports</h4>
                  <span class="close close_report_modal" style="margin-left:0px!important;">&times;</span>
               </div>
               <div class="modal-body">
                  <div id="status_pill_buttons">
                     <h6 class="status_pill_btn status_pill_open" value="open">Open x</h6>
                     <h6 class="status_pill_btn status_pill_in_progress" value="in_progress">In progress x</h6>
                     <h6 class="status_pill_btn status_pill_resolved" value="resolved">Resolved x</h6>
                     <h6 class="status_pill_btn status_pill_closed" value="closed">Closed x</h6>
                  </div>
                  <table id="reportList" class="row-border">
                     <thead>
                        <tr>
                           <td><input type="checkbox" id="checkAllReports"></td>
                           <td>Browser</td>
                           <td>OS</td>
                           <td>Device</td>
                           <td>Nr.</td>
                           <td></td>
                           <td>Created</td>
                           <td>Updated</td>
                           <td>Status</td>
                           <td>Actions</td>
                        </tr>
                     </thead>
                     <tbody id="reportListBody">
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
         <div id="issue_modal" class="modal">
            <div class="modal-content">
               <div class="modal-header">
                  <h4 id="issue_page_title">Bug reports</h4>
                  <span class="close close_issue_modal" style="margin-left:0px!important;">&times;</span>
               </div>
               <div class="modal-body">
                  <div class="row">
                     <div class="col-6">
                        <div class="report_issue_comment_wrapper">
                           <h6 class="report_issue_comment"></h6>
                        </div>
                        <br>
                        <hr>
                        <div class="dropdown">
                           <button class="btn btn-light dropdown-toggle dropdown-toggle-issue" type="button" data-toggle="dropdown">Change status
                           <span class="caret"></span></button>
                           <ul class="dropdown-menu dropdown-menu-issue">
                              <li class="change_report_status change_to_open" value="open"><span class="dot change_to_open_dot"></span>Open</li>
                              <li class="change_report_status change_to_in_progress" value="in_progress"><span class="dot change_to_in_progress_dot"></span>In progress</li>
                              <li class="change_report_status change_to_resolved" value="resolved"><span class="dot change_to_resolved_dot"></span>Resolved</li>
                              <li class="change_report_status change_to_closed" value="closed"><span class="dot change_to_closed_dot"></span>Closed</li>
                           </ul>
                        </div>
                        <div class="table_wrapper">
                           <table class="table table-striped" id="issue_table">
                              <tbody id="issue_tbody"></tbody>
                           </table>
                        </div>
                     </div>
                     <div class="col-6" id="issue_image_container">

                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <script src="/js/jquery.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
      <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
      <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.21/datatables.min.js"></script>
      <script src="js/index.js"></script>
   </body>
</html>
