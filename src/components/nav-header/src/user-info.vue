<template>
  <div>
    <ElDropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <ElAvatar size="small" :src="avaterUrl" />
        <span class="username">{{ username }}</span>
      </span>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem icon="circle-close" command="logout"
            >退出登录</ElDropdownItem
          >
          <ElDropdownItem icon="user" command="user-info" divided
            >用户信息</ElDropdownItem
          >
          <ElDropdownItem :icon="currentTheme" command="toggole-theme"
            >切换主题</ElDropdownItem
          >
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>

<script lang="ts" setup>
import { GEC_AUTH } from "@/constants/auth.constant";
import router from "@/router";
import { useThemeStore } from "@/stores/main/kg/theme";
import { useUserStore } from "@/stores/main/user/user";
import localCache from "@/utils/cache";
import { storeTheme, toggleDark } from "@/utils/theme";
import {
  ElAvatar,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
} from "element-plus";
import { ref, watchEffect } from "vue";
const avaterUrl =
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";

const userStore = useUserStore();
const username = userStore.username;

const currentTheme = ref("Sunny");
const themStore = useThemeStore();
storeTheme();

watchEffect(() => {
  if (themStore.theme === "dark") {
    currentTheme.value = "Moon";
  } else {
    currentTheme.value = "Sunny";
  }
});

const handleCommand = (command: string | number | object) => {
  if (command === "logout") {
    localCache.deleteCache(GEC_AUTH);
    router.push("/login");
  } else if (command === "user-info") {
    router.push("/main/user/info");
  } else if (command === "toggole-theme") {
    toggleDark();
  }
};
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
