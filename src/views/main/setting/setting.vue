<template>
  <div>
    <ElCard header="用户偏好设置">
      <ElRow justify="center">
        <ElCol :span="12">
          <ElCard header="修改首页">
            <div class="index-setting">
              <span>设置首页为</span>
              <ElSelect v-model="indexLabel">
                <ElOption
                  v-for="item in options"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                />
              </ElSelect>
              <ElButton
                class="full-width-button"
                type="primary"
                @click="setIndex"
                >确定</ElButton
              >
            </div>
          </ElCard>
        </ElCol>
      </ElRow>
    </ElCard>
  </div>
</template>

<script lang="ts" setup>
import { GEC_INDEX } from "@/constants/user.constant";
import localCache from "@/utils/cache";
import {
  ElButton,
  ElCard,
  ElCol,
  ElMessage,
  ElOption,
  ElRow,
  ElSelect,
} from "element-plus";
import { ref } from "vue";

const options = [
  { label: "用户信息", value: "/main/user/info" },
  { label: "资料管理", value: "/main/resource/search" },
  { label: "知识图谱", value: "/main/knowledge-graph" },
];

const indexLabel = ref(localCache.getCache(GEC_INDEX) ?? options[0].value);

function setIndex() {
  localCache.setCache(GEC_INDEX, indexLabel.value);
  ElMessage.success("设置首页成功");
}
</script>

<style scoped lang="less">
.index-setting {
  display: flex;
  justify-content: center;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 4;
  }

  .el-select {
    flex: 6;
  }

  .full-width-button {
    margin: 0 20px;
    flex: 1;
  }
}
</style>
