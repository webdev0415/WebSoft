var jsonData = {};
$(document).ready(function () {
    sendTestEmail()
    getUserCountByGroup()
    sendNewsLetter()
    $("#packet_size").val("20");
});

function sendTestEmail(){
    $("#send_test_email").click(function(e){
        jsonData["html"]=$("iframe").contents().find("#tinymce").html().replace(/"/g,`'`)
        jsonData["text"]=$("iframe").contents().find("#tinymce").text()
        jsonData["subject"]=$("#email_subject").val()
        jsonData["email"]=$("#test_email").val()
        $.ajax({
            type: "post",
            url: "../backend/index.php?action=sendTestNewsletter",
            data: {
                data: JSON.stringify(jsonData)
            },
            success: function (response) {
                console.log(response);
                if(response.status == "OK"){
                    Swal.fire("Success","Test email has been successfully sent.","success")
                }else{
                    Swal.fire("Error","Something went wrong...","error")
                }
            }
        })
    })
}

function getUserCountByGroup(){
        $.ajax({
            type: "post",
            url: "../backend/index.php?action=getSubscribedUserCountByGroup",
            data: {
                data: JSON.stringify(jsonData)
            },
            success: function (response) {
                console.log(response);
                if(response.status == "OK"){
                    $("label[for='free_users']").append(" ("+response.free+")("+response.free_n_active+")")
                    $("label[for='monthly_pro_users']").append(" ("+response.pro_monthly+")")
                    $("label[for='yearly_pro_users']").append(" ("+response.pro_yearly+")")
                    $("label[for='monthly_super_pro_users']").append(" ("+response.super_pro_monthly+")")
                    $("label[for='yearly_super_pro_users']").append(" ("+response.super_pro_yearly+")")
                }
            }
        })
}

function sendNewsLetter(){
    $("#sendNewsLetter").on("submit",function(e){
        e.preventDefault()
        jsonData["subject"]=$("#email_subject").val()
        jsonData["packet_size"]=$("#packet_size").val()
        jsonData["html_content"]=$("iframe").contents().find("#tinymce").html().replace(/"/g,`'`)
        jsonData["text_content"]=$("iframe").contents().find("#tinymce").text()
        jsonData["group_type"]=""
        if($("#free_users").prop("checked")==true){
            var group = $("#free_users").attr("group")
            if(jsonData["group_type"].length==0){
                jsonData["group_type"]=group
            }else{
                jsonData["group_type"]+=","+group
            }
        }
        if($("#monthly_pro_users").prop("checked")==true){
            var group = $("#monthly_pro_users").attr("group")
            if(jsonData["group_type"].length==0){
                jsonData["group_type"]=group
            }else{
                jsonData["group_type"]+=","+group
            }
        }
        if($("#yearly_pro_users").prop("checked")==true){
            var group = $("#yearly_pro_users").attr("group")
            if(jsonData["group_type"].length==0){
                jsonData["group_type"]=group
            }else{
                jsonData["group_type"]+=","+group
            }
        }
        if($("#monthly_super_pro_users").prop("checked")==true){
            var group = $("#monthly_super_pro_users").attr("group")
            if(jsonData["group_type"].length==0){
                jsonData["group_type"]=group
            }else{
                jsonData["group_type"]+=","+group
            }
        }
        if($("#yearly_super_pro_users").prop("checked")==true){
            var group = $("#yearly_super_pro_users").attr("group")
            if(jsonData["group_type"].length==0){
                jsonData["group_type"]=group
            }else{
                jsonData["group_type"]+=","+group
            }
        }
        console.log(jsonData)
        $.ajax({
            type: "post",
            url: "../backend/index.php?action=sendNewsletter",
            data: {
                data: JSON.stringify(jsonData)
            },
            success: function (response) {
                console.log(response);
                if(response.status == "OK"){
                    Swal.fire("Success","Newsletter has been successfully sent.","success")
                }
            }
        })
    })
}