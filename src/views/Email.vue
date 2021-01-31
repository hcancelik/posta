<template>
  <div class="px-6 py-3">
    <h1
      class="text-4xl font-bold mb-4 px-0.5 tracking-tight dark:text-gray-200"
    >
      {{ email.subject }}
    </h1>

    <div class="bg-gray-100 dark:bg-gray-800 rounded-md px-6 py-6 shadow">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
        <div class="lg:grid lg:grid-cols-12 lg:gap-4 items-top">
          <div class="label lg:col-span-3">To:</div>
          <div class="value lg:col-span-9">{{ email.to }}</div>
        </div>
        <div class="lg:grid lg:grid-cols-12 lg:gap-4 items-top">
          <div class="label lg:col-span-3">From:</div>
          <div class="value lg:col-span-9">{{ email.from }}</div>
        </div>
        <div class="lg:grid lg:grid-cols-12 lg:gap-4 items-top" v-if="email.cc">
          <div class="label lg:col-span-3">Cc:</div>
          <div class="value lg:col-span-9">{{ email.cc }}</div>
        </div>
        <div
          class="lg:grid lg:grid-cols-12 lg:gap-4 items-top"
          v-if="email.bcc"
        >
          <div class="label lg:col-span-3">Bcc:</div>
          <div class="value lg:col-span-9">{{ email.bcc }}</div>
        </div>
        <div
          class="lg:grid lg:grid-cols-12 lg:gap-4 items-top"
          v-if="email.reply_to"
        >
          <div class="label lg:col-span-3">Reply-To:</div>
          <div class="value lg:col-span-9">{{ email.reply_to }}</div>
        </div>
        <div class="grid lg:grid-cols-12 lg:gap-4 items-top col-start-1">
          <div class="label lg:col-span-3">Sent At:</div>
          <div class="value lg:col-span-9">
            {{ formatDate(email.created_at) }}
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mt-6 bg-gray-50 dark:bg-gray-600 rounded-md shadow">
      <nav class="px-8 pt-2 rounded-t-md bg-gray-100 dark:bg-gray-400">
        <div class="-mb-px flex justify-start">
          <template v-for="(value, key) in tabs" :key="key">
            <a
              class="sub-nav-button"
              :class="{ 'border-b-2 border-blue-700': selectedTab === key }"
              @click="selectedTab = key"
            >
              {{ value }}
            </a>
          </template>
        </div>
      </nav>

      <div class="mt-2 px-8 py-4">
        <div v-if="selectedTab === 'html'" v-html="email.html"></div>
        <div v-if="selectedTab === 'html-source'">{{ email.html }}</div>
        <div v-if="selectedTab === 'text'">{{ email.text }}</div>
        <div v-if="selectedTab === 'headers'">
          <table class="w-full table-auto">
            <tr
              v-for="(header, index) in JSON.parse(email.headers)"
              :key="index"
            >
              <th class="text-left uppercase p-2 text-sm">{{ header.key }}</th>
              <td class="select-all">{{ header.line }}</td>
            </tr>
          </table>
        </div>
        <div v-if="selectedTab === 'raw'">
          <pre class="text-gray-600 dark:text-gray-300 w-full">{{
            formatRaw(email.raw)
          }}</pre>
        </div>
      </div>
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
  data() {
    return {
      selectedTab: "html",
      tabs: {
        html: "HTML",
        "html-source": "HTML (Source)",
        text: "Text",
        headers: "Headers",
        raw: "Raw",
      },
    };
  },
  methods: {
    formatDate(date) {
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeStyle: "long",
      }).format(new Date(date));
    },
    formatRaw(str) {
      return str
        .substring(1, str.length - 1)
        .split("\\r\\n")
        .join("\n\r");
    },
  },
};
</script>

<style scoped>
.label {
  @apply text-gray-700 font-bold dark:text-gray-500 select-none lg:text-right uppercase text-sm;
}

.value {
  @apply text-gray-800 dark:text-gray-200 select-all text-sm;
}

.sub-nav-button {
  @apply no-underline text-gray-700 dark:text-gray-200 select-none uppercase font-bold text-sm py-3 mr-8 cursor-pointer;
}
</style>
