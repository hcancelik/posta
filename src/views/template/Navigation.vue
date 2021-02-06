<template>
  <div class="h-full flex flex-col justify-between">
    <div class="flex flex-col items-center justify-center w-full">
      <div class="p-3">
        <img src="../../assets/images/logo.png" alt="Posta" />
      </div>
      <router-link
        :to="{ name: 'index' }"
        class="w-full flex justify-center items-center p-2.5"
      >
        <button
          class="nav-button"
          :class="{
            'nav-button-active': ['index', 'mailbox'].includes($route.name),
          }"
        >
          <home-icon class="flex justify-center" />
        </button>
      </router-link>
    </div>

    <div class="flex flex-col items-center justify-end w-full">
      <router-link
        :to="{ name: 'settings' }"
        class="w-full flex justify-center items-center p-2.5"
      >
        <button
          class="nav-button"
          :class="{ 'nav-button-active': $route.name === 'settings' }"
        >
          <setting-icon class="flex justify-center" />
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
