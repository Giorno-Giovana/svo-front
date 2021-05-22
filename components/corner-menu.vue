<template>
  <div
    class="w-96 h-64 p-6 pb-0 overflow-auto bottom-0 mt-auto fixed bottom-0"
    :class="{ 'h-screen': isExpended, right: corner === 'right', left: corner === 'left' }"
    style="backdrop-filter: blur(12px); background: rgba(22, 24, 28, 0.5); z-index: 1000"
  >
    <div class="flex justify-between mb-5">
      <div class="text-xl text-white-primary">{{ title }}</div>
      <div class="mt-2 text-primary cursor-pointer" @click="isExpended = !isExpended">Показать все</div>
    </div>

    <slot />
  </div>
</template>

<script>
export default {
  name: 'CornerMenu',
  props: {
    title: {
      type: String,
      required: true,
    },
    corner: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isExpended: false,
    }
  },
}
</script>

<style scoped>
.right {
  border-radius: 24px 0 0 0;
}
.left {
  border-radius: 0 24px 0 0;
}
::-webkit-scrollbar {
  display: none;
}
</style>
