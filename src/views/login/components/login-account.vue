<template>
  <div>
    <ElForm label-width="60px" :model="account" :rules="rules" ref="formRef">
      <ElFormItem label="账号" prop="username">
        <ElInput v-model="account.username" />
      </ElFormItem>
      <ElFormItem label="密码" prop="password">
        <ElInput v-model="account.password" type="password" show-password />
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script lang="ts" setup>
import localCache from "@/utils/cache";
import { ElFormItem, type ElForm, ElInput } from "element-plus";
import { reactive, ref } from "vue";
import { rules } from "../config/account-config";
import { useLoginStore } from "@/stores/login/login";
import type { ILoginPayload } from "@/service/login/types";

const loginStore = useLoginStore();

const account = reactive({
  username: "",
  password: "",
});

const formRef = ref<InstanceType<typeof ElForm>>();

const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      if (isKeepPassword) {
        localCache.setCache("username", account.username);
        localCache.setCache("password", account.password);
      } else {
        localCache.deleteCache("username");
        localCache.deleteCache("password");
      }

      const loginPayload: ILoginPayload = {
        username: account.username,
        password: account.password,
      };
      loginStore.loginIn(loginPayload);
    }
  });
};

const setFormFields = (username: string, password: string) => {
  account.username = username || account.username;
  account.password = password || account.password;
};

defineExpose({ loginAction, setFormFields });
</script>

<style scoped lang="less"></style>
