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
        <button class="btn-main ml-auto" type="submit">Save</button>
      </div>
    </form>
    <section class="my-6 bg-gray-200 text-gray-600 p-4 rounded-sm">
      <h3>Preview</h3>
      <div v-html="compiledMarkdown"></div>
    </section>
  </div>
</template>

<script>
import marked from "marked"
import CategorySelector from "../components/CategorySelector"
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
          body: "",
          category: "Work"
        }
      }
    }
  },
  data() {
    return {
      title: this.note.title,
      body: this.note.body,
      category: this.note.category
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
      let result
      const uid = JSON.parse(localStorage.getItem("user"))._id
      if (this.note._id) {
        result = await fetch(
          `http://localhost:5000/api/notes/${this.note._id}`,
          {
            method: "put",
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: this.title,
              body: this.body,
              category: this.category,
              userId: uid
            })
          }
        )
      } else {
        result = await fetch(`http://localhost:5000/api/notes/`, {
          method: "post",
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: this.title,
            body: this.body,
            category: this.category,
            userId: uid
          })
        })
      }
      if (result.ok) {
        this.$router.push("/notes")
      } else {
        this.alert = await result.json()
      }
    },
    async deleteNote(e) {
      e.preventDefault()
      const result = await fetch(
        `http://localhost:5000/api/notes/${this.note._id}`,
        {
          method: "delete",
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        }
      )
      if (result.ok) {
        this.$router.push("/notes")
      } else {
        this.alert = await result.json()
      }
    }
  }
}
</script>

<style></style>
