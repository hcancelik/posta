<template>
  <div class="h-full flex flex-col justify-between">
    <div class="flex flex-col items-center justify-center w-full">
      <div class="p-3 mb-2 shadow-sm dark:shadow-light">
        <img
          src="../../assets/images/logo.svg"
          class="w-full h-full"
          alt="Posta"
        />
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
        :to="{ name: 'help' }"
        class="w-full flex justify-center items-center p-2.5"
      >
        <button
          class="nav-button"
          :class="{ 'nav-button-active': $route.name === 'help' }"
        >
          <help-icon class="flex justify-center" />
        </button>
      </router-link>
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
import HelpIcon from "@/views/components/icons/HelpIcon";

export default {
  name: "Navigation",
  components: { HelpIcon, SettingIcon, HomeIcon },
};
</script>
