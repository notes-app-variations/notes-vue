<template>
  <div class="home h-full w-4/5 lg:w-3/4 m-auto">
    <section class="my-8">
      <router-link to="/note" class="btn-main bg-red-500 hover:bg-red-400"
        >Create new</router-link
      >
    </section>

    <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <note-card
        v-for="n in notes"
        :key="n._id"
        :note="n"
        class="cursor-pointer"
      />
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import NoteCard from "@/components/NoteCard.vue"

export default {
  name: "Home",
  components: {
    NoteCard
  },
  data() {
    return {
      notes: [],
      alert: ""
    }
  },
  async mounted() {
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    const uid = user._id
    const result = await fetch(`http://localhost:5000/api/notes/user/${uid}`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    if (result.ok) {
      this.notes = await result.json()
      console.log(this.notes)
    } else {
      this.alert = await result.json()
    }
  },
  methods: {}
}
</script>
