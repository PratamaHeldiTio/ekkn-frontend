import React from "react";
import { IInputOption, IInputSelect } from "./InputSelect.types";

export default function InputSelect({
  label,
  name,
  onChange,
  value,
  required,
  options = [],
}: IInputSelect) {
  return (
    <label className="font-bold lg:text-lg ">
      {label}
      <select
        name={name}
        className="h-10 w-full outline outline-2 outline-slate-400 bg-secondary rounded-lg my-3 px-4 font-light"
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">Pilih {label}</option>
        {options.map((option: IInputOption) => (
          <option key={option.id} value={option.id}>
            {option.value}
          </option>
        ))}
      </select>
    </label>
  );
}
