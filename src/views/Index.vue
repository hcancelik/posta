<template>
  <Inbox>
    <template v-slot:header>Mailboxes</template>

    <template v-slot:sidebar>
      <ul class="list-none">
        <template v-if="isLoading">
          <li class="p-1">
            <Loading>Loading mailboxes...</Loading>
          </li>
        </template>
        <template v-for="mailbox in mailboxes" :key="mailbox.id">
          <router-link
            :to="{ name: 'mailbox', params: { mailbox: mailbox.id } }"
            @contextmenu="openContextMail(mailbox.id)"
            :id="mailbox.id"
          >
            <li
              class="w-full px-3 py-4 items-center text-gray-600 dark:text-gray-300 flex bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transform active:translate-y-0.5 border-b border-gray-100 dark:border-gray-700"
            >
              <div class="w-10/12 truncate pr-2">
                {{ mailbox.name }}
              </div>
              <div class="w-2/12 justify-end">
                <div
                  class="rounded-full bg-blue-400 text-center text-sm items-center justify-center text-white"
                >
                  {{ mailbox.emails > 100 ? "100+" : mailbox.emails }}
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
        <NoMailbox />
      </template>
    </div>
  </Inbox>
</template>

<script>
import Inbox from "@/views/template/Inbox";
import { remote } from "electron";
import NoMailbox from "@/views/components/NoMailbox";
import dbMixin from "@/mixins/dbMixin";
import Loading from "@/views/components/Loading";

export default {
  name: "Index",
  components: { Loading, NoMailbox, Inbox },
  mixins: [dbMixin],
  data() {
    return {
      isLoading: true,
      selectedMailbox: null,
      mailboxes: [],
      mailboxContextMenu: null,
      selectedMailboxIdForContextMenu: null,
    };
  },
  async created() {
    this.setupMenu();

    await this.fetchEmails();
  },
  methods: {
    async fetchEmails() {
      this.isLoading = true;

      this.db("mailboxes")
        .join("emails", "mailboxes.id", "=", "emails.mailbox_id")
        .select(
          "mailboxes.id",
          "mailboxes.name",
          this.db.raw("count(emails.id) as emails")
        )
        .groupBy("mailboxes.id", "mailboxes.name")
        .then((rows) => {
          this.mailboxes = rows;
        })
        .finally(() => {
          this.isLoading = true;
        });
    },
    setupMenu() {
      const menu = new remote.Menu();
      const that = this;

      menu.append(
        new remote.MenuItem({
          label: "Delete Mailbox",
          async click() {
            await that.deleteMailbox();
          },
        })
      );

      this.mailboxContextMenu = menu;
    },
    openContextMail(mailboxId) {
      this.selectedMailboxIdForContextMenu = mailboxId;

      this.mailboxContextMenu.popup({ window: remote.getCurrentWindow() });
    },
    async deleteMailbox() {
      // TODO: Delete mailbox
      console.log(`Deleting ${this.selectedMailboxIdForContextMenu}`);

      this.selectedMailboxIdForContextMenu = null;
    },
  },
};
</script>
