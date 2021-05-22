<template>
  <div id="map-wrap" style="height: 100vh">
    <svo-map />
    <div class="fixed bottom-0 flex justify-between w-screen" style="z-index: 1000">
      <notifications @notificationChoose="log" />
      <available-vehicles />
      <Tasks @taskChoose="log" />
    </div>
  </div>
</template>

<script>
import Tasks from '../components/tasks'
import Notifications from '../components/notifications'
import SvoMap from '../components/svo-map'
import AvailableVehicles from '../components/available-vehicles'
export default {
  components: { AvailableVehicles, SvoMap, Notifications, Tasks },
  data() {
    return {}
  },
  methods: {
    log(args) {
      console.log(args)
    },
  },
}
</script>

<style scoped></style>
