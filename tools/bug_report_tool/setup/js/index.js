var dummyJson = {};
dummyJson["dummy"] = "dummy";
var jsonData = {}
var user_group = "";
var user_email;
var reportDataTable
var member_count=1;
var all_domain_reports = {}
$(document).ready(function () {
    checkUserGroup()
    $("#new_project_btn").click(function(){
        createNewProject();
    })
    addSnippetClickListener()
    colorChangeListener("#colorpicker_btn","#colorpicker_choose")
    colorChangeListener("#colorpicker_btn_text","#colorpicker_choose_text")
    colorChangeListener("#colorpicker_btn_border","#colorpicker_choose_border")
    showLanguageSettings()
    getExistingBugReportDomains()
    displayTeamMemberAccess()
    displayEmailSettings()
    setEmailSending()
    getEmailSendingOption()
});

var userid,domain_name,button_color,button_text_color,button_border_color,button_position,modal_box_position,button_border,comment_field,comment_required,name_field,name_required,email_field,email_required,branding,main_button,title,text,button1_text,button2_text

function addSnippetClickListener(){
    $(".add_snippet").click(function(e){
        e.preventDefault()
        window.top.location.href="https://websoft365.com/settings.php?origin=tool"
    })
}

function createNewProject(){
        $("#project_modal_title").html("Create new project")
        var userid = String(document.location.href.split("userid=")[1])
        window.parent.$.ajax({
            type: "post",
            url: "../../../backend/index.php?action=getUserDomains",
            data: {
              data: `{"userid":${userid}}`
            },
            success: function (response) {
            console.log(response)     
                if(response.status==="OK"){
                    var self = response.domains;
                    var domainArray = Object.keys(self).map(function(key){return self[key]}).filter(x=>x!="")
                    console.log(domainArray)
                    $("#domainName option").remove()
                    var bugReportDomains = []
                    $(".edit_project_element").each(function(e){
                        bugReportDomains[e]=$(this).find("h6").html()
                    })
                    $(domainArray).each(function(e){
                        if(!bugReportDomains.includes(domainArray[e])){
                            $("#domainName").append(`<option value="${domainArray[e]}">${domainArray[e]}</option>`)
                        }
                    })
                    displayModal("new_project_modal")
                    settingChangeListener()
                    $(".settings_element, #domainName").on("change",function(){
                        settingChangeListener()
                    })
                    if($("#domainName").html()==""||!$("#domainName").html()){
                        $("#save_settings").prop("disabled",true)
                        $(".close_new_project").click(function(){
                            $("#new_project_modal").css({
                                "display":"none"
                            })
                        })
                        $("#domainName").css("display","none")
                        $(".domainNameDropdownContainer").html(`<img id="add_new_domain_image" src="/assets/add_new_domain.png"></img>`)
                    }else{
                        $("#domainName").css("display","block")
                        $("#add_new_domain_image").remove()
                        $("#save_settings").prop("disabled",false)
                        modalCloseListener("new_project_modal")
                        $("#save_settings").click(function(){
                            uploadBugReportSettings()
                        })
                        checkGroupType()
                    }
                }
            }
        })
}

    function displayModal(modal){
    var modal = document.getElementById(modal);
    modal.style.display = "block";
    }

    function modalCloseListener(modal){
          displayNewProjectCloseMessage()
    }

    function colorChangeListener(from,to){
        $(from).on("change",function(){
            var bckgrnd_color= $(from).css("background-color")
            $(to).css("background-color",bckgrnd_color)
        })
    }

    function checkGroupType(){
        var userid = String(document.location.href.split("userid=")[1])
            window.parent.$.ajax({
                type: "post",
                url: "../../../backend/index.php?action=getUserDetailsById",
                data: {
                  data: `{"userid":${userid}}`
                },
                success: function (response) {
                console.log(response)     
                    if(response.status==="OK"){
                        var user = response.users
                        if(user.group_type=="FREE"){
                            $('#branding, #edit_branding').change(function() {
                                if(!$(this).prop('checked')){
                                    Swal.fire('Error','Only PRO members can turn off the Branding option!','error');
                                    $(this).bootstrapToggle('on')
                                }
                              })
                        }else{
                            $('#branding').bootstrapToggle('off')
                        }
                    }
                }
            })
    }

    function showLanguageSettings(){
        $("#open-close-lsettings").click(function(){
            if($("#collapseOne").hasClass("display-block")){
                $("#collapseOne").removeClass("display-block")
                $("#settings_wrapper").removeClass("settings_wrapper2")
                $("#settings_wrapper").addClass("settings_wrapper")
            }else{
                $("#collapseOne").addClass("display-block")
                $("#settings_wrapper").removeClass("settings_wrapper")
                $("#settings_wrapper").addClass("settings_wrapper2")
            }
        })
    }

    function showEditLanguageSettings(){
        $("#open-close-lsettings2").click(function(){
            if($("#collapseOne2").hasClass("display-block")){
                $("#collapseOne2").removeClass("display-block")
                $(".settings_wrapper2").addClass("settings_wrapper")
                $(".settings_wrapper2").removeClass("settings_wrapper2")
            }else{
                $("#collapseOne2").addClass("display-block")
                $(".settings_wrapper").addClass("settings_wrapper2")
                $(".settings_wrapper").removeClass("settings_wrapper")
            }
        })
    }

    function settingChangeListener(){
            domain_name = $("#domainName").val()
            button_color = strToNumRgb($("#colorpicker_choose").css("background-color").replace("rgb","").replace("(","").replace(")","").replace("#",""))
            button_text_color = strToNumRgb($("#colorpicker_choose_text").css("background-color").replace("rgb","").replace("(","").replace(")","").replace("#",""))
            button_border_color = strToNumRgb($("#colorpicker_choose_border").css("background-color").replace("rgb","").replace("(","").replace(")","").replace("#",""))
            button_position = $("#buttonPosition").val()
            modal_box_position = $("#modalPosition").val()
            editor_bar_position = $("#editorPosition").val()
            hide_button_mobile = !$("#hide_button_mobile").parent().hasClass("off")
            button_border = !$("#button_border").parent().hasClass("off")
            comment_field = !$("#comment_field_cbx").parent().hasClass("off")
            comment_required = !$("#comment_req_cbx").parent().hasClass("off")
            name_field = !$("#name_field_cbx").parent().hasClass("off")
            name_required = !$("#name_req_cbx").parent().hasClass("off")
            email_field = !$("#email_field_cbx").parent().hasClass("off")
            email_required = !$("#email_req_cbx").parent().hasClass("off")
            branding = !$("#branding").parent().hasClass("off")
            main_button = $("#report_modal_main_button").val().replace(/ /g,"_").replace("?","x63")
            title = $("#report_modal_title").val().replace(/ /g,"_").replace("?","x63")
            text = $("#report_modal_text").val().replace(/ /g,"_").replace("?","x63")
            button1_text = $("#report_modal_button_1").val().replace(/ /g,"_").replace("?","x63")
            button2_text = $("#report_modal_button_2").val().replace(/ /g,"_").replace("?","x63")
            userid = String(document.location.href.split("userid=")[1])
            var iframe_link = $("#bug_report_iframe").attr("src").split("?")[0]
            $("#bug_report_iframe").attr("src",iframe_link+
            "?colorpicker_btn="+button_color+
            "&colorpicker_btn_text="+button_text_color+
            "&colorpicker_btn_border="+button_border_color+
            "&buttonPosition="+button_position+
            "&modalPosition="+modal_box_position+
            "&editor_bar_position="+editor_bar_position+
            "&hide_button_mobile="+hide_button_mobile+
            "&button_border="+button_border+
            "&comment_field="+comment_field+
            "&comment_required="+comment_required+
            "&name_field="+name_field+
            "&name_required="+name_required+
            "&email_field="+email_field+
            "&email_required="+email_required+
            "&branding="+branding+
            "&report_modal_main_button="+main_button+
            "&report_modal_title="+title+
            "&report_modal_text="+text+
            "&report_modal_button_1="+button1_text+
            "&report_modal_button_2="+button2_text+
            "&domain_name="+domain_name+
            "&userid="+userid
            )
            document.getElementById("bug_report_iframe").contentDocument.location.reload(true);
    }
    function uploadBugReportSettings(){
            jsonData["userid"]=String(document.location.href.split("userid=")[1])
            jsonData["domain_name"]=$("#domainName").val()
            jsonData["button_color"]=button_color
            jsonData["button_text_color"]=button_text_color
            jsonData["button_border_color"]=button_border_color
            jsonData["button_position"]=button_position
            jsonData["modal_box_position"]=modal_box_position
            jsonData["editor_bar_position"]=editor_bar_position
            jsonData["hide_button_mobile"]=hide_button_mobile
            jsonData["button_border"]=button_border
            jsonData["comment_field"]=comment_field
            jsonData["comment_required"]=comment_required
            jsonData["name_field"]=name_field
            jsonData["name_required"]=name_required
            jsonData["email_field"]=email_field
            jsonData["email_required"]=email_required
            jsonData["branding"]=branding
            jsonData["main_button"]=main_button
            jsonData["title"]=title
            jsonData["text"]=text
            jsonData["button1_text"]=button1_text
            jsonData["button2_text"]=button2_text
            window.parent.$.ajax({
                type: "post",
                url: "../../../backend/bug_report_tool.php?action=uploadBugReportSettings",
                data: {
                data: JSON.stringify(jsonData)
                },
                success: function (response) {
                console.log(response)
                    if(response.status==="OK"){
                        Swal.fire({
                            title: "Success",
                            icon: 'success',
                            html: "Settings have been successfully saved.",
                            showCloseButton: true,
                            showCancelButton: false,
                            showConfirmButton: true,
                            focusConfirm: true,
                            focusClose:false,
                            customClass: {
                              content: 'swalContent',
                              confirmButton: 'swalCloseModal',
                              closeButton: 'swalCloseModal'
                            },
                            confirmButtonText:
                              'Yes',
                            cancelButtonText:
                              'No'
                          });
                          $(".swalCloseModal").click(function(){
                            window.location.reload()
                            $("#new_project_modal").css({
                                "display":"none"
                            })
                            var bugReportDomains = []
                            $(".edit_project_element").each(function(e){
                                bugReportDomains[e]=$(this).find("h6").html()
                            })
                            if(!bugReportDomains.includes($("#domainName").val())){
                                $("#edit_project_ul").append(`<li class="list-group-item edit_project_element" domain='${jsonData["domain_name"]}'><h6 class="edit_project_element_text" style="float: left;">${jsonData["domain_name"]}</h6><div style="float: right;"><button type="button" class="btn btn-primary btn-sm edit_setup">Edit</button><button type="button" class="btn btn-warning btn-sm status_setup" style=" margin-left:5px;" id="${jsonData["domain_name"].replace(".","_")}_status">Pause</button><button type="button" class="btn btn-danger btn-sm delete_setup" style=" margin-left:5px;">Delete</button></div></li>`)
                            }
                            deleteSetup()
                            changeDomainStatus()
                            $(".edit_setup").click(function(){
                                var domain_name=$(this).parent().parent().attr("domain")
                                getBugReportSettings(domain_name)
                                $("#editDomainName option").remove()
                                $("#editDomainName").html(`<option value="${domain_name}">${domain_name}</option>`)
                                $( "#editDomainName" ).prop( "disabled", true );
                            })
                        })
                    }
                }
            })
    }

    function getBugReportSettings(domain_name){
        jsonData["domain_name"]=domain_name
            window.parent.$.ajax({
                type: "post",
                url: "../../../backend/bug_report_tool.php?action=getBugReportSettings",
                data: {
                  data: JSON.stringify(jsonData)
                },
                success: function (response) {
                console.log(response)     
                    if(response.status==="OK"){
                        var el = response.settings
                        if(el.branding!="0"){
                            $('#edit_branding').bootstrapToggle('on')
                        }else{
                            $('#edit_branding').bootstrapToggle('off')
                        }

                        if(el.comment_field!="0"){
                            $("#edit_comment_field_cbx").bootstrapToggle('on')
                        }else{
                            $("#edit_comment_field_cbx").bootstrapToggle('off')
                        }

                        if(el.comment_required!="0"){
                            $("#edit_comment_req_cbx").bootstrapToggle('on')
                        }else{
                            $("#edit_comment_req_cbx").bootstrapToggle('off')
                        }

                        if(el.name_field!="0"){
                            $("#edit_name_field_cbx").bootstrapToggle('on')
                        }else{
                            $("#edit_name_field_cbx").bootstrapToggle('off')
                        }

                        if(el.name_required!="0"){
                            $("#edit_name_req_cbx").bootstrapToggle('on')
                        }else{
                            $("#edit_name_req_cbx").bootstrapToggle('off')
                        }

                        if(el.email_field!="0"){
                            $("#edit_email_field_cbx").bootstrapToggle('on')
                        }else{
                            $("#edit_email_field_cbx").bootstrapToggle('off')
                        }

                        if(el.email_required!="0"){
                            $("#edit_email_req_cbx").bootstrapToggle('on')
                        }else{
                            $("#edit_email_req_cbx").bootstrapToggle('off')
                        }

                        if(el.hide_button_mobile!="0"){
                            $("#edit_hide_button_mobile").bootstrapToggle('on')
                        }else{
                            $("#edit_hide_button_mobile").bootstrapToggle('off')
                        }

                        if(el.button_border!="0"){
                            $("#edit_button_border").bootstrapToggle('on')
                        }else{
                            $("#edit_button_border").bootstrapToggle('off')
                        }
                        
                        $("#edit_report_modal_main_button").val(el.main_button.replace(/_/g," ").replace("x63","?"))
                        $("#edit_report_modal_title").val(el.title.replace(/_/g," ").replace("x63","?"))
                        $("#edit_report_modal_text").val(el.text.replace(/_/g," ").replace("x63","?"))
                        $("#edit_report_modal_button_1").val(el.button1_text.replace(/_/g," ").replace("x63","?"))
                        $("#edit_report_modal_button_2").val(el.button2_text.replace(/_/g," ").replace("x63","?"))

                        $("#edit_buttonPosition").val(el.button_position)
                        $("#edit_modalPosition").val(el.modal_box_position)
                        console.log(el.button_color+""+el.button_border_color+""+el.button_text_color)
                        $("#edit_colorpicker_choose").css("background-color",el.button_color)
                        $("#edit_colorpicker_choose_text").css("background-color",el.button_text_color)
                        $("#edit_colorpicker_choose_border").css("background-color",el.button_border_color)
                    }
                    editSettingChangeListener()
                    checkGroupType()
                }, error: function(x){
                    console.log(x)
                }
            })
        }

        function displayNewProjectCloseMessage(){
            $(".close_new_project").click(function(){
                if($("#domainName").val()){
                    Swal.fire({
                        title: "You didn't save your project! Would you like to save it now?",
                        icon: 'info',
                        html: "",
                        showCloseButton: true,
                        showCancelButton: true,
                        showConfirmButton: true,
                        focusConfirm: true,
                        focusClose:false,
                        customClass: {
                        content: 'swalContent',
                        confirmButton: 'swalCloseYes',
                        cancelButton: 'swalCloseNo'
                        },
                        confirmButtonText:
                        'Yes',
                        cancelButtonText:
                        'No'
                    });
                    $(".swalCloseYes").click(function(){
                        uploadBugReportSettings()
                    })
                    $(".swalCloseNo").click(function(){
                        $("#new_project_modal").css({
                            "display":"none"
                        })
                    })
                }else{
                    $("#new_project_modal").css({
                        "display":"none"
                    })
                }
            })
        }
        function getExistingBugReportDomains(){
            jsonData["userid"]=String(document.location.href.split("userid=")[1])
            window.parent.$.ajax({
                type: "post",
                url: "../../../backend/bug_report_tool.php?action=getExistingBugReportDomains",
                data: {
                  data: JSON.stringify(jsonData)
                },
                success: function (response) {
                console.log(response)     
                    if(response.status==="OK"){
                        var domain_counter=1;
                        $(response.bug_report_domains).each(function(e){
                            if(response.bug_report_domains[e].active==1){
                                $("#edit_project_ul").append(`<li class="list-group-item edit_project_element" domain="${response.bug_report_domains[e].domain_name}"><h6 class="edit_project_element_text"  style="float: left;">${response.bug_report_domains[e].domain_name}</h6><div style="float: right;"><button type="button" class="btn btn-primary btn-sm edit_setup">Edit</button><button type="button" class="btn btn-warning btn-sm status_setup" style=" margin-left:5px;" id="${response.bug_report_domains[e].domain_name.replace(".","_")}_status">Pause</button><button type="button" class="btn btn-danger btn-sm delete_setup" style=" margin-left:5px;">Delete</button></div></li>`)
                                $(".report_email_domain_list").append(`<li class="report_email_li" domain='${response.bug_report_domains[e].domain_name}'><input class="email_domain_checkbox" domain_count="domain${domain_counter}" type="checkbox"><h6>${response.bug_report_domains[e].domain_name}</h6></li>`)
                            }else{
                                $("#edit_project_ul").append(`<li class="list-group-item edit_project_element" domain="${response.bug_report_domains[e].domain_name}"><h6 class="edit_project_element_text"  style="float: left;">${response.bug_report_domains[e].domain_name}</h6><div style="float: right;"><button type="button" class="btn btn-primary btn-sm edit_setup">Edit</button><button type="button" class="btn btn-success btn-sm status_setup" style="margin-left:5px;" id="${response.bug_report_domains[e].domain_name.replace(".","_")}_status">Start</button><button type="button" class="btn btn-danger btn-sm delete_setup"  style=" margin-left:5px;">Delete</button></div></li>`)
                                $(".report_email_domain_list").append(`<li class="report_email_li" domain='${response.bug_report_domains[e].domain_name}'><input class="email_domain_checkbox" domain_count="domain${domain_counter}" type="checkbox"><h6>${response.bug_report_domains[e].domain_name}</h6></li>`)
                            }
                            domain_counter++
                            displayBugReports(response.bug_report_domains[e].domain_name)
                        })
                        changeDomainStatus()
                        deleteSetup()
                        $(".edit_setup").off("click")
                        $(".edit_setup").click(function(){
                            displayModal("edit_project_modal")
                            modalEditCloseListener("edit_project_modal")
                            var domain_name=$(this).parent().parent().attr("domain")
                            getBugReportSettings(domain_name)
                            $("#editDomainName option").remove()
                            $("#editDomainName").html(`<option value="${domain_name}">${domain_name}</option>`)
                            $("#editDomainName").prop( "disabled", true );
                            editProject()
                        })
                        colorChangeListener("#edit_colorpicker_btn","#edit_colorpicker_choose")
                        colorChangeListener("#edit_colorpicker_btn_text","#edit_colorpicker_choose_text")
                        colorChangeListener("#edit_colorpicker_btn_border","#edit_colorpicker_choose_border")
                    }
                }, error: function (x){
                    console.log(x)
                }
            })
        }

        function changeDomainStatus(){
            $(".status_setup").click(function(){
                var newButton
                var buttonId = $(this).attr("id")
                console.log(buttonId)
                jsonData["domain_name"]=$(this).parent().parent().attr("domain")
                if($(this).html()=="Start"){
                    jsonData["active"]=1
                }else{
                    jsonData["active"]=0
                }
                window.parent.$.ajax({
                    type: "post",
                    url:"../../../backend/bug_report_tool.php?action=changeBugReportDomainStatus",
                    data: {
                      data: JSON.stringify(jsonData)
                    },
                    success: function (response) {
                    console.log(response)     
                        if(response.status==="OK"){
                            if(jsonData["active"]==0){
                                $("#"+buttonId).html("Start")
                                $("#"+buttonId).removeClass("btn-warning")
                                $("#"+buttonId).addClass("btn-success")
                            }else{
                                $("#"+buttonId).html("Pause")
                                $("#"+buttonId).removeClass("btn-success")
                                $("#"+buttonId).addClass("btn-warning")
                            }
                        }
                    }
                })
            })
        }

        function deleteSetup(){
            $(".delete_setup").click(function(){
                jsonData["domain_name"]=$(this).parent().parent().attr("domain")
                Swal.fire({
                    title: "Are you sure you want to delete this project?",
                    icon: 'info',
                    html: "",
                    showCloseButton: true,
                    showCancelButton: true,
                    showConfirmButton: true,
                    focusConfirm: true,
                    focusClose:false,
                    customClass: {
                    content: 'swalContent',
                    confirmButton: 'swalDeleteDomainConfirm'
                    },
                    confirmButtonText:
                    'Yes',
                    cancelButtonText:
                    'No'
                });
                $(".swalDeleteDomainConfirm").click(function(){
                    window.parent.$.ajax({
                        type: "post",
                        url:"../../../backend/bug_report_tool.php?action=deleteBugReportSetup",
                        data: {
                        data: JSON.stringify(jsonData)
                        },
                        success: function (response) {
                        console.log(response)     
                            if(response.status==="OK"){
                                Swal.fire({
                                    title: "Success",
                                    icon: 'success',
                                    html: "Domain successfully deleted.",
                                    showCloseButton: true,
                                    showCancelButton: false,
                                    showConfirmButton: true,
                                    focusConfirm: true,
                                    focusClose:false,
                                    customClass: {
                                    content: 'swalContent',
                                    confirmButton: 'swalDeleteRefresh'
                                    },
                                    confirmButtonText:
                                    'OK',
                                });
                                $(".swalDeleteRefresh").click(function(){
                                    window.location.reload()
                                })
                                $(`li[domain="${jsonData["domain_name"]}"]`).remove()
                            }
                        }, error: function(x){
                            console.log(x)
                        }
                    })
                })
            })
        }

        function editProject(){
                editSettingChangeListener()
                showEditLanguageSettings()
                $(".edit_settings_element").on("change",function(){
                    editSettingChangeListener()
                })
                $("#edit_save_settings").off("click")
                $("#edit_save_settings").click(function(){
                    uploadEditBugReportSettings()
                })
        }

        function modalEditCloseListener(modal){
            displayEditProjectCloseMessage()
        }

        function uploadEditBugReportSettings(){
            jsonData["userid"]=String(document.location.href.split("userid=")[1])
            jsonData["domain_name"]=$("#editDomainName").val()
            jsonData["button_color"]=button_color
            jsonData["button_text_color"]=button_text_color
            jsonData["button_border_color"]=button_border_color
            jsonData["button_position"]=button_position
            jsonData["modal_box_position"]=modal_box_position
            jsonData["editor_bar_position"]=editor_bar_position
            jsonData["hide_button_mobile"]=hide_button_mobile
            jsonData["button_border"]=button_border
            jsonData["comment_field"]=comment_field
            jsonData["comment_required"]=comment_required
            jsonData["name_field"]=name_field
            jsonData["name_required"]=name_required
            jsonData["email_field"]=email_field
            jsonData["email_required"]=email_required
            jsonData["branding"]=branding
            jsonData["main_button"]=main_button
            jsonData["title"]=title
            jsonData["text"]=text
            jsonData["button1_text"]=button1_text
            jsonData["button2_text"]=button2_text
            window.parent.$.ajax({
                type: "post",
                url:"../../../backend/bug_report_tool.php?action=uploadBugReportSettings",
                data: {
                data: JSON.stringify(jsonData)
                },
                success: function (response) {
                console.log(response)
                    if(response.status==="OK"){
                        Swal.fire({
                            title: "Success",
                            icon: 'success',
                            html: "Settings have been successfully saved.",
                            showCloseButton: true,
                            showCancelButton: false,
                            showConfirmButton: true,
                            focusConfirm: true,
                            focusClose:false,
                            customClass: {
                              content: 'swalContent',
                              confirmButton: 'swalCloseEditModal',
                              closeButton: 'swalCloseEditModal'
                            },
                            confirmButtonText:
                              'Yes',
                            cancelButtonText:
                              'No'
                          });
                          $(".swalCloseEditModal").click(function(){
                            window.location.reload()
                            $("#edit_project_modal").css({
                                "display":"none"
                            })
                        })
                    }
                }
            })
    }

        function displayEditProjectCloseMessage(){
            $(".close_edit_project").click(function(){
                if($("#editDomainName").val()){
                    Swal.fire({
                        title: "You didn't save your changes! Would you like to save them now?",
                        icon: 'info',
                        html: "",
                        showCloseButton: true,
                        showCancelButton: true,
                        showConfirmButton: true,
                        focusConfirm: true,
                        focusClose:false,
                        customClass: {
                        content: 'swalContent',
                        confirmButton: 'swalCloseYesEdit',
                        cancelButton: 'swalCloseNoEdit'
                        },
                        confirmButtonText:
                        'Yes',
                        cancelButtonText:
                        'No'
                    });
                    $(".swalCloseYesEdit").click(function(){
                        uploadEditBugReportSettings()
                    })
                    $(".swalCloseNoEdit").click(function(){
                        window.location.reload()
                        $("#edit_project_modal").css({
                            "display":"none"
                        })
                    })
                }else{
                    $("#edit_project_modal").css({
                        "display":"none"
                    })
                }
            })
        }

        function editSettingChangeListener(){
            domain_name = $("#editDomainName").val()
            button_color = strToNumRgb($("#edit_colorpicker_choose").css("background-color").replace("rgb","").replace("(","").replace(")","").replace("#",""))
            button_text_color = strToNumRgb($("#edit_colorpicker_choose_text").css("background-color").replace("rgb","").replace("(","").replace(")","").replace("#",""))
            button_border_color = strToNumRgb($("#edit_colorpicker_choose_border").css("background-color").replace("rgb","").replace("(","").replace(")","").replace("#",""))
            button_position = $("#edit_buttonPosition").val()
            modal_box_position = $("#edit_modalPosition").val()
            editor_bar_position = $("#edit_editorPosition").val()
            hide_button_mobile = !$("#edit_hide_button_mobile").parent().hasClass("off")
            button_border = !$("#edit_button_border").parent().hasClass("off")
            comment_field = !$("#edit_comment_field_cbx").parent().hasClass("off")
            comment_required = !$("#edit_comment_req_cbx").parent().hasClass("off")
            name_field = !$("#edit_name_field_cbx").parent().hasClass("off")
            name_required = !$("#edit_name_req_cbx").parent().hasClass("off")
            email_field = !$("#edit_email_field_cbx").parent().hasClass("off")
            email_required = !$("#edit_email_req_cbx").parent().hasClass("off")
            branding = !$("#edit_branding").parent().hasClass("off")
            main_button = $("#edit_report_modal_main_button").val().replace(/ /g,"_").replace("?","x63")
            title = $("#edit_report_modal_title").val().replace(/ /g,"_").replace("?","x63")
            text = $("#edit_report_modal_text").val().replace(/ /g,"_").replace("?","x63")
            button1_text = $("#edit_report_modal_button_1").val().replace(/ /g,"_").replace("?","x63")
            button2_text = $("#edit_report_modal_button_2").val().replace(/ /g,"_").replace("?","x63")
            var iframe_link = $("#edit_bug_report_iframe").attr("src").split("?")[0]
            userid = String(document.location.href.split("userid=")[1])
            $("#edit_bug_report_iframe").attr("src",iframe_link+
            "?colorpicker_btn="+button_color+
            "&colorpicker_btn_text="+button_text_color+
            "&colorpicker_btn_border="+button_border_color+
            "&buttonPosition="+button_position+
            "&modalPosition="+modal_box_position+
            "&editor_bar_position="+editor_bar_position+
            "&hide_button_mobile="+hide_button_mobile+
            "&button_border="+button_border+
            "&comment_field="+comment_field+
            "&comment_required="+comment_required+
            "&name_field="+name_field+
            "&name_required="+name_required+
            "&email_field="+email_field+
            "&email_required="+email_required+
            "&branding="+branding+
            "&report_modal_main_button="+main_button+
            "&report_modal_title="+title+
            "&report_modal_text="+text+
            "&report_modal_button_1="+button1_text+
            "&report_modal_button_2="+button2_text+
            "&domain_name="+domain_name+
            "&userid="+userid
            )
            document.getElementById("edit_bug_report_iframe").contentDocument.location.reload(true);
    }

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      }
      
      function rgbToHex(r, g, b) {
        return componentToHex(r) + componentToHex(g) + componentToHex(b);
      }

      function strToNumRgb(rgb_string){
        var a = parseInt(rgb_string.split(",")[0].replace(" ",""))
        var b = parseInt(rgb_string.split(",")[1].replace(" ",""))
        var c = parseInt(rgb_string.split(",")[2].replace(" ",""))
        return rgbToHex(a,b,c)
      }

      function displayBugReports(domain_name){
        jsonData["domain_name"] = domain_name
        window.parent.$.ajax({
            type: "post",
            url:"../../../backend/bug_report_tool.php?action=getBugReportByDomainName",
            data: {
              data: JSON.stringify(jsonData)
            },
            success: function (response) {
            console.log(response)     
                if(response.status==="OK"){
                    var self = response.bug_reports
                    var domain_name_list=[]
                    var sortedSelf = self.sort((a,b) => (a.domain_name > b.domain_name) ? 1 : ((b.domain_name > a.domain_name) ? -1 : 0))
                    var open_count=0;
                    var closed_count=0;
                    var in_progress_count=0;
                    var resolved_count=0;
                    $(sortedSelf).each(function(e){
                        if(e!=sortedSelf.length){
                            if(sortedSelf[e].status=="open"){open_count++}
                            if(sortedSelf[e].status=="closed"){closed_count++}
                            if(sortedSelf[e].status=="resolved"){resolved_count++}
                            if(sortedSelf[e].status=="in_progress"){in_progress_count++}
                            if(typeof sortedSelf[e+1] == 'undefined'){
                                var obj = {}
                                obj["domain_name"]=sortedSelf[e].domain_name
                                obj["open"]=open_count
                                obj["closed"]=closed_count
                                obj["in_progress"]=in_progress_count
                                obj["resolved"]=resolved_count
                                obj["total"]=open_count+closed_count+resolved_count+in_progress_count
                                domain_name_list.push(obj)
                                return true;
                            }
                            if(sortedSelf[e].domain_name!=sortedSelf[e+1].domain_name){
                                var obj = {}
                                obj["domain_name"]=sortedSelf[e].domain_name
                                obj["open"]=open_count
                                obj["in_progress"]=in_progress_count
                                obj["closed"]=closed_count
                                obj["resolved"]=resolved_count
                                obj["total"]=open_count+closed_count+resolved_count+in_progress_count
                                domain_name_list.push(obj)
                                open_count=0
                                closed_count=0
                                resolved_count=0
                                in_progress_count=0
                            }
                        }else{
                            return true;
                        }
                    })
                    $(domain_name_list).each(function(e){
                            $("#report_tbody").append(`<tr report_domain='${domain_name_list[e].domain_name}'><td>${domain_name_list[e].domain_name}</td><td class="webkit_center"><h6 class="domain_status_h6 domain_status_open">${domain_name_list[e].open}</h6></td><td class="webkit_center"><h6 class="domain_status_h6 domain_status_closed">${domain_name_list[e].closed}</h6></td><td class="webkit_center"><h6 class="domain_status_h6 domain_status_total">${domain_name_list[e].total}</h6></td><td><button type="button" class="btn btn-primary btn-sm open_report_modal" domain='${domain_name_list[e].domain_name}'>Open</button></td></tr>`)
                    })
                    openDomainReportModal()
                }
            }
        })
      }

      function checkReportDomainCount(){
        $("#report_tbody").empty()
        displayBugReports()
      }

      function openDomainReportModal(){
        $(".open_report_modal").click(function(e){
            var domain = $(this).attr("domain")
            $("#report_page_title").text(domain+" - Bug Reports")
            $("#report_modal").css("display","block")
            getBugReportByDomain(domain)
            closeReportModal()
        })
      }

      function closeReportModal(){
          $(".close_report_modal").click(function(){
            $("#report_modal").css("display","none")
            window.location.reload()
          })
      }

      function getBugReportByDomain(domain_name){
        jsonData["domain_name"]=domain_name
        window.parent.$.ajax({
            type: "post",
            url:"../../../backend/bug_report_tool.php?action=getBugReportByDomainName",
            data: {
              data: JSON.stringify(jsonData)
            },
            success: function (response) {
            console.log(response)     
                if(response.status==="OK"){
                    all_domain_reports = response.bug_reports
                    $("#reportListBody").empty()
                    displayBugReportList(all_domain_reports)
                    sortReportTable()
                }
            }
        })
      }

      function bugReportCheckListener(){
        $("#checkAllReports").change(function(){
            if($(this).prop("checked")){
                $(".check_report").prop("checked",true)
            }else{
                $(".check_report").prop("checked",false)
            }
        })
        $(".check_report").change(function(e){
            if(!$(this).prop("checked")){
                $("#checkAllReports").prop("checked",false)
            }
        })
      }

      function displayTeamMemberAccess(){
          $("#team-member-access").click(function(){
              if($("#collapseTwo").hasClass("display-block")){
                $("#collapseTwo").removeClass("display-block")
                $("#headingTwo").css("text-align","center")
              }else{
                $("#collapseTwo").addClass("display-block")
                $("#headingTwo").css("text-align","center")
              }
          })
          checkEmails()
          addTeamMemberEmail()
          getTeamMemberDetails()
      }

      function displayEmailSettings(){
        $("#email-alerts").click(function(){
            if($("#collapseThree").hasClass("display-block")){
              $("#collapseThree").removeClass("display-block")
              $("#headingThree").css("text-align","center")
            }else{
              $("#collapseThree").addClass("display-block")
              $("#headingThree").css("text-align","center")
            }
        })
      }

      function addTeamMemberEmail(){
          $("#addTeamMember").submit(function(e){
            e.preventDefault()
            if(user_group == "FREE"){
                Swal.fire("Only WebSoft365 PRO members allowed to add team members.","","error")
                return false;
            }
            jsonData["user_email"]=user_email
            jsonData["pin"]=$("#report_pin").val()
            jsonData["email"]=$("#report_email").val()
            jsonData["userid"]=String(document.location.href.split("userid=")[1])
            if(jsonData["domain1"]=$('input[domain_count="domain1"]').prop("checked"))
            {
                jsonData["domain1"]=$('input[domain_count="domain1"]').parent().attr("domain")
            }else{
                jsonData["domain1"]=""
            }

            if(jsonData["domain2"]=$('input[domain_count="domain2"]').prop("checked"))
            {
                jsonData["domain2"]=$('input[domain_count="domain2"]').parent().attr("domain")
            }else{
                jsonData["domain2"]=""
            } 

            if(jsonData["domain3"]=$('input[domain_count="domain3"]').prop("checked"))
            {
                jsonData["domain3"]=$('input[domain_count="domain3"]').parent().attr("domain")
            }else{
                jsonData["domain3"]=""
            }

            if(jsonData["domain4"]=$('input[domain_count="domain4"]').prop("checked"))
            {
                jsonData["domain4"]=$('input[domain_count="domain4"]').parent().attr("domain")
            }else{
                jsonData["domain4"]=""
            } 

            if(jsonData["domain5"]=$('input[domain_count="domain5"]').prop("checked"))
            {
                jsonData["domain5"]=$('input[domain_count="domain5"]').parent().attr("domain")
            }else{
                jsonData["domain5"]=""
            }
            if($(".member-list-row").length>1){
                Swal.fire("Error","You cannot add more members.","error")
            }else{
                $("button[type=submit]").prop( "disabled", true );
                window.parent.$.ajax({
                    type: "post",
                    url:"../../../backend/bug_report_tool.php?action=addTeamMemberEmail",
                    data: {
                      data: JSON.stringify(jsonData)
                    },
                    success: function (response) {
                    console.log(response)
                    $("button[type=submit]").prop( "disabled", false );
                        if(response.status==="OK"){
                            Swal.fire("Success","Your team member will receive a notification.","success")
                                $(".card-body-two").append(`
                                <div class="member-list-row">
                                    <h5>Team Member #${$(".member-list-row").length+1}</h5>
                                    <input type="email" class="form-control report_element" placeholder="${jsonData["email"]}" disabled>
                                    <button class="btn btn-danger report_email_delete" email="${jsonData["email"]}">Delete</button>
                                    <ul class="report_email_domain_list_${member_count}"></ul>
                                </div>
                                `)
                            $(`.report_email_domain_list_${member_count}`).append(`
                            <li class="report_email_li" domain='${jsonData["domain1"]}'>
                                <h6>${jsonData["domain1"]}</h6>
                            </li>
                            <li class="report_email_li" domain='${jsonData["domain2"]}'>
                                <h6>${jsonData["domain2"]}</h6>
                            </li>
                            <li class="report_email_li" domain='${jsonData["domain3"]}'>
                                <h6>${jsonData["domain3"]}</h6>
                            </li>
                            <li class="report_email_li" domain='${jsonData["domain4"]}'>
                                <h6>${jsonData["domain4"]}</h6>
                            </li>
                            <li class="report_email_li" domain='${jsonData["domain5"]}'>
                                <h6>${jsonData["domain5"]}</h6>
                            </li>
                            `)
                            deleteMember()
                        }
                    }
                })
            }
          })
      }

      function displayBugReportList(bug_report_list){
        $(bug_report_list).each(function(e){
            var current_comment = bug_report_list[e].comment
            if(bug_report_list[e].comment.length>20){
                current_comment=bug_report_list[e].comment.substring(0, 20)+"..."
            }
            console.log(bug_report_list[e].comment.length)
            $("#reportListBody").append(`
            <tr class="reportListBody_tr" hash="${bug_report_list[e].hash}" browser="${bug_report_list[e].browser}" comment="${bug_report_list[e].comment}" created="${bug_report_list[e].created}" domain_name="${bug_report_list[e].domain_name}" email="${bug_report_list[e].email}" nr="${bug_report_list[e].id}" name="${bug_report_list[e].name}" os="${bug_report_list[e].os}" screen_size="${bug_report_list[e].screen_size}" source_url="${bug_report_list[e].source_url}"  status="${bug_report_list[e].status}">
                <td class="checkbox_icons_td"><input type="checkbox" class="check_report" id="check_${bug_report_list[e].id}"></td>
                <td><button class="check_report_icon browser_info_button_${e}"></button></td>
                <td><button class="check_report_icon os_info_button_${e}"></button></td>
                <td><button class="check_report_icon device_info_button_${e}"></button></td>
                <td><h5>#${bug_report_list[e].id}</h5></td>
                <td>
                    <h5>${current_comment}<h5>
                    <h6>${bug_report_list[e].source_url}</h6>
                </td>
                <td>${bug_report_list[e].created}</td>
                <td></td>
                <td class="status_td"><h6 class="status_color_btn status_color_btn_${e}">${capitalize(bug_report_list[e].status)}</h6></td>
                <td>
                <button class="btn btn-success btn-sm view_issue_button" hash="${bug_report_list[e].hash}" browser="${bug_report_list[e].browser}" comment="${bug_report_list[e].comment}" created="${bug_report_list[e].created}" domain_name="${bug_report_list[e].domain_name}" email="${bug_report_list[e].email}" nr="${bug_report_list[e].id}" name="${bug_report_list[e].name}" os="${bug_report_list[e].os}" screen_size="${bug_report_list[e].screen_size}" source_url="${bug_report_list[e].source_url}"  status="${bug_report_list[e].status}">View</button>
                <button class="btn btn-danger btn-sm delete_issue_button" domain_name="${bug_report_list[e].domain_name}" nr="${bug_report_list[e].id}">Delete</button>
                </td>
            </tr>
            `)
            if(bug_report_list[e].browser.includes("Chrome")){
                $(`.browser_info_button_${e}`).append(`<i class="fa fa-chrome"></i> Chrome`)
            }else if(bug_report_list[e].browser.includes("Firefox")){
                $(`.browser_info_button_${e}`).append(`<i class="fa fa-firefox-browser"></i> Firefox`)
            }else if(bug_report_list[e].browser.includes("Explorer")){
                $(`.browser_info_button_${e}`).append(`<i class="fa fa-internet-explorer"></i> Internet Explorer`)
            }else if(bug_report_list[e].browser.includes("Opera")){
                $(`.browser_info_button_${e}`).append(`<i class="fa fa-opera"></i> Opera`)
            }else{
                $(`.browser_info_button_${e}`).append(`<i class="fa fa-question-circle"></i> Unknown`)
            }

            if(bug_report_list[e].os.includes("Windows")){
                $(`.os_info_button_${e}`).append(`<i class="fa fa-windows"></i> Windows`)
                $(`.device_info_button_${e}`).append(`<i class="fa fa-desktop"></i> Desktop`)
            }else if(bug_report_list[e].os.includes("Ubuntu")){
                $(`.os_info_button_${e}`).append(`<i class="fa fa-ubuntu"></i> Ubuntu`)
                $(`.device_info_button_${e}`).append(`<i class="fa fa-desktop"></i> Desktop`)
            }else if(bug_report_list[e].os.includes("Mac")){
                $(`.os_info_button_${e}`).append(`<i class="fa fa-apple"></i> Mac`)
                $(`.device_info_button_${e}`).append(`<i class="fa fa-desktop"></i> Desktop`)
            }else if(bug_report_list[e].os.includes("Iphone")){
                $(`.os_info_button_${e}`).append(`<i class="fa fa-apple"></i> OSX`)
                $(`.device_info_button_${e}`).append(`<i class="fa fa-mobile-alt"></i> Mobile`)
            }else if(bug_report_list[e].os.includes("Android")){
                $(`.os_info_button_${e}`).append(`<i class="fa fa-android"></i> Android`)
                $(`.device_info_button_${e}`).append(`<i class="fa fa-mobile-alt"></i> Mobile`)
            }else if(bug_report_list[e].os.includes("Chrome")){
                $(`.os_info_button_${e}`).append(`<i class="fa fa-chrome"></i> Chrome OS`)
                $(`.device_info_button_${e}`).append(`<i class="fa fa-mobile-alt"></i> Desktop`)
            }else{
                $(`.os_info_button_${e}`).append(`<i class="fa fa-question-circle"></i> Unknown`)
                $(`.device_info_button_${e}`).append(`<i class="fa fa-question-circle"></i> Unknown`)
            }

            switch($(`.status_color_btn_${e}`).html()){
                case "Open":
                    $(`.status_color_btn_${e}`).css({
                    "background-color": "#28A745"
                    })
                break;
                case "In progress":
                    $(`.status_color_btn_${e}`).css({
                        "background-color": "#30ACD6",
                    })
                break;
                case "Resolved":
                    $(`.status_color_btn_${e}`).css({
                        "background-color": "#DC3545",
                    })
                break;
                case "Closed":
                    $(`.status_color_btn_${e}`).css({
                        "background-color": "#E0A800",
                    })
                break;
            }
        })
        $(".status_color_btn").css({
            "padding": "12px",
            "padding-top": "3px",
            "padding-bottom": "6px",
            "border": "1px solid white",
            "border-radius": "16px",
            "color": "white"
        })
        
        bugReportCheckListener()
        reportDataTable = $('#reportList').DataTable()
        $("#reportList_filter label").contents().filter(function(){
            return this.nodeType === 3;
        }).remove();
        $("#reportList_filter label input").css({
            "border-radius":"5px",
            "border":"solid grey 1px",
            "padding":"5px",
            "padding-left":"8px",
            "opacity":".7"
        })
        $("#reportList_filter label input").attr("placeholder","Search...")
        reportTableClickListener()
        deleteBugReport()
        $(".paginate_button").click(function(e){
            reportTableClickListener()
            deleteBugReport()
        })
        $(".check_report").click(function(e){
            e.stopPropagation()
        })
        $("#reportList_length").html(`
        <button class="btn btn-light btn-sm dropdown-toggle dropdown-toggle-main" type="button" data-toggle="dropdown">Mark selected as
        <span class="caret"></span></button>
        <div class="delete_button_container">
            <button class="delete_selected_reports"><i class="fa fa-trash"></i></button>
        </div>
        <ul class="dropdown-menu dropdown-menu-main">
           <li class="change_report_status change_to_open" value="open"><span class="dot change_to_open_dot"></span>Open</li>
           <li class="change_report_status change_to_in_progress" value="in_progress"><span class="dot change_to_in_progress_dot"></span>In progress</li>
           <li class="change_report_status change_to_resolved" value="resolved"><span class="dot change_to_resolved_dot"></span>Resolved</li>
           <li class="change_report_status change_to_closed" value="closed"><span class="dot change_to_closed_dot"></span>Closed</li>
        </ul>`)
        deleteMultipleReports()
        changeMultipleStatus()
        displayStatusChangeOptions()
      }

      function getTeamMemberDetails(){
        jsonData["userid"]=String(document.location.href.split("userid=")[1])
        window.parent.$.ajax({
            type: "post",
            url:"../../../backend/bug_report_tool.php?action=getTeamMemberDetails",
            data: {
              data: JSON.stringify(jsonData)
            },
            success: function (response) {
            console.log(response)     
                if(response.status==="OK"){
                    $(response.team_members).each(function(e){
                        $(".card-body-two").append(`
                        <div class="member-list-row">
                            <h5>Team Member #${member_count}</h5>
                            <input type="email" class="form-control report_element" placeholder="${response.team_members[e].email}" disabled>
                            <button class="btn btn-danger report_email_delete" email="${response.team_members[e].email}">Delete</button>
                            <ul class="report_email_domain_list_${member_count}">
                            </ul>
                        </div>
                        `)
                        $(`.report_email_domain_list_${member_count}`).append(`
                            <li class="report_email_li" domain='${response.team_members[e].domain1}'>
                                <h6>${response.team_members[e].domain1}</h6>
                            </li>
                            <li class="report_email_li" domain='${response.team_members[e].domain2}'>
                                <h6>${response.team_members[e].domain2}</h6>
                            </li>
                            <li class="report_email_li" domain='${response.team_members[e].domain3}'>
                                <h6>${response.team_members[e].domain3}</h6>
                            </li>
                            <li class="report_email_li" domain='${response.team_members[e].domain4}'>
                                <h6>${response.team_members[e].domain4}</h6>
                            </li>
                            <li class="report_email_li" domain='${response.team_members[e].domain5}'>
                                <h6>${response.team_members[e].domain5}</h6>
                            </li>
                        `)
                        member_count++
                    })
                    deleteMember()
                }
            }
        })
      }

      function checkEmails() {
        var password = document.getElementById("report_email"),
        confirm_password = document.getElementById("report_email_confirm");
      
        function validatePassword() {
          if (password.value != confirm_password.value) {
            confirm_password.setCustomValidity("Emails Don't Match");
          } else {
            confirm_password.setCustomValidity('');
          }
        }
      
        password.onchange = validatePassword;
        confirm_password.onkeyup = validatePassword;
      }

      function checkUserGroup(){
        jsonData["userid"] = String(document.location.href.split("userid=")[1])
        window.parent.$.ajax({
            type: "post",
            url: "../backend/index.php?action=getUserDetailsById",
            data: {
              data: JSON.stringify(jsonData)
            },
            success: function (response) {
              console.log(response);
              if(response.status == "OK"){
                user_group = response.users.group_type
                user_email = response.users.email;
              }
            }
        })
      }

      function deleteMember(){
        console.log("function called")
        $(".report_email_delete").click(function(){
            var button_email = $(this).attr("email")
            jsonData["email"] = $(this).parent().find("input[type='email']").attr("placeholder")
            Swal.fire({
                title: "Are you sure you want to delete this team member?",
                icon: 'info',
                html: "",
                showCloseButton: true,
                showCancelButton: true,
                showConfirmButton: true,
                focusConfirm: true,
                focusClose:false,
                customClass: {
                  confirmButton: 'swalDeleteMember',
                },
                confirmButtonText:
                  'Yes',
                cancelButtonText:
                  'No'
              });
              $(".swalDeleteMember").click(function(){
                window.parent.$.ajax({
                    type: "post",
                    url: "../backend/bug_report_tool.php?action=deleteTeamMemberDetails",
                    data: {
                    data: JSON.stringify(jsonData)
                    },
                    success: function (response) {
                    console.log(response);
                    if(response.status == "OK"){
                        Swal.fire("Success","Team member successfully deleted.","success")
                        $(`.report_email_delete[email='${button_email}']`).parent().remove()
                    }
                    }
                })
            })
        })
      }

      function displayStatusChangeOptions(){
        $(".dropdown-toggle").click(function(e){
            e.preventDefault()
            if($(".dropdown-menu").hasClass("display-block")){
                $(".dropdown-menu").removeClass("display-block")
                $(".dropdown-menu").addClass("display-none")
            }else{
                $(".dropdown-menu").removeClass("display-none")
                $(".dropdown-menu").addClass("display-block")
            }
        })
        $(window).click(function(e){
            if($(".dropdown-menu").hasClass("display-block")){
                $(".dropdown-menu").removeClass("display-block")
                $(".dropdown-menu").addClass("display-none")
            }
        })
      }
      const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1).replace("_"," ")
      }

      function nl2br (str) {   
        var breakTag = '<br>';    
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
      }

      function reportTableClickListener(){
          $(".reportListBody_tr, .view_issue_button").click(function(e){
            $("#issue_modal").css("display","block")
            var browser = $(this).attr("browser")
            var comment = $(this).attr("comment")
            var created =  $(this).attr("created")
            var domain_name =  $(this).attr("domain_name")
            var email =  $(this).attr("email")
            var nr = $(this).attr("nr")
            var name =  $(this).attr("name")
            var os =  $(this).attr("os")
            var screen_size =  $(this).attr("screen_size")
            var source_url =  $(this).attr("source_url")
            var status = $(this).attr("status")
            var hash = $(this).attr("hash")
            var comment_title=comment;
            if(comment.length>20){
                comment_title=comment.substring(0, 20)+"..."
            }
            $("#issue_page_title").html(`#${nr} ${comment_title}`)
            $(".report_issue_comment").html(`${nl2br(comment)}`)
            $.get(`https://websoft365.com/backend/uploads/bug_reports/${hash}.png`)
            .done(function() { 
                $("#issue_image_container").html(`
            <img class="issue_image" src="/backend/uploads/bug_reports/${hash}.png"></img>
            `)
            })
            .fail(function(){
                $("#issue_image_container").html("")
            })
            switch(capitalize(status)){
                case "Open":
                    status=`<span class="dot change_to_open_dot"></span>`+capitalize(status)
                break;
                case "In progress":
                    status=`<span class="dot change_to_in_progress_dot"></span>`+capitalize(status)
                break;
                case "Resolved":
                    status=`<span class="dot change_to_resolved_dot"></span>`+capitalize(status)
                break;
                case "Closed":
                    status=`<span class="dot change_to_closed_dot"></span>`+capitalize(status)
                break;
            }
            $(".dropdown-toggle-issue").html(`${status}`)
            $("#issue_tbody").empty()
            $("#issue_tbody").append(`
            <tr>
                <td>Referrer:</td>
                <td class="referrer_domain">${domain_name}</td>
            </tr>
            <tr>
                <td>Email:</td>
                <td>${email}</td>
            </tr>
            <tr>
                <td>Source URL:</td>
                <td>${source_url}</td>
            </tr>
            <tr>
                <td>Reported:</td>
                <td>${created}</td>
            </tr>
            <tr>
                <td>Reported by:</td>
                <td>${name}</td>
            </tr>
            <tr>
                <td>Browser:</td>
                <td>${browser}</td>
            </tr>
            <tr>
                <td>Operating System:</td>
                <td>${os}</td>
            </tr>
            <tr>
                <td>Screen size:</td>
                <td>${screen_size}</td>
            </tr>
            `)
            reportTableCloseListener()
            changeBugReportStatus()
          })
      }

      function reportTableCloseListener(){
        $(".close_issue_modal").click(function(e){
            $("#issue_modal").css("display","none")
        })
      }

      function deleteBugReport(){
        $(".delete_issue_button").click(function(e){
            e.stopPropagation()
            jsonData["domain_name"]=$(this).attr("domain_name")
            jsonData["id"]=$(this).attr("nr")
            Swal.fire({
                title: "Are you sure you want to delete this bug report?",
                icon: 'info',
                html: "",
                showCloseButton: true,
                showCancelButton: true,
                showConfirmButton: true,
                focusConfirm: true,
                focusClose:false,
                customClass: {
                  confirmButton: 'swalConfirmDeleteIssue',
                },
                confirmButtonText:
                  'Yes',
                cancelButtonText:
                  'No'
              });
            $(".swalConfirmDeleteIssue").click(function(){
                window.parent.$.ajax({
                    type: "post",
                    url:"../../../backend/bug_report_tool.php?action=deleteBugReport",
                    data: {
                    data: JSON.stringify(jsonData)
                    },
                    success: function (response) {
                    console.log(response)     
                        if(response.status==="OK"){
                            Swal.fire("Success","Bug Report successfully deleted.","success")
                            $("#issue_modal").css("display","none")
                            $(`.reportListBody_tr[nr='${jsonData['id']}']`).remove()
                        }
                    }
                })
            })
        })
    }
    
    function changeBugReportStatus(){
        $('.dropdown-menu-issue li').off('click');
        $(".dropdown-menu-issue li").click(function(e){
            jsonData["status"] = $(this).attr("value")
            jsonData["id"] = $(this).parents().eq(8).find("#issue_page_title").html().split(" ")[0].replace("#","")
            jsonData["domain_name"] = $(this).parents().eq(8).find(".referrer_domain").html()
            window.parent.$.ajax({
                type: "post",
                url:"../../../backend/bug_report_tool.php?action=changeReportStatus",
                data: {
                data: JSON.stringify(jsonData)
                },
                success: function (response) {
                console.log(response)     
                    if(response.status==="OK"){
                        Swal.fire("Success","Status has been successfully changed.","success")
                        $(`tr[nr='${jsonData["id"]}']`).attr("status", jsonData["status"])
                        var status = jsonData["status"]
                        switch(capitalize(status)){
                            case "Open":
                                status=`<span class="dot change_to_open_dot"></span>`+capitalize(status)
                            break;
                            case "In progress":
                                status=`<span class="dot change_to_in_progress_dot"></span>`+capitalize(status)
                            break;
                            case "Resolved":
                                status=`<span class="dot change_to_resolved_dot"></span>`+capitalize(status)
                            break;
                            case "Closed":
                                status=`<span class="dot change_to_closed_dot"></span>`+capitalize(status)
                            break;
                        }
                        $(".dropdown-toggle-issue").html(`${status}`)
                        $(`tr[nr='${jsonData["id"]}']`).find(".status_color_btn").html(`${capitalize(jsonData["status"])}`)
                        switch($(`tr[nr='${jsonData["id"]}']`).find(".status_color_btn").html()){
                            case "Open":
                                $(`tr[nr='${jsonData["id"]}']`).find(".status_color_btn").css({
                                "background-color": "#28A745"
                                })
                            break;
                            case "In progress":
                                $(`tr[nr='${jsonData["id"]}']`).find(".status_color_btn").css({
                                    "background-color": "#30ACD6",
                                })
                            break;
                            case "Resolved":
                                $(`tr[nr='${jsonData["id"]}']`).find(".status_color_btn").css({
                                    "background-color": "#DC3545",
                                })
                            break;
                            case "Closed":
                                $(`tr[nr='${jsonData["id"]}']`).find(".status_color_btn").css({
                                    "background-color": "#E0A800",
                                })
                            break;
                        }
                    }
                }
            })
        })
    }

    function sortReportTable(){
        $(".status_pill_btn").click(function(e){
            if(!$(this).hasClass("pill_button_deactivated")){
                $(this).addClass("pill_button_deactivated")
            }else{
                $(this).removeClass("pill_button_deactivated")
            }

            var active_status=[]
            $(".status_pill_btn").each(function(e){
                if(!$(this).hasClass("pill_button_deactivated")){
                    active_status.push($(this).attr("value"))
                }
            })
            var selected_reports = []
            $(active_status).each(function(e){
                selected_reports.push(all_domain_reports.filter(x=>{if(x.status==active_status[e]){return x}}))
            })
            console.log(selected_reports)
            $("#reportListBody tr").remove()
            $(selected_reports).each(function(e){
                displayBugReportList(selected_reports[e])
            })
        })
    }  

    function deleteMultipleReports(){
        $(".delete_selected_reports").click(function(e){
            var checked_counter=0;
            $(".check_report").each(function(e){
                if($(this).prop("checked")){
                    checked_counter++;
                }
            })
            if(checked_counter!=0){
            Swal.fire({
                title: "Are you sure you want to delete the selected bug reports?",
                icon: 'info',
                html: "",
                showCloseButton: true,
                showCancelButton: true,
                showConfirmButton: true,
                focusConfirm: true,
                focusClose:false,
                customClass: {
                confirmButton: 'swalConfirmDeleteIssue2',
                },
                confirmButtonText:
                'Yes',
                cancelButtonText:
                'No'
            });
            $(".swalConfirmDeleteIssue2").click(function(){
            var response
            $(".check_report").each(function(e){
                if($(this).prop("checked")){
                    jsonData["domain_name"]=$(this).parent().parent().attr("domain_name")
                    jsonData["id"]=$(this).parent().parent().attr("nr")
                    $(`.reportListBody_tr[nr='${jsonData['id']}']`).remove()
                        window.parent.$.ajax({
                            type: "post",
                            url:"../../../backend/bug_report_tool.php?action=deleteBugReport",
                            data: {
                            data: JSON.stringify(jsonData)
                            },
                            success: function (response) {
                            console.log(response)     
                                if(response.status==="OK"){
                                    response=true
                                }
                            }
                        })
                    }
                })
                if(response==true){
                    Swal.fire("Success","Bug reports have been successfully deleted.","success")
                }
            })
            }
        })
    }

    function changeMultipleStatus(){
        $('.dropdown-menu-main li').off('click');
        $(".dropdown-menu-main li").click(function(e){
            jsonData["status"] = $(this).attr("value")
            $(".check_report").each(function(e){
                if($(this).prop("checked")){
                    jsonData["domain_name"]=$(this).parent().parent().attr("domain_name")
                    jsonData["id"]=$(this).parent().parent().attr("nr")
                    $(`tr[nr='${jsonData["id"]}']`).attr("status", jsonData["status"])
                        var status = jsonData["status"]
                        switch(capitalize(status)){
                            case "Open":
                                status=`<span class="dot change_to_open_dot"></span>`+capitalize(status)
                            break;
                            case "In progress":
                                status=`<span class="dot change_to_in_progress_dot"></span>`+capitalize(status)
                            break;
                            case "Resolved":
                                status=`<span class="dot change_to_resolved_dot"></span>`+capitalize(status)
                            break;
                            case "Closed":
                                status=`<span class="dot change_to_closed_dot"></span>`+capitalize(status)
                            break;
                        }
                        $(".dropdown-toggle-issue").html(`${status}`)
                        $(`tr[nr='${jsonData["id"]}']`).find(".status_color_btn").html(`${capitalize(jsonData["status"])}`)
                        switch($(`tr[nr='${jsonData["id"]}']`).find(".status_color_btn").html()){
                            case "Open":
                                $(`tr[nr='${jsonData["id"]}']`).find(".status_color_btn").css({
                                "background-color": "#28A745"
                                })
                            break;
                            case "In progress":
                                $(`tr[nr='${jsonData["id"]}']`).find(".status_color_btn").css({
                                    "background-color": "#30ACD6",
                                })
                            break;
                            case "Resolved":
                                $(`tr[nr='${jsonData["id"]}']`).find(".status_color_btn").css({
                                    "background-color": "#DC3545",
                                })
                            break;
                            case "Closed":
                                $(`tr[nr='${jsonData["id"]}']`).find(".status_color_btn").css({
                                    "background-color": "#E0A800",
                                })
                            break;
                        }
                    window.parent.$.ajax({
                        type: "post",
                        url:"../../../backend/bug_report_tool.php?action=changeReportStatus",
                        data: {
                        data: JSON.stringify(jsonData)
                        },
                        success: function (response) {
                        console.log(response)     
                            if(response.status==="OK"){
                                
                            }
                        }
                    })
                }
            })
        })
    }

    function setEmailSending(){
        $("#setEmailSendingButton").click(function(e){
            jsonData["frequency"]=$("#emailAlertOption").val()
            jsonData["userid"]=String(document.location.href.split("userid=")[1])
            jsonData["email"]=user_email
            console.log(jsonData)
            window.parent.$.ajax({
                type: "post",
                url:"../../../backend/bug_report_tool.php?action=setEmailSending",
                data: {
                data: JSON.stringify(jsonData)
                },
                success: function (response) {
                console.log(response)     
                    if(response.status==="OK"){
                        Swal.fire("Success","Your email alert settings have been successfully saved.","success")
                    }
                }
            })
        })
    }

    function getEmailSendingOption(){
            jsonData["userid"]=String(document.location.href.split("userid=")[1])
            window.parent.$.ajax({
                type: "post",
                url:"../../../backend/bug_report_tool.php?action=getEmailSendingOption",
                data: {
                data: JSON.stringify(jsonData)
                },
                success: function (response) {
                console.log(response)     
                    if(response.status==="OK"&&response.frequency){
                        $("#emailAlertOption").val(response.frequency)
                    }else{
                        $("#emailAlertOption").val("everytime")
                    }
                }
            })
    }