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
          : "h-10 w-full outline outline-1 text-sm outline-gray-400 rounded-lg my-3 px-4"
      }
      onChange={onChange}
      required={required}
    />
  );
}
