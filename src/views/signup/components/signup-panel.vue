<template>
  <div>
    <ElRow justify="center">
      <ElCol :span="6">
        <ElCard shadow="never">
          <ElForm
            label-width="80px"
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
            <ElFormItem label="密码" prop="password">
              <ElInput
                v-model="account.password"
                type="password"
                show-password
              />
            </ElFormItem>
            <ElFormItem label="确认密码" prop="checkPassword">
              <ElInput
                v-model="account.checkPassword"
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
        <ElButton class="full-width-button" type="success" @click="signupAction"
          >注册用户</ElButton
        >
      </ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts" setup>
import {
  ElButton,
  ElCard,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElRow,
  type FormInstance,
} from "element-plus";
import { reactive, ref } from "vue";
import { generateRules } from "../config/signup-config";
import { useSignupStore } from "@/stores/signup/signup";
import type { ISignupPayload } from "@/service/signup/types";

const loginStore = useSignupStore();

const account = reactive({
  username: "",
  email: "",
  password: "",
  checkPassword: "",
});

const rules = generateRules(account);

const formRef = ref<FormInstance>();

const signupAction = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      const signupPayload: ISignupPayload = {
        username: account.username,
        email: account.email,
        password: account.password,
      };
      loginStore.signUp(signupPayload);
    }
  });
};
</script>

<style scoped lang="less">
.el-card {
  margin-bottom: 20px;
}
</style>
