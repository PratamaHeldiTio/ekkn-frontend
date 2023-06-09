import { Dispatch, ReactNode, SetStateAction } from "react";
export interface IAdminLayout {
  children: ReactNode;
  navigations?: INavigation[];
  navigationState?: string[];
  setPage?: Dispatch<SetStateAction<string>>;
  page?: string;
}
export interface INavigation {
  title: string;
  link: string;
}
