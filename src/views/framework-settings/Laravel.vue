<!-- eslint-disable -->
<template>
  <h5 class="font-semibold">Laravel 7 and above</h5>
  <code>
    <pre class="select-all">MAIL_MAILER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME="Posta Inbox Name"
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null</pre>
  </code>

  <h5 class="font-semibold">Laravel 6 and below</h5>

  <code>
    <pre class="select-all">MAIL_DRIVER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=Inbox-Name
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null</pre>
  </code>
</template>

<script>
export default {
  name: "Laravel",
};
</script>
