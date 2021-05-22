<template>
  <div id="map-wrap" style="height: 100vh">
    <svo-map />
    <!--    <div class="fixed bottom-0 flex justify-between w-screen" style="z-index: 1000">-->
    <notifications @notificationChoose="log" />
    <available-vehicles />
    <Tasks @taskChoose="log" />
    <!--    </div>-->
    <a-drawer
      width="500"
      :body-style="{ backgroundColor: 'rgba(30, 33, 37, 1)', height: '100vh', paddingTop: '40px', paddingRight: '60px' }"
      :visible="isDrawerVisible"
      :closable="false"
      @close="closeDrawer"
    >
      <create-task />
    </a-drawer>
  </div>
</template>

<script>
import Tasks from '../components/tasks'
import Notifications from '../components/notifications'
import SvoMap from '../components/svo-map'
import AvailableVehicles from '../components/available-vehicles'
import CreateTask from '../components/create-task'
export default {
  components: { CreateTask, AvailableVehicles, SvoMap, Notifications, Tasks },
  data() {
    return {
      isDrawerVisible: false,
    }
  },
  methods: {
    log(args) {
      this.toggleDrawer()
      console.log(args)
    },
    closeDrawer() {
      this.isDrawerVisible = false
    },
    openDrawer() {
      this.isDrawerVisible = true
    },
    toggleDrawer() {
      this.isDrawerVisible = !this.isDrawerVisible
    },
  },
}
</script>

<style scoped></style>
