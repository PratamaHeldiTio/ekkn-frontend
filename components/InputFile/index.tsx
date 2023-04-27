import React from "react";
import { IInputFile } from "./InputFile.types";

export default function InputFile({
  format,
  maxSize,
  label,
  file,
  onChange,
}: IInputFile) {
  return (
    <div>
      <label className="font-bold lg:text-lg">
        Upload {label}
        <div className="text-center px-5 mt-4 flex flex-col justify-center py-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-secondary  hover:bg-gray-100">
          <svg
            aria-hidden="true"
            className="w-30 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>

          {file.name != "" ? (
            <div>
              <p className="mb-2 text-sm text-gray-500">Klik Kirim {label}</p>
              <a
                href={file.fileUrl}
                target="_blank"
                className=" text-sm text-gray-500 break-words underline hover:text-active"
              >
                {file.name}
              </a>
            </div>
          ) : (
            <div>
              <p className="mb-2 text-sm text-gray-500">
                Klik Untuk Upload {label}
              </p>
              <p className="text-sm font-light text-gray-500">{`Pastikan Menggunakan Format ${format} Dengan Maksimal File (${maxSize} MB)`}</p>
            </div>
          )}

          <input type="file" className="hidden" onChange={onChange} />
        </div>
      </label>
    </div>
  );
}
