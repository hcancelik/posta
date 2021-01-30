<template>
  <Inbox>
    <template v-slot:header>Mailboxes</template>

    <template v-slot:sidebar>
      <ul
        class="list-none border-b first:border-t-0 border-gray-100 dark:border-gray-700"
      >
        <template v-if="isLoading">
          <li class="p-1 first:border-t-0">
            <Loading>Loading mailboxes...</Loading>
          </li>
        </template>
        <template
          v-else-if="mailboxes.length > 0"
          v-for="mailbox in mailboxes"
          :key="mailbox.id"
        >
          <router-link
            :to="{ name: 'mailbox', params: { mailboxId: mailbox.id } }"
            @contextmenu="openContextMail(mailbox)"
            :id="mailbox.id"
          >
            <li class="w-full px-3 py-5 items-center list-item">
              <div class="w-72 truncate pr-2">
                {{ mailbox.name }}
              </div>
              <div class="w-11 justify-end">
                <div
                  class="p-1 rounded-full shadow-sm bg-green-500 dark:bg-green-600 text-center text-xs items-center justify-center text-white"
                >
                  {{ mailbox.emails > 100 ? "100+" : mailbox.emails }}
                </div>
              </div>
              <div class="w-5 justify-end text-gray-300">
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
        <template v-else>
          <li class="p-3 text-gray-400 dark:text-gray-600">No mailbox</li>
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
      selectedMailboxForContextMenu: null,
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
        .joinRaw(
          "left join emails on mailboxes.id = emails.mailbox_id and emails.read is not true"
        )
        .select(
          this.db.raw(
            "mailboxes.id, mailboxes.name, count(emails.id) as emails"
          )
        )
        .groupBy("mailboxes.id", "mailboxes.name")
        .then((rows) => {
          this.mailboxes = rows;
        })
        .finally(() => {
          this.isLoading = false;
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
    openContextMail(mailbox) {
      this.selectedMailboxForContextMenu = mailbox;

      this.mailboxContextMenu.popup({ window: remote.getCurrentWindow() });
    },
    async deleteMailbox() {
      this.db("mailboxes")
        .where("id", this.selectedMailboxForContextMenu.id)
        .del()
        .then(() => {
          this.mailboxes = this.mailboxes.filter(
            (mailbox) => mailbox.id !== this.selectedMailboxForContextMenu.id
          );

          this.$toast.success("Mailbox is deleted.");
        })
        .catch((error) => {
          this.$toast.error(error.message);
        })
        .finally(() => {
          this.selectedMailboxForContextMenu = null;
        });
    },
  },
};
</script>
