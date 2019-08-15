import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import messages from "./modules/messages";

import { channelPlugin } from "./plugins";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true, // process.env.NODE_ENV !== 'production',
  modules: {
    app,
    messages
  },
  plugins: [channelPlugin]
});

export default store;
