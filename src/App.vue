<template>
  <ElConfigProvider :locale="locale">
    <RouterView></RouterView>
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import { zhCn } from "element-plus/es/locale/index.mjs";

import { ref } from "vue";

const locale = ref(zhCn);
</script>

<style scoped lang="less"></style>
