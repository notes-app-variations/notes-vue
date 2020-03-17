<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <note-card msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import NoteCard from "@/components/NoteCard.vue"

export default {
  name: "Home",
  components: {
    NoteCard
  }
}
</script>
