<template>
  <div>
    <ElDescriptions
      title="用户信息"
      :column="5"
      :border="true"
      direction="vertical"
    >
      <template #extra>
        <ElButton type="primary" @click="dialogEditVisible = true"
          >修改</ElButton
        >
      </template>
      <template v-for="[label, value] in Object.entries(labels)">
        <ElDescriptionsItem :label="label" label-align="center" align="center">
          {{ userStore[value as keyof typeof userStore] }}
        </ElDescriptionsItem>
      </template>
    </ElDescriptions>

    <ElDialog v-model="dialogEditVisible" title="修改用户信息" width="400px">
      <ElCard shadow="never">
        <ElForm
          label-width="80px"
          :model="userInfo"
          :rules="rules"
          ref="formRef"
          status-icon
        >
          <ElFormItem label="真实姓名" prop="fullName">
            <ElInput v-model="userInfo.fullName" />
          </ElFormItem>
          <ElFormItem label="电话" prop="phoneNumber">
            <ElInput v-model="userInfo.phoneNumber" />
          </ElFormItem>
        </ElForm>
      </ElCard>
      <template #footer>
        <ElButton @click="dialogEditVisible = false">取消</ElButton>
        <ElButton type="primary" @click="changeUserInfoAction">确认</ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/main/user/user";
import {
  ElButton,
  ElCard,
  ElDescriptions,
  ElDescriptionsItem,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  type FormInstance,
} from "element-plus";
import { reactive, ref } from "vue";
import { rules } from "./config/info-config";
import type { IUserInfoPayload } from "@/service/main/user/types";

const dialogEditVisible = ref(false);

const userStore = useUserStore();

const labels = {
  用户名: "username",
  邮箱: "email",
  角色: "role",
  真实姓名: "fullName",
  电话: "phoneNumber",
};

const userInfo = reactive({
  fullName: userStore.fullName,
  phoneNumber: userStore.phoneNumber,
});

const formRef = ref<FormInstance>();

function changeUserInfoAction() {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      const userInfoPayload: IUserInfoPayload = {
        id: userStore.id,
        fullName: userInfo.fullName,
        phoneNumber: userInfo.phoneNumber,
      };
      await userStore.changeUserInfo(userInfoPayload);
      dialogEditVisible.value = false;
    }
  });
}
</script>

<style scoped lang="less"></style>
