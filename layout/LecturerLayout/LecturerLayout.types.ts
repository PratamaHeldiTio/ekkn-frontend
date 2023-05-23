import { INavigation } from "@/components/Header/Header.types";
import { ReactNode } from "react";

export interface ILecturerLayout {
  children: ReactNode;
  navigations?: INavigation[];
}
