import { emailRules } from "@/utils/form-rules/email-rules";
import { passwordRules } from "@/utils/form-rules/password-rules";
import { usernameRules } from "@/utils/form-rules/username-rules";

export function generateRules(account: any) {
  const validateCheckPassword = (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback(new Error("请再次输入密码"));
    } else if (value !== account.password) {
      callback(new Error("两次输入的密码不一致"));
    } else {
      callback();
    }
  };

  const checkPasswordRules = [
    {
      validator: validateCheckPassword,
      trigger: "blur",
      required: true,
    },
  ];
  const rules = {
    username: usernameRules,
    email: emailRules,
    password: passwordRules,
    checkPassword: checkPasswordRules,
  };
  return rules;
}
