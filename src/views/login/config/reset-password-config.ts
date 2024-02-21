import { emailRules } from "@/utils/form-rules/email-rules";
import { passwordRules } from "@/utils/form-rules/password-rules";
import { usernameRules } from "@/utils/form-rules/username-rules";

export const rules = {
  username: usernameRules,
  email: emailRules,
  password: passwordRules,
};
