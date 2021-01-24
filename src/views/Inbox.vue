<template>
  <div class="flex flex-row">
    <div
      class="flex w-80 h-screen bg-gray-50 dark:bg-gray-800 border-r border-gray-100 dark:border-gray-900 shadow-sm select-none"
    >
      <div class="w-80 h-screen overflow-y-scroll">
        <div class="fixed bg-gray-50 w-80 dark:bg-gray-800">
          <h2
            class="text-black dark:text-gray-200 font-bold text-2xl border-b-2 border-r border-gray-100 dark:border-gray-900 p-3"
          >
            <template v-if="selectedMailbox">
              {{ selectedMailbox.name }}
            </template>
            <template v-else>Mailboxes</template>
          </h2>
        </div>

        <div class="overflow-y-scroll">
          <ul>
            <template v-for="(mailbox, index) in [...Array(100)]" :key="index">
              <li
                class="w-full px-3 py-4 border-b border-gray-100 dark:border-gray-900 items-center text-gray-600 dark:text-gray-300 flex bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <div class="w-10/12 truncate pr-2 text-sm">
                  {{ index }} Mailbox there is a long name it is there
                </div>
                <div class="w-2/12 justify-end">
                  <div
                    class="rounded-full bg-blue-400 text-center text-sm items-center justify-center text-white"
                  >
                    5
                    <!-- Max: 100+ -->
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
            </template>
          </ul>
        </div>
      </div>
    </div>

    <div class="w-full overflow-y-scroll w-full p-8">
      <Mailbox :mailbox="selectedMailbox" />
    </div>
  </div>
</template>

<script>
import Mailbox from "@/views/Mailbox";

export default {
  name: "Inbox",
  components: { Mailbox },
  data() {
    return {
      selectedMailbox: null,
      mailboxes: [
        {
          id: "1",
          name: "Test Mailbox 1",
        },
        {
          id: "2",
          name: "Test Mailbox 2",
        },
        {
          id: "3",
          name: "Test Mailbox 3",
        },
      ],
    };
  },
};
</script>
