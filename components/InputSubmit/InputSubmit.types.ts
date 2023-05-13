import { MouseEventHandler } from "react";

export interface IInputSubmit {
  value: string;
  disabled?: boolean;
  background?: string;
  onClick?: MouseEventHandler<HTMLInputElement>;
}
