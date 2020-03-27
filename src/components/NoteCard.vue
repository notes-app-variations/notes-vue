<template>
  <router-link
    class="note-card rounded shadow-md cursor-pointer p-4 overflow-hidden flex flex-col text-gray-700"
    :class="bgColor"
    :to="{ name: 'Note', params: { note } }"
  >
    <header class="flex justify-between mb-3">
      <h2>{{ note.title }}</h2>
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
        >{{ note.category }}</span
      >
    </header>

    <p class="note-body" v-html="compiledNoteBody"></p>
    <footer class="flex justify-end mt-auto">
      <p class="text-xs italic text-gray-500 mt-2">{{ note.createdAt }}</p>
    </footer>
  </router-link>
</template>

<script lang="ts">
import marked from "marked"
import { Component, Prop, Vue } from "vue-property-decorator"
import { Note } from "@/api/vars"

@Component
export default class NoteCard extends Vue {
  @Prop() private note!: Note

  get compiledNoteBody() {
    return marked(this.note.body)
  }
  get bgColor() {
    switch (this.note.category) {
      case "Work":
        return "bg-teal-200"
      case "Personal":
        return "bg-green-200"
      case "Todo":
        return "bg-orange-200"
      case "Links":
        return "bg-blue-200"
    }
    return ""
  }
}
</script>

<style lang="scss">
.note-body {
  li {
    margin-left: 1rem;
  }
}
</style>
