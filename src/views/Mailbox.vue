<template>
  Mailbox Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
  architecto cumque facere impedit, ipsam maiores maxime nesciunt nostrum
  perferendis quam quasi repellendus. Aperiam aspernatur necessitatibus nisi
  nobis quo saepe sit.

  <p v-for="(a, index) in [...Array(1000)]" :key="index">
    {{ index }}
  </p>
</template>
<script>
export default {
  name: "Mailbox",
  props: {
    mailbox: {
      required: true,
      validator: (prop) => typeof prop === "object" || prop === null,
    },
  },
};
</script>

<style scoped></style>
