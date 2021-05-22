<template>
  <div id="map-wrap" style="height: 100vh">
    <svo-map />
    <notifications @notificationChoose="log" />
    <available-vehicles />
    <Tasks @taskChoose="log" />
    <a-drawer
      width="500"
      :body-style="{ backgroundColor: 'rgba(30, 33, 37, 1)', height: '100vh', paddingTop: '40px', paddingRight: '60px' }"
      :visible="isDrawerVisible"
      :closable="false"
      @close="closeDrawer"
    >
      <create-task :notification="notification" />
    </a-drawer>
  </div>
</template>

<script>
import Tasks from '../components/tasks'
import Notifications from '../components/notifications'
import SvoMap from '../components/svo-map'
import AvailableVehicles from '../components/available-vehicles'
import CreateTask from '../components/create-task'
import drawer from '../shared/mixins/drawer'
export default {
  components: { CreateTask, AvailableVehicles, SvoMap, Notifications, Tasks },
  mixins: [drawer],
  data() {
    return {
      notification: null,
    }
  },
  methods: {
    log(args) {
      console.log('NOTY', args)
      this.notification = args
      this.toggleDrawer()
    },
  },
}
</script>

<style scoped></style>
