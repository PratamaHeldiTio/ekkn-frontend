import { IInputSubmit } from "./InputSubmit.types";

export default function InputSubmit({
  value,
  disabled,
  onClick,
}: IInputSubmit) {
  return (
    <input
      type="submit"
      value={value}
      className={`w-full h-full bg-blue ${
        disabled ? "bg-gray-700" : "bg-primary hover:bg-active"
      }  text-slate-50 font-bold rounded-lg my-3`}
      disabled={disabled}
      onClick={onClick}
    />
  );
}
