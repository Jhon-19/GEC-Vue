import { GEC_AUTH } from "@/constants/auth.constant";
import localCache from "@/utils/cache";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/signup/signup.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/not-found/not-found.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const path = to.path;

  if (path !== "/login" && path !== "/signup") {
    const token = localCache.getCache(GEC_AUTH);
    if (!token) {
      return "/login";
    }
  }
});

export default router;
