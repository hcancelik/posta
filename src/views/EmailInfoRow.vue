<template>
  <div class="grid grid-cols-8 gap-1">
    <dt
      class="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-tight select-none"
    >
      {{ label }}:
    </dt>
    <dd class="text-sm text-gray-700 dark:text-gray-400 col-span-7 select-all">
      <slot />
    </dd>
  </div>
</template>

<script>
export default {
  name: "EmailInfoRow",
  props: {
    label: {
      required: true,
      type: String,
    },
  },
};
</script>
