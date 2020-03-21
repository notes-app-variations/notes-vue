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
      Login
    </button>
  </form>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

@Component
export default class Login extends Vue {
  private user = {
    username: "",
    email: "",
    password: ""
  }

  private async login(e: any) {
    e.preventDefault()
    const response = await fetch("http://localhost:5000/api/login", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.user)
    })
    if (response.status >= 200 && response.status <= 299) {
      const userInfo = await response.json()
      localStorage.setItem("token", userInfo.token)
      localStorage.setItem("user", JSON.stringify(userInfo.user))
      if (this.$route.params.nextUrl != null)
        this.$router.push(this.$route.params.nextUrl)
      else this.$router.push("/notes")
    } else {
      console.log(response.status, response.statusText)
    }
  }
}
</script>

<style></style>
