export interface IUploadFilesPayload {
  uploadUrl: string;
  files: FormData;
}

export interface IEditFolderPayload {
  folder: string;
  newFolder: string;
}

export interface IDeleteFilePayload {
  fileName: string;
  prefix: string;
  folder: string;
}

export interface IEditFilePayload {
  folder: string;
  fileName: string;
  prefix: string;
  newFolder?: string;
  newFileName?: string;
}
