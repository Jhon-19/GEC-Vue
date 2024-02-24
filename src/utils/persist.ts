import { addMenuRoutes } from "@/stores/login/login";
import type { PersistedStateOptions } from "pinia-plugin-persistedstate";
import { toRaw } from "vue";

const piniaPersistConfig = (key: string, paths?: string[]) => {
  const persist: PersistedStateOptions = {
    key,
    storage: window.localStorage,
    paths,
    afterRestore: (context) => {
      const userMenus = toRaw(context.store.userMenus);
      // console.log(userMenus);
      if (userMenus) {
        addMenuRoutes(userMenus);
      }
    },
  };
  return persist;
};

export default piniaPersistConfig;
