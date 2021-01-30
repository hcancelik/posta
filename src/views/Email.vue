<template>
  <div class="px-6 py-3">
    <h1
      class="text-4xl font-bold mb-4 px-0.5 tracking-tight dark:text-gray-200"
    >
      {{ email.subject }}
    </h1>

    <div class="bg-gray-100 dark:bg-gray-800 rounded-md p-4 shadow">
      <table class="table-fixed w-full" id="email-info">
        <tr>
          <th>From:</th>
          <td>{{ email.from }}</td>
          <template v-if="email.cc">
            <th>Cc:</th>
            <td>{{ email.cc }}</td>
          </template>
          <template v-else>
            <td colspan="2"></td>
          </template>
        </tr>
        <tr></tr>
        <tr>
          <th>To:</th>
          <td>{{ email.to }}</td>
          <template v-if="email.bcc">
            <th>Bcc:</th>
            <td>{{ email.bcc }}</td>
          </template>
          <template v-else>
            <td colspan="2"></td>
          </template>
        </tr>
        <tr v-if="email.reply_to">
          <th>Reply-To:</th>
          <td colspan="3">{{ email.reply_to }}</td>
        </tr>
        <tr>
          <th>Sent At:</th>
          <td>{{ formatDate(email.created_at) }}</td>
        </tr>
      </table>
    </div>

    <div class="w-full mt-6 bg-gray-50 dark:bg-gray-600 rounded-md shadow">
      <div v-html="email.html"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Email",
  props: {
    email: {
      required: true,
      type: Object,
    },
  },
  methods: {
    formatDate(date) {
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeStyle: "long",
      }).format(new Date(date));
    },
  },
};
</script>

<style scoped>
#email-info th {
  @apply text-right text-gray-700 dark:text-gray-500 py-1 px-4 select-none w-36;
}
#email-info td {
  @apply text-gray-800 dark:text-gray-200 py-1 px-2 select-all;
}
</style>
