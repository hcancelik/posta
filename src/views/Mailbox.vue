<template>
  <Inbox>
    <template v-slot:header>
      <div class="w-full flex justify-between items-center">
        <div class="truncate">{{ mailbox.name }}</div>
        <router-link
          :to="{ name: 'index' }"
          class="cursor-pointer rounded p-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 text-gray-400 hover:text-gray-500 dark:hover:bg-gray-600 dark:hover:text-gray-300 items-center text-center transform active:translate-y-0.5 shadow"
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
        </router-link>
      </div>
    </template>

    <template v-slot:sidebar>
      <ul class="list-none">
        <template v-if="loading">
          <li class="p-2">
            <Loading>Loading emails</Loading>
          </li>
        </template>
        <li
          v-else
          v-for="email in emails"
          :key="email.id"
          class="w-full px-4 py-4 list-item flex flex-col items-start"
          :class="{
            'selected-email': selectedEmail && selectedEmail.id === email.id,
            'font-extrabold': !email.read,
          }"
          @click="showEmail(email)"
          @contextmenu="openContextMail(email)"
        >
          <div class="w-full truncate">{{ email.subject }}</div>
          <div class="w-full truncate text-sm text-gray-400 dark:text-gray-500">
            {{ email.from }}
          </div>
        </li>
      </ul>
    </template>

    <transition name="fade" mode="out-in" appear>
      <div v-if="selectedEmail" :key="selectedEmail">
        <Email :email="selectedEmail" />
      </div>
    </transition>
    <div v-if="!selectedEmail" class="h-full">
      <div
        class="w-full h-full flex justify-around items-center text-4xl text-semibold text-gray-300 dark:text-gray-500 select-none tracking-tight"
      >
        No Message Selected
      </div>
    </div>
  </Inbox>
</template>
<script>
import Inbox from "@/views/template/Inbox";
import dbMixin from "@/mixins/dbMixin";
import { remote } from "electron";
import Loading from "@/views/components/Loading";
import Email from "@/views/Email";

export default {
  name: "Mailbox",
  components: { Email, Loading, Inbox },
  props: ["mailboxId"],
  mixins: [dbMixin],
  data() {
    return {
      loading: false,
      selectedEmail: null,
      mailbox: {},
      emails: [],
      emailContextMenu: null,
      selectedEmailForContextMenu: null,
    };
  },
  async created() {
    this.loadMailbox();

    await this.loadEmails(true);

    this.setupMenu();
  },
  methods: {
    loadMailbox() {
      this.db("mailboxes")
        .select("id", "name")
        .where("id", this.mailboxId)
        .then((rows) => {
          [this.mailbox] = rows;
        });
    },
    async loadEmails(selectFirst = false) {
      this.loading = true;

      this.db("emails")
        .select()
        .where("mailbox_id", this.mailboxId)
        .orderBy("created_at", "desc")
        .then((rows) => {
          this.emails = rows;

          this.loading = false;

          if (selectFirst && this.emails.length > 0) {
            this.showEmail(this.emails[0]);
          }
        });
    },
    setupMenu() {
      const menu = new remote.Menu();
      const that = this;

      menu.append(
        new remote.MenuItem({
          label: "Delete E-mail",
          async click() {
            await that.deleteEmail();
          },
        })
      );

      this.emailContextMenu = menu;
    },
    openContextMail(email) {
      this.selectedEmailForContextMenu = email;

      this.emailContextMenu.popup({ window: remote.getCurrentWindow() });
    },
    showEmail(email) {
      this.selectedEmail = email;

      setTimeout(() => {
        this.markAsRead(email);
      }, 1000);
    },
    async markAsRead(email) {
      this.db("emails")
        .where("id", email.id)
        .update({
          read: true,
        })
        .then(() => {
          const emailId = this.emails.findIndex((e) => e.id === email.id);

          const updatedEmail = { ...email };
          updatedEmail.read = true;

          this.emails[emailId] = updatedEmail;
        });
    },
    deleteEmail() {
      this.db("emails")
        .where("id", this.selectedEmailForContextMenu.id)
        .del()
        .then(() => {
          this.emails = this.emails.filter(
            (email) => email.id !== this.selectedEmailForContextMenu.id
          );

          this.$toast.success("Email is deleted.");
        })
        .catch((error) => {
          this.$toast.error(error.message);
        })
        .finally(() => {
          this.selectedEmailForContextMenu = null;
        });
    },
  },
};
</script>

<style scoped>
.selected-email {
  @apply bg-gray-100 hover:bg-gray-100 border-l-4 border-blue-600 border-b-0 dark:bg-gray-700 dark:hover:bg-gray-700 !important;
}
</style>
