export const phoneNumberRules = [
  {
    required: true,
    message: "电话号码必须填写",
    trigger: "blur",
  },
  {
    pattern: /^[0-9]{7,11}$/,
    message: "电话号码必须是7~11位数字",
    trigger: "blur",
  },
];
