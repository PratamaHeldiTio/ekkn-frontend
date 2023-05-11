import { INavigation } from "@/components/Header/Header.types";
import { ReactNode } from "react";

export interface IStudentLayout {
  children: ReactNode;
  navigations?: INavigation[];
}
