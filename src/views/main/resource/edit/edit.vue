<template>
  <div>
    <ElRow justify="space-around">
      <ElCol :span="6">
        <ElCard header="文件夹">
          <template v-for="folder in resouceStore.folders">
            <div>
              <ElButtonGroup class="button-group">
                <ElButton
                  class="folder-button"
                  type="primary"
                  plain
                  @click="listFolder(folder)"
                >
                  {{ folder }}
                </ElButton>
                <ElButton
                  :icon="Edit"
                  plain
                  @click="openEditFolderDialog(folder)"
                ></ElButton>
                <ElPopconfirm
                  :icon="WarningFilled"
                  @confirm="deleteFolder(folder)"
                  title="是否删除此文件夹？"
                  placement="right"
                >
                  <template #reference>
                    <ElButton :icon="Delete" type="danger" plain></ElButton>
                  </template>
                </ElPopconfirm>
              </ElButtonGroup>
            </div>
          </template>
          <div>
            <ElInput
              v-if="inputVisible"
              v-model="newFolderName"
              @keyup.enter="handleConfirm"
              placeholder="输入新的文件夹名, Enter键确定"
            ></ElInput>
            <ElButton v-else class="full-width-button" @click="showInput">
              + 文件夹
            </ElButton>
          </div>
        </ElCard>
      </ElCol>
      <ElCol :span="12">
        <ElCard>
          <template #header>
            <div class="card-header">
              <span
                >资源文件 | <ElText type="primary">{{ selectedFolder }}</ElText>
              </span>
              <div>
                <ElInput v-model="searchFileName" placeholder="搜索当前文件夹">
                  <template #append>
                    <ElButton :icon="Search" @click="searchFile" />
                  </template>
                </ElInput>
              </div>
            </div>
          </template>
          <ElTable :data="fileTableData.data" :height="tableHeight">
            <ElTableColumn prop="fileName" label="文件名" />
            <ElTableColumn label="操作" width="100px" align="center">
              <template #default="scope">
                <ElButton
                  circle
                  :icon="Edit"
                  @click="openEditFileDialog(scope.row)"
                />
                <ElPopconfirm
                  :icon="WarningFilled"
                  @confirm="deleteFile(scope.row)"
                  title="是否删除此文件？"
                >
                  <template #reference>
                    <ElButton type="danger" circle :icon="Delete" />
                  </template>
                </ElPopconfirm>
              </template>
            </ElTableColumn>
          </ElTable>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
  <div>
    <ElDialog v-model="dialogFolderVisible" title="修改文件夹名" width="500px">
      <ElCard shadow="never">
        <ElForm label-width="100px">
          <ElFormItem label="新文件夹名">
            <ElInput v-model="editFolderPayload.newFolder" />
          </ElFormItem>
        </ElForm>
      </ElCard>
      <template #footer>
        <div>
          <ElButton @click="dialogFolderVisible = false">取消</ElButton>
          <ElButton type="primary" @click="editFolder">确定</ElButton>
        </div>
      </template>
    </ElDialog>
    <ElDialog v-model="dialogFileVisible" title="文件修改" width="500px">
      <ElCard shadow="never">
        <ElForm :model="editFilePayload" label-width="100px">
          <ElFormItem label="新文件夹">
            <ElSelect v-model="editFilePayload.newFolder">
              <template v-for="folder in resouceStore.folders">
                <ElOption :label="folder" :value="folder" />
              </template>
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="新文件名">
            <ElInput v-model="editFilePayload.newFileName" />
          </ElFormItem>
        </ElForm>
      </ElCard>
      <template #footer>
        <div>
          <ElButton @click="dialogFileVisible = false">取消</ElButton>
          <ElButton type="primary" @click="editFile">确定</ElButton>
        </div>
      </template>
    </ElDialog>
  </div>
</template>

<script lang="ts" setup>
import { useResourceStore } from "@/stores/main/resource/resource";
import {
  ElButton,
  ElButtonGroup,
  ElCard,
  ElCol,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElOption,
  ElPopconfirm,
  ElRow,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElText,
} from "element-plus";
import { onMounted, reactive, ref } from "vue";
import type { IFileItem } from "./types/file-item.type";
import { cloneDeep } from "lodash";
import { parseFileName } from "@/utils/resource";
import { Delete, Edit, Search, WarningFilled } from "@element-plus/icons-vue";
import type {
  IEditFilePayload,
  IEditFolderPayload,
} from "@/service/main/resource/types";

const resouceStore = useResourceStore();

onMounted(async () => {
  await resouceStore.getAllFolders();
});

const inputVisible = ref(false);
const newFolderName = ref("");

function handleConfirm() {
  resouceStore.createFolder(newFolderName.value);
  inputVisible.value = false;
  newFolderName.value = "";
}

function showInput() {
  inputVisible.value = true;
}

const dialogFolderVisible = ref(false);
const editFolderPayload: IEditFolderPayload = reactive({
  folder: "",
  newFolder: "",
});

function openEditFolderDialog(folder: string) {
  dialogFolderVisible.value = true;
  editFolderPayload.folder = folder;
  editFolderPayload.newFolder = folder;
}

function editFolder() {
  resouceStore.editFolder(editFolderPayload);
  dialogFolderVisible.value = false;
}

function deleteFolder(folder: string) {
  resouceStore.deleteFolder(folder);
}

let files: IFileItem[] = [];

const fileTableData = reactive({
  data: cloneDeep(files),
});

const tableHeight = window.outerHeight / 2;

const selectedFolder = ref("");

async function listFolder(folder: string) {
  selectedFolder.value = folder;
  refreshFiles();
}

async function refreshFiles() {
  const folder = selectedFolder.value;
  const filesInFolder = await resouceStore.findAllInFolder(folder);
  files = [];
  filesInFolder.forEach((file) => {
    const { prefix, originalFileName: fileName } = parseFileName(file);
    const fileItem: IFileItem = { prefix, fileName, folder };
    files.push(fileItem);
  });
  fileTableData.data = cloneDeep(files);
}

async function deleteFile(file: IFileItem) {
  const deleteStatus = await resouceStore.deleteFile({ ...file });
  if (deleteStatus) {
    refreshFiles();
  }
}

const dialogFileVisible = ref(false);

const editFilePayload = reactive<IEditFilePayload>({
  folder: "",
  fileName: "",
  prefix: "",
  newFileName: "",
  newFolder: "",
});

function openEditFileDialog(file: IFileItem) {
  editFilePayload.fileName = file.fileName;
  editFilePayload.folder = file.folder;
  editFilePayload.prefix = file.prefix;
  editFilePayload.newFileName = file.fileName;
  editFilePayload.newFolder = file.folder;
  dialogFileVisible.value = true;
}

async function editFile() {
  const editStatus = await resouceStore.editFile(editFilePayload);
  if (editStatus) {
    refreshFiles();
  }
  dialogFileVisible.value = false;
}

const searchFileName = ref("");

function searchFile() {
  fileTableData.data = files.filter((file: IFileItem) => {
    return file.fileName.indexOf(searchFileName.value) !== -1;
  });
}
</script>

<style scoped lang="less">
.button-group {
  display: flex;

  .folder-button {
    flex: 1;
  }
}
</style>
