<template>
  <div
    class="px-4 py-5 sm:grid sm:grid-cols-3 xl:grid-cols-4 sm:px-6"
    :class="{
      'bg-white dark:bg-gray-700': !highlight,
      'bg-gray-50 dark:bg-gray-800': highlight,
    }"
  >
    <dt
      class="text-sm font-medium text-gray-500 dark:text-gray-400 select-none"
    >
      {{ label }}
    </dt>
    <dd
      class="mt-1 text-sm text-gray-900 dark:text-gray-400 sm:mt-0 sm:col-span-2"
    >
      <slot />
    </dd>
  </div>
</template>

<script>
export default {
  name: "BoxRow",
  props: {
    label: {
      type: String,
      required: true,
    },
    highlight: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
