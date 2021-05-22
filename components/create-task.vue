<template>
  <div style="height: 300px" class="bg-black-bg w-full text-white-primary">
    <div class="text-3xl">
      <div>{{ title }}</div>
      <div>{{ subTitle }}</div>
    </div>
    <div class="mt-2 mb-14 text-base">
      <div>В данном секторе требуется убрать снег</div>
      <div>Примерное количество снега: 5-10см</div>
    </div>
    <div class="text-3xl">Формирование задачи</div>
    <div>
      <div class="flex">
        <car-icon vehicle="car1" />
      </div>
    </div>
  </div>
</template>

<script>
import CarIcon from './carIcon'
export default {
  name: 'CreateTask',
  components: { CarIcon },
  data() {
    return {
      title: 'Сектор С15',
      subTitle: 'Требуется очистка',
    }
  },
}
</script>

<style scoped></style>
