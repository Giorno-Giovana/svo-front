<template>
  <bottom-menu>
    Выберите метку
    <span class="float-right" @click="closePicker">X</span><br />
    <span v-if="!allowTransition" style="color: #ff5260">Обязательно выбрать метку!</span>
    <designed-button class="mt-4" text="Далее" @click="emitNext" />
  </bottom-menu>
</template>

<script>
import DesignedButton from '@/components/designed-button'
import BottomMenu from '@/components/engineer/bottom-menu'

export default {
  components: { DesignedButton, BottomMenu },
  props: {
    allowTransition: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    closePicker() {
      this.$emit('closePicker')
    },
    emitNext() {
      if (this.allowTransition) {
        this.$emit('next', { status: this.selected })
      }
    },
  },
}
</script>

<style scoped></style>
