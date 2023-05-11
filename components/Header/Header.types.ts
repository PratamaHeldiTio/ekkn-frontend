export interface IHeader {
  navigations: INavigation[];
  admin?: boolean;
  role?: string;
}

export interface INavigation {
  title: string;
  link: string;
  isActive?: boolean;
}
