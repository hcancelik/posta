<template>
  <div
    class="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-400 shadow rounded-md mb-12"
  >
    <div class="px-4 py-5 sm:px-6 select-none">
      <h3 class="text-lg leading-6 font-medium">{{ header }}</h3>
      <p class="mt-1 max-w-2xl text-sm">{{ subHeader }}</p>
    </div>

    <div class="border-t border-gray-200 dark:border-gray-700">
      <dl>
        <slot />
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: "Box",
  props: {
    header: {
      type: String,
      required: true,
    },
    subHeader: {
      type: String,
      default: "",
    },
  },
};
</script>
