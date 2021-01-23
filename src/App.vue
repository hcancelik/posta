<template>
  <div class="h-screen flex">
    <Navigation />
    <div class="flex-1 flex overflow-hidden">
      <router-view v-slot="{ Component }">
        <div class="flex-1 overflow-y-scroll">
          <transition name="slide-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </div>
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
