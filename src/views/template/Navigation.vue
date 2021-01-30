<template>
  <div class="h-full flex flex-col justify-between">
    <div class="flex flex-col items-center justify-center w-full space-y-3">
      <router-link :to="{ name: 'index' }">
        <button
          class="nav-button"
          :class="{
            'nav-button-active': ['index', 'mailbox'].includes($route.name),
          }"
        >
          <home-icon />
        </button>
      </router-link>
    </div>

    <div class="flex flex-col items-center justify-end w-full pb-3">
      <router-link :to="{ name: 'settings' }">
        <button
          class="nav-button"
          :class="{ 'nav-button-active': $route.name === 'settings' }"
        >
          <setting-icon />
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import HomeIcon from "@/views/components/icons/HomeIcon";
import SettingIcon from "@/views/components/icons/SettingIcon";

export default {
  name: "Navigation",
  components: { SettingIcon, HomeIcon },
};
</script>

<style scoped></style>
