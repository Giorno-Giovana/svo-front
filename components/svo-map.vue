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
        :lat-lng="marker.position"
        :draggable="marker.draggable"
        @click="removeMarker(marker.id)"
      >
        <l-icon :icon-anchor="[16, 37]" class-name="executor-point">
          <div class="headline">{{ marker.name }}</div>
          <img class="img" src="../assets/snowcar.svg" />
        </l-icon>
      </l-marker>

      <!--   Полигоны   -->
      <l-polygon
        v-for="polygon in polygons"
        :key="polygon.id"
        :lat-lngs="polygon.latlngs"
        :color="polygon.color"
      ></l-polygon>
    </l-map>
    <div class="add-executor-marker">
      <label for="executor-marker-mode">Add executor marker mode</label>
      <input
        id="executor-marker-mode"
        v-model="executorMarkerMode"
        type="checkbox"
      />
    </div>
    <div class="add-destination-marker">
      <label for="destination-marker-mode">Add destination marker mode</label>
      <input
        id="destination-marker-mode"
        v-model="destinationMarkerMode"
        type="checkbox"
      />
    </div>
    <div class="add-poly">
      <label for="poly-mode">Polygon mode</label>
      <input v-model="polyType" type="text" />
      <input id="poly-mode" v-model="polyMode" type="checkbox" />
    </div>
  </div>
</template>

<script>
import polygons from './polygon-store.json'

export default {
  name: 'SvoMap',
  data() {
    return {
      destinationMarkerMode: false,
      polyMode: false,
      executorMarkerMode: false,
      polygonPointsCounter: 0,
      polygonsOut: [],
      currentPolyId: 0,
      currentDestinationMarkerId: 0,
      currentExecutorMarkerId: 0,
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
    }
  },
  created() {
    while (this.colors.length < 100) {
      do {
        this.color = Math.floor(Math.random() * 1000000 + 1)
      } while (this.colors.includes(this.color))
      this.colors.push('#' + ('000000' + this.color.toString(16)).slice(-6))
    }
  },
  methods: {
    mapClick(event) {
      this.addDestinationMarker(event)
      this.addPolygon(event)
      this.addExecutorMarker(event)
    },
    addDestinationMarker(event) {
      if (this.destinationMarkerMode) {
        this.currentDestinationMarkerId++

        this.destinationMarkers.push({
          id: 'destination' + this.currentDestinationMarkerId,
          position: event.latlng,
          draggable: true,
        })
      }
    },
    addExecutorMarker(event) {
      if (this.executorMarkerMode) {
        this.currentExecutorMarkerId++
        this.executorMarkers.push({
          id: 'executor' + this.currentExecutorMarkerId,
          position: event.latlng,
          draggable: true,
          name: 'car' + this.currentExecutorMarkerId,
        })
      }
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
.executor-point .headline {
  font-size: 20px;
  margin-bottom: -10px;
  margin-left: 3px;
}
.executor-point img {
  height: 50px;
}
</style>
