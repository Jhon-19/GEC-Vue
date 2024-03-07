import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import type { ILoginState, IMenuItem } from "./types";
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
import { mapMenusToRoutes } from "@/utils/map-menus";
import { useUserStore } from "../main/user/user";
import type { IUserInfoState } from "../main/user/types";
import { getUserInfoRequest } from "@/service/main/user/user";
import { Role } from "@/constants/user.constant";

export const useLoginStore = defineStore(
  "login",
  () => {
    const loginState = reactive<ILoginState>({
      token: "",
      userMenus: [],
    });

    function setToken(token: string) {
      loginState.token = token;
    }

    function setUserInfo(userInfo: IUserInfoState) {
      const userStore = useUserStore();
      userStore.setUserInfo(userInfo);
    }

    function setUserMenus(userMenus: any) {
      loginState.userMenus = userMenus;
      addMenuRoutes(userMenus);
    }

    async function loginIn(loginPayload: ILoginPayload) {
      const loginResult = await loginRequest(loginPayload);
      const code = loginResult.code;
      if (code === "200") {
        const { id, token } = loginResult.data;
        setToken(token);
        localCache.setCache(GEC_AUTH, token);

        const infoResult = await getUserInfoRequest(id);
        const infoData = infoResult.data;
        const userInfo: IUserInfoState = {
          ...infoData,
          role: Role[infoData.role],
          id,
        };
        setUserInfo(userInfo);

        // todo: get remote userMenus
        setUserMenus(testUserMenus);

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
  },
  {
    persist: piniaPersistConfig("login", ["userMenus"]),
  }
);

function addMenuRoutes(userMenus: IMenuItem[]) {
  const routes = mapMenusToRoutes(userMenus);
  routes.forEach((route) => {
    router.addRoute("main", route);
  });
}

export function initMenuRoutes() {
  const loginStore = useLoginStore();
  const userMenus = loginStore.userMenus;
  if (userMenus.length > 0) {
    addMenuRoutes(userMenus);
  }
}

// test
const testUserMenus: IMenuItem[] = [
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
    icon: "Cherry",
    url: "/main/knowledge-graph",
  },
  {
    id: "3",
    name: "资料管理",
    isSubMenu: true,
    icon: "FolderOpened",
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
        url: "/main/resource/edit",
      },
    ],
  },
  {
    id: "4",
    name: "设置",
    isSubMenu: false,
    icon: "Setting",
    url: "/main/setting",
  },
];
