export interface IHeader {
  navigations: INavigation[];
  role: string;
}

export interface INavigation {
  title: string;
  link: string;
  isActive?: boolean;
}
