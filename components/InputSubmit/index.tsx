import { IInputSubmit } from "./InputSubmit.types";

export default function InputSubmit({
  value,
  disabled,
  background,
  onClick,
}: IInputSubmit) {
  return (
    <input
      type="submit"
      value={value}
      className={`w-full h-full ${
        background ? background : "bg-primary hover:bg-active"
      } ${disabled && "bg-gray-700"}  text-slate-50 font-bold rounded-lg my-3`}
      disabled={disabled}
      onClick={onClick}
    />
  );
}
