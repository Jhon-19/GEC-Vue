const roleManage = () =>
  import("@/views/main/user/role-manage/role-manage.vue");

export default {
  path: "/main/user/role-manage",
  name: "role-manage",
  component: roleManage,
};
