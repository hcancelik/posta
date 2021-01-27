<template>
  <Inbox>
    <template v-slot:header>Mailboxes</template>

    <template v-slot:sidebar>
      <ul class="list-none">
        <template v-for="mailbox in mailboxes" :key="mailbox.id">
          <router-link
            :to="{ name: 'mailbox', params: { mailbox: mailbox.id } }"
          >
            <li
              class="w-full px-3 py-4 items-center text-gray-600 dark:text-gray-300 flex bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transform active:translate-y-0.5 border-b border-gray-100 dark:border-gray-700"
              @click="selectMailBox(mailbox)"
            >
              <div class="w-10/12 truncate pr-2">
                {{ mailbox.name }}
              </div>
              <div class="w-2/12 justify-end">
                <div
                  class="rounded-full bg-blue-400 text-center text-sm items-center justify-center text-white"
                >
                  {{ mailbox.emailCount > 100 ? "100+" : mailbox.emailCount }}
                </div>
              </div>
              <div class="w-1/12 justify-end text-gray-300 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </li>
          </router-link>
        </template>
      </ul>
    </template>

    <div
      class="w-full h-full flex justify-around items-center text-4xl text-semibold text-gray-300 dark:text-gray-500 select-none text-center tracking-tight"
    >
      <template v-if="mailboxes.length > 0">No Mailbox Selected</template>
      <template v-else>
        <div class="text-gray-400 text-3xl">
          <div>Setup your application to send emails to {{ appName }}.</div>
          <div class="m-8 flex justify-center">
            <router-link :to="{ name: 'settings' }">
              <button
                class="rounded bg-gray-700 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-900 text-lg text-white dark:text-gray-400 px-4 py-2 shadow transform active:translate-y-0.5 flex items-center space-x-2 outline-none focus:outline-none active:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-settings"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                  ></path>
                </svg>
                <span>View Settings</span>
              </button>
            </router-link>
          </div>
        </div>
      </template>
    </div>
  </Inbox>
</template>

<script>
import Inbox from "@/views/template/Inbox";

export default {
  name: "Index",
  components: { Inbox },
  data() {
    return {
      appName: process.env.VUE_APP_NAME,
      selectedMailbox: null,
      mailboxes: [
        {
          id: "1",
          name: "Test Mailbox 1",
          emailCount: 25,
        },
        {
          id: "2",
          name: "Test Mailbox 2",
          emailCount: 0,
        },
        {
          id: "3",
          name: "Test Mailbox 3",
          emailCount: 125,
        },
      ],
    };
  },
  methods: {
    selectMailBox(mailbox) {
      this.selectedMailbox = mailbox;
    },
  },
};
</script>
