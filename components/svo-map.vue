<template>
  <div id="map-wrap">
    <l-map
      :zoom="15"
      :center="[55.973383313398216, 37.41584111915638]"
      @click="mapClick"
    >
      <l-tile-layer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <!--   Маркеры назначения   -->
      <l-marker
        v-for="marker in destinationMarkers"
        :key="marker.id"
        :lat-lng="marker.position"
        :draggable="marker.draggable"
        @click="removeMarker(marker.id)"
      />
      <!--   Маркеры исполнителей   -->
      <l-marker
        v-for="marker in executorMarkers"
        :key="marker.id"
        :icon="executorIcon"
        :lat-lng="marker.position"
        :draggable="marker.draggable"
        @click="removeMarker(marker.id)"
      />
      <!--   Полигоны   -->
      <l-polygon
        v-for="polygon in polygons"
        :key="polygon.id"
        :lat-lngs="polygon.latlngs"
        :color="polygon.color"
      ></l-polygon>
    </l-map>
    <div class="add-marker">
      <label for="marker-mode">Add marker mode</label>
      <input id="marker-mode" v-model="markerMode" type="checkbox" />
    </div>
    <div class="add-poly">
      <label for="poly-mode">Polygon mode</label>
      <input v-model="polyType" type="text" />
      <input id="poly-mode" v-model="polyMode" type="checkbox" />
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import polygons from './polygon-store.json'

export default {
  name: 'SvoMap',
  data() {
    return {
      markerMode: false,
      polyMode: false,
      polygonPointsCounter: 0,
      polygonsOut: [],
      currentPolyId: 0,
      currentMarkerId: 0,
      colors: [],
      color: '',
      polyType: '',
      destinationMarkers: [
        // {
        // TODO: Сделать тип
        // id: this.currentId,
        // position: [55.973383313398216, 37.41584111915638],
        // draggable: true,
        // work type
        // name
        // description
        // current work
        // тип техники
        // },
      ],
      executorMarkers: [],
      polygons,
      executorIcon: L.icon({
        iconUrl: require('@/assets/snowcar.svg'),
        iconSize: [32, 37],
        iconAnchor: [16, 37],
      }),
    }
  },
  created() {
    while (this.colors.length < 100) {
      do {
        this.color = Math.floor(Math.random() * 1000000 + 1)
      } while (this.colors.includes(this.color))
      this.colors.push('#' + ('000000' + this.color.toString(16)).slice(-6))
    }
    this.addExecutorMarker()
  },
  methods: {
    mapClick(event) {
      this.addDestinationMarker(event)
      this.addPolygon(event)
    },
    addDestinationMarker(event) {
      if (this.markerMode) {
        this.currentMarkerId++

        this.destinationMarkers.push({
          id: this.currentMarkerId,
          position: event.latlng,
          draggable: true,
        })
      }
    },
    addExecutorMarker() {
      console.log('addExecutorMarker')
      this.executorMarkers.push({
        id: this.currentMarkerId,
        position: {
          lat: 55.973383313398216,
          lng: 37.41584111915638,
        },
        draggable: true,
      })
    },
    addPolygon(event) {
      if (this.polyMode) {
        if (!this.polygonPointsCounter) {
          this.polygonsOut.push({
            id: 'polygon' + this.currentPolyId,
            latlngs: [],
            color: this.colors[this.currentPolyId],
            type: this.polyType,
          })
        }
        if (this.polygonPointsCounter < 4) {
          this.polygonsOut[this.currentPolyId].latlngs.push([
            event.latlng.lat,
            event.latlng.lng,
          ])
          this.polygonPointsCounter++
          if (this.polygonPointsCounter === 4) {
            window.localStorage.setItem(
              'polygons',
              JSON.stringify(this.polygonsOut)
            )
            this.currentPolyId++
            this.polygonPointsCounter = 0
          }
        }
      }
    },
    removeMarker(id) {
      this.destinationMarkers.splice(id, 1)
    },
  },
}
</script>

<style scoped>
#map-wrap {
  height: 100vh;
}

/*TODO: убрать после добавления полигонов*/
.leaflet-grab {
  cursor: auto;
}
/*TODO: убрать после добавления полигонов*/
.leaflet-dragging .leaflet-grab {
  cursor: move;
}
</style>
