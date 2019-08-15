import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: { name: "Chat" }
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Login.vue"),
      meta: { auth: false }
    },
    {
      path: "/@",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/Home.vue"),
      meta: { auth: true },
      children: [
        {
          path: "",
          name: "Chat",
          component: () => import("@/views/Chat.vue")
        },
        {
          path: "/@/:id",
          name: "Conversation",
          component: () => import("@/views/Chat.vue"),
          props: true
        }
      ]
    },
    // { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
    { path: "/404", redirect: { name: "Chat" } }
    // { path: '/401', component: _import('errorPage/401'), hidden: true }
  ]
});
