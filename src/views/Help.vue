<template>
  <div class="flex-1 overflow-y-scroll px-6 py-3">
    <PageHeader>Connection Settings</PageHeader>

    <Box
      header="Details"
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
        <div class="text-gray-400">Set to any string</div>
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
  </div>
</template>

<script>
import settings from "electron-settings";
import Box from "@/views/template/Box";
import BoxRow from "@/views/template/BoxRow";
import PageHeader from "@/views/template/PageHeader";
import Node from "@/views/framework-settings/Node";
import Laravel from "@/views/framework-settings/Laravel";

export default {
  name: "Help",
  components: { Box, BoxRow, Node, Laravel, PageHeader },
  data() {
    return {
      port: "2525",
      framework: "",
    };
  },
  async created() {
    this.port = (await settings.get("port")) || "2525";
  },
};
</script>

<style scoped></style>
