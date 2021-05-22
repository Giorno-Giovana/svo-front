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
    <div class="text-3xl mb-10">Формирование задачи</div>

    <div v-for="vehicle in vehicles" :key="vehicle.id" class="flex w-full mb-8">
      <car-icon :vehicle="vehicle.type" />
      <div class="ml-4 mt-1 text-lg">
        <div class="leading-6 font-semibold">Плужно-щеточная машина с реагентом</div>
        <div class="flex mt-2">
          <button class="rounded-icon mr-3 bg-gray" @click="vehicle.count--">-</button>
          <div class="mr-3">{{ vehicle.count }}</div>
          <button class="rounded-icon mr-6" @click="vehicle.count++">+</button>
          <div class="text-sm mt-1">Рекомендуется: {{ vehicle.recommendation }}шт</div>
        </div>
      </div>
      <img class="ml-auto cursor-pointer" src="~assets/right-arrow.svg" alt="" @click="openDrawer" />
    </div>

    <designed-button text="Создать задачу" />

    <a-drawer
      width="500"
      :body-style="{ backgroundColor: 'rgba(30, 33, 37, 1)', height: '100vh', paddingTop: '40px', paddingRight: '60px' }"
      :visible="isDrawerVisible"
      :closable="false"
      class="text-white-primary"
      @close="closeDrawer"
    >
      <div class="flex">
        <img src="~assets/left-arrow.svg" class="cursor-pointer" alt="" @click="closeDrawer" />
        <div class="ml-3 text-2xl">Плужно-щеточная машина с реагентом (25шт)</div>
      </div>
      <div v-for="suggestedVehicle in suggestedVehicles" :key="suggestedVehicle.id" class="flex mt-6">
        <div class="mt-3">
          <a-checkbox :value="suggestedVehicle.id" :checked="suggestedVehicle.selected" @change="onChange" />
        </div>
        <car-icon vehicle="car1" class="ml-4 mr-6" />
        <div>
          <div class="flex">
            <div class="text-xl">{{ suggestedVehicle.name }}</div>
            <div class="rounded-full w-4 h-4 mt-2 bg-compl-green ml-4 mr-2" />
            <div class="mt-1.5">Свободна</div>
          </div>
          <div class="flex text-gray mt-2">
            <div>Запас хода: {{ suggestedVehicle.fuelReserve }}</div>
            <div class="ml-4">Отдалённость: {{ suggestedVehicle.pathTime }}</div>
          </div>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import CarIcon from './carIcon'
import DesignedButton from './designed-button'
export default {
  name: 'CreateTask',
  components: { DesignedButton, CarIcon },
  data() {
    return {
      isDrawerVisible: false,
      title: 'Сектор С15',
      subTitle: 'Требуется очистка',
      vehicles: [
        { id: 1, type: 'car1', recommendation: 3, count: 0 },
        { id: 2, type: 'car2', recommendation: 3, count: 0 },
        { id: 3, type: 'car3', recommendation: 3, count: 0 },
        { id: 4, type: 'car4', recommendation: 3, count: 0 },
        { id: 5, type: 'car5', recommendation: 3, count: 0 },
      ],
      suggestedVehicles: [
        { id: 1, status: 'free', name: 'Машина #24', fuelReserve: '2 часа', pathTime: '5 мин', type: 'car1', selected: true },
        { id: 2, status: 'free', name: 'Машина #24', fuelReserve: '2 часа', pathTime: '5 мин', type: 'car1', selected: true },
        { id: 3, status: 'free', name: 'Машина #24', fuelReserve: '2 часа', pathTime: '5 мин', type: 'car1', selected: true },
        { id: 4, status: 'free', name: 'Машина #24', fuelReserve: '2 часа', pathTime: '5 мин', type: 'car1', selected: false },
        { id: 5, status: 'free', name: 'Машина #24', fuelReserve: '2 часа', pathTime: '5 мин', type: 'car1', selected: false },
        { id: 6, status: 'free', name: 'Машина #24', fuelReserve: '2 часа', pathTime: '5 мин', type: 'car1', selected: false },
        { id: 7, status: 'free', name: 'Машина #24', fuelReserve: '2 часа', pathTime: '5 мин', type: 'car1', selected: false },
      ],
    }
  },
  methods: {
    closeDrawer() {
      this.isDrawerVisible = false
    },
    openDrawer() {
      this.isDrawerVisible = true
    },
    toggleDrawer() {
      this.isDrawerVisible = !this.isDrawerVisible
    },

    onChange(checkedValue) {
      console.log(checkedValue)
      this.suggestedVehicles.find((el) => el.id === checkedValue.target.value).selected = checkedValue.target.checked
    },
  },
}
</script>

<style scoped>
.rounded-icon {
  @apply w-5 text-center pb-2 h-5 rounded-full outline-none bg-white-primary mt-1 text-black-bg font-bold text-2xl cursor-pointer;
  line-height: 15px;
}
.text-gray {
  color: rgba(136, 139, 143, 1);
}
.bg-gray {
  background: rgba(179, 182, 185, 1);
}
</style>
