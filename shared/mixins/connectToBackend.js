import SocketClient from '../api'
import config from '../../api-conf'

const connectToBackend = {
  data() {
    return {
      client: new SocketClient(config),
      workerMarkers: [],
    }
  },
  mounted() {
    this.client.onMessage((connection, data) => {
      if (data?.workers) {
        this.workerMarkers = data.workers
        window.workers = data
      }
      console.log(data)
    })
  },
  destroyed() {
    this.client.close()
  },
  methods: {
    addTask(task) {
      console.log(task)
      this.client.send({
        method: 'addTask',
        addTask: {
          ...task,
        },
      })
    },
  },
}
export default connectToBackend
