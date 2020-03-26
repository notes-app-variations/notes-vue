<template>
  <div id="app">
    <header class="flex justify-between items-center">
      <router-link to="/"
        ><h1 class="page-title text-gray-900 ml-3">notes.</h1></router-link
      >
      <button v-if="isLoggedIn" @click="logout" class="btn-main mr-3">
        Logout
      </button>
    </header>
    <section class="h-100 flex-1">
      <router-view />
    </section>

    <footer class="flex justify-center mt-2">
      <p class="m-auto text-sm font-light text-gray-500">
        Made with Vue &#x1F680;
      </p>
    </footer>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import { GlobalVars, User } from "@/api/vars"
export default Vue.extend({
  methods: {
    logout(e: Event) {
      e.preventDefault()
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      GlobalVars.token = ""
      GlobalVars.user = {} as User
      this.$router.push("/")
    }
  },
  computed: {
    isLoggedIn() {
      return this.$route.path != "/"
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
