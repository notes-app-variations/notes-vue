<template>
  <form @submit="register">
    <input
      class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
      type="email"
      v-model="user.email"
      placeholder="jane@example.com"
      required
    />
    <input
      class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mt-2"
      type="text"
      v-model="user.username"
      placeholder="username"
      required
    />
    <input
      class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal my-2"
      type="password"
      v-model="user.password"
      placeholder="*********"
      required
    />
    <button
      class="w-full shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
      type="submit"
    >
      Register
    </button>
    <p>{{ alert }}</p>
  </form>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

@Component
export default class Register extends Vue {
  private user = {
    username: "",
    email: "",
    password: ""
  }
  private alert = ""

  private async register(e: any) {
    e.preventDefault()
    const response = await fetch("http://localhost:5000/api/register", {
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
      this.alert = await response.json()
    }
  }
}
</script>

<style></style>
