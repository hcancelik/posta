<template>
  <div
    class="bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300 shadow rounded-md mb-12"
  >
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium">{{ header }}</h3>
      <p class="mt-1 max-w-2xl text-sm">{{ subHeader }}}</p>
    </div>

    <div class="border-t border-gray-200">
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

<style scoped></style>
