import { whitelistOfAuth } from "./whitelist";
import { GEC_AUTH } from "@/constants/auth.constant";
import { GEC_INDEX } from "@/constants/user.constant";
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
    path: "/reset-password",
    name: "reset-password",
    component: () => import("@/views/login/reset-password/reset-password.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/signup/signup.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue"),
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

  if (!whitelistOfAuth.includes(path)) {
    const token = localCache.getCache(GEC_AUTH);
    if (!token) {
      return "/login";
    }
  }

  if (path === "/main") {
    const index = localCache.getCache(GEC_INDEX);
    if (index && index?.startsWith("/")) {
      return index;
    }
  }
});

export default router;
