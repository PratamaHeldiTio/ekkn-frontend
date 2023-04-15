import { IInputField } from "./InputField.types";

export default function InputField({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  required,
  readOnly,
}: IInputField) {
  return (
    <label className="font-bold lg:text-lg">
      {label}
      <input
        type={type ? type : "text"}
        name={name}
        placeholder={placeholder}
        value={value}
        className={`h-10 w-full outline outline-2 outline-slate-400 rounded-lg my-3 px-4 font-light ${
          readOnly && "bg-slate-300"
        }`}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
      />
    </label>
  );
}
