<template>
  <div class="flex flex-row w-full">
    <div
      class="flex w-88 h-screen bg-gray-50 dark:bg-gray-800 select-none mb-3"
    >
      <div class="w-88 h-screen overflow-y-scroll">
        <div class="fixed bg-gray-50 w-88 dark:bg-gray-800 z-50">
          <h2
            class="text-black dark:text-gray-200 font-bold text-2xl py-4 px-3.5 shadow-sm"
          >
            <slot name="header"></slot>
          </h2>
        </div>
        <div class="overflow-y-scroll">
          <div class="mt-16">
            <slot name="sidebar"></slot>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-200 dark:bg-gray-700 w-full overflow-y-scroll h-screen">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Inbox",
};
</script>
