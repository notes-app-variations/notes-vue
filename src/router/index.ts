import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Authenticate from "../views/Authenticate.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Authenticate",
    component: Authenticate
  },
  {
    path: "/notes",
    name: "Home",
    component: Home
  },
  {
    path: "/notes/:id",
    name: "Note",
    component: () => import("../views/Note.vue")
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
