<template>
  <div>
    <ElRow justify="center">
      <ElCol :span="6">
        <ElCard header="修改密码">
          <ElForm
            label-width="70px"
            :model="passwords"
            :rules="rules"
            ref="formRef"
            status-icon
          >
            <ElFormItem label="原密码" prop="oldPassword">
              <ElInput
                v-model="passwords.oldPassword"
                type="password"
                show-password
              />
            </ElFormItem>
            <ElFormItem label="新密码" prop="newPassword">
              <ElInput
                v-model="passwords.newPassword"
                type="password"
                show-password
              />
            </ElFormItem>
          </ElForm>
        </ElCard>
      </ElCol>
    </ElRow>
    <ElRow justify="center">
      <ElCol :span="2">
        <ElButton
          class="full-width-button"
          type="primary"
          @click="changePasswordAction"
        >
          修改密码
        </ElButton>
      </ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts" setup>
import {
  ElButton,
  ElCard,
  ElCol,
  ElFormItem,
  ElRow,
  type FormInstance,
} from "element-plus";
import { rules } from "./config/change-password.config";
import { reactive, ref } from "vue";
import { useUserStore } from "@/stores/main/user/user";
import type { IChangePasswordPayload } from "@/service/main/user/types";

const passwords = reactive({
  oldPassword: "",
  newPassword: "",
});

const userStore = useUserStore();

const formRef = ref<FormInstance>();

function changePasswordAction() {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      const changePasswordPayload: IChangePasswordPayload = {
        ...passwords,
        id: userStore.id,
      };
      await userStore.changePassword(changePasswordPayload);
      passwords.oldPassword = "";
      passwords.newPassword = "";
    }
  });
}
</script>

<style scoped lang="less">
.el-card {
  margin-bottom: 20px;
}
</style>
