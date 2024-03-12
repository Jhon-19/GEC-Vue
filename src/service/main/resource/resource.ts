import { ResourceAPI } from "@/constants/resource.constant";
import gecRequest from "@/service";
import type { IDataType } from "@/service/types";
import type { IUploadFilesPayload } from "./types";

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
