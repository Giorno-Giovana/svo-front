<template>
  <div class="h-16 rounded-xl bg-black-bg pl-10 pr-10 flex justify-between mt-auto mb-12" style="width: 500px">
    <a-badge
      v-for="vehicle in vehicles"
      :key="vehicle.id"
      class="cursor-pointer"
      :count="vehicle.count"
      style="margin-top: -20px"
      :number-style="{
        backgroundColor: '#fff',
        color: 'black',
      }"
    >
      <div class="w-16 h-16 rounded-full">
        <car-icon :vehicle="vehicle.type" />
      </div>
    </a-badge>
  </div>
</template>

<script>
import CarIcon from './carIcon'
export default {
  name: 'AvailableVehicles',
  components: { CarIcon },
  data() {
    return {
      vehicles: [
        { id: 1, type: 'car1', count: 16 },
        { id: 2, type: 'car2', count: 16 },
        { id: 3, type: 'car3', count: 16 },
        { id: 4, type: 'car4', count: 16 },
        { id: 5, type: 'car5', count: 16 },
      ],
    }
  },
}
</script>

<style scoped></style>
