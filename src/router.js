import Vue from "vue";
import Router from "vue-router";

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
      component: () => import("./game/World.vue")
    },
    {
      path: "/base/:base",
      name: "base",
      props: true,
      component: () => import("./game/Base.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
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
