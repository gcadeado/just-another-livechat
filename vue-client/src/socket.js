// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/web/endpoint.ex":
import { Socket } from "phoenix-socket";

export const socket = new Socket("ws://localhost:4000/socket", {
  params: { token: window.userToken }
});

socket.connect();

export const channel = socket.channel("user:lobby", {});

channel.join().receive("ok", resp => {
  console.log("Joined chat!", resp);
});
