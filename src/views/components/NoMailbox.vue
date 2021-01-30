<template>
  <div class="text-gray-400 text-3xl">
    <div>Setup your application to send emails to {{ appName }}.</div>
    <div class="m-8 flex justify-center">
      <router-link :to="{ name: 'settings' }">
        <button
          class="rounded bg-gray-700 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-900 text-lg text-white dark:text-gray-400 px-4 py-2 shadow transform active:translate-y-0.5 flex items-center space-x-2 outline-none focus:outline-none active:outline-none"
        >
          <setting-icon />
          <span>View Settings</span>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import SettingIcon from "@/views/components/icons/SettingIcon";

export default {
  name: "NoMailbox",
  components: { SettingIcon },
  data() {
    return {
      appName: process.env.VUE_APP_NAME,
    };
  },
};
</script>
