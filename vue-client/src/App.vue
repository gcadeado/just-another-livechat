<template>
  <div id="app">
    <transition mode="out-in" name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
@import "styles/main.scss";
@import "~font-awesome/css/font-awesome.min.css";
@import url("https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&display=swap");

body {
  height: 100%;
  font-family: "Poppins", Helvetica Neue, Helvetica, Arial, sans-serif;
}

html {
  height: 100%;
  overflow: hidden;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
