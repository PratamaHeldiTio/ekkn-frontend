import Header from "@/components/Header";
import dynamic from "next/dynamic";
import user from "@/public/user.png";
import InputField from "@/components/InputField";
import InputSelect from "@/components/InputSelect";
import dataGender from "@/global/gender.json";
import language from "@/global/language.json";
import dataFakultas from "@/global/fakultas.json";
import dataProdi from "@/global/prodi.json";
import InputSubmit from "@/components/InputSubmit";
import { IRegisterPage, IInputValue } from "./Register.types";
import { useState } from "react";

// import layout
const StudentLayout = dynamic(() => import("@/layout/StudentLayout"));
export default function Register({ periods, student }: IRegisterPage) {
  // create state like input
  const [inputvalue, setInputValue] = useState<IInputValue>({
    nim: student.nim,
    name: student.name,
    gender: student.gender,
    fakultas: student.fakultas,
    prodi: student.prodi,
    maduraLang: student.maduraLang.toString(),
    periodInput: "",
  });

  const { nim, name, gender, fakultas, prodi, maduraLang, periodInput } =
    inputvalue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeElemen = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // return element
  return (
    <StudentLayout>
      <div>
        <Header links={["Pendaftaran", "Riwayat"]} image={user} />
        <div className="rounded-3xl mt-8 p-8 bg-secondary">
          <form>
            <InputSelect
              label="Periode"
              options={periods}
              value={periodInput}
              name="periodInput"
              onChange={handleChangeElemen}
            />
            <div className="grid grid-cols-2 gap-6 mt-4">
              <InputField
                label="NIM"
                value={nim}
                readOnly={true}
                name="nim"
                onChange={handleChange}
              />
              <InputSelect
                label="Fakultas"
                name="fakultas"
                value={fakultas}
                options={dataFakultas}
                onChange={handleChangeElemen}
              />
              <InputField
                label="Nama"
                name="name"
                value={name}
                onChange={handleChange}
              />
              <InputSelect
                label="Prodi"
                name="prodi"
                value={prodi}
                options={dataProdi}
                onChange={handleChangeElemen}
              />
              <InputSelect
                label="Jenis Kelamin"
                name="gender"
                value={gender}
                options={dataGender}
                onChange={handleChangeElemen}
              />
              <InputSelect
                label="Penguasaan Bahasa Madura"
                name="maduraLang"
                value={maduraLang}
                options={language}
                onChange={handleChangeElemen}
              />
            </div>
          </form>
          <div className="w-80 mx-auto mt-6">
            <InputSubmit value="Daftar" />
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
