import Vue from "vue";
import Router from "vue-router";
import store from "./store.js";

Vue.use(Router);

const router = new Router({
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
      meta: { requiresAuth: true },
      component: () => import("./world/WorldList.vue")
    },
    {
      path: "/base/:base",
      name: "base",
      props: true,
      meta: { requiresAuth: true },
      component: () => import("./game/Base.vue")
    },
    {
      path: "/map/:id",
      name: "map",
      props: true,
      meta: { requiresAuth: true },
      component: () => import("./map/Map.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.session) {
      next({
        path: "/signin",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
