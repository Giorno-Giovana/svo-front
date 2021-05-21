<template>
  <bottom-menu>
    Выберите важность уборки снега
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
    <button class="m-auto block w-full bg-primary rounded-lg mb-12 h-12">Далее</button>
  </bottom-menu>
</template>

<script>
import BottomMenu from './bottom-menu'
export default {
  components: { BottomMenu },
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
    chooseStatus(status) {
      this.selected = status
      this.emitNext(status)
    },
    emitNext(status) {
      this.$emit('status', status)
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
