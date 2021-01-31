<template>
  <div class="flex-1 overflow-y-scroll p-6">
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
          <span class="text-red-700 font-semibold" v-else>Stopped</span>
        </div>
      </BoxRow>
    </Box>

    <Box
      header="Connection"
      sub-header="Use the following settings in your app to send email to Posta."
    >
      <BoxRow label="SMTP Host">
        127.0.0.1
        <br />
        <span class="font-semibold text-gray-500">Vagrant/Homestead:</span>
        10.0.2.2
        <br />
        <span class="font-semibold text-gray-500">Docker:</span>
        host.docker.internal
      </BoxRow>

      <BoxRow label="Port" :highlight="true">
        {{ port || "2525" }}
      </BoxRow>

      <BoxRow label="User">
        Mailbox-Name (This will be used as mailbox name)
      </BoxRow>

      <BoxRow label="Password" :highlight="true">
        <div class="text-gray-400">Set to null or empty string</div>
      </BoxRow>

      <BoxRow label="Framework Settings">
        <div>
          <select v-model="framework">
            <option value="" disabled>
              Select your framework to view specific settings.
            </option>
            <option value="Laravel">Laravel</option>
            <option value="Node">Nodemailer</option>
          </select>
        </div>
        <transition>
          <div v-if="framework" class="mt-6">
            <component :is="framework" :port="port" />
          </div>
        </transition>
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
    </Box>
  </div>
</template>

<script>
import settings from "electron-settings";
import PageHeader from "@/views/template/PageHeader";
import Box from "@/views/template/Box";
import BoxRow from "@/views/template/BoxRow";
import Node from "@/views/framework-settings/Node";
import Laravel from "@/views/framework-settings/Laravel";
import { ipcRenderer } from "electron";

export default {
  name: "Settings",
  components: { BoxRow, Box, PageHeader, Node, Laravel },
  data() {
    return {
      status: false,
      port: "2525",
      theme: "system",
      framework: "",
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
        this.$toast.success("Server is successfully started.");
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
