import { useThemeStore } from "@/stores/main/kg/theme";
import { onMounted, watch } from "vue";
import { useDark, useToggle } from "@vueuse/core";

// 主题切换
export const isDark = useDark({
  selector: "html",
  storageKey: "starry-graph",
  valueDark: "dark",
  valueLight: "light",
});

export const toggleDark = useToggle(isDark);

export function storeTheme() {
  const themeStore = useThemeStore();

  onMounted(() => {
    themeStore.setCurTheme(isDark.value ? "dark" : "light");
  });

  watch(isDark, (val) => {
    const theme = val ? "dark" : "light";
    themeStore.setCurTheme(theme);
  });
}
