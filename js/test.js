$(document).ready(function () {
    $.ajax({
        type: "post",
        url: "../backend/paddle.php",
        data: {
            "url": "https://websoft365.com/backend/paddle.php",
            "method": "POST",
            "data": {
              "alert_id": "25984269",
              "alert_name": "subscription_created",
              "cancel_url": "https://checkout.paddle.com/subscription/cancel?user=15408924&subscription=3120725&hash=ef95c39ba2179ad822bc02c50735968849a524c82c9f65d51894cb3bb0c6aba0",
              "checkout_id": "53261910-chre95cd4eda273-cca1e3c17e",
              "currency": "HUF",
              "email": "tothmatee97@gmail.com",
              "event_time": "2020-04-09 16:12:00",
              "linked_subscriptions": "",
              "marketing_consent": 0,
              "next_bill_date": "2020-05-09",
              "passthrough": "",
              "quantity": "1",
              "source": "localhost / Localhost",
              "status": "active",
              "subscription_id": "3120725",
              "subscription_plan_id": "586761",
              "unit_price": "6122.55",
              "update_url": "https://checkout.paddle.com/subscription/update?user=15408924&subscription=3120725&hash=d7194ea37617dfa243bec210a764a520662c7d6e486f4e9761e36e8422cca306",
              "user_id": "15408924",
              "p_signature": "bDkwOjeXm9bHxvt7nbbjYfEVqJTkscCoFzEBXczbJQrgK5wlPTKWentUquD5x93vI4JMt1Ugf5ETwuyjN++/Zj71B/STzbU2Tr8sVW7C267po9LKOrL1PyhChd++mMzBBiM/nacTuNiFWNrljwE4pnQRLLWAFFRgkL08DgXqFgjox7ZhwVqzJZlXY1RFfUrYc3B2b8yukITMqkViPHa8V7qdliM3Bmco3oJxxTPj1o4J+ncgyOwohYPmPN60+CLa9UDY28CdyuzJK3e4LLj62neTXWA02u02QwTa9newnKYI55h4giv2NQYzIj/9DNYYS5crxjClPcXnV05egI8aiReczg0IZzzGaHYws6eD7kc3xuZcEQZKWN2sEGDnbyF7cnKjsDrtE8glbC7qACIPMTpXyvmE2azjnzRFFoQV/XLLrJDUeT71tQXynKbPQxnFi5iRjAZDJoMkOhJbh0S0aROhNiD831lVaNDMvumzHeqsDY+aRsqhfCdtzSKuNgI1HbtbvIbVXP6J5AuY8cbeZKc84pxmqowVHFylMEMJG0298Pv2j9eenUmxxnRNCg+7AXKzZ3KjfqlByO/jd0q7UV6OQxBiDjwaScdpX5++UTNYquEuPsBqlq0RqWzqZfogsSu89zMtxRFa0uSg8tG5QYVedLqtr8AjsYAMqjlJ+K4="
            }
        },
        success: function (response) {
            console.log(response);
          }, error: function(x){
            console.log(x);
          }
        });
  });