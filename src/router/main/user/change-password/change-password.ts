const changePassword = () =>
  import("@/views/main/user/change-password/change-password.vue");

export default {
  path: "/main/user/change-password",
  name: "change-password",
  component: changePassword,
};
