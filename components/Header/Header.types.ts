export interface IHeader {
  navigations: INavigation[];
  admin: boolean;
}

export interface INavigation {
  title: string;
  link: string;
  isActive?: boolean;
}
