import router from "@/router";
import { signupRequest } from "@/service/signup/signup";
import type { ISignupPayload } from "@/service/signup/types";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";

export const useSignupStore = defineStore("signup", () => {
  async function signUp(signupPayload: ISignupPayload) {
    const signupResult = await signupRequest(signupPayload);
    const code = signupResult.code;
    if (code === "200") {
      router.push("/login");
    } else {
      ElMessage.error("用户已存在");
    }
  }

  return {
    signUp,
  };
});
