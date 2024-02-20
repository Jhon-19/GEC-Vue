<template>
  <div>
    <ElForm
      label-width="60px"
      :model="account"
      :rules="rules"
      ref="formRef"
      status-icon
    >
      <ElFormItem label="邮箱" prop="email">
        <ElInput v-model="account.email" />
      </ElFormItem>
      <ElFormItem label="密码" prop="password">
        <ElInput v-model="account.password" type="password" show-password />
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script lang="ts" setup>
import type { ILoginPayload } from "@/service/login/types";
import { useLoginStore } from "@/stores/login/login";
import localCache from "@/utils/cache";
import {
  ElFormItem,
  type ElForm,
  ElInput,
  type FormInstance,
} from "element-plus";
import { reactive, ref } from "vue";
import { rules } from "../config/email-config";

const loginStore = useLoginStore();

const account = reactive({
  email: "",
  password: "",
});

const formRef = ref<FormInstance>();

const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      if (isKeepPassword) {
        localCache.setCache("email", account.email);
        localCache.setCache("password", account.password);
      } else {
        localCache.deleteCache("email");
        localCache.deleteCache("password");
      }

      const loginPayload: ILoginPayload = {
        username: account.email,
        password: account.password,
      };
      loginStore.loginIn(loginPayload);
    }
  });
};

const setFormFields = (email: string, password: string) => {
  account.email = email || account.email;
  account.password = password || account.password;
};

defineExpose({ loginAction, setFormFields });
</script>

<style scoped lang="less"></style>
