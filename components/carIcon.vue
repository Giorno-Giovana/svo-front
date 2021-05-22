<template>
  <div :style="{ height: `${height}px`, width: `${width}px` }">
    <img :src="`/${vehicle}.png`" class="rounded-full w-full h-full object-cover" alt="" />
  </div>
</template>

<script>
export default {
  name: 'CarIcon',
  props: {
    vehicle: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: 48,
    },
    height: {
      type: Number,
      default: 48,
    },
  },
}
</script>
