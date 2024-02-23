import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import type { ILoginState } from "./types";
import type {
  ILoginPayload,
  IResetPasswordPayload,
} from "@/service/login/types";
import { loginRequest, resetPasswordRequest } from "@/service/login/login";
import localCache from "@/utils/cache";
import router from "@/router";
import { GEC_AUTH } from "@/constants/auth.constant";
import { ElMessage } from "element-plus";
import { isEmail } from "class-validator";
import piniaPersistConfig from "@/utils/persist";

export const useLoginStore = defineStore(
  "login",
  () => {
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

    function changeUserMenus(userMenus: any) {
      loginState.userMenus = userMenus;
    }

    async function loginIn(loginPayload: ILoginPayload) {
      const loginResult = await loginRequest(loginPayload);
      const code = loginResult.code;
      if (code === "200") {
        const { id, token } = loginResult.data;
        changeToken(token);
        localCache.setCache(GEC_AUTH, token);

        // todo: get remote userMenus
        changeUserMenus(testUserMenus);

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

    return {
      ...toRefs(loginState),
      loginIn,
      resetPassword,
    };
  },
  {
    persist: piniaPersistConfig("login", ["userMenus"]),
  }
);

interface MenuItemType {
  id: string;
  name: string;
  isSubMenu: boolean;
  url?: string;
  icon?: string;
  children?: MenuItemType[];
}

// test
const testUserMenus: MenuItemType[] = [
  {
    id: "1",
    name: "用户",
    isSubMenu: true,
    icon: "User",
    children: [
      {
        id: "1-1",
        name: "个人信息",
        isSubMenu: false,
        url: "/main/user/info",
      },
      {
        id: "1-2",
        name: "修改密码",
        isSubMenu: false,
        url: "/main/user/change-password",
      },
      {
        id: "1-3",
        name: "权限管理",
        isSubMenu: false,
        url: "/main/user/role-manage",
      },
    ],
  },
  {
    id: "2",
    name: "知识图谱",
    isSubMenu: false,
    url: "/main/knowledge-graph",
  },
  {
    id: "3",
    name: "资料管理",
    isSubMenu: true,
    children: [
      {
        id: "3-1",
        name: "资料上传",
        isSubMenu: false,
        url: "/main/resource/upload",
      },
      {
        id: "3-2",
        name: "资料查询",
        isSubMenu: false,
        url: "/main/resource/search",
      },
      {
        id: "3-3",
        name: "资料修改",
        isSubMenu: false,
        url: "/main/resource/",
      },
    ],
  },
  {
    id: "4",
    name: "设置",
    isSubMenu: false,
    url: "/main/setting",
  },
];
