var old_domain_array = []
$(document).ready(function () {
    authDropbox();
    authGoogle();
    authPcloud();
    authOneDrive();
    authAmazonDrive();
    authBox();
    checkIfDrivesAreSet()
    checkUrl();
    uploadUserDomains();
    getUserDetails();
    copyText("copy_privacy_text_btn","copyPrivacyText")
    copyText("copy_text_btn","copyCode")
    originExists()
});

function copyText(button_id, input_id){
    var button = "#"+button_id
    $(button).click(function(e){
        e.preventDefault()
        var copyText = document.getElementById(input_id);
      
        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /*For mobile devices*/
      
        /* Copy the text inside the text field */
        document.execCommand("copy");
        $(button).removeClass("btn-warning")
        $(button).addClass("btn-success")
        $(button).html("Copied to clipboard")
    })
}

function authDropbox(){
    $(".dropbox-button").click(function () {
        window.location.href=`https://www.dropbox.com/oauth2/authorize?client_id=wo6ds0zf2r6euwe&response_type=code&redirect_uri=https://websoft365.com/settings.php?org=dropbox`;
    })
  }

  function authGoogle(){
     
    // client id of the project

    var clientId = "384916262889-8a7lhm8mdtkq90orc3botm3d4t6s8b1c.apps.googleusercontent.com";

    // redirect_uri of the project

    var redirect_uri = "https://websoft365.com/settings.php?org=gdrive";

    // scope of the project

    var scope = "https://www.googleapis.com/auth/drive";

    // the url to which the user is redirected to

    var url = "";


    // this is event click listener for the button

    $(".gdrive-button").click(function(){

       // this is the method which will be invoked it takes four parameters

       signIn(clientId,redirect_uri,scope,url);

    });

    function signIn(clientId,redirect_uri,scope,url){
     
       // the actual url to which the user is redirected to 

       url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri="+redirect_uri
       +"&prompt=consent&response_type=code&client_id="+clientId+"&scope="+scope
       +"&access_type=offline";

       // this line makes the user redirected to the url

       window.location = url;




    }

}

function authPcloud(){
    $(".pcloud-button").click(function () {
        window.location.href=`https://my.pcloud.com/oauth2/authorize?client_id=5vXs8Tb8Ttj&response_type=code&redirect_uri=https://websoft365.com/settings.php?org=pcloud`;
    })
  }

  function authOneDrive(){
    $(".onedrive-button").click(function () {
        window.location.href=`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=c1c94dc0-a94e-4e3d-922d-be9de027f756&scope=onedrive.readwrite&response_type=code&redirect_uri=https://websoft365.com/settings.php?org=onedrive`;
    })
  }

  function authAmazonDrive(){
    $(".amazondrive-button").click(function () {
        window.location.href=`https://www.amazon.com/ap/oa?client_id=amzn1.application-oa2-client.cbe806d09d034523971ebe4e110e1133&scope=clouddrive%3Aread_all%20clouddrive%3Awrite&response_type=code&redirect_uri=https://websoft365.com/settings.php?org=amazondrive`;
    })
  }

  function authBox(){
    $(".box-button").click(function () {
        window.location.href=`https://account.box.com/api/oauth2/authorize?client_id=ubhbb3lpbh5mccg3xrgmlv0xcgihzdhu&response_type=code&redirect_uri=https://websoft365.com/settings.php?org=box`;
    })
  }

function checkUrl(){
    var window_location = window.location.href;
    if(window_location.includes("org")){
        const urlParams = new URLSearchParams(window.location.search);
        const org = urlParams.get('org');
        const code = urlParams.get('code');
        jsonData["org"]=org;
        jsonData["code"]=code;
        console.log(jsonData);
        $.ajax({
            type: "post",
            url: "../backend/index.php?action=uploadDriveCode",
            data: {
              data: JSON.stringify(jsonData)
            },
            success: function (response) {
              console.log(response)
              checkIfDrivesAreSet();
            }
        });
    }
}

function checkIfDrivesAreSet(){
        $.ajax({
            type: "post",
            url: "../backend/index.php?action=checkIfDrivesAreSet",
            data: {
              data: JSON.stringify(dummyJson)
            },
            success: function (response) {
            console.log(response)
                if(response.gdrive_code){
                    $(".gdrive-button b").html("Your Google Drive is connected.")
                    $(".gdrive-button").prop( "disabled", true );
                    $(".gdrive-button").css("background-color","grey");
                    $(".gdrive-button").css("border","none");
                }
                if(response.dropbox_code){
                    $(".dropbox-button b").html("Your Dropbox is connected.")
                    $(".dropbox-button").prop( "disabled", true );
                    $(".dropbox-button").css("background-color","grey");
                    $(".dropbox-button").css("border","none");
                }
                if(response.pcloud_code){
                    $(".pcloud-button b").html("Your pCloud is connected.")
                    $(".pcloud-button").prop( "disabled", true );
                    $(".pcloud-button").css("background-color","grey");
                    $(".pcloud-button").css("border","none");
                }   
                if(response.onedrive_code){
                    $(".onedrive-button b").html("Your OneDrive is connected.")
                    $(".onedrive-button").prop( "disabled", true );
                    $(".onedrive-button").css("background-color","grey");
                    $(".onedrive-button").css("border","none");
                }    
                if(response.box_code){
                    $(".box-button b").html("Your Box is connected.")
                    $(".box-button").prop( "disabled", true );
                    $(".box-button").css("background-color","grey");
                    $(".box-button").css("border","none");
                }   
            }
        });
    }

    function uploadUserDomains(){
        $("#domainsForm").submit(function (e) {
            e.preventDefault();
            if($("#domain1").prop("disabled",true)){
                $("#domain1").prop("disabled",false)
            }
            if($("#domain2").prop("disabled",true)){
                $("#domain2").prop("disabled",false)
            }
            if($("#domain3").prop("disabled",true)){
                $("#domain3").prop("disabled",false)
            }
            if($("#domain4").prop("disabled",true)){
                $("#domain4").prop("disabled",false)
            }
            if($("#domain5").prop("disabled",true)){
                $("#domain5").prop("disabled",false)
            }
            $("button[type=submit]").prop( "disabled", true );
            $(this).serializeArray().map(function (x) {
                jsonData[x.name] = x.value;
            });
            console.log(jsonData);
            $.ajax({
                type: "post",
                url: "../backend/index.php?action=uploadUserDomains",
                data: {
                data: JSON.stringify(jsonData)
                },
                success: function (response) {
                    $("button[type=submit]").prop( "disabled", false );
                    console.log(response)     
                    if(response.status==="OK"){
                        Swal.fire('Success','Your domain names have been successfully uploaded.','success');
                        if($("#domain1").val()!=""){
                            $("#domain1").prop("disabled",true)
                        }
                        if($("#domain2").val()!=""){
                            $("#domain2").prop("disabled",true)
                        }
                        if($("#domain3").val()!=""){
                            $("#domain3").prop("disabled",true)
                        }
                        if($("#domain4").val()!=""){
                            $("#domain4").prop("disabled",true)
                        }
                        if($("#domain5").val()!=""){
                            $("#domain5").prop("disabled",true)
                        }
                    }
                    if(response.status=="DOMAIN EXISTS"){
                        Swal.fire('Error','This domain already exists in another account. Please choose another domain.','error');
                    }
                }, error: function(x){
                    $("button[type=submit]").prop( "disabled", false );
                    if($("#domain1").val()!=""){
                        $("#domain1").prop("disabled",true)
                    }
                    if($("#domain2").val()!=""){
                        $("#domain2").prop("disabled",true)
                    }
                    if($("#domain3").val()!=""){
                        $("#domain3").prop("disabled",true)
                    }
                    if($("#domain4").val()!=""){
                        $("#domain4").prop("disabled",true)
                    }
                    if($("#domain5").val()!=""){
                        $("#domain5").prop("disabled",true)
                    }
                }
            });
        });
    }

function getUserDomains(){
    $.ajax({
        type: "post",
        url: "../backend/index.php?action=getUserDomains",
        data: {
          data: JSON.stringify(jsonData)
        },
        success: function (response) {
        console.log(response)     
            if(response.status==="OK"){
                var self = response.domains;
                $("#domain1").val(self.domain1);
                $("#domain2").val(self.domain2);
                $("#domain3").val(self.domain3);
                $("#domain4").val(self.domain4);
                $("#domain5").val(self.domain5);
                if($("#domain1").val()!=""){
                    $("#domain1").prop("disabled",true)
                }
                if($("#domain2").val()!=""){
                    $("#domain2").prop("disabled",true)
                }
                if($("#domain3").val()!=""){
                    $("#domain3").prop("disabled",true)
                }
                if($("#domain4").val()!=""){
                    $("#domain4").prop("disabled",true)
                }
                if($("#domain5").val()!=""){
                    $("#domain5").prop("disabled",true)
                }
                for(i=1;i<6;i++){
                    old_domain_array.push(self.domain+i)
                }
                console.log(old_domain_array)
            }
        }
    });
    deleteDomain()
}

function getUserDetails() {
    $.ajax({
      type: "post",
      url: "../backend/index.php?action=getUserDetails",
      data: {
        data: JSON.stringify(dummyJson)
      },
      success: function (response) {
        console.log(response);
        if(response.status == "OK"){
          var self = response.users;
          jsonData["userid"] = self.userid
          document.title += " "+self.firstname+" "+self.lastname;
            if(self.group_type === "PRO_YEARLY" || self.group_type === "PRO_MONTHLY"){
                $(".domains").append(`
                <label for="domain2" class="domain_label2">2. Domain</label>
                            <div class="row">
                                <div class="col-4 col-sm-3 select_wrapper">
                                      <select class="form-control select_protocol">
                                        <option>https://</option>
                                        <option>http://</option>
                                      </select>
                                  </div>
                                  <div class="col-8 col-sm-9 domain_name_wrapper">
                                    <input class="form-control" id="domain2" aria-describedby="domain2" name="domain2"
                                        placeholder="Domain Name" /><button class="btn btn-danger delete_domain" type="button" id="domain2_delete">Delete</button>
                                </div>
                            </div>
                        </div>
                <div class="col-12" id="more_domains">
                    <h6>Upgrade to Super PRO to add more domains!</h6>
                </div>
                <button type="submit" class="btn btn-primary submit_button">Submit</button>`);
                getUserDomains();
            }else if(self.group_type === "SUPER_PRO_YEARLY" || self.group_type === "SUPER_PRO_MONTHLY"){
                $(".domains").append(`
                <label for="domain2" class="domain_label2">2. Domain</label>
                            <div class="row">
                                <div class="col-4 col-sm-3 select_wrapper">
                                      <select class="form-control select_protocol">
                                        <option>https://</option>
                                        <option>http://</option>
                                      </select>
                                  </div>
                                  <div class="col-8 col-sm-9 domain_name_wrapper">
                                    <input class="form-control" id="domain2" aria-describedby="domain2" name="domain2"
                                        placeholder="Domain Name" /><button class="btn btn-danger delete_domain" type="button" id="domain2_delete">Delete</button>
                                </div>
                            </div>
                        </div>
                        <label for="domain3" class="domain_label3">3. Domain</label>
                        <div class="row">
                            <div class="col-4 col-sm-3 select_wrapper">
                                  <select class="form-control select_protocol">
                                    <option>https://</option>
                                    <option>http://</option>
                                  </select>
                              </div>
                              <div class="col-8 col-sm-9 domain_name_wrapper">
                                <input class="form-control" id="domain3" aria-describedby="domain3" name="domain3"
                                    placeholder="Domain Name" /><button class="btn btn-danger delete_domain" type="button" id="domain3_delete">Delete</button>
                            </div>
                        </div>
                    </div>
                    <label for="domain4" class="domain_label4">4. Domain</label>
                    <div class="row">
                        <div class="col-4 col-sm-3 select_wrapper">
                              <select class="form-control select_protocol">
                                <option>https://</option>
                                <option>http://</option>
                              </select>
                          </div>
                          <div class="col-8 col-sm-9 domain_name_wrapper">
                            <input class="form-control" id="domain4" aria-describedby="domain4" name="domain4"
                                placeholder="Domain Name" /><button class="btn btn-danger delete_domain" type="button" id="domain4_delete">Delete</button>
                        </div>
                    </div>
                </div>
                <label for="domain5" class="domain_label5">5. Domain</label>
                            <div class="row">
                                <div class="col-4 col-sm-3 select_wrapper">
                                      <select class="form-control select_protocol">
                                        <option>https://</option>
                                        <option>http://</option>
                                      </select>
                                  </div>
                                  <div class="col-8 col-sm-9 domain_name_wrapper">
                                    <input class="form-control" id="domain5" aria-describedby="domain5" name="domain5"
                                        placeholder="Domain Name" /><button class="btn btn-danger delete_domain" type="button" id="domain5_delete">Delete</button>
                                </div>
                            </div>
                        </div>
                <button type="submit" class="btn btn-primary submit_button">Submit</button>`);
                getUserDomains();
            }else{
                $(".domains").append(`
                <div class="col-12" id="more_domains">
                    <h6>Upgrade to PRO to add more domains!</h6>
                </div>
                <button type="submit" class="btn btn-primary submit_button">Submit</button>`);
                getUserDomains();
            }

            if(self.newsletter==0){
                $(".domains_card").prepend(`
                    <div class="settings_inner" id="subscribe_newsletter_container">
                        <h3>Subscribe to receive the newsletter of new software releases and software updates.</h3>
                        <hr>
                        <div class="form-group ta-center">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="receive_newsletter">
                                <label class="custom-control-label newsletter_label" for="receive_newsletter">Subscribe</label>
                            </div>
                            <div><button type="button" class="btn btn-primary submit_newsletter">Submit</button></div>
                        </div>
                    </div>
                `)
            }
        }
        newsletterStatusChange()
      }
    });
}

function deleteDomain(){
    $(".delete_domain").click(function(){
        jsonData["domain_name"]=$(this).attr("id").replace("_delete","")
        var real_domain = $(this).parent().find("input").val()
        Swal.fire({
            title: "Are you sure, you want to delete this domain?",
            icon: 'info',
            html: "All your projects linked to this domain will be deleted.",
            showCloseButton: true,
            showCancelButton: true,
            showConfirmButton: true,
            focusConfirm: true,
            focusClose:false,
            customClass: {
              content: 'swalContent',
              confirmButton: 'swalDeleteYes'
            },
            confirmButtonText:
              'Yes',
            cancelButtonText:
              'No'
          });
          $(".swalDeleteYes").click(function(){
        $.ajax({
            type: "post",
            url: "../backend/index.php?action=deleteDomain",
            data: {
              data: JSON.stringify(jsonData)
            },
            success: function (response) {
            console.log(response)
                if(response.status==="OK"){
                    jsonData["domain_name"] = real_domain
                    window.parent.$.ajax({
                        type: "post",
                        url:"../backend/bug_report_tool.php?action=deleteBugReportSetup",
                        data: {
                        data: JSON.stringify(jsonData)
                        },
                        success: function (response) {
                        console.log(response)     
                            if(response.status==="OK"){
                                Swal.fire('Success','This domain names have been successfully deleted.','success');
                                $(".swal2-confirm").click(function(e){
                                    location.reload()
                                })
                                }
                            }
                        })
                    }
                }, error: function(x){
                    console.log(x)
                }
            })
        })
    })
}

function originExists(){
    if(window.location.href.split("=")[1]=="tool"){
        $(".copy_privacy_text").before(`<img class="copy_snippet_img" src="/assets/copy_snippet.png"></img>`)
        $(".code_text").css("margin-bottom","0px")
        $(".copy_snippet_img").css({
            "float": "right",
            "padding-right": "20px",
            "width": "180px"
        })
    }
}

function newsletterStatusChange(){
    $(".submit_newsletter").click(function(e){
        jsonData["newsletter"]=$("#receive_newsletter").prop("checked")
        $.ajax({
            type: "post",
            url: "../backend/index.php?action=changeNewsletterSubscription",
            data: {
              data: JSON.stringify(jsonData)
            },
            success: function (response) {
            console.log(response)     
                if(response.status==="OK"){
                    Swal.fire("Success","You have successfully subscribed to our newsletter!","success")
                }
                $("#subscribe_newsletter_container").remove()
            }
        })
    })
}