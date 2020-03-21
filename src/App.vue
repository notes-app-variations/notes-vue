<template>
  <div id="app">
    <header class="flex justify-between items-center">
      <router-link to="/"><h1 class="page-title ml-3">notes.</h1></router-link>
      <button @click="logout" class="btn-main mr-3">
        Logout
      </button>
    </header>
    <router-view />
    <footer class="flex justify-center">
      <p class="m-auto text-sm font-light text-gray-500">Made with Vue</p>
    </footer>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  methods: {
    logout(e: any) {
      e.preventDefault()
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      this.$router.push("/")
    }
  }
})
</script>

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
