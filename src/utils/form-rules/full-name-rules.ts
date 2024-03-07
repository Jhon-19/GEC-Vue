export const fullNameRules = [
  {
    required: true,
    message: "真实姓名必须填写",
    trigger: "blur",
  },
  {
    pattern: /^.{2,8}$/,
    message: "请输入2~8位真实姓名",
    trigger: "blur",
  },
];
