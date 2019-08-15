import * as types from "../mutations";
const state = {
  messages: []
};

const getters = {
  messages: state => state.messages
};

const actions = {
  receiveMessage: ({ commit }, message) => {
    if (typeof message === "object") {
      commit(types.APPEND_MESSAGE, message);
    }
  },
  sendMessage: ({ commit }, message) => {
    if (typeof message === "object") {
      commit(types.SEND_MESSAGE, message);
    }
  }
};

const mutations = {
  [types.APPEND_MESSAGE](state, message) {
    state.messages.push(message);
  },
  [types.SEND_MESSAGE](state, message) {
    state.messages.push(message);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
