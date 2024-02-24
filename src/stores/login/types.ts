export interface ILoginState {
  token: string;
  userInfo: any;
  userMenus: any;
}

export interface IMenuItem {
  id: string;
  name: string;
  isSubMenu: boolean;
  url?: string;
  icon?: string;
  children?: IMenuItem[];
}
