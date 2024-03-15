import { ElMessage } from "element-plus";

export function showMessage(
  flag: boolean,
  successMessage: string,
  errorMessage = "修改失败"
) {
  if (flag) {
    ElMessage.success(successMessage);
  } else {
    ElMessage.error(errorMessage);
  }
}
