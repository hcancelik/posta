<template>
  <div class="h-screen flex">
    <Navigation />
    <div class="flex-1 flex overflow-hidden">
      <router-view v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
          <div class="flex-1 overflow-y-scroll">
            <component :is="Component" />
          </div>
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
