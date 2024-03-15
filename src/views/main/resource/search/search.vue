<template>
  <div>
    <ElRow justify="center">
      <ElCol :span="12">
        <ElCard>
          <template #header>
            <div class="card-header">
              <span>资料搜索</span>
              <div>
                <ElInput v-model="searchFileName" placeholder="搜索全部资料">
                  <template #append>
                    <ElButton @click="searchFiles" :icon="Search" />
                  </template>
                </ElInput>
              </div>
            </div>
          </template>
          <ElTree
            :data="resourceData.data"
            node-key="id"
            :default-expanded-keys="expandedKeys"
          >
            <template #default="{ node, data }">
              <template v-if="data.isFolder">
                <span>{{ node.label }}</span>
              </template>
              <template v-else>
                <span class="custom-tree-node">
                  <ElText :type="checkSearched(data)">{{ node.label }}</ElText>
                  <ElTooltip
                    effect="dark"
                    content="下载时请允许网页跳转"
                    placement="right"
                  >
                    <ElButton
                      link
                      type="primary"
                      @click="downloadFile(node, data)"
                    >
                      <ElIcon><Download /></ElIcon>
                    </ElButton>
                  </ElTooltip>
                </span>
              </template>
            </template>
          </ElTree>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts" setup>
import {
  ElButton,
  ElCard,
  ElCol,
  ElIcon,
  ElInput,
  ElRow,
  ElText,
  ElTooltip,
  ElTree,
} from "element-plus";
import type { FolderMap, Tree } from "./types/tree.type";
import type { EpPropMergeType } from "element-plus/es/utils/index.mjs";
import { useResourceStore } from "@/stores/main/resource/resource";
import { onMounted, reactive, ref } from "vue";
import { cloneDeep } from "lodash";
import { parseFileName } from "@/utils/resource";
import { ResourceAPI } from "@/constants/resource.constant";
import { BASE_URL } from "@/service/request/config";
import { Search } from "@element-plus/icons-vue";

const resourceStore = useResourceStore();

let resource: Tree[] = [];

const resourceData = reactive({
  data: cloneDeep(resource),
});

function buildTreeItem(id: string, label: string, isFolder: boolean): Tree {
  let treeItem: Tree;
  if (isFolder) {
    const fileTreeList: Tree[] = [];
    treeItem = {
      id,
      label,
      isFolder,
      isSearched: false,
      children: fileTreeList,
    };
  } else {
    const { prefix, originalFileName } = parseFileName(label);
    treeItem = {
      id,
      label: originalFileName,
      prefix,
      isFolder,
      isSearched: false,
    };
  }

  return treeItem;
}

function buildTree(folderMaps: FolderMap[]) {
  let idIndex = 0;
  const folderTreeList: Tree[] = [];
  folderMaps.forEach((folderMap) => {
    const folder = folderMap.folder;
    const folderTree = buildTreeItem(idIndex.toString(), folder, true);
    folderMap.files.forEach((file, index) => {
      const fileTree = buildTreeItem(`${idIndex}-${index}`, file, false);
      folderTree.children?.push(fileTree);
    });
    folderTreeList.push(folderTree);
    idIndex++;
  });
  return folderTreeList;
}

const folderMaps: FolderMap[] = [];

onMounted(async () => {
  await resourceStore.getAllFolders();
  for (let folder of resourceStore.folders) {
    const files = await resourceStore.findAllInFolder(folder);
    folderMaps.push({ folder, files });
    resource = buildTree(folderMaps);
    resourceData.data = cloneDeep(resource);
  }
});

function checkSearched(data: Tree) {
  let type = "";
  if (data.isSearched) {
    type = "primary";
  }
  return type as EpPropMergeType<
    StringConstructor,
    "" | "success" | "warning" | "info" | "primary" | "danger",
    unknown
  >;
}

function downloadFile(node: any, data: Tree) {
  const folder = node.parent.label;
  const fileName = data.label;
  const prefix = data.prefix;
  const downloadUrl = `${BASE_URL}${ResourceAPI.BaseResourceUrl}${folder}/download?fileName=${fileName}&prefix=${prefix}`;
  window.open(downloadUrl);
}

const searchFileName = ref("");
const expandedKeys = reactive<string[]>([]);
function searchFiles() {
  resourceData.data = cloneDeep(resource);
  resourceData.data.forEach((folderTree: Tree) => {
    if (folderTree.isFolder) {
      folderTree.children?.forEach((fileTree: Tree) => {
        if (
          searchFileName.value !== "" &&
          fileTree.label.indexOf(searchFileName.value) != -1
        ) {
          fileTree.isSearched = true;
          expandedKeys.push(folderTree.id);
        }
      });
    }
  });
}
</script>

<style scoped lang="less">
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
}
</style>
