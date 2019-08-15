<template>
  <div class="flex flex-grow">
    <loading-screen v-if="loading || !connected"></loading-screen>
    <div v-else class="flex flex-grow">
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Navbar, Sidebar, History, Footerbar } from "@/components/layout/";
import { LoadingScreen } from "@/components/";
import { createSocket } from "@/socket";

export default {
  name: "home",
  components: {
    Navbar,
    Sidebar,
    History,
    Footerbar,
    LoadingScreen
  },
  data() {
    return {
      mobile: false,
      loading: true,
      connected: false
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
    this.connect();
  },
  methods: {
    ...mapActions(["toggleSidebar", "toggleDevice"]),
    joinChannels(channels) {
      channels.forEach(conversation => {
        this.$phoenix
          .joinChannel(`conversation:${conversation.id}`)
          .then(resp => {
            console.log("Connected to conversation", resp);
          });
      });
      setTimeout(() => {
        // Testing only
        this.loading = false;
      }, 3000);
    },
    connect() {
      createSocket();
      this.$phoenix.connect();
      this.$phoenix.joinChannel(`user:${this.$auth.user().id}`).then(resp => {
        const mock = {
          topic: `user:${this.$auth.user().id}`,
          availableChannels: [{ id: 1 }, { id: 2 }, { id: 3 }]
        };
        console.log("Connected to channel", mock);
        this.connected = true;
        this.joinChannels(mock.availableChannels); // Hardcoded for testing purposes
      });
    }
  }
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
