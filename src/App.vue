<template>
  <div class="h-screen flex">
    <div class="w-16 bg-gray-200 dark:bg-gray-900 shadow pt-3">
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

const { ipcRenderer } = require("electron");

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

      this.transitionName = transition ? transition.class : "";
    },
  },
  mounted() {
    ipcRenderer.on("refresh-mailboxes", async () => {
      console.log("New email");

      this.emitter.emit("fetch-data");
    });
  },
};
</script>
