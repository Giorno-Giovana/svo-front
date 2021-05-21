<template>
  <button class="m-auto block w-full rounded-lg mb-12 h-12 bg-primary" :class="{ secondary }" @click="$emit('click')">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.secondary {
  @apply bg-black-el1 border;
}
</style>
