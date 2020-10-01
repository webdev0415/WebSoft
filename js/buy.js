$(document).ready(function () {
  getUserDetails();
});


function getUserDetails() {
  $.ajax({
    type: "post",
    url: "../backend/index.php?action=getUserDetails",
    data: {
      data: JSON.stringify(dummyJson)
    },
    success: function (response) {
      console.log(response);
      if (response.status == "OK") {
        var self = response.users;
        var email = self.email;
        var name = self.firstname+" "+self.lastname;
        document.title += " " + name;
        switch (self.group_type) {
          case "FREE":
            $(".free_container a").remove();
            $(".free_container").append(`<a class="current_button">Your current membership plan</a>`);
            $(".cards").append(pro_m_html);
            $(".cards").append(pro_y_html);
            $(".cards").append(spro_m_html);
            $(".cards").append(spro_y_html);
            $(".spro_m_card").addClass("offset-md-2");
            $(".paddle_button").attr('data-email', self.email);
            break;
          case "PRO_MONTHLY":
            $(".cards").append(pro_m_html);
            $(".cards").append(pro_y_html);
            $(".cards").append(spro_m_html);
            $(".cards").append(spro_y_html);
            $(".pro_m_container a").remove();
            $(".pro_y_container a").remove();
            $(".s_pro_m_container a").remove();
            $(".s_pro_y_container a").remove();
            $(".pro_m_container").append(`<a class="current_button">Your current membership plan</a>`);
            $(".pro_y_container").append(`<a class="upgrade_button" group="PRO_YEARLY">Contact website administrator</a><h6>Upgrade to this plan</h6>`);
            $(".s_pro_m_container").append(`<a class="upgrade_button" group="SUPER_PRO_MONTHLY">Contact website administrator</a><h6>Upgrade to this plan</h6>`);
            $(".s_pro_y_container").append(`<a class="upgrade_button" group="SUPER_PRO_YEARLY">Contact website administrator</a><h6>Upgrade to this plan</h6>`);
            $(".free_container").append(`<a class="free_button downgrade_button">Downgrade to FREE</a>`);
            $(".spro_m_card").addClass("offset-md-2");
            $(".pro_m_container").append(`<h6>Next rebill date: ${self.exp_date}</h6>`);
            $(".paddle_button").attr('data-email', self.email);
            break;
          case "PRO_YEARLY":
            $(".cards").append(pro_y_html);
            $(".cards").append(spro_m_html);
            $(".cards").append(spro_y_html);
            $(".pro_y_container a").remove();
            $(".s_pro_m_container a").remove();
            $(".s_pro_y_container a").remove();
            $(".pro_y_container").append(`<a class="current_button">Your current membership plan</a>`);
            $(".s_pro_m_container").append(`<a class="upgrade_button" group="SUPER_PRO_MONTHLY">Contact website administrator</a><h6>Upgrade to this plan</h6>`);
            $(".s_pro_y_container").append(`<a class="upgrade_button" group="SUPER_PRO_YEARLY">Contact website administrator</a><h6>Upgrade to this plan</h6>`);
            $(".free_container").append(`<a class="free_button downgrade_button">Downgrade to FREE</a>`);
            $(".spro_y_card").addClass("offset-md-4");
            $(".pro_y_container").append(`<h6>Next rebill date: ${self.exp_date}</h6>`);
            $(".paddle_button").attr('data-email', self.email);
            break;
          case "SUPER_PRO_MONTHLY":
            $(".cards").append(spro_m_html);
            $(".cards").append(spro_y_html);
            $(".s_pro_m_container a").remove();
            $(".s_pro_y_container a").remove();
            $(".s_pro_m_container").append(`<a class="current_button">Your current membership plan</a>`);
            $(".s_pro_y_container").append(`<a class="upgrade_button" group="SUPER_PRO_YEARLY">Contact website administrator</a><h6>Upgrade to this plan</h6>`);
            $(".free_container").append(`<a class="free_button downgrade_button">Downgrade to FREE</a>`);
            $(".s_pro_m_container").append(`<h6>Next rebill date: ${self.exp_date}</h6>`);
            $(".paddle_button").attr('data-email', self.email);
            break;
          case "SUPER_PRO_YEARLY":
            $(".cards").append(spro_y_html);
            $(".s_pro_y_container a").remove();
            $(".s_pro_y_container").append(`<a class="current_button">Your current membership plan</a>`);
            $(".free_container").append(`<a class="free_button downgrade_button">Downgrade to FREE</a>`);
            $(".s_pro_y_container").append(`<h6>Next rebill date: ${self.exp_date}</h6>`);
            $(".paddle_button").attr('data-email', self.email);
            break;
        }
        Paddle.Setup({
          vendor: 109863
        });
        upgradeSubscription(name, email);
        cancelSubscription(response.users.sub_id);
      } else {
        console.log("error")
      }
    }
  });
}

function getPaddleDetails() {
  var data =
    "vendor_id=109863&vendor_auth_code=string&subscription_id=string&plan_id=string&state=active&page=123&results_per_page=123";

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "https://vendors.paddle.com/api/2.0/subscription/users");
  xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

  xhr.send(data);
}

function cancelSubscription(sub_id) {
  $(".free_button").on("click", function (e) {
    Swal('Are you sure?', 'Are you sure, you want to downgrade to FREE Membership?', 'question');
    $(".swal2-confirm").on("click", function (e) {
      var vendor_id = "109863";
      var vendor_auth_code = "10de3cf352e470bf9953a3c897d641a4453043c0008216ee09";
      var subscription_id = sub_id;
      $.ajax({
        type: "post",
        url: "https://vendors.paddle.com/api/2.0/subscription/users_cancel",
        crossOrigin: true,
        dataType: "jsonp",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: "vendor_id=109863&vendor_auth_code=10de3cf352e470bf9953a3c897d641a4453043c0008216ee09&subscription_id=" + subscription_id,
        success: function (response) {
          console.log(response)
          if (response.success) {
            Swal('Success', 'You have successfully cancelled your membership.', 'success');
          } else {
            Swal('Error', 'Something went wrong.', 'error');
          }
        },
        error: function (x) {
          console.log(x);
        }
      });
    });
  });
}

function upgradeSubscription(name, email) {
  $(".upgrade_button").on("click", function (e) {
    var upgrade_to=$(this).attr("group");
    console.log(upgrade_to);
    window.location.href=`https://websoft365.com/contact.php?name=${name}&email=${email}&membership=${upgrade_to}`
  });
}

var pro_m_html =
`<div class="col-12 col-md-4 pro_m_card card_el">
<div class="buy_cards">
    <div class="card_head">
        <hr class="hr">
        <img class="logo" src="../assets/pro_monthly_icon.png" alt="">
        <hr class="hr">
        <h2>Monthly</h2>
        <h5>PRO Membership</h5>
    </div>
    <div class="card_body">
        <div class="price">
            <h5><b>€16.99 / Month</b></h5>
        </div>
        <ul>
            <li>Unlimited use of all the software
                and
                tools.</li>
            <li>Unlimited Chat & Email support.</li>
        </ul>
        <h5 class="category_title">In Webmaster Category</h5>
        <ul>
            <li>Unlimited widgets on up to 2 domains.
            </li>
            <li>Unlimited widgets views.</li>
            <li>Unbranded widgets.</li>
        </ul>
        <h5 class="category_title">In Social Media Category</h5>
        <ul>
            <li>Full use of all software.</li>
            <li>Full use of all tools.</li>
        </ul>
        <div class="buy_btn_container pro_m_container">
        <a class="paddle_button large paddle_styled_button green"
href="https://buy.paddle.com/product/586761" target="_blank"
data-product="586761"
data-success="https://websoft365.com/thanks.php">GET STARTED
NOW!</a>
        </div>
    </div>
</div>
</div>`;

var pro_y_html=
` <div class="col-12 col-md-4 pro_y_card card_el">
<div class="buy_cards">
    <div class="card_head">
        <hr class="hr">
        <img class="logo" src="../assets/pro_yearly_icon.png" alt="">
        <hr class="hr">
        <h2>Yearly</h2>
        <h5>PRO Membership</h5>
    </div>
    <div class="card_body">
        <div class="price">
            <h5><b>€99.99 / Year</b></h5>
        </div>
        <ul>
            <li>Unlimited use of all the software
                and
                tools.</li>
            <li>Unlimited Chat & Email support.</li>
        </ul>
        <h5 class="category_title">In Webmaster Category</h5>
        <ul>
            <li>Unlimited widgets on up to 2 domains.
            </li>
            <li>Unlimited widgets views.</li>
            <li>Unbranded widgets.</li>
        </ul>
        <h5 class="category_title">In Social Media Category</h5>
        <ul>
            <li>Full use of all software.</li>
            <li>Full use of all tools.</li>
        </ul>
        <div class="buy_btn_container pro_y_container">
            <a class="paddle_button large"
                href="https://buy.paddle.com/product/586762" target="_blank"
                data-product="586762"
                data-success="https://websoft365.com/thanks.php">GET STARTED
                NOW!</a>
        </div>
    </div>

</div>
</div>
</div>
</div>`;

var spro_m_html =
`<div class="col-12 col-md-4 spro_m_card card_el">
        <div class="buy_cards">
            <div class="card_head">
                <hr class="hr">
                <img class="logo" src="../assets/spro_monthly_icon.png" alt="">
                <hr class="hr">
                <h2>Monthly</h2>
                <h5>SUPER PRO Membership</h5>
            </div>
            <div class="card_body">
                <div class="price">
                    <h5><b>€29.99 / Month</b></h5>
                </div>
                <ul>
                    <li>Unlimited use of all the software
                        and
                        tools.</li>
                    <li>Unlimited Chat & Email support.</li>
                </ul>
                <h5 class="category_title">In Webmaster Category</h5>
                <ul>
                    <li>Unlimited widgets on up to 5 domains.
                    </li>
                    <li>Unlimited widgets views.</li>
                    <li>Unbranded widgets.</li>
                </ul>
                <h5 class="category_title">In Social Media Category</h5>
                <ul>
                    <li>Full use of all software.</li>
                    <li>Full use of all tools.</li>
                </ul>
                <div class="buy_btn_container s_pro_m_container">
                    <a class="paddle_button large"
                        href="https://buy.paddle.com/product/588972" target="_blank"
                        data-product="588972"
                        data-success="https://websoft365.com/thanks.php">GET STARTED
                        NOW!</a>
                </div>
            </div>

        </div>
    </div>`;

var spro_y_html =
`<div class="col-12 col-md-4 spro_y_card card_el">
<div class="buy_cards">
    <div class="card_head">
        <hr class="hr">
        <img class="logo" src="../assets/spro_yearly_icon.png" alt="">
        <hr class="hr">
        <h2>Yearly</h2>
        <h5>SUPER PRO Membership</h5>
    </div>
    <div class="card_body">
        <div class="price">
            <h5><b>€179.99 / Year</b></h5>
        </div>
        <ul>
            <li>Unlimited use of all the software
                and
                tools.</li>
            <li>Unlimited Chat & Email support.</li>
        </ul>
        <h5 class="category_title">In Webmaster Category</h5>
        <ul>
            <li>Unlimited widgets on up to 5 domains.
            </li>
            <li>Unlimited widgets views.</li>
            <li>Unbranded widgets.</li>
        </ul>
        <h5 class="category_title">In Social Media Category</h5>
        <ul>
            <li>Full use of all software.</li>
            <li>Full use of all tools.</li>
        </ul>
        <div class="buy_btn_container s_pro_y_container">
            <a class="paddle_button large"
                href="https://buy.paddle.com/product/588973" target="_blank"
                data-product="588973"
                data-success="https://websoft365.com/thanks.php">GET STARTED
                NOW!</a>
        </div>
    </div>
</div>
</div>`;
