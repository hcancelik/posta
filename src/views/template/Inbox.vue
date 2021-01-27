<template>
  <div class="flex flex-row w-full">
    <div
      class="flex w-80 h-screen bg-gray-50 dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 shadow-sm select-none mb-3"
    >
      <div class="w-80 h-screen overflow-y-scroll">
        <div class="fixed bg-gray-50 w-80 dark:bg-gray-800">
          <h2
            class="text-black dark:text-gray-200 font-bold text-3xl border-r border-gray-100 dark:border-gray-700 p-3"
          >
            <slot name="header"></slot>
          </h2>
        </div>
        <div class="overflow-y-scroll">
          <div class="mt-16 border-t border-gray-100 dark:border-gray-700">
            <slot name="sidebar"></slot>
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-gray-100 dark:bg-gray-700 w-full overflow-y-scroll p-8 h-screen"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Inbox",
};
</script>
