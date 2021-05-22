<template>
  <img :src="`/${vehicle}.png`" class="rounded-full w-full h-full" alt="" />
</template>

<script>
export default {
  name: 'CarIcon',
  props: {
    vehicle: {
      type: String,
      required: true,
    },
  },
}
</script>
