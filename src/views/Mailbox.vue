<template>
  <Inbox>
    <template v-slot:header>
      <div class="w-full flex justify-between items-center">
        <div class="truncate">{{ mailbox.name }}</div>
        <router-link :to="{ name: 'index' }">
          <div
            class="cursor-pointer rounded p-1 bg-gray-100 dark:bg-gray-700 text-gray-300 hover:bg-gray-200 hover:text-gray-400 dark:hover:bg-gray-600 items-center text-center transform active:translate-y-0.5 shadow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-left"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
        </router-link>
      </div>
    </template>

    <template v-slot:sidebar>
      <ul class="list-none">
        <li
          v-for="email in mailbox.emails"
          :key="email.id"
          class="w-full px-3 py-4 border-b border-gray-100 dark:border-gray-700 items-center text-gray-600 dark:text-gray-300 flex bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transform active:translate-y-0.5"
          @click="showEmail(email)"
        >
          {{ email.id }}
        </li>
      </ul>
    </template>

    <transition name="fade" mode="out-in" appear>
      <div v-if="selectedEmail">
        {{ selectedEmail }}
      </div>
      <div v-else class="h-full">
        <div
          class="w-full h-full flex justify-around items-center text-4xl text-semibold text-gray-300 dark:text-gray-500 select-none tracking-tight"
        >
          No Message Selected
        </div>
      </div>
    </transition>
  </Inbox>
</template>
<script>
import Inbox from "@/views/template/Inbox";
import dbMixin from "@/mixins/dbMixin";

export default {
  name: "Mailbox",
  components: { Inbox },
  mixins: [dbMixin],
  data() {
    return {
      selectedEmail: null,
      mailbox: null,
    };
  },
  async created() {
    await this.loadMailbox();
  },
  methods: {
    async loadMailbox() {
      // log mailbox
    },
    showEmail(email) {
      this.selectedEmail = null;
      this.$nextTick(() => {
        this.selectedEmail = email;
      });
    },
  },
};
</script>
