<template>
  <div class="flex items-center justify-center flex-grow">
    <div class="container has-text-centered l">
      <div class="column is-4 is-offset-4">
        <figure class="image mw6">
          <img src="@/assets/pusheen-computer.png" />
        </figure>
        <h1 class="title mt4">Just Another Livechat</h1>
        <p class="subtitle is-6 has-text-grey">A simple user chat made with Vue and Elixir</p>
        <div class="box">
          <form @submit.prevent="loginUser">
            <div class="field">
              <div class="control">
                <input
                  class="input is-large"
                  v-model="login.email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  autofocus
                  required
                  type="email"
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input
                  class="input is-large"
                  v-model="login.password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  autofocus
                  required
                  type="password"
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <label class="checkbox">
                  <input type="checkbox" v-model="login.rememberMe" />
                  Remember me
                </label>
              </div>
            </div>
            <button class="button is-rounded is-info is-large is-fullwidth">Enter</button>
          </form>
        </div>
      </div>
      <div class="subtitle is-7">
        <p>
          Made with
          <i class="fa fa-coffee"></i> by
          <a
            href="https://www.linkedin.com/in/gabriel-cencic-804280115/"
            target="_blank"
          >Gabriel Cencic</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      isLoading: false,
      login: {
        email: null,
        password: null,
        rememberMe: false
      }
    };
  },
  methods: {
    loginUser: function(e) {
      this.isLoading = true;
      var redirect = this.$auth.redirect();
      this.$auth.login({
        data: this.login,
        rememberMe: this.login.rememberMe,
        error: function() {
          // TODO add UX
          console.log(arguments, "Failed to login");
        },
        redirect: { name: "Chat" },
        fetchUser: true
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
