<template>
  <section class="p-6">
    <PageHeader>Settings</PageHeader>

    <Box>
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium">Server Settings</h3>
        <p class="mt-1 max-w-2xl text-sm">Set the basic server settings.</p>
      </div>
      <div class="border-t border-gray-200">
        <dl>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Port</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                v-model="port"
                placeholder="2525"
                class="input"
              />
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Status</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Running
            </dd>
          </div>
        </dl>
      </div>
    </Box>

    <Box>
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium">Connection Settings</h3>
        <p class="mt-1 max-w-2xl text-sm">
          Use the following settings in your app to send email to Posta.
        </p>
      </div>
      <div class="border-t border-gray-200">
        <dl>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">SMTP Host</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              127.0.0.1
              <br />
              <span class="font-semibold text-gray-500">
                For Vagrant/Homestead
              </span>
              : 10.0.2.2
              <br />
              <span class="font-semibold text-gray-500">For Docker</span>
              : host.docker.internal
            </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Port</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ port || "2525" }}
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">User</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Mailbox-Name (This will be used as mailbox name)
            </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Password</dt>
            <dd class="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">
              Set to null or empty string
            </dd>
          </div>
        </dl>
      </div>
    </Box>
  </section>
</template>

<script>
import PageHeader from "@/views/template/PageHeader";
import Box from "@/views/template/Box";

export default {
  name: "Settings",
  components: { Box, PageHeader },
  data() {
    return {
      port: "2525",
    };
  },
};
</script>
