import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const theme = ref("auto");

  function setCurTheme(val: string) {
    theme.value = val;
  }

  return {
    theme,
    setCurTheme,
  };
});
