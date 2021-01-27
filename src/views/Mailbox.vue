<template>
  <Inbox>
    <template v-slot:header>
      <div class="w-full flex justify-between items-center">
        <div class="truncate">{{ mailbox.name }}</div>
        <router-link :to="{ name: 'index' }">
          <div
            class="cursor-pointer rounded p-1 bg-gray-100 dark:bg-gray-700 text-gray-300 hover:bg-gray-200 hover:text-gray-400 dark:hover:bg-gray-600 items-center text-center transform active:translate-y-0.5"
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

export default {
  name: "Mailbox",
  components: { Inbox },
  data() {
    return {
      selectedEmail: null,
      mailbox: {
        id: "1",
        name: "Test Mailbox 1",
        emails: [
          {
            id: 1,
            from: "test@test.com",
            to: "something@something.com",
            subject: "Test",
            html: "Message",
          },
          {
            id: 2,
            from: "test@test.com",
            to: "something@something.com",
            subject: "Test 2",
            html: "Message",
          },
          {
            id: 3,
            from: "test@test.com",
            to: "something@something.com",
            subject: "Test 3",
            html: "Message",
          },
          {
            id: 4,
            from: "test@test.com",
            to: "something@something.com",
            subject: "Test 4",
            html: "Message",
          },
          {
            id: 5,
            from: "test@test.com",
            to: "something@something.com",
            subject: "Test 5",
            html: "Message",
          },
          {
            id: 6,
            from: "test@test.com",
            to: "something@something.com",
            subject: "Test 6",
            html: "Message",
          },
        ],
      },
    };
  },
  methods: {
    showEmail(email) {
      this.selectedEmail = null;
      this.$nextTick(() => {
        this.selectedEmail = email;
      });
    },
  },
};
</script>
