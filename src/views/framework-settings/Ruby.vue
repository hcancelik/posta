<template>
  <code>
    <pre class="select-all">
config.action_mailer.delivery_method = :smtp
config.action_mailer.smtp_settings = {
  :user_name => 'Your App Name',
  :password => ' ',
  :address => '127.0.0.1',
  :domain => '127.0.0.1',
  :port => '{{ port }}',
  :authentication => :plain</pre
    >
  </code>
</template>

<script>
export default {
  name: "Ruby",
  props: {
    port: {
      type: String,
      required: true,
    },
  },
};
</script>
