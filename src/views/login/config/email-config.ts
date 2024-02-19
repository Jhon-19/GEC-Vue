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

export const rules = {
  email: [
    {
      required: true,
      validator: validateEmail,
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码必须填写",
      trigger: "blur",
    },
    {
      pattern: /^[a-zA-Z0-9]{8,20}$/,
      message: "密码必须是8~20位字母或者数字",
      trigger: "blur",
    },
  ],
};
