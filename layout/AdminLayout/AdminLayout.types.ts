import { ReactNode } from "react";

export interface IAdminLayout {
  children: ReactNode;
  navigations?: INavigation[];
}
export interface INavigation {
  title: string;
  link: string;
}
