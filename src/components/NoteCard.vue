<template>
  <div class="note-card rounded shadow-md">
    <h2>{{ note.title }}</h2>
    <p>{{ note.body }}</p>
    <span
      class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
      >{{ note.category }}</span
    >
    <p class="text-xs italic text-gray-400">{{ note.createdAt }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

@Component
export default class NoteCard extends Vue {
  @Prop() private note!: string
}
</script>

<style lang="scss"></style>
