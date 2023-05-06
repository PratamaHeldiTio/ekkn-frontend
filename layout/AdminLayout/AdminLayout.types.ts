import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IAdminLayout {
  children: ReactNode;
  navigations?: string[];
  setPage?: Dispatch<SetStateAction<string>>;
  page?: string;
}
