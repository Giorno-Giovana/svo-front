<template>
  <div id="map-wrap" style="height: 100vh">
    <span class=""></span>
    <l-map :zoom="15" :center="[55.981317, 37.410052]" @click="log">
      <l-tile-layer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      <l-marker :lat-lng="[55.9464418, 8.1277591]"></l-marker>
    </l-map>

    <div class="fixed bottom-0 flex justify-between w-screen" style="z-index: 1000">
      <div></div>
      <notifications />
    </div>
  </div>
</template>

<script>
import Notifications from '../components/notifications'
export default {
  components: { Notifications },
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
