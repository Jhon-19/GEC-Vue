export const usernameRules = [
  {
    required: true,
    message: "用户名必须填写",
    trigger: "blur",
  },
  {
    pattern: /^[a-zA-Z0-9]{2,10}$/,
    message: "用户名必须是2~10位字母或者数字",
    trigger: "blur",
  },
];
