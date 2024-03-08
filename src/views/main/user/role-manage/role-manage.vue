<template>
  <div>
    <ElRow justify="center">
      <ElCol :span="14">
        <ElCard>
          <template #header>
            <div class="card-header">
              <span>用户权限管理</span>
              <ElInput v-model="valueSearch" placeholder="查找用户">
                <template #append>
                  <ElButton @click="searchUsers">
                    <ElIcon><Search /></ElIcon>
                  </ElButton>
                </template>
              </ElInput>
            </div>
          </template>
          <ElTable
            :data="userTable.data"
            :height="tableHeight"
            table-layout="auto"
            :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{ textAlign: 'center' }"
            border
            stripe
          >
            <ElTableColumn prop="username" label="用户名" />
            <ElTableColumn prop="fullName" label="真实姓名" />
            <ElTableColumn label="角色">
              <template #default="scope">
                <ElSelect v-model="scope.row.role">
                  <ElOption
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </ElSelect>
              </template>
            </ElTableColumn>
            <ElTableColumn label="操作">
              <template #default="scope">
                <ElButton
                  type="warning"
                  @click="changeRole(scope.row, scope.$index)"
                  >修改权限</ElButton
                >
              </template>
            </ElTableColumn>
          </ElTable>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts" setup>
import { Role } from "@/constants/user.constant";
import {
  ElButton,
  ElCard,
  ElCol,
  ElInput,
  ElOption,
  ElRow,
  ElSelect,
  ElTable,
  ElTableColumn,
} from "element-plus";
import type { IRoleOption } from "./types/role-option.type";
import { useUserStore } from "@/stores/main/user/user";
import { onMounted, reactive, ref } from "vue";
import type {
  IChangeUserRolePayload,
  IRoleUser,
} from "@/service/main/user/types";
import { cloneDeep } from "lodash";

const tableHeight = window.innerHeight / 2;

const roleKeys = Object.keys(Role);
const options: IRoleOption[] = [];

roleKeys.forEach((key) => {
  if (key === "admin") {
    return;
  }
  const option = {
    label: Role[key as keyof typeof Role],
    value: key,
  };
  options.push(option);
});

const userStore = useUserStore();

const data: IRoleUser[] = [];

const userTable = reactive({ data });

const originalUserTable: IRoleUser[] = [];

const valueSearch = ref("");

onMounted(async () => {
  const allUsers = await userStore.getAllUsers();
  allUsers.forEach((user) => {
    if (user.role !== "admin") {
      originalUserTable.push(user);
    }
  });
  userTable.data = cloneDeep(originalUserTable);
});

async function changeRole(row: IRoleUser, index: number) {
  const changeUserRolePayload: IChangeUserRolePayload = {
    adminId: userStore.id,
    id: row.id,
    role: row.role,
  };
  const isChanged = await userStore.changeUserRole(changeUserRolePayload);
  if (isChanged) {
    originalUserTable[index].role = row.role;
  }
}

function searchUsers() {
  userTable.data = [];
  const filterdUserTable = originalUserTable.filter((user) => {
    const matched =
      user.username.indexOf(valueSearch.value) !== -1 ||
      user.fullName?.indexOf(valueSearch.value) !== -1;
    return matched;
  });
  userTable.data = cloneDeep(filterdUserTable);
}
</script>

<style scoped lang="less">
.card-header {
  display: flex;
  justify-content: space-between;

  span {
    flex: 2;
    display: flex;
    align-items: center;
  }

  .el-input {
    flex: 1;
  }
}
</style>
