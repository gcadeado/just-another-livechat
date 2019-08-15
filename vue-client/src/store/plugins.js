import PhoenixChannel from "@/socket";
import * as types from "./mutations";

export const channelPlugin = store => {
  console.log(store);

  // TODO resolve for various channels

  // PhoenixChannel.channels.on("shout", payload => {
  //   store.dispatch("receiveMessage", {
  //     id: payload.id,
  //     type: "TEXT",
  //     author: null,
  //     payload: { text: payload.message }
  //   });
  // });
  store.subscribe(mutation => {
    console.log(mutation);
    // if (mutation.type === types.SEND_MESSAGE) {
    //   channel.push("shout", mutation.payload);
    // }
  });
};
