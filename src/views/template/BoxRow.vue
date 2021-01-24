<template>
  <div
    class="px-4 py-5 sm:grid sm:grid-cols-4 sm:px-6"
    :class="{ 'bg-white': !highlight, 'bg-gray-50': highlight }"
  >
    <dt class="text-sm font-medium text-gray-500">{{ label }}</dt>
    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
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
