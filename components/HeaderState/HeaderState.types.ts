import { Dispatch, ReactNode, SetStateAction } from "react";
export interface IHeaderState {
  navigationState?: string[];
  setPage?: Dispatch<SetStateAction<string>>;
  page?: string;
}
