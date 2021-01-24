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
    </Box>

    <Box header="App Settings" sub-header="">
      <BoxRow label="Dark Mode">
        <select class="">
          <option>System Default</option>
          <option>Always Light</option>
          <option>Always Dark</option>
        </select>
      </BoxRow>
    </Box>
  </section>
</template>

<script>
import PageHeader from "@/views/template/PageHeader";
import Box from "@/views/template/Box";
import BoxRow from "@/views/template/BoxRow";

export default {
  name: "Settings",
  components: { BoxRow, Box, PageHeader },
  data() {
    return {
      status: true,
      port: "2525",
    };
  },
  computed: {
    isRunning() {
      return this.status;
    },
  },
};
</script>
