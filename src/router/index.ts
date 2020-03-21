import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Authenticate from "../views/Authenticate.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Authenticate",
    component: Authenticate,
    meta: {
      guest: true
    }
  },
  {
    path: "/notes",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/note",
    name: "Note",
    component: () => import("../views/Note.vue"),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("token") == null) {
      next({
        path: "/",
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("token") == null) {
      next()
    } else {
      next({ path: "/notes" })
    }
  } else {
    next()
  }
})

export default router
