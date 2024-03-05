<template>
  <div>Info</div>
</template>

<script lang="ts" setup>
import { useLoginStore } from "@/stores/login/login";

const loginStore = useLoginStore();
loginStore.userMenus;
</script>

<style scoped lang="less"></style>
