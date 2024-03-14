export interface Tree {
  id: string;
  label: string;
  prefix?: string;
  isSearched: boolean;
  isFolder: boolean;
  children?: Tree[];
}

export interface FolderMap {
  folder: string;
  files: string[];
}
