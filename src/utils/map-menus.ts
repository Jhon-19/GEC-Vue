import type { IMenuItem } from "@/stores/login/types";
import type { RouteRecordRaw } from "vue-router";

export function mapMenusToRoutes(userMenus: IMenuItem[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];

  const allRoutes: RouteRecordRaw[] = [];
  const routeFiles = import.meta.glob("../router/main/**/*.ts", {
    eager: true,
  });

  Object.values(routeFiles).forEach((module: any) => {
    allRoutes.push(module.default);
  });

  const _recurseGetRoute = (menus?: IMenuItem[]) => {
    if (!menus) {
      return;
    }
    for (const menu of menus) {
      if (!menu.isSubMenu) {
        const route = allRoutes.find((route) => route.path === menu.url);
        if (route) {
          routes.push(route);
        }
      } else {
        _recurseGetRoute(menu.children);
      }
    }
  };

  _recurseGetRoute(userMenus);

  return routes;
}
