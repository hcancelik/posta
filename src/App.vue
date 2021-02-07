<template>
  <div class="h-screen flex">
    <div class="w-16 bg-gray-200 dark:bg-gray-900">
      <Navigation />
    </div>
    <div class="flex-1 flex overflow-hidden">
      <div class="w-full">
        <transition>
          <div
            v-if="serverError"
            class="block w-full p-3 bg-red-700 text-white font-semibold shadow"
          >
            {{ serverError }}
          </div>
        </transition>
        <router-view v-slot="{ Component }">
          <transition :name="transitionName" mode="out-in" appear>
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import transitions from "@/router/transitions";
import Navigation from "./views/template/Navigation.vue";

const { ipcRenderer, remote } = require("electron");

export default {
  name: "App",
  components: { Navigation },
  data() {
    return {
      transitionName: "",
      serverError: null,
    };
  },
  watch: {
    $route(to, from) {
      const transition = transitions.find(
        (t) => t.to === to.name && t.from === from.name
      );

      this.transitionName = transition ? transition.class : "slide-fade";
    },
  },
  async created() {
    await ipcRenderer.invoke("server:start");
  },
  async mounted() {
    ipcRenderer.on("refresh-mailboxes", async (event, data) => {
      const { email, mailboxName, notificationSoundSetting } = data;

      const notification = new remote.Notification({
        title: "New Mail",
        body: email.subject,
        silent: !(
          notificationSoundSetting === undefined || notificationSoundSetting
        ),
      });

      notification.on("click", () => {
        this.$router.push({
          name: "mailbox",
          params: { mailboxId: email.mailboxId },
          query: { emailId: email.id, mailbox: mailboxName },
        });
      });

      notification.show();

      this.emitter.emit("fetch-data");
    });

    ipcRenderer.on("server-status-change", async (event, data) => {
      if (data.status === false && data.code === "EADDRINUSE") {
        this.serverError = data.message;
      } else {
        this.serverError = null;
      }

      await this.$nextTick(() => {
        this.emitter.emit("server-status-changed", data);
      });
    });
  },
};
</script>
