<template>
  <aside
    :class="[
      'pt5',
      'sidebar-container',
      !sidebar.opened && !sidebar.hidden ? 'sidebar-minimized' : '',
      !sidebar.opened && sidebar.hidden ? 'sidebar-hidden' : ''
    ]"
  >
    <div
      v-if="sidebar.opened && !sidebar.hidden"
      class="control has-icons-left has-icons-right mh3 mb2"
    >
      <input class="input is-rounded" placeholder="Search" />
      <span class="icon is-small is-left">
        <i class="fa fa-search"></i>
      </span>
    </div>

    <div>
      <sidebar-card
        :shrink="!sidebar.opened && !sidebar.hidden"
        name="Aang"
        picture="https://pbs.twimg.com/profile_images/831993825635745796/HnVmB0-k_400x400.jpg"
        timestamp="14:00"
        @click.native="redirectToConversation('@Aang')"
      ></sidebar-card>
      <sidebar-card
        name="Katara"
        :shrink="!sidebar.opened && !sidebar.hidden"
        picture="https://66.media.tumblr.com/1b6f4a36d7b60c000f5e80f3d159bc47/tumblr_pc8ex4pd181wzldfko6_250.jpg"
        timestamp="14:03"
        @click.native="redirectToConversation('@Katara')"
      ></sidebar-card>
      <sidebar-card
        name="Bumi"
        :shrink="!sidebar.opened && !sidebar.hidden"
        picture="https://vignette.wikia.nocookie.net/avatar/images/0/06/Bumi.png/revision/latest?cb=20140318090248"
        timestamp="14:55"
        @click.native="redirectToConversation('@Bumi')"
      ></sidebar-card>
    </div>
  </aside>
</template>
<script>
import { mapGetters } from "vuex";
import SidebarCard from "./SidebarCard.vue";
export default {
  components: {
    SidebarCard
  },
  methods: {
    redirectToConversation(id) {
      this.$router.push({ name: "Conversation", params: { id: id } });
    }
  },
  computed: {
    ...mapGetters(["sidebar"])
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.sidebar-container {
  transition: $sidebar-transition;
  width: $sidebar-width-expanded !important;
  background-color: $sidebar-background-color;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1024;
  transform-origin: left top;
  a {
    display: inline-block;
    width: 100%;
  }
  &.sidebar-minimized {
    // transform: scaleX($sidebar-scale-minimized);
    width: $sidebar-width-minimized !important;
  }
  &.sidebar-hidden {
    // transform: scaleX(0);
    width: 0 !important;
  }
}
</style>
