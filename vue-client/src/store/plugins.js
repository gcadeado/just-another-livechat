import { channel } from "../socket";
import * as types from "./mutations";

export const channelPlugin = store => {
  channel.on("shout", payload => {
    store.dispatch("receiveMessage", {
      id: payload.id,
      type: "TEXT",
      author: null,
      payload: { text: payload.message }
    });
  });
  store.subscribe((mutation) => {
    if (mutation.type === types.SEND_MESSAGE) {
      console.log(mutation.type);
      channel.push("shout", mutation.payload);
    }
  });
};
