import * as types from "../mutations";

const state = {
  device: {
    isMobile: false,
    isTablet: false
  },
  sidebar: {
    opened: false,
    hidden: false
  },
  language: "en"
};

const getters = {
  app: state => state,
  device: state => state.device,
  sidebar: state => state.sidebar,
  language: state => state.language
};

const actions = {
  toggleSidebar: ({ commit }, config) => {
    if (config instanceof Object) {
      commit(types.TOGGLE_SIDEBAR, config);
    }
  },

  toggleDevice: ({ commit }, device) => {
    commit(types.TOGGLE_DEVICE, device);
  },

  setLanguage: ({ commit }, language) => {
    commit(types.SET_LANGUAGE, language);
  }
};

const mutations = {
  [types.TOGGLE_DEVICE](state, device) {
    state.device.isMobile = device === "mobile";
    state.device.isTablet = device === "tablet";
    state.device.isDesktop = device === "desktop";
  },

  [types.TOGGLE_SIDEBAR](state, config) {
    if (config.hasOwnProperty("opened")) {
      state.sidebar.opened = config.opened;
    } else {
      state.sidebar.opened = true;
    }

    if (config.hasOwnProperty("hidden")) {
      state.sidebar.hidden = config.hidden;
    }
  },

  [types.SET_LANGUAGE]: (state, language) => {
    state.language = language;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
