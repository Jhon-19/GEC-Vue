<template>
  <div class="nav-header">
    <div class="content">
      <UserInfo />
    </div>
  </div>
</template>

<script lang="ts" setup>
import UserInfo from "./user-info.vue";
</script>

<style scoped lang="less">
.nav-header {
  height: 100%;
  display: flex;
  width: 100%;

  .content {
    display: flex;
    justify-content: end;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
