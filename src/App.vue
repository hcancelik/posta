<template>
  <div class="h-screen flex">
    <div class="w-16 bg-gray-200 dark:bg-gray-900 shadow pt-3">
      <Navigation />
    </div>

    <div class="flex-1 flex overflow-hidden">
      <router-view v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import Navigation from "./views/template/Navigation.vue";

export default {
  name: "App",
  components: { Navigation },
};
</script>
