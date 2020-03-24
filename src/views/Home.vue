<template>
  <div class="home h-full w-4/5 lg:w-3/4 m-auto">
    <section class="flex justify-between mb-8 mt-16">
      <category-selector
        v-on:change-category="onChangeCategory"
        :categorySelected="category"
        :hasOptionForAll="true"
      />
      <button
        @click="bulkDelete"
        class="btn-main bg-red-500 hover:bg-red-400 ml-4 mr-auto"
      >
        Delete selected
      </button>
      <router-link to="/note" class="btn-main bg-green-500 hover:bg-green-400"
        >Create new</router-link
      >
    </section>

    <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-show="alert != ''"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span class="block sm:inline">{{ alert }}</span>
      </div>
      <div v-for="n in filteredNotes" :key="n._id">
        <label class="text-gray-500 font-bold flex items-center">
          <input
            class="leading-tight"
            type="checkbox"
            v-model="selectedNotes"
            :value="n"
          />
          <span class="text-sm">
            Select for delete
          </span>
        </label>
        <note-card :note="n" />
      </div>
    </section>
  </div>
</template>

<script>
import NoteCard from "@/components/NoteCard.vue"
import CategorySelector from "@/components/CategorySelector.vue"
import { fetchNotes, deleteNote } from "@/api/actions.js"

export default {
  name: "Home",
  components: {
    NoteCard,
    CategorySelector
  },
  data() {
    return {
      notes: [],
      alert: "",
      category: "All",
      selectedNotes: []
    }
  },
  computed: {
    filteredNotes() {
      if (this.category == "All") return this.notes
      else return this.notes.filter(n => n.category == this.category)
    }
  },
  methods: {
    onChangeCategory(selected) {
      this.category = selected
    },
    async bulkDelete(e) {
      e.preventDefault()
      try {
        this.alert = ""
        await Promise.all(
          this.selectedNotes.map(async x => await deleteNote(x._id))
        )
        this.notes = await fetchNotes()
      } catch (e) {
        this.alert = e
      }
    }
  },
  async mounted() {
    try {
      this.alert = ""
      this.notes = await fetchNotes()
    } catch (e) {
      this.alert = e
    }
  }
}
</script>
