<template>
  <div id="map-wrap" style="height: 100vh">
    <span class=""></span>
    <l-map :zoom="15" :center="[55.981317, 37.410052]" @click="log">
      <l-tile-layer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      <l-marker :lat-lng="[55.9464418, 8.1277591]"></l-marker>
    </l-map>

    <transition name="slide-fade">
      <status-picker v-if="currentStep === 1" @next="log" />
      <SnowPicker v-if="currentStep === 2" @next="log" />
      <task-sent v-if="currentStep === 3" />
    </transition>
  </div>
</template>

<script>
import SnowPicker from '../components/engineer/snow-picker'
import StatusPicker from '../components/engineer/status-picker'
import TaskSent from '../components/engineer/task-sent'
export default {
  components: { TaskSent, StatusPicker, SnowPicker },
  data() {
    return {
      currentStep: 1,
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
      console.log(args)
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
