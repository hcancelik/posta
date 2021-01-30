<template>
  <div class="px-6 py-3">
    <h1 class="text-3xl font-bold mb-6">{{ email.subject }}</h1>

    <div class="bg-gray-100 dark:bg-gray-800 rounded p-4 shadow">
      <dl class="space-y-2">
        <EmailInfoRow label="To">
          {{ email.to }}
        </EmailInfoRow>

        <EmailInfoRow label="Cc">
          {{ email.cc }}
        </EmailInfoRow>

        <EmailInfoRow label="Bcc">
          {{ email.bcc }}
        </EmailInfoRow>

        <EmailInfoRow label="Reply-To">
          {{ email.reply_to }}
        </EmailInfoRow>

        <EmailInfoRow label="Sent At">
          {{ formatDate(email.created_at) }}
        </EmailInfoRow>
      </dl>
    </div>

    <div class="w-full mt-6 bg-gray-50 dark:bg-gray-600 rounded shadow-sm p-3">
      <div v-html="email.html"></div>
    </div>
  </div>
</template>

<script>
import EmailInfoRow from "@/views/EmailInfoRow";

export default {
  name: "Email",
  components: { EmailInfoRow },
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
