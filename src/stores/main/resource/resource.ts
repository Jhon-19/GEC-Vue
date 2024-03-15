import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import type { IResourceState } from "./types";
import {
  deleteFileRequest,
  deleteFolderRequest,
  editFileRequest,
  editFolderRequest,
  findAllInFolderRequest,
  getAllFoldersRequest,
  uploadFilesRequest,
} from "@/service/main/resource/resource";
import type {
  IDeleteFilePayload,
  IEditFilePayload,
  IEditFolderPayload,
  IUploadFilesPayload,
} from "@/service/main/resource/types";
import { createFolderRequest } from "../../../service/main/resource/resource";
import { showMessage } from "@/utils/message";

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

    async function createFolder(folder: string) {
      const createResult = await createFolderRequest(folder);
      const createStatus = createResult.code === "200";
      showMessage(createStatus, "文件夹创建成功", "文件夹创建失败");
      if (createStatus) {
        await getAllFolders();
      }
    }

    async function deleteFolder(folder: string) {
      const deleteResult = await deleteFolderRequest(folder);
      const deleteStatus = deleteResult.code === "200";
      showMessage(deleteStatus, "文件夹已删除", "文件夹删除失败");
      if (deleteStatus) {
        await getAllFolders();
      }
    }

    async function editFolder(editFolderPayload: IEditFolderPayload) {
      const editResult = await editFolderRequest(editFolderPayload);
      const editStatus = editResult.code === "200";
      showMessage(editStatus, "文件夹已重命名");
      if (editStatus) {
        await getAllFolders();
      }
    }

    async function deleteFile(deleteFilePayload: IDeleteFilePayload) {
      const deleteResult = await deleteFileRequest(deleteFilePayload);
      const deleteStatus = deleteResult.code === "200";
      showMessage(deleteStatus, "文件已删除", "删除失败");
      return deleteStatus;
    }

    async function editFile(editFilePayload: IEditFilePayload) {
      const editResult = await editFileRequest(editFilePayload);
      const editStatus = editResult.code === "200";
      showMessage(editStatus, "文件修改完成");
      return editStatus;
    }

    return {
      ...toRefs(resourceState),
      getAllFolders,
      uploadFiles,
      findAllInFolder,
      createFolder,
      deleteFolder,
      editFolder,
      deleteFile,
      editFile,
    };
  },
  {
    persist: true,
  }
);
