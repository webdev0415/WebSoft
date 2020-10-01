<?php

echo "<!-- Global site tag (gtag.js) - Google Ads: 950518544 -->
<script async src='https://www.googletagmanager.com/gtag/js?id=AW-950518544'></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-950518544');
</script>";
if (isset($_SESSION['logged_in'])) {
echo "<script>
gtag('event', 'conversion', {'send_to': 'AW-950518544/1BHuCIua9NABEJCGn8UD'});
</script>";
}

?>
