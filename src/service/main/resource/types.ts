export interface IUploadFilesPayload {
  uploadUrl: string;
  files: FormData;
}

interface IDownloadFileParams {
  fileName: string;
  prefix?: string;
}
