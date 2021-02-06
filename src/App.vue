<template>
  <div class="h-screen flex">
    <div class="w-16 bg-gray-200 dark:bg-gray-900">
      <Navigation />
    </div>

    <div class="flex-1 flex overflow-hidden">
      <router-view v-slot="{ Component }">
        <transition :name="transitionName" mode="out-in" appear>
          <component :is="Component" />
        </transition>
      </router-view>
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
  mounted() {
    ipcRenderer.on("refresh-mailboxes", async (event, email) => {
      console.log("New email");

      const notification = new remote.Notification({
        title: "New Mail",
        body: email.subject,
      });

      notification.on("click", () => {
        this.$router.push({
          name: "mailbox",
          params: { mailboxId: email.mailboxId },
          query: { emailId: email.id },
        });
      });

      notification.show();

      this.emitter.emit("fetch-data");
    });
  },
};
</script>
