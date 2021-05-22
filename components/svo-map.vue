<template>
  <div id="map-wrap">
    <l-map :zoom="15" :center="[55.973383313398216, 37.41584111915638]" @click="mapClick">
      <l-tile-layer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"></l-tile-layer>
      <!--   Маркеры назначения   -->
      <l-marker v-for="marker in destinationMarkers" :key="marker.id" :lat-lng="marker.location" @click="removeMarker(marker.id)" />
      <l-marker v-if="locationMarker.location" :lat-lng="locationMarker.location" />
      <!--   Маркеры исполнителей   -->
      <l-marker v-for="marker of workerMarkers" :key="marker.id" :lat-lng="marker.location" @click="removeMarker(marker.id)">
        <l-icon :icon-anchor="[16, 37]" class-name="worker-point">
          <div class="headline">{{ marker.type }}[{{ marker.id }}]</div>
          <img class="img" src="../assets/snowcar.svg" />
        </l-icon>
      </l-marker>

      <!--   Полигоны   -->
      <l-polygon
        v-for="polygon in polygons"
        :key="polygon.id"
        :lat-lngs="polygon.latlngs"
        :color="polygon.color"
        :stroke="polygon.stroke || false"
        @mouseup="polyCLick($event, polygon)"
      ></l-polygon>
      <!--    Lines     -->
      <l-polyline v-for="line in lines" :key="line.id" :lat-lngs="line.latlngs" :color="'white'"></l-polyline>
    </l-map>
    <div class="add-worker-marker">
      <label for="worker-marker-mode">Add worker marker mode</label>
      <input v-model="workerType" type="text" />
      <input id="worker-marker-mode" v-model="workerMarkerMode" type="checkbox" />
    </div>
    <div class="add-destination-marker">
      <label for="destination-marker-mode">Add destination marker mode</label>
      <input id="destination-marker-mode" v-model="destinationMarkerMode" type="checkbox" />
    </div>
    <div class="add-poly">
      <label for="poly-mode">Polygon mode</label>
      <input v-model="polyType" type="text" />
      <input id="poly-mode" v-model="polyMode" type="checkbox" />
    </div>
  </div>
</template>

<script>
import SocketClient from '../shared/api'
import config from '../api-conf'
import polygons from './polygon-store.json'

export default {
  name: 'SvoMap',
  props: {
    clearPoly: {
      type: Boolean,
      default: false,
    },
    choiseLocation: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      client: new SocketClient(config),
      destinationMarkerMode: false,
      polyMode: false,
      workerMarkerMode: false,
      polygonPointsCounter: 0,
      polygonsOut: [],
      currentPolyId: 0,
      currentDestinationMarkerId: 0,
      currentWorkerMarkerId: 0,
      colors: [],
      color: '',
      polyType: '',
      workerType: '',
      destinationMarkers: [],
      workerMarkers: [],
      polygons,
      locationMarker: {},
      lines: [],
      animationInterval: null,
      isRunAnimation: false,
    }
  },
  watch: {
    clearPoly(value) {
      if (value) {
        this.clearPolygonsSelection()
      }
    },
  },
  mounted() {
    this.client.onMessage((connection, data) => {
      if (data?.workers) {
        this.workerMarkers = data.workers
      }
    })
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
      // Добавить маркер перемещения
      // this.addDestinationMarker(event)
      // Добавить полигон TODO: убрать, когда утвердим полигоны
      this.addPolygon(event)
      // Добавить маркер исполнителя
      this.addWorkerMarker(event)
    },
    polyCLick(event, poly) {
      if (!this.choiseLocation) {
        this.polygons = this.polygons.map((polygon) => {
          polygon.stroke = polygon.id === poly.id
          return polygon
        })
        this.$emit('onPolyClick', poly)
      } else {
        this.addDestinationMarker(event.latlng)
      }
    },
    clearPolygonsSelection() {
      this.locationMarker = {}
      this.polygons = this.polygons.map((polygon) => {
        polygon.stroke = false
        return polygon
      })
    },
    drawLine(startPoint, endPoint, id) {
      const lineId = 'lineFor' + id
      // Рисуем линию
      this.lines.push({
        id: lineId,
        latlngs: [
          [startPoint.lat, startPoint.lng],
          [endPoint.lat, endPoint.lng],
        ],
      })
      // Дельта x для анимации
      const deltaLat = (endPoint.lat - startPoint.lat) / 40
      // Номер анимации
      let positionIndex = 0
      // Текущий исполнитель
      const currentWorker = this.workerMarkers.find((marker) => marker.id === id)
      // Очищаем интервал
      clearInterval(this.animationInterval)
      // Запускаем анимацию

      this.animationInterval = setInterval(() => {
        // Флаг, который говорит о том, что анимация происходит в данный момент
        this.isRunAnimation = true
        if (positionIndex < 40) {
          // Меняем позицию исполнителя
          currentWorker.location = {
            lat: startPoint.lat + deltaLat * positionIndex,
            lng: this.lineFunc(startPoint.lat, startPoint.lng, endPoint.lat, endPoint.lng, startPoint.lat + deltaLat * positionIndex),
          }
          positionIndex++
        } else {
          // Заканчиваем анимацию
          this.isRunAnimation = false
          // Очищаем интервал
          clearInterval(this.animationInterval)
          // Очищаем путь, который был до анимации
          this.clearPreviousPath(id)
          this.currentDestinationMarkerId--
        }
      }, 50)
    },
    lineFunc(x1, y1, x2, y2, x) {
      // Вычисляет y по функции прямой
      return (-(x1 * y2 - x2 * y1) - (y1 - y2) * x) / (x2 - x1)
    },
    addDestinationMarker(event) {
      // Если не анимация и мод добавления перемещения

      if (this.choiseLocation) {
        // const flashedPolygon = this.polygons.find((polygon) => polygon.stroke)
        this.locationMarker = {
          location: event,
        }
        this.$emit('onLocationChoise', event)
      }
      // if (this.choiseLocation) {
      //   this.currentDestinationMarkerId++
      //   const workerID = 'worker' + this.currentWorkerMarkerId
      //   // Записываем маркер перемещения
      //   this.destinationMarkers.push({
      //     id: 'destination' + this.currentDestinationMarkerId,
      //     location: event.latlng,
      //     for: workerID,
      //   })
      //   // Рисуем линию от точки назначения к ее исполнителю
      //   this.drawLine(
      //     this.workerMarkers[this.currentWorkerMarkerId - 1].location,
      //     this.destinationMarkers[this.currentDestinationMarkerId - 1].location,
      //     workerID
      //   )
      // }
    },
    clearPreviousPath(forID) {
      // Удаляем предыдущую линию
      this.lines = this.lines.filter((line) => line.id !== 'lineFor' + forID)
      // Удаляем предыдущий маркер
      this.destinationMarkers = this.destinationMarkers.filter((destinationMarker) => destinationMarker.for !== forID)
    },
    addWorkerMarker(event) {
      if (this.workerMarkerMode) {
        this.currentWorkerMarkerId++
        // Добавляем маркер исполнителя
        // this.workerMarkers.push({
        //   type: this.workerType,
        //   location: event.latlng,
        // })

        this.client.send({
          makeWorker: {
            type: this.workerType,
            location: event.latlng,
          },
        })

        // this.client.send({
        //   id: 'worker' + this.currentWorkerMarkerId,
        //   position: event.latlng,
        // })
      }
    },
    addPolygon(event) {
      // TODO: убрать, когда утвердим полигоны
      if (this.polyMode) {
        if (!this.polygonPointsCounter) {
          // Добавляем полигон
          this.polygonsOut.push({
            id: 'polygon' + this.currentPolyId,
            latlngs: [],
            color: this.colors[this.currentPolyId],
            type: this.polyType,
          })
        }
        // Если ввели меньше 4-х точек
        if (this.polygonPointsCounter < 4) {
          // Записываем координаты точек в полигон
          this.polygonsOut[this.currentPolyId].latlngs.push([event.latlng.lat, event.latlng.lng])
          this.polygonPointsCounter++
          if (this.polygonPointsCounter === 4) {
            // Добавляем новый полигон
            window.localStorage.setItem('polygons', JSON.stringify(this.polygonsOut))
            this.currentPolyId++
            this.polygonPointsCounter = 0
          }
        }
      }
    },
    removeMarker(id) {
      // Удаляем маркер
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
.worker-point .headline {
  color: white;
  margin-bottom: -10px;
  margin-left: 3px;
}
.worker-point img {
  height: 50px;
}
</style>
