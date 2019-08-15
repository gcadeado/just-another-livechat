// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/web/endpoint.ex":
import { Socket } from "phoenix-socket";
import Vue from "vue";

export default class PhoenixSocket {
  socket;
  channels = {};
  socketUrl = "ws://localhost:4000/socket";
  constructor(token) {
    this.socket = new Socket(this.socketUrl, {
      params: { token }
    });
  }

  connect() {
    this.socket.connect();
  }

  joinChannel(channelId) {
    this.channels.channelId = this.socket.channel(channelId, {});
    return new Promise(resolve => {
      this.channels.channelId.join().receive("ok", resp => {
        resolve(resp);
      });
    });
  }
}

export function createSocket(token) {
  Vue.prototype.$phoenix = new PhoenixSocket(token);
  Vue.prototype.$phoenix.connect();
}
