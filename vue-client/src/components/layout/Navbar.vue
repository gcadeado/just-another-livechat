<template>
  <section>
    <nav class="navbar" role="navigation" aria-label="main dropdown navigation">
      <div
        :class="[
          'navbar-brand',
          sidebar.hidden && sidebar.opened ? 'sidebar-expanded' : ''
        ]"
      >
        <div class="navbar-item">
          <a class="nav-item" @click="toggleSidebar({ opened: !sidebar.opened })">
            <i v-if="sidebar.opened" class="fa fa-2x fa-times"></i>
            <i v-else class="fa fa-2x fa-bars"></i>
          </a>
        </div>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">{{ $auth.user().email }}</a>

            <div class="navbar-dropdown is-right">
              <a class="navbar-item" @click="logout()">Logout</a>
              <hr class="navbar-divider" />
              <div class="navbar-item">Version 0.0.1</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["sidebar"])
  },
  methods: {
    ...mapActions(["toggleSidebar"]),
    logout() {
      this.$auth.logout({
        makeRequest: false,
        success() {
          console.log("Logged out");
        },
        error() {
          console.log("There was an error");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
.navbar {
  background-color: #fafafa;
}

.navbar-brand {
  transition: $navbar-collateral-sidebar-transition;
  transform-origin: top left;
  transform: none;
  &.sidebar-expanded {
    transform: translateX($sidebar-width-expanded);
  }
}
</style>
