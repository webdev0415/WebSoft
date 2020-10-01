$(document).ready(function () {
    loadReports()
});

function loadReports(){
    $.ajax({
        type: "post",
        url: "../backend/index.php?action=getRecommendations",
        data: {
            data: JSON.stringify(dummyJson)
        },
        success: function (response) {
            console.log(response);
            if(response.status == "OK"){
                $(response.bug_reports).each(function(index){
                $("#accordion").append(`
                        <div class="card" report_id="${this.id}">
                            <div class="card-header" id="heading${index}">
                                    <button class="btn btn-link collapsed" data-toggle="collapse"
                                        data-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                                        <h5 class="collapse_title">${this.title}- Report ${this.id}</h5>
                                    </button>
                                    <a class="closeReport" report_id="${this.id}">
                                        <img src="/assets/Close-2-icon.png" alt="">
                                    </a>
                            </div>
                            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}"
                                data-parent="#accordion">
                                <div class="card-body">
                                    <div class="report_text_container">
                                        <h6>Description: ${this.report_text}</h6>
                                    </div>
                                    <div class="report_image_container">
                                        <img src="../backend/uploads/feature_recommendations/${this.hash}.png" width="100%" height="100%">
                                    </div>
                                </div>
                            </div>
                        </div>`)
            })
            }
            deleteReport()
        }
    });
   
}

function deleteReport(){
    $(".closeReport").click(function(e){
        var id = $(this).attr("report_id")
        jsonData["id"]=id
        $.ajax({
            type: "post",
            url: "../backend/index.php?action=deleteRecommendation",
            data: {
                data: JSON.stringify(jsonData)
            },
            success: function (response) {
                console.log(response);
                if(response.status == "OK"){
                    $(`div[report_id=${id}]`).remove()
                }
            }
        });
    })
}