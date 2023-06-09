/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import InputField from "@/components/InputField";
import InputSelect from "@/components/InputSelect";
import InputSubmit from "@/components/InputSubmit";
import axios from "axios";
import Cookies from "universal-cookie";
import dataGender from "@/global/gender.json";
import language from "@/global/language.json";
import dataFakultas from "@/global/fakultas.json";
import dataProdi from "@/global/prodi.json";
import { IProfile } from "@/pages/student/profile/profile.types";
import Alert from "@/components/Alert";
import { useRouter } from "next/router";
const StudentLayout = dynamic(() => import("@/layout/StudentLayout"));
export default function Profile({ student }: IProfile) {
  // get token
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");
  const router = useRouter();

  // create state like input
  const [inputvalue, setInputValue] = useState({
    nim: student.nim,
    name: student.name,
    gender: student.gender,
    fakultas: student.fakultas,
    prodi: student.prodi,
    maduraLang: student.maduraLang,
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });

  const [profile, setProfile] = useState<string>("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [newProfile, setNewProfile] = useState<string | Blob>("");

  // to top after register
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [alertFail, alertSuccess]);

  useEffect(() => {
    if (student.profile != "") {
      setProfile(`${process.env.BASE_URL}/static/profile/${student.profile}`);
    }
  }, []);

  const {
    nim,
    name,
    gender,
    fakultas,
    prodi,
    maduraLang,
    oldPassword,
    newPassword,
    repeatNewPassword,
    // profile,
  } = inputvalue;

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

  const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .put(
        `${process.env.BASE_URL_V1}/student`,
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

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .put(
        `${process.env.BASE_URL_V1}/student/change_password`,
        {
          old_password: oldPassword,
          new_password: newPassword,
          repeat_new_password: repeatNewPassword,
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

  const handleUploadProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profile", newProfile);

    axios
      .put(`${process.env.BASE_URL_V1}/student/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAlertMessage(response.data.message);
        setAlertSuccess(!alertSuccess);
        setTimeout(() => {
          setAlertSuccess((prev) => !prev);
        }, 1000);

        setTimeout(() => {
          router.reload();
        }, 1500);
      })
      .catch((response) => {
        setAlertMessage(response.response.data.message);
        setAlertFail(!alertFail);
        setTimeout(() => {
          setAlertFail((prev) => !prev);
        }, 1500);
      });
  };

  return (
    <StudentLayout navigations={[{ title: "Keluar", link: "/logout" }]}>
      <div className="mt-20 lg:m-0 rounded-3xl lg:mt-8 lg:p-8 p-6 bg-secondary">
        {alertSuccess && (
          <Alert background="bg-active" message={alertMessage} />
        )}
        {alertFail && <Alert background="bg-danger" message={alertMessage} />}
        <div className="w-24 h-24 overflow-hidden cursor-pointer rounded-full mx-auto">
          <img alt="profile user" src={profile != "" ? profile : "/user.png"} />
        </div>

        <div className="grid grid-cols-1 justify-items-center mt-8 mb-16">
          <div>
            <form className="flex gap-4" onSubmit={handleUploadProfile}>
              <input
                type="file"
                className="file:hidden pt-2 px-4 outline lg:text-lg outline-2 outline-slate-400 rounded-lg font-light h-10 w-48 md:w-80"
                onChange={(e: any) => {
                  setNewProfile(e.target.files[0]);
                  setProfile(URL.createObjectURL(e.target.files[0]));
                }}
              />
              <div className="h-10 w-24 md:w-32">
                <InputSubmit value="Simpan" />
              </div>
            </form>
            <p className="text-sm mt-2">Note: Maksimal ukuran file 1 MB</p>
          </div>
        </div>

        <form onSubmit={handleSaveProfile}>
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

          <div className="lg:w-80 lg:mx-auto my-4 h-10">
            <InputSubmit value="Simpan" />
          </div>
        </form>
      </div>

      {/* change password section */}
      <div className="mt-8 mb-16 lg:mb-0 rounded-3xl bg-secondary p-6 lg:p-8">
        <h1 className=" text-xl lg:text-2xl font-bold mt-8 mb-4">
          Ubah Password
        </h1>
        <form
          onSubmit={handleChangePassword}
          className="grid-cols-1 grid gap-4"
        >
          <InputField
            label="Password lama"
            type="password"
            placeholder="Masukan password lama"
            name="oldPassword"
            onChange={handleChangeField}
            value={oldPassword}
            required
          />
          <InputField
            label="Password baru"
            type="password"
            placeholder="Masukan password baru"
            name="newPassword"
            onChange={handleChangeField}
            value={newPassword}
            required
          />
          <InputField
            label="Ulangi password baru"
            type="password"
            placeholder="Ulangi password baru"
            name="repeatNewPassword"
            onChange={handleChangeField}
            value={repeatNewPassword}
            required
          />
          <div className="lg:w-80 h-10 lg:mx-auto my-4">
            <InputSubmit value="Ubah Password" />
          </div>
        </form>
      </div>
    </StudentLayout>
  );
}
