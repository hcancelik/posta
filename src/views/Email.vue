<template>
  <div class="px-6 py-3">
    <h1
      class="text-4xl font-bold mb-4 px-0.5 tracking-tight dark:text-gray-200"
    >
      {{ email.subject }}
    </h1>

    <div class="bg-gray-100 dark:bg-gray-800 rounded-md p-4 shadow">
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-2 xl:gap-1">
        <div class="xl:grid xl:grid-cols-12 xl:gap-4">
          <div class="label xl:col-span-3">To:</div>
          <div class="value xl:col-span-9">{{ email.to }}</div>
        </div>
        <div class="xl:grid xl:grid-cols-12 xl:gap-4">
          <div class="label xl:col-span-3">From:</div>
          <div class="value xl:col-span-9">{{ email.from }}</div>
        </div>
        <div class="xl:grid xl:grid-cols-12 xl:gap-4" v-if="email.cc">
          <div class="label xl:col-span-3">Cc:</div>
          <div class="value xl:col-span-9">{{ email.cc }}</div>
        </div>
        <div class="xl:grid xl:grid-cols-12 xl:gap-4" v-if="email.bcc">
          <div class="label xl:col-span-3">Bcc:</div>
          <div class="value xl:col-span-9">{{ email.bcc }}</div>
        </div>
        <div class="xl:grid xl:grid-cols-12 xl:gap-4" v-if="email.reply_to">
          <div class="label xl:col-span-3">Reply-To:</div>
          <div class="value xl:col-span-9">{{ email.reply_to }}</div>
        </div>
        <div class="grid xl:grid-cols-12 xl:gap-4 col-start-1">
          <div class="label xl:col-span-3">Sent At:</div>
          <div class="value xl:col-span-9">
            {{ formatDate(email.created_at) }}
          </div>
        </div>
      </div>
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
.label {
  @apply text-gray-700 dark:text-gray-500 select-none xl:text-right;
}

.value {
  @apply text-gray-800 dark:text-gray-200 select-all;
}
</style>
