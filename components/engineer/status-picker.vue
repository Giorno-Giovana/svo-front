<template>
  <bottom-menu>
    Выберите важность уборки снега
    <span class="float-right" @click="closePicker">X</span>
    <div class="flex justify-between mt-10 mb-10">
      <div
        v-for="status in statuses"
        :key="status.value"
        class="status"
        :class="{ chosen: selected === status.value }"
        @click="chooseStatus(status.value)"
      >
        <div class="status__value">{{ status.value }}</div>
        <div class="status__text">{{ status.text }}</div>
      </div>
    </div>
    <designed-button text="Далее" @click="emitNext" />
  </bottom-menu>
</template>

<script>
import DesignedButton from '../designed-button'
import BottomMenu from './bottom-menu'
export default {
  components: { DesignedButton, BottomMenu },
  data() {
    return {
      statuses: [
        { value: 0, text: 'Нет снега' },
        { value: 1, text: 'Пока не критично' },
        { value: 2, text: 'Нужно убрать' },
      ],
      selected: 2,
    }
  },
  methods: {
    closePicker() {
      this.$emit('closePicker')
    },
    chooseStatus(status) {
      this.selected = status
    },
    emitNext() {
      console.log('emit')
      this.$emit('next', { status: this.selected })
    },
  },
}
</script>

<style scoped>
.chosen {
  @apply rounded-full bg-black-el4 h-28 w-28;
}
.status {
  @apply text-center;
}
.status__value {
  @apply text-8xl mb-6;
}
.status__text {
  @apply text-xl;
}
</style>
