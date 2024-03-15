import { ResourceAPI } from "@/constants/resource.constant";
import gecRequest from "@/service";
import type { IDataType } from "@/service/types";
import type {
  IDeleteFilePayload,
  IEditFilePayload,
  IEditFolderPayload,
  IUploadFilesPayload,
} from "./types";

export function getAllFoldersRequest() {
  return gecRequest.get<IDataType<string[]>>({
    url: ResourceAPI.AllFolder,
  });
}

export function uploadFilesRequest(uploadFilesPayload: IUploadFilesPayload) {
  return gecRequest.post<IDataType<string>>({
    url: uploadFilesPayload.uploadUrl,
    data: uploadFilesPayload.files,
  });
}

export function findAllInFolderRequest(folder: string) {
  return gecRequest.get<IDataType<string[]>>({
    url: `${ResourceAPI.BaseResourceUrl}${folder}/`,
  });
}

export function createFolderRequest(folder: string) {
  return gecRequest.post<IDataType<string>>({
    url: ResourceAPI.FolderUrl,
    data: { folder },
  });
}

export function deleteFolderRequest(folder: string) {
  return gecRequest.delete<IDataType<string>>({
    url: ResourceAPI.FolderUrl,
    data: { folder },
  });
}

export function editFolderRequest(editFolderPayload: IEditFolderPayload) {
  return gecRequest.patch<IDataType<string>>({
    url: ResourceAPI.FolderUrl,
    data: editFolderPayload,
  });
}

export function deleteFileRequest(deleteFilePayload: IDeleteFilePayload) {
  return gecRequest.delete<IDataType<string>>({
    url: ResourceAPI.BaseResourceUrl,
    data: deleteFilePayload,
  });
}

export function editFileRequest(editFilePayload: IEditFilePayload) {
  return gecRequest.patch<IDataType<string>>({
    url: ResourceAPI.BaseResourceUrl,
    data: editFilePayload,
  });
}
