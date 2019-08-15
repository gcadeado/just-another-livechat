import Vue from "vue";
import { MediaQueries, CommonBands } from "vue-media-queries";
import axios from "axios";
import VueAxios from "vue-axios";
import VueAuth from "@websanova/vue-auth";
import App from "./App";
import router from "./router";
import store from "./store";
import i18n from "./lang"; // Internationalization module
import * as filters from "./filters"; // Global filters

const mediaQueries = new MediaQueries({
  bands: CommonBands.Bulma
});

Vue.use(mediaQueries); // https://www.npmjs.com/package/vue-media-queries#setup
Vue.router = router;
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = "http://localhost:4000/api/v1";
Vue.use(VueAuth, {
  auth: {
    request: function(req, token) {
      this.options.http._setHeaders.call(this, req, {
        Authorization: "Bearer " + token
      });
    },

    response: function(res) {
      if (res.data.token) {
        return res.data.token;
      }
    }
  },
  http: require("@websanova/vue-auth/drivers/http/axios.1.x.js"),
  router: require("@websanova/vue-auth/drivers/router/vue-router.2.x.js"),
  loginData: {
    url: "/login",
    method: "POST",
    redirect: "/chat",
    fetchUser: false
  },
  refreshData: { url: "/refresh", method: "GET", enabled: false, interval: 30 },
  fetchData: { url: "/user", method: "GET", enabled: true },
  parseUserData: function(data) {
    console.log(data);
    return data;
  },
  logoutData: {url: '/logout', method: 'POST', redirect: '/login', makeRequest: false}
});
// Register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  mediaQueries,
  render: h => h(App)
}).$mount("#app");
