import { Dispatch, SetStateAction } from "react";

export interface IHeader {
  navigations: string[];
  admin: boolean;
  setPage?: Dispatch<SetStateAction<string>>;
  page?: string;
}
