<template>
  <div id="map-wrap" style="height: 100vh">
    <span class=""></span>
    <svo-map
      :clear-poly="clearPoly"
      :choise-location="choiseLocation"
      @onLocationChoise="currentPoly.location = $event"
      @onPolyClick="polyClick($event)"
    />
    <transition name="slide-fade">
      <status-picker v-if="currentStep === 1" @closePicker="clearPolySelection" @next="nextPicker($event)" />
      <location-picker v-if="currentStep === 2" @closePicker="clearPolySelection" @next="nextPicker($event)" />
      <SnowPicker v-if="currentStep === 3" @closePicker="clearPolySelection" @next="nextPicker($event)" @back="currentStep -= 1" />
      <task-sent v-if="currentStep === 4" />
    </transition>
  </div>
</template>

<script>
import LocationPicker from '@/components/engineer/location-picker'
import SnowPicker from '../components/engineer/snow-picker'
import StatusPicker from '../components/engineer/status-picker'
import TaskSent from '../components/engineer/task-sent'
import SocketClient from '../shared/api'
import config from '../api-conf'
import SvoMap from '~/components/svo-map'
export default {
  components: { LocationPicker, SvoMap, TaskSent, StatusPicker, SnowPicker },
  data() {
    return {
      client: new SocketClient(config),
      currentStep: 0,
      clearPoly: false,
      currentPoly: {},
      choiseLocation: false,
    }
  },
  watch: {
    currentStep(step) {
      this.choiseLocation = step === 2
    },
  },
  destroyed() {
    this.client.close()
  },
  methods: {
    nextPicker(args) {
      console.log(args)
      // eslint-disable-next-line no-prototype-builtins
      if (args.hasOwnProperty('status') && args.status !== undefined) {
        this.currentPoly.status = args.status
      }

      if (args.snowVolume) {
        this.currentPoly.snowVolume = args.snowVolume
        console.log({
          method: 'claim',
          claim: {
            id: this.currentPoly.id,
            status: this.currentPoly.status,
            volume: this.currentPoly.status ? this.currentPoly.snowVolume : 0,
            location: this.currentPoly.location,
          },
        })
        this.client.send({
          method: 'claim',
          claim: {
            id: this.currentPoly.id,
            status: this.currentPoly.status,
            volume: this.currentPoly.status ? this.currentPoly.snowVolume : 0,
            location: this.currentPoly.location,
          },
        })
      }
      this.currentStep++
      if (this.currentStep === 4) {
        setTimeout(() => {
          this.clearPoly = true
          this.currentStep++
        }, 2000)
      }
    },
    polyClick(data) {
      this.clearPoly = false
      this.currentPoly = data
      this.currentStep = 1
    },
    clearPolySelection() {
      this.currentStep = 0
      this.clearPoly = true
    },
    changeStatus(status) {
      this.currentPoly.status = status
    },
    changeSnowVolume(snowVolume) {
      this.currentPoly.snowVolume = snowVolume
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
