export default class SocketClient {
  constructor(config) {
    this.webSocket = new WebSocket('ws://' + config.domain)
    this.webSocket.sendResponce = function (data) {
      this.send(JSON.stringify(data))
    }
    this.onMessageHandler = function (connect, data) {
      // console.log(data)
    }
    const client = this
    this.webSocket.onmessage = function (event) {
      client.onMessageHandler(client.webSocket, JSON.parse(event.data))
    }
    this.webSocket.onclose = function () {
      console.log('<Соединение закрыто>')
    }
  }

  onMessage(handler) {
    this.onMessageHandler = handler
  }

  send(data) {
    this.webSocket.send(JSON.stringify(data))
  }

  close() {
    this.webSocket.close()
  }
}

const socket = new WebSocket('ws://localhost:3257')
const socketHandlers = []
socket.onmessage = (e) => {
  const data = JSON.parse(e.data)
  socketHandlers.forEach((fn) => fn(data))
}
export function subscribeToWS(cb) {
  socketHandlers.push(cb)
}

export function send(data) {
  socket.send(JSON.stringify(data))
}
