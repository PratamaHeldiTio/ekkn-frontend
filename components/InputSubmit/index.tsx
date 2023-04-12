import { IInputSubmit } from "./InputSubmit.types";

export default function InputSubmit({ value }: IInputSubmit) {
  return (
    <input
      type="submit"
      value={value}
      className="w-full h-10 bg-blue bg-primary text-slate-50 font-bold rounded-lg my-3 hover:bg-active"
    />
  );
}
