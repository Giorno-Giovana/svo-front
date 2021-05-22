import SocketClient from '../api'
import config from '../../api-conf'

const connectToBackend = {
  data() {
    return {
      client: new SocketClient(config),
    }
  },
  mounted() {
    this.client.onMessage((connection, data) => {
      if (data?.workers) {
        this.workerMarkers = data.workers
      }
    })
  },
  destroyed() {
    this.client.close()
  },
}
export default connectToBackend
