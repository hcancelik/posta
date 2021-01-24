<template>
  <div class="w-full mb-6">
    <h1 class="text-4xl text-gray-900 dark:text-gray-200 mb-4 select-none">
      <slot />
    </h1>

    <hr class="border border-gray-200 dark:border-gray-700" />
  </div>
</template>

<script>
export default {
  name: "PageHeader",
};
</script>
