<template>
  <div class="flex flex-grow">
    <sidebar></sidebar>
    <div
      :class="[
        'main-container flex flex-auto flex-column justify-between',
        !sidebar.opened && !sidebar.hidden ? 'sidebar-minimized' : '',
        sidebar.hidden ? 'sidebar-hidden' : ''
      ]"
    >
      <navbar></navbar>
      <history></history>
      <footerbar></footerbar>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Navbar, Sidebar, History, Footerbar } from "@/components/layout/";
export default {
  name: "home",
  components: {
    Navbar,
    Sidebar,
    History,
    Footerbar
  },
  data() {
    return {
      mobile: false
    };
  },
  computed: {
    ...mapGetters({
      sidebar: "sidebar",
      device: "device"
    }),
    isMobile() {
      return this.$resize && this.$mq.expr(this.$mq.bands.mobile);
    }
  },
  watch: {
    isMobile: function(value) {
      this.toggleSidebar({
        opened: false,
        hidden: value
      });
    }
  },
  mounted() {
    this.toggleSidebar({
      hidden: this.$mq.expr(this.$mq.bands.mobile),
      opened: true
    });
  },
  methods: mapActions(["toggleSidebar", "toggleDevice"])
};
</script>

<style lang="scss">
@import "@/styles/main.scss";

.main-container {
  min-height: 100%;
  transition: $sidebar-collateral-transition;
  margin-left: $sidebar-width-expanded;
  // transform: translateX($sidebar-width-expanded) scaleX(strip-unit((100vw - get-vw($sidebar-width-expanded))/100vw));

  &.sidebar-minimized {
    // transform: translateX($sidebar-width-minimized);
    margin-left: $sidebar-width-minimized !important;
  }
  &.sidebar-hidden {
    // transform: translateX(0);
    margin-left: 0 !important;
  }
}
</style>
