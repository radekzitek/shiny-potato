import { createRouter, createWebHistory } from "vue-router";

// Define your routes
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomePage.vue"),
    meta: { title: "Home" },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/AboutPage.vue"),
    meta: { title: "About Us" },
  },
  {
    path: "/callback",
    name: "Callback",
    component: () => import("../views/CallBack.vue"),
    meta: { title: "Callback" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
    meta: { title: "Page Not Found" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Auth logic here
  next();
});

export default router;
