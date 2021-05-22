<template>
  <div id="map-wrap" style="height: 100vh">
    <span class=""></span>
    <svo-map @onPolyClick="polyClick($event)" />
    <transition name="slide-fade">
      <status-picker v-if="currentStep === 1" @next="log" />
      <SnowPicker v-if="currentStep === 2" @next="log" @back="currentStep -= 1" />
      <task-sent v-if="currentStep === 3" />
    </transition>
  </div>
</template>

<script>
import SnowPicker from '../components/engineer/snow-picker'
import StatusPicker from '../components/engineer/status-picker'
import TaskSent from '../components/engineer/task-sent'
import SvoMap from '~/components/svo-map'
export default {
  components: { SvoMap, TaskSent, StatusPicker, SnowPicker },
  data() {
    return {
      currentStep: 0,
      currentPoly: {},
    }
  },
  methods: {
    log(args) {
      this.currentStep++
      if (this.currentStep === 3) {
        setTimeout(() => {
          this.currentStep++
        }, 2000)
      }
    },
    polyClick(data) {
      this.currentPoly = data
      console.log(data)
    },
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
