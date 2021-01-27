<!-- eslint-disable -->
<template>
  <code>
    <pre class="select-all">let transport = nodemailer.createTransport({
    host: "127.0.0.1",
    port: {{ port }},
    auth: {
      user: "Mailbox-Name",
      pass: " "
    }
  });</pre>
  </code>
</template>

<script>
export default {
  name: "Node",
  props: {
    port: {
      type: String,
      required: true,
    },
  },
};
</script>
