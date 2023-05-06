import { MouseEventHandler } from "react";

export interface IInputSubmit {
  value: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLInputElement>;
}
