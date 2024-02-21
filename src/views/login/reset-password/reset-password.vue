<template>
  <div>
    <LoginTitle />
    <ElRow justify="center">
      <ElCol :span="6">
        <ElCard shadow="never">
          <ElForm
            label-width="70px"
            :model="account"
            :rules="rules"
            ref="formRef"
            status-icon
          >
            <ElFormItem label="账号" prop="username">
              <ElInput v-model="account.username" />
            </ElFormItem>
            <ElFormItem label="邮箱" prop="email">
              <ElInput v-model="account.email" />
            </ElFormItem>
            <ElDivider>
              <ElIcon><Star /></ElIcon>
            </ElDivider>
            <ElFormItem label="新密码" prop="password">
              <ElInput
                v-model="account.password"
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
        <ElTooltip
          content="验证用户名和邮箱后可以重置密码"
          placement="bottom"
          effect="light"
        >
          <ElButton
            class="full-width-button"
            type="warning"
            @click="resetPasswordAction"
          >
            重置密码
          </ElButton>
        </ElTooltip>
      </ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts" setup>
import LoginTitle from "@/components/login-title.vue";
import {
  ElFormItem,
  type ElCard,
  type ElCol,
  type ElForm,
  type ElRow,
  ElButton,
  ElDivider,
  type FormInstance,
  ElIcon,
  ElTooltip,
} from "element-plus";
import { reactive, ref } from "vue";
import { rules } from "../config/reset-password-config";
import { useLoginStore } from "@/stores/login/login";

const loginStore = useLoginStore();

const account = reactive({
  username: "",
  email: "",
  password: "",
});

const formRef = ref<FormInstance>();

const resetPasswordAction = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      loginStore.resetPassword({ ...account });
    }
  });
};
</script>

<style scoped lang="less">
.el-card {
  margin-bottom: 20px;
}
</style>
