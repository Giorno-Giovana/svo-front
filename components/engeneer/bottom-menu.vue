<template>
  <div
    class="fixed w-screen text-xl bg-black-el1 bottom-0 rounded pt-12 pl-16 pr-16 text-white-primary"
    style="z-index: 99999; border-radius: 16px 16px 0 0"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BottomMenu',
}
</script>

<style scoped></style>
