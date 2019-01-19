import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      meta: { requiresAuth: true },
      component: () => import("./home/Home.vue")
    },
    {
      path: "/join",
      name: "join",
      component: () => import("./auth/Join.vue")
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("./auth/Signin.vue")
    },
    {
      path: "/game",
      name: "game",
      component: () => import("./game/World.vue")
    }
  ]
});
