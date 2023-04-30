import { ReactNode } from "react";

export interface IStudentLayout {
  children: ReactNode;
  navigations?: INavigation[];
}
export interface INavigation {
  title: string;
  link: string;
}
