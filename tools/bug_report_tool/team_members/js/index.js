var dummyJson = {};
dummyJson["dummy"] = "dummy";
var jsonData = {}
var email
$(document).ready(function () {
    $("#navigation").load("/components/navbar_team_member_access.php");
    $(function () {
        $("#footer").load("/components/footer.php");
      });
      setTimeout(function () {
        getFooterInfo();
        $(".ml-03vw").append(`<div>
        <button type="button" class="btn btn-sm btn-danger logout" id="logout">Logout</button>
    </div>`)
      logoutClickListener()
      }, 500);
      getTeamMemberDomains()
      setEmailSending()
});

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
                $(sortedSelf).each(function(e){
                    if(e!=sortedSelf.length){
                        if(sortedSelf[e].status=="open"){open_count++}
                        if(sortedSelf[e].status=="closed"){closed_count++}
                        if(typeof sortedSelf[e+1] == 'undefined'){
                            var obj = {}
                            obj["domain_name"]=sortedSelf[e].domain_name
                            obj["open"]=open_count
                            obj["closed"]=closed_count
                            obj["total"]=open_count+closed_count
                            domain_name_list.push(obj)
                            return true;
                        }
                        if(sortedSelf[e].domain_name!=sortedSelf[e+1].domain_name){
                            var obj = {}
                            obj["domain_name"]=sortedSelf[e].domain_name
                            obj["open"]=open_count
                            obj["closed"]=closed_count
                            obj["total"]=open_count+closed_count
                            domain_name_list.push(obj)
                            open_count=0
                            closed_count=0
                        }
                    }else{
                        return true;
                    }
                })
                $(domain_name_list).each(function(e){
                        $("#report_tbody").append(`<tr report_domain='${domain_name_list[e].domain_name}'><td>${domain_name_list[e].domain_name}</td><td class="webkit_center"><h6 class="domain_status_h6">${domain_name_list[e].open}</h6></td><td class="webkit_center"><h6 class="domain_status_h6">${domain_name_list[e].closed}</h6></td><td class="webkit_center"><h6 class="domain_status_h6">${domain_name_list[e].total}</h6></td><td><button type="button" class="btn btn-primary btn-sm open_report_modal" domain='${domain_name_list[e].domain_name}'>Open</button></td></tr>`)
                })
                openDomainReportModal()
            }
        }
    })
  }

  function getTeamMemberDomains(){
    window.parent.$.ajax({
        type: "post",
        url:"../../../backend/bug_report_tool.php?action=getTeamMemberDomains",
        data: {
          data: JSON.stringify(dummyJson)
        },
        success: function (response) {
        console.log(response)     
            if(response.status==="OK"){
              email = response.team_member_domains[0].email
              getEmailSendingOption()
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
                var self = response.bug_reports
                $("#reportListBody").empty()
                $(self).each(function(e){
                    $("#reportListBody").append(`
                    <tr>
                        <td><input type="checkbox" class="check_report" id="check_${self[e].id}"></td>
                        <td><h5>#${self[e].id}</h5></td>
                        <td>
                            <h5>${self[e].comment}<h5>
                            <h6>${self[e].source_url}</h6>
                        </td>
                        <td>${self[e].created}</td>
                        <td></td>
                        <td>${self[e].status}</td>
                        <td></td>
                    </tr>
                    `)
                })
                bugReportCheckListener()
                $('#reportList').DataTable()
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
  }

  function getFooterInfo(){
    $.ajax({
      type: "post",
      url: "../../../backend/index.php?action=getFooterInfo",
      data: {
        data: JSON.stringify(dummyJson)
      },
      success: function (response) {
        console.log(response)
        if (response.status == "OK") {
            var self = this;
            $("#registered_users_sum").append(`${response.footerinfo.registered_sum}`);
            $("#pro_members_sum").append(`${response.footerinfo.premium_sum}`);
            $("#sum_tools").append(`${response.footerinfo.nr_of_tools}`);
            $("#sum_upcoming_tools").append(`${response.footerinfo.nr_of_upcoming_tools}`);
        } else {
          Swal('Error','An error has occured.','error');
        }
      }, error: function(x){
        console.log(x);
      }
    });
  }

  function logoutClickListener(){
    $("#logout").click(function(e){
      $.ajax({
        type: "post",
        url: "../../../backend/bug_report_tool.php?action=teamMemberLogout",
        data: {
          data: JSON.stringify(dummyJson)
        },
        success: function (response) {
          console.log(response)
          if (response.status == "OK") {
            window.location.href="https://websoft365.com/tools/bug_report_tool/team_members/login.php"
          }
        }, error: function(e){
          console.log(e)
        }
      })
    })
  }

  function setEmailSending(){
    $("#setEmailSendingButton").click(function(e){
        jsonData["frequency"]=$("#emailAlertOption").val()
        jsonData["email"]=email
        window.parent.$.ajax({
            type: "post",
            url:"../../../backend/bug_report_tool.php?action=setTeamMemberEmailSending",
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
        jsonData["email"]=email
        window.parent.$.ajax({
            type: "post",
            url:"../../../backend/bug_report_tool.php?action=getTeamMemberEmailSendingOption",
            data: {
            data: JSON.stringify(jsonData)
            },
            success: function (response) {
            console.log(response)     
                if(response.status==="OK"){
                    $("#emailAlertOption").val(response.frequency)
                }
            }
        })
}

