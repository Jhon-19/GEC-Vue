<template>
  <LoginTitle />
  <ElRow justify="center">
    <ElCol :span="6">
      <ElTabs type="border-card" stretch v-model="currentTab">
        <ElTabPane name="account">
          <template #label>
            <span>
              <ElIcon><User /></ElIcon> 账号登录
            </span>
          </template>
          <LoginAccount ref="accountRef" />
        </ElTabPane>
        <ElTabPane name="email">
          <template #label>
            <span>
              <ElIcon><Message /></ElIcon> 邮箱登录
            </span>
          </template>
          <LoginEmail ref="emailRef" />
        </ElTabPane>
      </ElTabs>
    </ElCol>
  </ElRow>
  <ElRow>
    <ElCol :span="2" :offset="9">
      <div><ElCheckbox v-model="isKeepPassword">记住密码</ElCheckbox></div>
    </ElCol>
    <ElCol :span="2" :offset="2">
      <div class="text-right">
        <ElLink type="primary" href="/reset-password">忘记密码</ElLink>
      </div>
    </ElCol>
  </ElRow>
  <ElRow justify="center">
    <ElCol :span="2">
      <ElButton
        class="full-width-button"
        type="primary"
        @click="handleLoginClick"
        >立即登录</ElButton
      >
    </ElCol>
  </ElRow>
  <ElRow justify="center">
    <ElCol :span="3">
      <div class="text-center">
        没有账号？<ElLink type="primary" href="/signup">点击注册</ElLink>
      </div>
    </ElCol>
  </ElRow>
</template>

<script lang="ts" setup>
import {
  ElButton,
  ElCheckbox,
  ElCol,
  ElIcon,
  ElLink,
  ElRow,
  ElTabs,
} from "element-plus";
import { onMounted, ref, watch } from "vue";
import LoginAccount from "./login-account.vue";
import localCache from "@/utils/cache";
import LoginEmail from "./login-email.vue";
import LoginTitle from "@/components/login-title.vue";

const currentTab = ref("account");
const isKeepPassword = ref(true);

const accountRef = ref<InstanceType<typeof LoginAccount>>();
const emailRef = ref<InstanceType<typeof LoginEmail>>();

function setAccountForm() {
  const username = localCache.getCache("username") || "";
  const password = localCache.getCache("password") || "";
  accountRef.value?.setFormFields(username, password);
}

function setEmailForm() {
  const email = localCache.getCache("email") || "";
  const password = localCache.getCache("password") || "";
  emailRef.value?.setFormFields(email, password);
}

onMounted(() => {
  setAccountForm();
});

watch(currentTab, (newValue, oldValue) => {
  if (newValue === "account") {
    setAccountForm();
  } else {
    setEmailForm();
  }
});

const handleLoginClick = () => {
  if (currentTab.value === "account") {
    accountRef.value?.loginAction(isKeepPassword.value);
  } else {
    emailRef.value?.loginAction(isKeepPassword.value);
  }
};
</script>

<style scoped lang="less">
.el-row:last-child {
  margin-top: 20px;
}
</style>
