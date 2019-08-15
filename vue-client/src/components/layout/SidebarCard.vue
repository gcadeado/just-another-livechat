<template>
  <a class="flex sidebar-card">
    <!-- <div class="card-marker has-background-link"></div> -->
    <div
      class="flex-auto pv2 ph3 flex items-center"
    >
      <figure :class="['image', 'is-48x48', 'self-center']">
        <img class="card-avatar is-rounded" :src="picture" />
      </figure>
      <transition name="fade">
        <div v-if="!shrink" class="flex flex-auto flex-column ml3">
          <span class="is-size-6 has-text-grey-dark">{{ name }}</span>
          <span class="is-size-7 has-text-grey">I need help</span>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="!shrink">
          <span class="is-size-7 has-text-grey">{{ timestamp }}</span>
        </div>
      </transition>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    name: String,
    picture: String,
    timestamp: String,
    shrink: {
      default: false,
      type: Boolean
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar-card {
  text-decoration: none;
  :hover {
    background-color: hsl(0, 0%, 96%) !important;
  }
}
.card-marker {
  width: 0.42rem;
  display: block;
}
.card-avatar {
  min-width: 48px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.075s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>
