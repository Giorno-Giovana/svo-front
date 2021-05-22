<template>
  <corner-menu title="Текущие задачи" corner="right" class="right-0">
    <corner-menu-element v-for="task in tasks" :key="task.id" @click="$emit('taskChoose', task)">
      <div>
        <div>{{ task.text }}</div>
        <div class="flex mt-1">
          <div v-for="vehicle in task.vehicles" :key="vehicle.id" class="flex">
            <car-icon :vehicle="vehicle.type" :width="24" :height="24" />
            <div class="mr-2">x{{ vehicle.count }}</div>
          </div>
        </div>
      </div>
      <div class="text-white-primary">
        <vue-ellipse-progress :size="50" color="#2D9CFC" :progress="50" empty-color="#888B8F">
          <span slot="legend-value">%</span>
        </vue-ellipse-progress>
      </div>
    </corner-menu-element>
  </corner-menu>
</template>

<script>
import CarIcon from './carIcon'
import CornerMenu from './corner-menu'
import CornerMenuElement from './corner-menu-element'
export default {
  name: 'Tasks',
  components: { CornerMenuElement, CornerMenu, CarIcon },
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
        {
          text: 'Очистка сектора 16',
          progress: 99,
          id: 4,
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
          id: 5,
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
          id: 6,
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
          id: 7,
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
