<template>
  <form @submit="login">
    <input
      class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
      type="email"
      v-model="user.email"
      placeholder="jane@example.com"
      required
    />
    <input
      class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal my-2"
      type="password"
      v-model="user.password"
      placeholder="*********"
      required
    />
    <button class="w-full btn-main" type="submit" required>
      {{ loading ? "Loading..." : "Login" }}
    </button>
  </form>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { login } from "@/api/authActions.ts"

@Component
export default class Login extends Vue {
  private user = {
    email: "",
    password: ""
  }
  private alert = ""
  private loading = false

  private async login(e: Event) {
    e.preventDefault()
    this.loading = true
    try {
      await login(this.user)
      if (this.$route.params.nextUrl != null)
        await this.$router.push(this.$route.params.nextUrl)
      else {
        await this.$router.push("/notes")
      }
    } catch (e) {
      this.alert = e
      this.loading = false
    }
  }
}
</script>

<style></style>
