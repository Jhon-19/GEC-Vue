import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";

import "@/styles/common.style.less"; // import global styles
import { initMenuRoutes } from "./stores/login/login";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

app.use(pinia);
initMenuRoutes();
app.use(router);

app.use(ElementPlus);
// register all icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
