<template>
  <div class="flex-1 overflow-y-scroll px-6 py-3">
    <PageHeader>Settings</PageHeader>

    <Box
      header="SMTP Server"
      sub-header="Here is your basic smtp server settings."
    >
      <BoxRow label="Port">
        <input
          type="text"
          v-model="port"
          :disabled="isRunning"
          placeholder="2525"
          class="text-input"
          @change="updateSetting('port', port)"
        />
      </BoxRow>
      <BoxRow label="Status" :highlight="true">
        <div class="flex items-center">
          <input
            class="checkbox"
            type="checkbox"
            v-model="status"
            @change="changeServerStatus"
          />
          <span class="text-green-700 font-semibold" v-if="status">
            Running...
          </span>
          <span class="text-red-700 font-semibold" v-else>
            {{ statusMessage }}
          </span>
        </div>
      </BoxRow>
    </Box>

    <Box header="App Settings" sub-header="">
      <BoxRow label="Theme">
        <select v-model="theme" @change="changeTheme">
          <option value="system">System Default</option>
          <option value="light">Always Light</option>
          <option value="dark">Always Dark</option>
        </select>
      </BoxRow>

      <BoxRow label="Notification Sound">
        <div class="flex items-center">
          <input
            class="checkbox"
            type="checkbox"
            v-model="notificationSound"
            @change="updateSetting('notification-sound', notificationSound)"
          />
          <span class="text-green-700 font-semibold" v-if="notificationSound">
            On
          </span>
          <span class="text-gray-500 font-semibold" v-else>Off</span>
        </div>
      </BoxRow>
    </Box>
  </div>
</template>

<script>
import settings from "electron-settings";
import PageHeader from "@/views/template/PageHeader";
import Box from "@/views/template/Box";
import BoxRow from "@/views/template/BoxRow";
import { ipcRenderer } from "electron";

export default {
  name: "Settings",
  components: { BoxRow, Box, PageHeader },
  data() {
    return {
      status: false,
      statusMessage: "",
      port: "2525",
      theme: "system",
      notificationSound: true,
    };
  },
  computed: {
    isRunning() {
      return this.status;
    },
  },
  async created() {
    this.theme = (await settings.get("theme")) || "system";
    this.port = (await settings.get("port")) || "2525";
    this.status = await settings.get("server-running");

    const notificationSoundSetting = await settings.get("notification-sound");

    this.notificationSound =
      notificationSoundSetting === undefined ? true : notificationSoundSetting;

    this.emitter.on("server-status-changed", (data) => {
      this.status = data.status;
      this.statusMessage = data.message;
    });
  },
  methods: {
    async changeServerStatus() {
      if (this.status) {
        await this.startServer();
      } else {
        await this.stopServer();
      }
    },
    async startServer() {
      await ipcRenderer.invoke("server:start").then(() => {
        this.statusMessage = "Server is starting...";
      });
    },
    async stopServer() {
      await ipcRenderer.invoke("server:stop").then(() => {
        this.$toast.warning("Server is stopped.");
      });
    },
    async updateSetting(setting, value) {
      await settings.set(setting, value);
    },
    async changeTheme() {
      await ipcRenderer.invoke("theme:change", this.theme);

      await this.updateSetting("theme", this.theme);
    },
  },
};
</script>
