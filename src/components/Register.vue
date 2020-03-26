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
import { register } from "@/api/authActions.ts"

@Component
export default class Register extends Vue {
  private user = {
    username: "",
    email: "",
    password: ""
  }
  private alert = ""

  private async register(e: Event) {
    e.preventDefault()

    try {
      await register(this.user)
      if (this.$route.params.nextUrl != null)
        await this.$router.push(this.$route.params.nextUrl)
      else await this.$router.push("/notes")
    } catch (e) {
      this.alert = e
    }
  }
}
</script>

<style></style>
