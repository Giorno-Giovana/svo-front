export default class SocketClient {
  constructor(config) {
    this.webSocket = new WebSocket('ws://' + config.domain)
    this.onMessageHandler = function (message) {
      console.log(message)
    }
    const client = this
    this.webSocket.onmessage = function (event) {
      client.onMessageHandler(event.data)
    }
    this.webSocket.onclose = function () {
      console.log('<Соединение закрыто>')
    }
  }

  onMessage(handler) {
    this.onMessageHandler = handler
  }

  send(message) {
    this.webSocket.send(message)
  }

  close() {
    this.webSocket.close()
  }
}
