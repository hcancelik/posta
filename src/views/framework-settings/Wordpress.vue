<template>
  <code>
    <pre class="select-all">
function posta($phpmailer) {
  $phpmailer->isSMTP();
  $phpmailer->Host = '127.0.0.1';
  $phpmailer->SMTPAuth = true;
  $phpmailer->Port = 2525;
  $phpmailer->Username = 'Your App Name';
  $phpmailer->Password = ' ';
}

add_action('phpmailer_init', 'posta');</pre
    >
  </code>
</template>

<script>
export default {
  name: "Wordpress",
};
</script>
