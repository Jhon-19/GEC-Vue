<template>
  <div class="main">
    <ElContainer class="main-content">
      <template v-if="!isKg">
        <ElAside width="200px"><NavMenu /></ElAside>
        <ElContainer class="page">
          <ElHeader>
            <NavHeader />
          </ElHeader>
          <ElMain>
            <RouterView></RouterView>
          </ElMain>
        </ElContainer>
      </template>
      <template v-else>
        <ElMain>
          <RouterView></RouterView>
        </ElMain>
      </template>
    </ElContainer>
  </div>
</template>

<script lang="ts" setup>
import { ElAside, ElContainer, ElHeader, ElMain } from "element-plus";
import NavMenu from "@/components/nav-menu";
import NavHeader from "@/components/nav-header";
import { ref, watchEffect } from "vue";
import router from "@/router";

const isKg = ref(false);

watchEffect(() => {
  isKg.value = router.currentRoute.value.name?.toString() === "knowledge-graph";
});
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
