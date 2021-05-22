<template>
  <div class="w-96 h-64 p-6 pb-0" style="backdrop-filter: blur(12px); border-radius: 24px 0 0 0; background: rgba(22, 24, 28, 0.5)">
    <div class="flex justify-between mb-5">
      <div class="text-xl text-white-primary">Текущие задачи</div>
      <div class="mt-2 text-primary cursor-pointer">Показать все</div>
    </div>

    <div
      v-for="task in tasks"
      :key="task.id"
      class="flex justify-between cursor-pointer text-white-primary h-16 w-full bg-black-el1 rounded-xl pt-2 pb-2 pr-4 pl-4 mb-2"
    >
      <div>
        <div>{{ task.text }}</div>
        <div class="flex mt-1">
          <div v-for="vehicle in task.vehicles" :key="vehicle.id" class="flex">
            <div class="w-5 h-5 mr-1">
              <car-icon :vehicle="vehicle.type" />
            </div>
            <div class="mr-2">x{{ vehicle.count }}</div>
          </div>
        </div>
      </div>
      <div class="text-white-primary">
        <vue-ellipse-progress size="50" color="#2D9CFC" :progress="50" empty-color="#888B8F">
          <span slot="legend-value">%</span>
        </vue-ellipse-progress>
      </div>
    </div>
  </div>
</template>

<script>
import CarIcon from './carIcon'
export default {
  name: 'Notifications',
  components: { CarIcon },
  data() {
    return {
      isExpended: false,
      tasks: [
        {
          text: 'Очистка сектора 16',
          progress: 46,
          id: 1,
          vehicles: [
            { type: 'car1', count: 1, id: 1 },
            { type: 'car2', count: 2, id: 2 },
            { type: 'car3', count: 3, id: 3 },
            { type: 'car4', count: 4, id: 4 },
            { type: 'car5', count: 5, id: 5 },
          ],
        },
        {
          text: 'Очистка сектора 11',
          progress: 22,
          id: 2,
          vehicles: [
            { type: 'car1', count: 1, id: 1 },
            { type: 'car2', count: 2, id: 2 },
            { type: 'car3', count: 3, id: 3 },
            { type: 'car4', count: 4, id: 4 },
            { type: 'car5', count: 5, id: 5 },
          ],
        },
        {
          text: 'Очистка сектора 16',
          progress: 99,
          id: 3,
          vehicles: [
            { type: 'car1', count: 1, id: 1 },
            { type: 'car2', count: 2, id: 2 },
            { type: 'car3', count: 3, id: 3 },
            { type: 'car4', count: 4, id: 4 },
            { type: 'car5', count: 5, id: 5 },
          ],
        },
      ],
    }
  },
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 1s ease-in;
}
.slide-fade-leave-active {
  transition: all 0.8s ease-out;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(200px);
  opacity: 0;
}
</style>
