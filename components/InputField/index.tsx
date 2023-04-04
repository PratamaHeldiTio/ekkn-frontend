import { IInputField } from "./InputField.types";

export default function InputField({
  type,
  name,
  value,
  placeholder,
  onChange,
  required,
}: IInputField) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      className="h-10 w-full outline outline-2 text-sm outline-slate-400 rounded-lg my-3 px-4 font-bold"
      onChange={onChange}
      required={required}
    />
  );
}
