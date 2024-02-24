<template>
  <div>
    <div class="logo-div">
      <img :src="logo" alt="logo" />
    </div>
    <ElMenu>
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.isSubMenu">
          <ElSubMenu :index="item.id">
            <template #title>
              <ElIcon v-if="item.icon">
                <component :is="item.icon"></component>
              </ElIcon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <ElMenuItem
                :index="subItem.id"
                @click="handleMenuItemClick(subItem)"
              >
                <span>{{ subItem.name }}</span>
              </ElMenuItem>
            </template>
          </ElSubMenu>
        </template>
        <template v-else>
          <ElMenuItem :index="item.id" @click="handleMenuItemClick(item)">
            <span>{{ item.name }}</span>
          </ElMenuItem>
        </template>
      </template>
    </ElMenu>
  </div>
</template>

<script lang="ts" setup>
import { ElIcon, ElMenu, ElMenuItem, ElSubMenu } from "element-plus";
import logo from "@/assets/images/logo.jpg";
import { useLoginStore } from "@/stores/login/login";
import router from "@/router";

const loginStore = useLoginStore();
const userMenus = loginStore.userMenus;

const handleMenuItemClick = (item: any) => {
  router.push({
    path: item.url ?? "not-found",
  });
};
</script>

<style scoped lang="less">
.logo-div {
  height: 60px;
  display: flex;
  justify-content: center;
  img {
    height: 100%;
  }
}
</style>
