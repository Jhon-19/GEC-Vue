import { reactive, toRefs } from "vue";
import { defineStore } from "pinia";
import type { IUserInfoState } from "./types";
import { Role } from "@/constants/user.constant";
import { ElMessage } from "element-plus";
import localCache from "@/utils/cache";
import { resetPasswordRequest } from "@/service/login/login";
import type { IResetPasswordPayload } from "@/service/login/types";
import {
  changePasswordRequest,
  changeUserInfoRequest,
} from "@/service/main/user/user";
import type {
  IChangePasswordPayload,
  IUserInfoPayload,
} from "@/service/main/user/types";

export const useUserStore = defineStore(
  "user",
  () => {
    const userState = reactive<IUserInfoState>({
      username: "",
      email: "",
      role: Role.staff,
      fullName: "",
      phoneNumber: "",
      id: "",
    });

    function setUserInfo(userInfo: IUserInfoState) {
      const { username, email, role, fullName, phoneNumber, id } = userInfo;
      userState.username = username;
      userState.email = email;
      userState.role = role;
      userState.fullName = fullName;
      userState.phoneNumber = phoneNumber;
      userState.id = id;
    }

    async function resetPassword(resetPasswordPayload: IResetPasswordPayload) {
      const resetResult = await resetPasswordRequest(resetPasswordPayload);
      const resetStatus = resetResult.data;
      if (resetStatus) {
        ElMessage.success("密码重置成功");
      } else {
        ElMessage.error("验证未通过");
      }
      localCache.deleteCache("password");
    }

    async function changeUserInfo(userInfo: IUserInfoPayload) {
      const changeResult = await changeUserInfoRequest(userInfo);
      if (changeResult.data) {
        userState.fullName = userInfo.fullName;
        userState.phoneNumber = userInfo.phoneNumber;
        ElMessage.success("修改用户信息成功");
      } else {
        ElMessage.error("修改失败");
      }
      return changeResult.data;
    }

    async function changePassword(
      changePasswordPayload: IChangePasswordPayload
    ) {
      const changeResult = await changePasswordRequest(changePasswordPayload);
      if (changeResult.data) {
        ElMessage.success("修改密码成功");
      } else {
        ElMessage.error("修改失败");
      }
    }

    return {
      ...toRefs(userState),
      setUserInfo,
      resetPassword,
      changeUserInfo,
      changePassword,
    };
  },
  {
    persist: true,
  }
);
