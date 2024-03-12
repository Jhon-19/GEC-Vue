import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import type { IResourceState } from "./types";
import {
  getAllFoldersRequest,
  uploadFilesRequest,
} from "@/service/main/resource/resource";
import type { IUploadFilesPayload } from "@/service/main/resource/types";
import { ElMessage } from "element-plus";

export const useResourceStore = defineStore(
  "resource",
  () => {
    const resourceState = reactive<IResourceState>({
      folders: [],
    });

    async function getAllFolders() {
      const folderResult = await getAllFoldersRequest();
      if (folderResult.code === "200") {
        resourceState.folders = folderResult.data;
      }
    }

    async function uploadFiles(uploadFilesPayload: IUploadFilesPayload) {
      const uploadResult = await uploadFilesRequest(uploadFilesPayload);
      const uploadStatus = uploadResult.code === "200";
      return uploadStatus;
    }

    return {
      ...toRefs(resourceState),
      getAllFolders,
      uploadFiles,
    };
  },
  {
    persist: true,
  }
);
