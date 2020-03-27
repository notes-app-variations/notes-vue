<template>
  <div class="h-full  w-5/6 lg:w-2/5 m-auto">
    <form @submit="saveNote" class="flex flex-col">
      <div class="note-header flex items-end my-5">
        <h2 contenteditable :v-text="title" @blur="onEdit" class=" w-3/5 mr-4">
          {{ title }}
        </h2>
        <category-selector
          v-on:change-category="onChangeCategory"
          :categorySelected="category"
          :hasOptionForAll="false"
          class="ml-auto"
        />
      </div>
      <p class="text-xs italic ml-auto text-gray-500">
        TIP: You can write markdown!
        <a
          class=" text-blue-500"
          href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
          >Cheatsheet</a
        >
      </p>
      <textarea
        :value="body"
        @input="updateBody"
        class="border w-full h-56"
      ></textarea>
      <div class="flex my-5">
        <button
          class="btn-main bg-red-700 hover:bg-red-500"
          @click="deleteNote"
        >
          Delete
        </button>
        <button class="btn-main ml-auto w-1/3" type="submit">Save</button>
      </div>
      <div
        v-show="alert != ''"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span class="block sm:inline">{{ alert }}</span>
      </div>
    </form>
    <section class="my-6 bg-gray-200 text-gray-600 p-4 rounded-sm">
      <h3>Preview</h3>
      <hr />

      <div v-html="compiledMarkdown"></div>
    </section>
  </div>
</template>

<script>
import marked from "marked"
import CategorySelector from "../components/CategorySelector"
import { postNote, editNote, deleteNote } from "@/api/actions.ts"
export default {
  name: "Note",
  components: {
    CategorySelector
  },
  props: {
    note: {
      default() {
        return {
          title: "New note",
          body:
            "- Create lists\n- Or [links](https://www.google.com)\n---\n| Tables        | Are           | Cool  |\n| ------------- |:-------------:| -----:|\n| col 3 is      | right-aligned | $1600 |\n| col 2 is      | centered      |   $12 |\n| zebra stripes | are neat      |    $1 |",
          category: "Work"
        }
      }
    }
  },
  data() {
    return {
      title: this.note.title,
      body: this.note.body,
      category: this.note.category,
      alert: ""
    }
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.body)
    }
  },
  methods: {
    updateBody(e) {
      this.body = e.target.value
    },
    onEdit(evt) {
      const src = evt.target.innerText
      this.title = src
    },
    onChangeCategory(c) {
      this.category = c
    },
    async saveNote(e) {
      e.preventDefault()
      if (this.note._id) {
        try {
          editNote(this.note._id, {
            title: this.title,
            body: this.body,
            category: this.category
          })
          this.$router.push("/notes")
        } catch (e) {
          this.alert = e
        }
      } else {
        try {
          postNote({
            title: this.title,
            body: this.body,
            category: this.category
          })
          this.$router.push("/notes")
        } catch (e) {
          this.alert = e
        }
      }
    },
    async deleteNote(e) {
      e.preventDefault()
      try {
        deleteNote(this.note._id)
        this.$router.push("/notes")
      } catch (e) {
        this.alert = e
      }
    }
  }
}
</script>

<style></style>
