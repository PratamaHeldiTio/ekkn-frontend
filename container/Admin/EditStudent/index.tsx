import Alert from "@/components/Alert";
import InputField from "@/components/InputField";
import InputSelect from "@/components/InputSelect";
import { IEditStudent } from "@/pages/sakera/student/edit/EditStduent.types";
import dataGender from "@/global/gender.json";
import language from "@/global/language.json";
import dataFakultas from "@/global/fakultas.json";
import dataProdi from "@/global/prodi.json";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState } from "react";
import InputSubmit from "@/components/InputSubmit";
import axios from "axios";
import Cookies from "universal-cookie";
const AdminLayout = dynamic(() => import("@/layout/AdminLayout"));

export default function EditStudent({ student }: IEditStudent) {
  const router = useRouter();
  const { studentId } = router.query;
  // get token
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");

  const [alertSuccess, setAlertSuccess] = useState<boolean>();
  const [alertFail, setAlertFail] = useState<boolean>();
  const [alertMessage, setAlertMessage] = useState();
  // create state like input
  const [inputvalue, setInputValue] = useState({
    nim: student.nim,
    name: student.name,
    gender: student.gender,
    fakultas: student.fakultas,
    prodi: student.prodi,
    maduraLang: student.maduraLang,
  });

  const { nim, name, gender, fakultas, prodi, maduraLang } = inputvalue;

  // handler change input field
  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handler change input select
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .put(
        `${process.env.BASE_URL_V1}/student/${studentId}`,
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
      )
      .then((response) => {
        setAlertMessage(response.data.message);
        setAlertSuccess(!alertSuccess);
        setTimeout(() => {
          setAlertSuccess((prev) => !prev);
        }, 2000);
      })
      .catch((response) => {
        setAlertMessage(response.response.data.message);
        setAlertFail(!alertFail);
        setTimeout(() => {
          setAlertFail((prev) => !prev);
        }, 2000);
      });
  };

  return (
    <AdminLayout navigations={[{ title: "Kembali", link: "/sakera/student" }]}>
      <div className="my-16 lg:m-0 rounded-3xl lg:mt-8 lg:p-8 p-6 bg-secondary">
        {alertSuccess && (
          <Alert background="bg-active" message={alertMessage} />
        )}

        {alertFail && <Alert background="bg-danger" message={alertMessage} />}

        <form onSubmit={handleEdit}>
          <h1 className=" text-xl lg:text-2xl font-bold">Informasi Pribadi</h1>
          <div className="grid lg:grid-cols-2 gap-6 mt-2">
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

          <div className="lg:w-80 lg:mx-auto mt-4">
            <InputSubmit value="Simpan" />
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
