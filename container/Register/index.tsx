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
import axios from "axios";
import Cookies from "universal-cookie";
import Alert from "@/components/Alert";

// import layout
const StudentLayout = dynamic(() => import("@/layout/StudentLayout"));
export default function Register({ periods, student }: IRegisterPage) {
  // init cookies
  const cookies = new Cookies();

  // create state like input
  const [inputvalue, setInputValue] = useState<IInputValue>({
    nim: student.nim,
    name: student.name,
    gender: student.gender,
    fakultas: student.fakultas,
    prodi: student.prodi,
    maduraLang: student.maduraLang,
    periodInput: "",
  });

  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);

  const { nim, name, gender, fakultas, prodi, maduraLang, periodInput } =
    inputvalue;

  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // get token from cookies
    const token = cookies.get("AUTH_LGN");

    //
    axios
      .all([
        axios.put(
          `${process.env.BASE_URL_V1}/student/${nim}`,
          {
            name,
            gender,
            fakultas,
            prodi,
            madura_lang: maduraLang,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        axios.post(
          `${process.env.BASE_URL_V1}/student_registration`,
          {
            period_id: periodInput,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
      ])
      .then(() => {
        setAlertFail(false);
        setAlertSuccess(true);
      })
      .catch(() => {
        setAlertSuccess(false);
        setAlertFail(true);
      });
  };
  // return element
  return (
    <StudentLayout>
      <div>
        <Header links={["Pendaftaran", "Riwayat"]} image={user} />
        <div className="rounded-3xl mt-8 p-8 bg-secondary">
          {alertSuccess && (
            <Alert
              background="bg-success"
              message="Pendaftaran KKN berhasil lihat status pada riwayat"
            />
          )}

          {alertFail && (
            <Alert
              background="bg-danger"
              message="Pendaftaran KKN gagal dilakukan"
            />
          )}

          <form onSubmit={handleRegister}>
            <InputSelect
              label="Periode"
              options={periods}
              name="periodInput"
              onChange={handleChangeSelect}
              required={true}
            />
            <div className="grid grid-cols-2 gap-6 mt-4">
              <InputField
                label="NIM"
                value={nim}
                readOnly={true}
                name="nim"
                onChange={handleChangeField}
              />
              <InputSelect
                label="Fakultas"
                value={fakultas}
                name="fakultas"
                options={dataFakultas}
                onChange={handleChangeSelect}
                required={true}
              />
              <InputField
                label="Nama"
                name="name"
                value={name}
                onChange={handleChangeField}
                required={true}
              />
              <InputSelect
                label="Prodi"
                name="prodi"
                value={prodi}
                options={dataProdi}
                onChange={handleChangeSelect}
                required={true}
              />
              <InputSelect
                label="Jenis Kelamin"
                name="gender"
                value={gender}
                options={dataGender}
                onChange={handleChangeSelect}
                required={true}
              />
              <InputSelect
                label="Penguasaan Bahasa Madura"
                name="maduraLang"
                value={maduraLang}
                options={language}
                onChange={handleChangeSelect}
                required={true}
              />
            </div>

            <div className="w-80 mx-auto my-4">
              <InputSubmit value="Daftar" />
            </div>
          </form>
        </div>
      </div>
    </StudentLayout>
  );
}
