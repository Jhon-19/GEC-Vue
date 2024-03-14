import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import type { IResourceState } from "./types";
import {
  findAllInFolderRequest,
  getAllFoldersRequest,
  uploadFilesRequest,
} from "@/service/main/resource/resource";
import type { IUploadFilesPayload } from "@/service/main/resource/types";

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

    async function findAllInFolder(folder: string) {
      const findResult = await findAllInFolderRequest(folder);
      let fileList: string[] = [];
      if (findResult.code === "200") {
        fileList = findResult.data;
      }
      return fileList;
    }

    return {
      ...toRefs(resourceState),
      getAllFolders,
      uploadFiles,
      findAllInFolder,
    };
  },
  {
    persist: true,
  }
);
