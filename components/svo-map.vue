<template>
  <div id="map-wrap">
    <l-map :zoom="15" :center="[55.973383313398216, 37.41584111915638]" @click="mapClick">
      <l-tile-layer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"></l-tile-layer>
      <!--   Маркеры назначения   -->
      <!--      <l-marker v-for="marker of notifications" :key="'notification' + marker.id" :lat-lng="marker.location" />-->
      <l-marker v-if="locationMarker.location" :lat-lng="locationMarker.location" />
      <!--   Маркеры исполнителей   -->
      <l-marker v-for="marker of workerMarkers" :key="'worker' + marker.id" :lat-lng="marker.location">
        <l-icon :icon-anchor="[16, 37]" class-name="worker-point">
          <div class="headline">{{ marker.type }}[{{ marker.id }}]</div>
          <img class="img" src="../assets/snowcar.svg" />
        </l-icon>
      </l-marker>
      <l-marker
        v-for="polygonMarker of polygons"
        :key="polygonMarker.id + 'marker'"
        :lat-lng="{
          lat: [polygonMarker.latlngs[0][0] + (polygonMarker.latlngs[2][0] - polygonMarker.latlngs[0][0]) / 2],
          lng: [polygonMarker.latlngs[0][1] + (polygonMarker.latlngs[2][1] - polygonMarker.latlngs[0][1]) / 2],
        }"
      >
        <l-icon :icon-anchor="[36, 50]" class-name="worker-point">
          <div v-if="polygonMarker.status === 2" class="in-work">
            <div class="headline pb-4">Идет отчистка</div>
            <vue-ellipse-progress class="ml-4" :size="50" font-color="white" color="#2D9CFC" :progress="0" empty-color="#888B8F">
              <span slot="legend-value">%</span>
            </vue-ellipse-progress>
          </div>
          <div v-if="polygonMarker.status === 1" class="need">
            <div class="headline pb-3">Требуется отчистка</div>
            <div class="circle ml-2">
              <span style="font-size: 1.5rem">!</span>
            </div>
          </div>
          <span></span>
        </l-icon>
      </l-marker>

      <!--   Полигоны   -->
      <l-polygon
        v-for="backPolygon of backPolygons"
        :key="backPolygon.id"
        :lat-lngs="polygons.find((polygon) => polygon.id === backPolygon.id).latlngs"
        :color="polygons.find((polygon) => polygon.id === backPolygon.id).color"
        :stroke="backPolygon.id === strokedPolygonId"
        @mouseup="
          polyCLick(
            $event,
            polygons.find((polygon) => polygon.id === backPolygon.id)
          )
        "
      ></l-polygon>
      <!--    Lines     -->
      <l-polyline v-for="line of lines" :key="line.id" :lat-lngs="line.latlngs" :color="'white'"></l-polyline>
    </l-map>
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
      destinationPointsCounter: 0,
      pathIndex: 0,
      polygonsOut: [],
      roadMarkers: [],
      strokedPolygonId: '',
      currentPolyId: 0,
      currentDestinationMarkerId: 0,
      currentWorkerMarkerId: 0,
      colors: [],
      color: '',
      polyType: '',
      workerType: '',
      notifications: {},
      destinationMarkers: [],
      workerMarkers: [],
      polygons,
      locationMarker: {},
      lines: [],
      animationInterval: null,
      isRunAnimation: false,
      backPolygons: {},
      firstWorkerMarker: null,
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
        if (!this.firstWorkerMarker) {
          this.firstWorkerMarker = this.workerMarkers['1']
        } else {
          this.workerMarkers['1'] = this.firstWorkerMarker
        }
      }
      if (data?.notify) {
        this.notifications = data.notify
      }
      if (data?.sectors) {
        this.backPolygons = data.sectors
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
  destroyed() {
    this.client.close()
  },
  methods: {
    mapClick(event) {
      this.animateCar()
      // Добавить маркер перемещения
      // this.addDestinationMarker(event)
      // Добавить полигон TODO: убрать, когда утвердим полигоны
      this.addPolygon(event)

      // Добавить маркер исполнителя
      this.addWorkerMarker(event)
    },
    animateCar() {
      const worker = this.firstWorkerMarker.location
      const poly = {
        lat: [this.polygons[0].latlngs[0][0] + (this.polygons[0].latlngs[2][0] - this.polygons[0].latlngs[0][0]) / 2],
        lng: [this.polygons[0].latlngs[0][1] + (this.polygons[0].latlngs[2][1] - this.polygons[0].latlngs[0][1]) / 2],
      }
      this.drawLine(worker, poly, 'any')
    },
    polyCLick(event, poly) {
      if (!this.choiseLocation) {
        this.strokedPolygonId = this.polygons.find((polygon) => polygon.id === poly.id).id
        this.$emit('onPolyClick', poly)
      } else {
        const flashedPolygon = this.polygons.find((polygon) => polygon.id === this.strokedPolygonId)

        if (flashedPolygon === poly) {
          this.addDestinationMarker(event.latlng)
        }
      }
    },
    clearPolygonsSelection() {
      this.locationMarker = {}
      this.strokedPolygonId = ''
    },
    drawLine(startPoint, endPoint, id) {
      const lineId = 'lineFor' + id
      // Рисуем линию
      this.lines.push({
        id: lineId,
        latlngs: [
          [startPoint.lat, startPoint.lng],
          [endPoint.lat[0], endPoint.lng[0]],
        ],
      })
      // Дельта x для анимации
      const deltaLat = (endPoint.lat[0] - startPoint.lat) / 100
      // Номер анимации
      let positionIndex = 0
      // Текущий исполнитель
      const currentWorker = this.workerMarkers['1']
      // Очищаем интервал
      clearInterval(this.animationInterval)
      // Запускаем анимацию

      this.animationInterval = setInterval(() => {
        // Флаг, который говорит о том, что анимация происходит в данный момент
        this.isRunAnimation = true
        if (positionIndex < 100) {
          // Меняем позицию исполнителя
          currentWorker.location = {
            lat: startPoint.lat + deltaLat * positionIndex,
            lng: this.lineFunc(startPoint.lat, startPoint.lng, endPoint.lat[0], endPoint.lng[0], startPoint.lat + deltaLat * positionIndex),
          }
          positionIndex++
        } else {
          // Заканчиваем анимацию
          this.isRunAnimation = false
          // Очищаем интервал
          clearInterval(this.animationInterval)
          // Очищаем путь, который был до анимации
          // this.clearPreviousPath(id)
          this.currentDestinationMarkerId--
        }
      }, 100)
    },
    lineFunc(x1, y1, x2, y2, x) {
      // Вычисляет y по функции прямой
      return (-(x1 * y2 - x2 * y1) - (y1 - y2) * x) / (x2 - x1)
    },
    addDestinationMarker(event) {
      // Если не анимация и мод добавления перемещения

      if (this.choiseLocation) {
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

        // this.client.send({
        //   method: 'makeWorker',
        //   makeWorker: {
        //     type: this.workerType,
        //     location: event.latlng,
        //   },
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
            color: 'blue',
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
  font-size: 0.5rem;
  color: white;
  margin-bottom: -10px;
  margin-left: 3px;
}
.worker-point img {
  height: 50px;
}
.circle {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: #f3b15d;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
