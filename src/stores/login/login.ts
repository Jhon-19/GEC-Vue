import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import type { ILoginState } from "./types";
import type { ILoginPayload } from "@/service/login/types";
import { loginRequest } from "@/service/login/login";
import localCache from "@/utils/cache";
import router from "@/router";
import { GEC_AUTH } from "@/constants/auth.constant";

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
    const { id, token } = loginResult.data;
    changeToken(token);
    localCache.setCache(GEC_AUTH, token);

    router.push("/main");
  }

  return {
    ...toRefs(loginState),
    loginIn,
  };
});
