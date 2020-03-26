<template>
  <div class="auth-page h-full flex justify-center items-center">
    <div class="auth-tabs h-64">
      <ul class="flex border-b list-none">
        <li class="mr-1 w-1/2" :class="{ '-mb-px': currentTab == 'Login' }">
          <button
            @click="currentTab = 'Login'"
            :class="{
              'border-l border-t border-r rounded-t text-gray-700':
                currentTab == 'Login'
            }"
            class="bg-orange-100 w-full inline-block py-2 px-4 text-gray-500 font-semibold focus:outline-none"
          >
            Login
          </button>
        </li>
        <li class="w-1/2" :class="{ '-mb-px': currentTab == 'Register' }">
          <button
            @click="currentTab = 'Register'"
            :class="{
              'border-l border-t border-r rounded-t text-gray-700':
                currentTab == 'Register'
            }"
            class="bg-orange-100 w-full inline-block py-2 px-4 text-gray-500 font-semibold focus:outline-none"
          >
            Register
          </button>
        </li>
      </ul>
      <keep-alive>
        <component
          class="p-6 bg-orange-200 border-l border-r border-b shadow"
          v-bind:is="currentTab"
        ></component>
      </keep-alive>
    </div>
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
