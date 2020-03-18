<template>
  <div id="app">
    <h1 class="page-title ml-3">notes.</h1>
    <router-view />
    <section class="flex justify-center">
      <p class="m-auto">Made with Vue</p>
    </section>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Cedarville+Cursive&display=swap");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .page-title {
    font-family: "Cedarville Cursive", cursive;
    font-size: 3rem;
  }
}
</style>
