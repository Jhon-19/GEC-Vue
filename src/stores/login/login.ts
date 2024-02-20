import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import type { ILoginState } from "./types";
import type { ILoginPayload } from "@/service/login/types";
import { loginRequest } from "@/service/login/login";
import localCache from "@/utils/cache";
import router from "@/router";
import { GEC_AUTH } from "@/constants/auth.constant";
import { ElMessage } from "element-plus";
import { isEmail } from "class-validator";

export const useLoginStore = defineStore("login", () => {
  const loginState = reactive<ILoginState>({
    token: "",
    userInfo: {},
    userMenus: [],
  });

  function changeToken(token: string) {
    loginState.token = token;
  }

  function changeUserInfo(userInfo: any) {
    loginState.userInfo = userInfo;
  }

  async function loginIn(loginPayload: ILoginPayload) {
    const loginResult = await loginRequest(loginPayload);
    const code = loginResult.code;
    if (code === "200") {
      const { id, token } = loginResult.data;
      changeToken(token);
      localCache.setCache(GEC_AUTH, token);

      router.push("/main");
    } else {
      let errorMessage = "";
      if (isEmail(loginPayload.username)) {
        errorMessage = "邮箱或密码错误";
      } else {
        errorMessage = "用户名或密码错误";
      }
      ElMessage.error(errorMessage);
    }
  }

  return {
    ...toRefs(loginState),
    loginIn,
  };
});
