<template>
  <div>
    <ElDropdown>
      <span class="el-dropdown-link">
        <ElAvatar size="small" :src="avaterUrl" />
        <span class="username">{{ username }}</span>
      </span>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem icon="circle-close">退出登录</ElDropdownItem>
          <ElDropdownItem divided>用户信息</ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/main/user/user";
import {
  ElAvatar,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
} from "element-plus";
const avaterUrl =
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";

const userStore = useUserStore();
const username = userStore.username;
</script>

<style scoped lang="less">
.el-dropdown-link {
  display: flex;
  align-items: center;
}

.username {
  margin-left: 8px;
}
</style>
