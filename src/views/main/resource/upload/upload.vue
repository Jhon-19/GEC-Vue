<template>
  <div>
    <ElRow justify="center">
      <ElCol :span="12">
        <ElCard header="资料上传">
          <ElUpload
            drag
            multiple
            :auto-upload="false"
            :accept="acceptFileTypeStr"
            ref="uploadRef"
            @change="uploadChange"
            @remove="uploadRemove"
          >
            <ElIcon><Upload-Filled /></ElIcon>
            <div>
              <ElText type="primary" size="large">拖住文件到此处上传</ElText>
              或者
              <ElText type="primary" size="large">点击上传</ElText>
            </div>

            <template #tip>
              <ElText>
                仅支持100MB以内的
                <ElText type="info">doc/docx/pdf/zip/rar</ElText>
                格式文件
              </ElText>
            </template>
          </ElUpload>

          <template #footer>
            <div class="card-footer">
              <div class="folder-select">
                <span>上传到</span>
                <ElSelect v-model="folder">
                  <ElOption
                    v-for="item in options"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  />
                </ElSelect>
                <span>文件夹</span>
              </div>
              <ElButton type="primary" @click="uploadAction">开始上传</ElButton>
            </div>
          </template>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts" setup>
import { ResourceAPI, acceptFileTypes } from "@/constants/resource.constant";
import { useResourceStore } from "@/stores/main/resource/resource";
import {
  ElButton,
  ElCard,
  ElCol,
  ElIcon,
  ElMessage,
  ElOption,
  ElRow,
  ElSelect,
  ElText,
  ElUpload,
  type UploadFile,
  type UploadFiles,
  type UploadInstance,
} from "element-plus";
import { computed, onMounted, reactive, ref } from "vue";
import type { IFolderOption } from "./types/folder-option.type";
import type { IUploadFilesPayload } from "@/service/main/resource/types";

const resourceStore = useResourceStore();

onMounted(async () => {
  await resourceStore.getAllFolders();
});

const acceptFileTypeStr = acceptFileTypes.join(",");

const folder = ref("");
const uploadUrl = computed(() => ResourceAPI.BaseResourceUrl + folder.value);

let fileList: UploadFiles = [];

const options: IFolderOption[] = [];
const optionsData = reactive({
  data: options,
});

resourceStore.folders.forEach((folder) => {
  const option = { value: folder };
  optionsData.data.push(option);
});

const uploadRef = ref<UploadInstance>();

async function uploadAction() {
  if (folder.value) {
    if (fileList.length > 0) {
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("files", file.raw as Blob);
      });
      const uploadFilesPayload: IUploadFilesPayload = {
        uploadUrl: uploadUrl.value,
        files: formData,
      };
      const uploadStatus = await resourceStore.uploadFiles(uploadFilesPayload);
      if (uploadStatus) {
        ElMessage.success("文件上传成功");
        uploadRef.value?.clearFiles();
      } else {
        ElMessage.error("文件上传失败");
      }
    } else {
      ElMessage.warning("请选择需要上传的文件");
    }
  } else {
    ElMessage.error("请选择需要上传到的目标文件夹");
  }
}

function uploadChange(uploadFile: UploadFile, uploadFiles: UploadFiles) {
  const checkSize = uploadFile.size && uploadFile.size / 1024 / 1024 < 100;
  if (!checkSize) {
    ElMessage.warning("文件过大");
  }

  fileList = uploadFiles;
}

function uploadRemove(uploadFile: UploadFile, uploadFiles: UploadFiles) {
  fileList = uploadFiles;
}
</script>

<style scoped lang="less">
.card-footer {
  display: flex;
  justify-content: space-around;
  align-items: center;

  .folder-select {
    width: 300px;
    display: flex;
    justify-content: center;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
    }

    .el-select {
      flex: 2;
    }
  }
}
</style>
