<template>
  <div class="main">
    <ElContainer class="main-content">
      <ElAside width="200px"><NavMenu /></ElAside>
      <ElContainer class="page">
        <ElHeader>
          <NavHeader />
        </ElHeader>
        <ElMain>Main</ElMain>
      </ElContainer>
    </ElContainer>
  </div>
</template>

<script lang="ts" setup>
import { ElAside, ElContainer, ElHeader, ElMain } from "element-plus";
import NavMenu from "@/components/nav-menu";
import NavHeader from "@/components/nav-header";
</script>

<style scoped lang="less">
.main {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}
</style>
