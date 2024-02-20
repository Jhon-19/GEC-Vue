import { isEmail } from "class-validator";

const validateEmail = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("邮箱必须填写"));
  } else {
    if (!isEmail(value)) {
      callback(new Error("邮箱不符合规范"));
    } else {
      callback();
    }
  }
};

export const emailRules = [
  {
    required: true,
    validator: validateEmail,
    trigger: "blur",
  },
];
