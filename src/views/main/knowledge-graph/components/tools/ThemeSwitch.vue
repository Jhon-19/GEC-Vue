<script setup>
import ToolWrapper from "@/components/ToolWrapper.vue";
import { isDark, storeTheme, toggleDark } from "@/utils/theme";

storeTheme();
</script>
<template>
  <tool-wrapper @click="toggleDark()">
    <label class="theme-switch" title="切换主题" @click.prevent>
      <input type="checkbox" v-model="isDark" />
      <span class="slider"></span>
    </label>
  </tool-wrapper>
</template>

<style lang="less" scoped>
.theme-switch {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  > input {
    opacity: 0;
    width: 0;
    height: 0;
    &:checked + .slider:before {
      background: #303136;
      box-shadow: inset -0.2rem -0.125rem 0.3125rem -0.125rem #8983f7,
        inset -0.625rem -0.25rem 0 0 #a3dafb;
    }
  }
  > .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    transition: all 200ms;
    &:before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      left: 50%;
      border-radius: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      background: linear-gradient(40deg, #ff0080, #ff8c00 70%);
      transition: 0.4s;
    }
  }
}
</style>
