<template>
  <Inbox @handleScroll="handleScroll">
    <template v-slot:header>
      <div class="w-full flex justify-between items-center">
        <div class="truncate flex-1">{{ mailboxName }}</div>
        <transition class="duration-300">
          <div v-show="loading">
            <Loading class="h-8 w-8" />
          </div>
        </transition>
        <router-link
          :to="{ name: 'index' }"
          class="cursor-pointer rounded p-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 text-gray-400 hover:text-gray-500 dark:hover:bg-gray-600 dark:hover:text-gray-300 items-center text-center transform active:translate-y-0.5 shadow"
        >
          <chevron-left-icon class="w-5 h-5" />
        </router-link>
        <a
          class="cursor-pointer rounded p-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 text-gray-400 hover:text-gray-500 dark:hover:bg-gray-600 dark:hover:text-gray-300 items-center text-center transform active:translate-y-0.5 shadow ml-2"
          @click="showOptions = !showOptions"
          v-click-away="clickedAway"
        >
          <more-icon class="w-5 h-5" />
          <div
            v-if="showOptions"
            class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-600 text-left font-normal"
          >
            <div class="py-1" role="menu">
              <a
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer border-b border-gray-100 dark:border-gray-700"
                role="menuitem"
                @click="markAsAllRead"
              >
                Mark All As Read
              </a>
              <a
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer"
                role="menuitem"
                @click="deleteMailbox(mailboxId)"
              >
                Delete Mailbox
              </a>
            </div>
          </div>
        </a>
      </div>
    </template>

    <template v-slot:sidebar>
      <ul class="list-none">
        <li
          v-for="email in emails"
          :key="email.id"
          class="w-full px-4 py-4 list-item flex flex-row flex-no-wrap"
          :class="{
            'selected-email': selectedEmail && selectedEmail.id === email.id,
            'font-bold': !email.read,
          }"
          @click="showEmail(email)"
          @contextmenu="openContextMail(email)"
        >
          <div class="flex items-center w-1/12" v-if="!email.read">
            <div class="block bg-blue-500 rounded-full w-2 h-2"></div>
          </div>
          <div
            class="flex flex-col items-start"
            :class="{ 'w-11/12': !email.read, 'w-full': email.read }"
          >
            <div class="w-full truncate">{{ email.subject }}</div>
            <div
              class="mt-1 w-full truncate text-xs text-gray-400 dark:text-gray-500 flex justify-between items-center"
            >
              <div class="w-2/3 truncate">{{ email.from }}</div>
              <div class="text-right">
                {{ formatDate(email.created_at) }}
              </div>
            </div>
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
import ChevronLeftIcon from "@/views/components/icons/ChevronLeftIcon";
import MoreIcon from "@/views/components/icons/MoreIcon";
import { mixin as VueClickAway } from "vue3-click-away";

export default {
  name: "Mailbox",
  components: { MoreIcon, ChevronLeftIcon, Email, Loading, Inbox },
  props: ["mailboxId", "emailId"],
  mixins: [dbMixin, VueClickAway],
  data() {
    return {
      loading: false,
      selectedEmail: null,
      emails: [],
      emailContextMenu: null,
      selectedEmailForContextMenu: null,
      page: 0,
      numOfEmails: 20,
      showOptions: false,
    };
  },
  computed: {
    mailboxName() {
      return decodeURI(this.$route.query.mailbox || "");
    },
  },
  watch: {
    emailId() {
      this.$nextTick(() => {
        this.selectEmailById(this.emailId);
      });
    },
  },
  async mounted() {
    await this.fetchData();

    this.setupMenu();

    if (this.emailId) {
      this.selectEmailById(this.emailId);
    } else if (this.emails.length > 0) {
      this.showEmail(this.emails[0]);
    }

    this.emitter.on("fetch-data", () => this.fetchData());
  },
  methods: {
    handleScroll(event) {
      if (
        event.target.scrollTop + event.target.clientHeight >=
        event.target.scrollHeight
      ) {
        this.loadEmails();
      }
    },
    formatDate(date) {
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date(date));
    },
    async fetchData() {
      await this.loadEmails(0);
    },
    async loadEmails(page = this.page) {
      this.loading = true;

      await this.db("emails")
        .select("*")
        .where("mailbox_id", this.mailboxId)
        .orderBy("created_at", "desc")
        .limit(this.numOfEmails)
        .offset(page * this.numOfEmails)
        .then((rows) => {
          if (page === 0) {
            this.emails = rows;
          } else {
            this.emails = this.emails.concat(rows);
          }
          this.page = page + 1;
        })
        .finally(() => {
          this.loading = false;
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
    selectEmailById(emailId) {
      const selectedEmail = this.emails.find(
        (email) => email.id === Number(emailId)
      );

      this.showEmail(selectedEmail);
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
        })
        .finally(() => {
          this.emitter.emit("fetch-data");
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

          this.checkRemainingEmails(
            this.selectedEmailForContextMenu.mailbox_id
          );
        })
        .catch((error) => {
          this.$toast.error(error.message);
        })
        .finally(() => {
          this.selectedEmailForContextMenu = null;

          this.emitter.emit("fetch-data");
        });
    },
    checkRemainingEmails(mailboxId) {
      this.db("emails")
        .where("mailbox_id", mailboxId)
        .then((rows) => {
          if (rows.length === 0) {
            this.deleteMailbox(mailboxId);
          }
        });
    },
    deleteMailbox(mailboxId) {
      this.db("mailboxes")
        .where("id", mailboxId)
        .del()
        .then(() => {
          this.$router.push({ name: "index" });
        });
    },
    markAsAllRead() {
      this.db("emails")
        .where("mailbox_id", this.mailboxId)
        .update({
          read: true,
        })
        .then(() => {
          this.emails = this.emails.map((email) => {
            return { ...email, read: true };
          });

          this.$toast.success("All messages are marked as read.");
        });
    },
    clickedAway() {
      this.showOptions = false;
    },
  },
};
</script>

<style scoped>
.selected-email {
  @apply bg-gray-100 hover:bg-gray-100 border-l-4 border-blue-600 border-b-0 dark:bg-gray-700 dark:hover:bg-gray-700 shadow-inner !important;
}
</style>
