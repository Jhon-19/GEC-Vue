<template>
  <tool-wrapper @click="toMainPage">
    <a class="external-link github" title="返回系统" href="#">
      <el-icon color="#409efc"><Present /></el-icon>
    </a>
  </tool-wrapper>
</template>

<script setup>
import ToolWrapper from "@/components/ToolWrapper.vue";
const toMainPage = () => {
  // window.open("https://gitee.com/space-earth/starry-graph", "_blank");
  window.location = "/main/user/info";
};
</script>

<style lang="less" scoped>
.external-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  :deep(.el-icon .github) {
    font-size: var(--opera-tool-font-size);
    fill: currentColor;
  }
}
</style>
