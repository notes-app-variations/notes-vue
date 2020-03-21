<template>
  <div class="h-full">
    <form @submit="saveNote" class="w-2/5 m-auto flex flex-col">
      <div class="note-header flex items-end my-5">
        <h2 contenteditable :v-text="title" @blur="onEdit" class=" w-3/5 mr-4">
          {{ title }}
        </h2>
        <category-selector
          v-on:change-category="onChangeCategory"
          class="ml-auto"
        />
      </div>
      <p class="text-xs italic ml-auto text-gray-500">
        TIP: You can write markdown!
      </p>
      <textarea
        :value="body"
        @input="updateBody"
        class="border w-full h-56"
      ></textarea>
      <div class="flex my-5">
        <button class="btn-main bg-red-700 hover:bg-red-500">Delete</button>
        <button class="btn-main ml-auto" type="submit">Save</button>
      </div>

      <div v-html="compiledMarkdown"></div>
    </form>
  </div>
</template>

<script>
import marked from "marked"
import CategorySelector from "../components/CategorySelector"
export default {
  components: {
    CategorySelector
  },
  props: {
    note: {
      default() {
        return {
          title: "New note",
          body: "",
          category: "work"
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
      console.log("he")
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
        this.notes = await result.json()
        console.log(this.notes)
      } else {
        this.alert = await result.json()
      }
    }
  }
}
</script>

<style></style>
