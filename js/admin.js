$(document).ready(function () {
    displayUsers();
});

  function displayUsers() {
    var jsonData = {};
        $.ajax({
            type: "post",
            url: "../backend/index.php?action=displayUsers",
            data: {
                data: JSON.stringify(jsonData)
            },
            success: function (response) {
                console.log(response);
                if(response.status == "OK"){
                  var i = 0;
                  $(response.users).each(function(index){
                    var self = this;
                    
                    $("#table_body").append(
                      `<tr class="user_row" data-href="../profile_admin.php">
                        <td class="userid" id="${this.userid}">${this.userid}</td>
                        <td class="profile_image"><img src="../backend/uploads/profile_images/${this.hash}.png" class="profile_img" alt=""></td>
                        <td class="firstname">${this.firstname}</td>
                        <td class="lastname">${this.lastname}</td>
                        <td class="email">${this.email}</td>
                        <td class="sub_id">${this.sub_id}</td>
                        <td>${this.group_type.replace(/_/g," ")}</td>
                        <td>${this.created}</td>
                        <td>${this.last_login}</td>
                       </tr>
                      `
                    )
                    $(".user_row").hover(function(){
                      $(this).css("cursor", "pointer");
                    });
                    $(".user_row").click(function() {
                      window.location = $(this).data("href")+"?id="+$(this).find(".userid").attr("id");
                    });
                  });
                  setTimeout(function(){ sortTable(response.users) }, 300);
                }
            }
        });
}

function sortTable(response_array){
  $("#search_field, #order_by, #sort_order, #user_group").change(function(){
    var new_array = response_array;
    var ug_value=$("#user_group").val();
    var so_value=$("#sort_order").val();
    var ob_value=$("#order_by").val();

    if(ug_value!="ALL"){
      new_array = new_array.filter((a) => {
        return a.group_type.toUpperCase() == ug_value;
      });
    }

    if(so_value=="descending"){
        new_array = new_array.sort((a, b) => {
        return a[ob_value].toUpperCase() > b[ob_value].toUpperCase() ? 1 : -1;
        });
        new_array.reverse();
    }else{
        new_array = new_array.sort((a, b) => {
        return a[ob_value].toUpperCase() > b[ob_value].toUpperCase() ? 1 : -1;
      });
    }

    $("#table_body tr").remove(); 
    $(new_array).each(function(index){
      var self = this;
      $("#table_body").append(
        `<tr class="user_row" data-href="../profile_admin.php">
          <td class="userid">${this.userid}</td>
          <td>${this.firstname}</td>
          <td>${this.lastname}</td>
          <td>${this.email}</td>
          <td>${this.sub_id}</td>
          <td>${this.group_type}</td>
          <td>${this.created}</td>
         </tr>
        `
      );
    var entry = $("#order_by").val();
    searchInTable(entry);
    $(".dataTables_filter").css("display","none");
    $(".user_row").hover(function(){
      $(this).css("cursor", "pointer");
    });
    $(".user_row").click(function() {
      window.location = $(this).data("href")+"?id="+$(this).find(".userid").html();
    });
  });
});
table = $("#user_table").DataTable();
table.destroy();
$("#user_table").DataTable();
$(".dataTables_filter").css("display","none");
}

function searchInTable(value){
    var input, filter, table, tr, td, i, txtValue, x;
    input = document.getElementById("search_field");
    filter = input.value.toUpperCase();
    table = document.getElementById("user_table");
    tr = table.getElementsByTagName("tr");
    switch(value){
      case "userid":
        x=0;
        break;
      case "firstname":
        x=1;
        break;
      case "lastname":
        x=2;
        break;
      case "email":
        x=3;
        break;
      case "sub_id":
        x=4;
        break;
      default:
        console.log("error");
    }
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[x];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
}
