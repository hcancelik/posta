<template>
  <div class="px-6 py-6">
    <h1
      class="text-3xl font-bold mb-4 px-0.5 tracking-tight dark:text-gray-200"
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

    <div
      class="bg-gray-100 dark:bg-gray-800 rounded-md px-6 py-6 shadow mt-4"
      v-if="attachments.length > 0"
    >
      <div
        class="text-gray-400 font-bold dark:text-gray-500 select-none uppercase text-sm"
      >
        Attachments
      </div>
      <div class="flex flex-row w-full flex-wrap items-center mt-2">
        <div
          v-for="attachment in attachments"
          :key="attachment.id"
          class="flex text-sm justify-center items-center font-medium py-1 px-2 rounded-md shadow-sm bg-blue-500 hover:bg-opacity-95 text-white transform active:translate-y-0.5 cursor-pointer m-1"
          @click="downloadAttachment(attachment)"
        >
          <paper-clip-icon class="w-4 h-4 mr-2" />
          {{ attachment.filename }}
        </div>
      </div>
    </div>

    <div
      class="w-full mt-6 bg-gray-50 dark:bg-gray-600 dark:text-gray-200 rounded-md shadow"
    >
      <nav class="px-8 pt-2 rounded-t-md bg-gray-100 dark:bg-gray-800">
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

      <div>
        <div v-if="selectedTab === 'html'" class="p-5">
          <iframe
            class="w-full border-none rounded shadow"
            :srcdoc="email.html"
            id="html"
            @load="resizeIframe"
            style="height: 800px"
          ></iframe>
        </div>
        <div v-if="selectedTab === 'html-source'">
          <pre v-highlightjs="email.html" class="text-sm whitespace-pre-wrap">
            <code class="html"></code>
          </pre>
        </div>
        <div
          v-if="selectedTab === 'text'"
          class="text-gray-700 dark:text-gray-200 mt-2 px-8 py-4"
        >
          <div class="whitespace-pre-wrap">
            {{ formatRaw(email.text) }}
          </div>
        </div>
        <div
          v-if="selectedTab === 'raw'"
          class="text-gray-700 dark:text-gray-200 w-full mt-2 px-8 py-4"
        >
          <div class="whitespace-pre-wrap">
            {{ formatRaw(email.raw) }}
          </div>
        </div>
        <div
          v-if="selectedTab === 'headers'"
          class="text-gray-700 dark:text-gray-200 w-full mt-2 px-8 py-4"
        >
          <table class="w-full table-auto">
            <tr
              v-for="(header, index) in JSON.parse(email.headers)"
              :key="index"
            >
              <th class="text-left uppercase p-2 text-sm">{{ header.key }}:</th>
              <td class="select-all py-2 px-3">
                <template v-if="header.line">
                  {{
                    header.line.replace(new RegExp(`${header.key}:`, "i"), "")
                  }}
                </template>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dbMixin from "@/mixins/dbMixin";
import PaperClipIcon from "@/views/components/icons/PaperClipIcon";

const { shell } = require("electron");

export default {
  name: "Email",
  components: { PaperClipIcon },
  mixins: [dbMixin],
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
        raw: "Raw",
        headers: "Headers",
      },
      attachments: [],
    };
  },
  async created() {
    await this.fetchAttachments();
  },
  methods: {
    formatDate(date) {
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeStyle: "long",
      }).format(new Date(date));
    },
    formatRaw(str) {
      if (!str) {
        return "Text content is not provided.";
      }

      return str
        .substring(1, str.length - 1)
        .split("\\r\\n")
        .join("\r\n");
    },
    resizeIframe() {
      const iframe = document.getElementById("html");

      iframe.style.height = `${iframe.contentWindow.document.documentElement.scrollHeight}px`;

      iframe.contentDocument.body.addEventListener("click", (event) => {
        event.preventDefault();

        const href =
          event.target.href ||
          event.target.parentElement.href ||
          event.currentTarget.href;

        if (href) {
          shell.openExternal(href);
        }
      });
    },
    async fetchAttachments() {
      this.db("attachments")
        .where("email_id", this.email.id)
        .then((rows) => {
          this.attachments = rows;
        });
    },
    downloadAttachment(attachment) {
      const blob = new Blob([attachment.content], {
        type: attachment.content_type,
      });
      const link = document.createElement("a");

      link.href = window.URL.createObjectURL(blob);
      link.download = attachment.filename;

      link.click();
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
