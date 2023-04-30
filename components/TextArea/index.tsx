import React from "react";
import { ITextArea } from "./TextArea.types";

export default function TextArea({
  placeholder,
  label,
  name,
  value,
  onChange,
}: ITextArea) {
  return (
    <label className="font-bold lg:text-lg">
      {label}
      <textarea
        name={name}
        placeholder={placeholder}
        rows={5}
        value={value}
        onChange={onChange}
        required
        className="w-full outline outline-2 outline-slate-400 rounded-lg mt-2 px-4 font-light p-4 text-justify"
      />
    </label>
  );
}
