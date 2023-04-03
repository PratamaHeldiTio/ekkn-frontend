import { IInputField } from "./InputField.types";

export default function InputField({
  type,
  name,
  value,
  placeholder,
  className,
  onChange,
  required,
}: IInputField) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      className={
        className
          ? className
          : "w-60 h-10 p-5 outline outline-1 text-sm outline-gray-400 rounded-lg my-3 block mx-auto"
      }
      onChange={onChange}
      required={required}
    />
  );
}
