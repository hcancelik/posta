<template>
  <Inbox>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        Mailboxes
        <div v-if="loading">
          <Loading class="h-8 w-8" />
        </div>
      </div>
    </template>

    <template v-slot:sidebar>
      <ul
        class="list-none first:border-t-0 border-gray-100 dark:border-gray-700"
        :class="{ 'border-b': mailboxes.length > 0 }"
      >
        <template v-if="mailboxes.length > 0">
          <router-link
            v-for="mailbox in mailboxes"
            :key="mailbox.id"
            :to="{
              name: 'mailbox',
              params: { mailboxId: mailbox.id },
              query: { mailbox: encodeURI(mailbox.name) },
            }"
            @contextmenu="openContextMail(mailbox)"
            :id="mailbox.id"
          >
            <li class="w-full px-3 py-5 items-center list-item">
              <div class="w-72 truncate pr-2">
                {{ mailbox.name }}
              </div>
              <div class="w-11 justify-end">
                <div
                  class="rounded-full shadow-sm bg-green-500 dark:bg-green-600 flex text-center text-xs items-center justify-center text-white w-8 h-5 tracking-tighter"
                >
                  <template v-if="mailbox.emails > 99">99+</template>
                  <template v-else-if="mailbox.emails === 0">
                    <CheckIcon class="w-3.5 h-3.5" />
                  </template>
                  <template v-else>{{ mailbox.emails }}</template>
                </div>
              </div>
              <div class="w-5 justify-end text-gray-300">
                <chevron-right-icon />
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
import ChevronRightIcon from "@/views/components/icons/ChevronRightIcon";
import CheckIcon from "@/views/components/icons/CheckIcon";

export default {
  name: "Index",
  components: { CheckIcon, ChevronRightIcon, Loading, NoMailbox, Inbox },
  mixins: [dbMixin],
  data() {
    return {
      loading: true,
      selectedMailbox: null,
      mailboxes: [],
      mailboxContextMenu: null,
      selectedMailboxForContextMenu: null,
    };
  },
  async mounted() {
    this.setupMenu();

    await this.fetchData();

    this.emitter.on("fetch-data", () => this.fetchData());
  },
  methods: {
    async fetchData() {
      console.log("fetch data");
      this.loading = true;

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
          this.loading = false;
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
