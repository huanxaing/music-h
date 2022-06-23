import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/recomment/rtstyle",
  },
  {
    path: "/conent",
    name: "conent",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Conent.vue"),
  },
  {
    path: "/recomment",
    name: "Recomment",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Recomment.vue"),
    children: [
      {
        path: "/recomment/rtstyle",
        name: "Gexin",
        component: () => import("../views/Recomment/Gexin.vue"),
      },
      {
        path: "/recomment/songlist",
        name: "SongList",
        component: function() {
          return import("../views/Recomment/SongList.vue");
        },
      },
      {
        path: "/recomment/zhubo",
        name: "Zhubo",
        component: function() {
          return import("../views/Recomment/Zhubo.vue");
        },
      },
      {
        path: "/recomment/phang",
        name: "Gexin",
        component: () => import("../views/Recomment/Phang.vue"),
      },
      {
        path: "/recomment/singer",
        name: "Gexin",
        component: () => import("../views/Recomment/Singer.vue"),
      },
      {
        path: "/recomment/newmusic",
        name: "Gexin",
        component: () => import("../views/Recomment/NewMusic.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
