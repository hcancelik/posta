<template>
  <section class="p-6">
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
        />
      </BoxRow>
      <BoxRow label="Status" :highlight="true">
        <div class="flex items-center">
          <input class="checkbox" type="checkbox" v-model="status" />
          <span class="text-green-700" v-if="status">Running</span>
          <span class="text-red-600" v-else>Stopped</span>
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
        <span class="font-semibold text-gray-500">For Vagrant/Homestead:</span>
        10.0.2.2
        <br />
        <span class="font-semibold text-gray-500">For Docker:</span>
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
            <component :is="framework" />
          </div>
        </transition>
      </BoxRow>
    </Box>

    <Box header="App Settings" sub-header="">
      <BoxRow label="Dark Mode">
        <select v-model="darkMode">
          <option value="default">System Default</option>
          <option value="light">Always Light</option>
          <option value="dark">Always Dark</option>
        </select>
      </BoxRow>
    </Box>
  </section>
</template>

<script>
import PageHeader from "@/views/template/PageHeader";
import Box from "@/views/template/Box";
import BoxRow from "@/views/template/BoxRow";
import Node from "@/views/framework-settings/Node";
import Laravel from "@/views/framework-settings/Laravel";

export default {
  name: "Settings",
  components: { BoxRow, Box, PageHeader, Node, Laravel },
  data() {
    return {
      status: true,
      port: "2525",
      darkMode: "default",
      framework: "",
    };
  },
  watch: {
    status(newValue) {
      if (newValue) {
        this.startServer();
      } else {
        this.stopServer();
      }
    },
  },
  computed: {
    isRunning() {
      return this.status;
    },
  },
  methods: {
    startServer() {
      console.log("starting server");
    },
    stopServer() {
      console.log("stopping server");
    },
  },
};
</script>
