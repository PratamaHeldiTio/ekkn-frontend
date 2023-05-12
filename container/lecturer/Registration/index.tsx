import dynamic from "next/dynamic";
import InputField from "@/components/InputField";
import InputSelect from "@/components/InputSelect";
import dataGender from "@/global/gender.json";
import language from "@/global/language.json";
import dataFakultas from "@/global/fakultas.json";
import dataProdi from "@/global/prodi.json";
import InputSubmit from "@/components/InputSubmit";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Alert from "@/components/Alert";
import router from "next/router";
import { IRegistration } from "@/pages/lecturer/registration/registration.type";

// import layout
const LecturerLayout = dynamic(() => import("@/layout/LecturerLayout"));
export default function Register({ periods, lecturer }: IRegistration) {
  // get cookies
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");

  // create state like input
  const [inputvalue, setInputValue] = useState({
    id: lecturer.id,
    name: lecturer.name,
    gender: lecturer.gender,
    fakultas: lecturer.fakultas,
    prodi: lecturer.prodi,
    maduraLang: lecturer.maduraLang,
    contact: lecturer.contact,
    periodInput: "",
  });

  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);

  // to top after register
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [alertFail, alertSuccess]);

  const {
    id,
    name,
    gender,
    fakultas,
    prodi,
    maduraLang,
    contact,
    periodInput,
  } = inputvalue;

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

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .all([
        axios.put(
          `${process.env.BASE_URL_V1}/lecturer`,
          {
            id,
            name,
            gender,
            fakultas,
            prodi,
            contact,
            madura_lang: maduraLang,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        axios.post(
          `${process.env.BASE_URL_V1}/lecturer/registration`,
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
        setAlertSuccess(!alertSuccess);
        setTimeout(() => {
          setAlertSuccess((prev) => !prev);
        }, 1500);

        setTimeout(() => {
          router.push("/lecturer/registration/history");
        }, 2000);
      })
      .catch(() => {
        setAlertFail(!alertFail);
        setTimeout(() => {
          setAlertFail((prev) => !prev);
        }, 2000);
      });
  };

  const navigations = [
    {
      title: "Pendaftaran",
      link: "/lecturer/registration",
      isActive: true,
    },
    {
      title: "Riwayat",
      link: "/lecturer/registration/history",
    },
  ];
  // return element
  return (
    <LecturerLayout navigations={navigations}>
      <div>
        <div className="my-20 lg:m-0 rounded-3xl lg:mt-8 lg:p-8 p-6 bg-secondary">
          {alertSuccess && (
            <Alert
              background="bg-active"
              message="Pendaftaran dosen pembimbing lapangan berhasil dilakukan"
            />
          )}

          {alertFail && (
            <Alert
              background="bg-danger"
              message="Pendaftaran dosen pembimbing lapangan gagal dilakukan"
            />
          )}

          <form
            onSubmit={handleRegistration}
            className="grid lg:grid-cols-2 gap-6 mt-5"
          >
            <InputField label="NIP" value={id} readOnly />
            <InputSelect
              label="Periode"
              options={periods}
              name="periodInput"
              onChange={handleChangeSelect}
              required
            />
            <InputField
              label="Nama"
              name="name"
              value={name}
              onChange={handleChangeField}
              required
            />
            <InputSelect
              label="Fakultas"
              value={fakultas}
              name="fakultas"
              options={dataFakultas}
              onChange={handleChangeSelect}
              required
            />
            <InputSelect
              label="Jenis Kelamin"
              name="gender"
              value={gender}
              options={dataGender}
              onChange={handleChangeSelect}
              required
            />
            <InputSelect
              label="Prodi"
              name="prodi"
              value={prodi}
              options={dataProdi}
              onChange={handleChangeSelect}
              required
            />
            <InputField
              label="Nomor ponsel"
              name="contact"
              value={contact}
              onChange={handleChangeField}
              required
            />
            <InputSelect
              label="Penguasaan Bahasa Madura"
              name="maduraLang"
              value={maduraLang}
              options={language}
              onChange={handleChangeSelect}
              required
            />

            <div className="lg:w-80 lg:mx-auto mb-4 h-10 lg:col-span-2">
              <InputSubmit value="Daftar" />
            </div>
          </form>
        </div>
      </div>
    </LecturerLayout>
  );
}
