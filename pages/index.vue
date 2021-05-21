<template>
  <div id="map-wrap" style="height: 100vh">
    <h1 class="">Text</h1>
    <l-map :zoom="15" :center="[55.981317, 37.410052]" @click="log">
      <l-tile-layer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-marker :lat-lng="[55.9464418, 8.1277591]"></l-marker>
    </l-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      points: [],
    }
  },
  methods: {
    log(args) {
      this.points.push(args)
      console.log(this.points)
    },
  },
}
</script>

<style></style>
