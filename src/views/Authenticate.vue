<template>
  <div class="auth-tabs">
    <button @click="currentTab = 'Login'">
      Login
    </button>
    <button @click="currentTab = 'Register'">
      Register
    </button>
    <keep-alive>
      <component v-bind:is="currentTab"></component>
    </keep-alive>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import Login from "@/components/Login.vue"
import Register from "@/components/Register.vue"

@Component({
  components: {
    Login,
    Register
  }
})
export default class Authenticate extends Vue {
  private currentTab = "Login"
}
</script>
