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
import Alert from "@/components/Alert";
import { IProfilePage } from "@/pages/lecturer/profile/profile.types";
import { useRouter } from "next/router";
const LecturerLayout = dynamic(() => import("@/layout/LecturerLayout"));
export default function Profile({ lecturer }: IProfilePage) {
  // get token
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");
  const router = useRouter();

  const [profile, setProfile] = useState<string>("");
  const [newProfile, setNewProfile] = useState<string | Blob>("");
  // create state like input
  const [inputvalue, setInputValue] = useState({
    nip: lecturer.nip,
    name: lecturer.name,
    prodi: lecturer.prodi,
    fakultas: lecturer.fakultas,
    gender: lecturer.gender,
    contact: lecturer.contact,
    maduraLang: lecturer.maduraLang,
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });

  const {
    nip,
    name,
    gender,
    fakultas,
    prodi,
    maduraLang,
    contact,
    oldPassword,
    newPassword,
    repeatNewPassword,
  } = inputvalue;

  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // to top after register
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [alertFail, alertSuccess]);

  useEffect(() => {
    if (lecturer.profile != "") {
      setProfile(`${process.env.BASE_URL}/static/profile/${lecturer.profile}`);
    }
  }, []);

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
        `${process.env.BASE_URL_V1}/lecturer`,
        {
          id: nip,
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
        `${process.env.BASE_URL_V1}/lecturer/change_password`,
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
          router.reload();
        }, 1500);
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
      .put(`${process.env.BASE_URL_V1}/lecturer/profile`, formData, {
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
    <LecturerLayout navigations={[{ title: "Keluar", link: "/logout" }]}>
      <div className="mt-20 lg:m-0 rounded-3xl lg:mt-8 lg:p-8 p-6 bg-secondary">
        {alertSuccess && (
          <Alert background="bg-active" message={alertMessage} />
        )}
        {alertFail && <Alert background="bg-danger" message={alertMessage} />}
        <div className="w-24 h-24 overflow-hidden cursor-pointer rounded-full mx-auto">
          <div className="w-24 h-24 overflow-hidden cursor-pointer rounded-full mx-auto">
            <img
              alt="profile user"
              src={profile != "" ? profile : "/user.png"}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 justify-items-center mt-8 mb-16">
          <div>
            <form className="flex gap-4" onSubmit={handleUploadProfile}>
              <input
                type="file"
                className="file:hidden pt-2 px-4 outline lg:text-lg outline-2 outline-slate-400 rounded-lg font-light h-10 w-56 md:w-80"
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
            <InputField label="NIP" value={nip} readOnly name="nip" />
            <InputSelect
              label="Fakultas"
              value={fakultas}
              name="fakultas"
              options={dataFakultas}
              onChange={handleChangeSelect}
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
            />
            <InputSelect
              label="Jenis Kelamin"
              name="gender"
              value={gender}
              options={dataGender}
              onChange={handleChangeSelect}
            />
            <InputSelect
              label="Penguasaan Bahasa Madura"
              name="maduraLang"
              value={maduraLang}
              options={language}
              onChange={handleChangeSelect}
            />
            <InputField
              label="Kontak"
              name="contact"
              value={contact}
              onChange={handleChangeField}
            />
          </div>

          <div className="lg:w-80 lg:mx-auto my-4 h-10">
            <InputSubmit value="Simpan" />
          </div>
        </form>
      </div>

      {/* change password section */}
      <div className="rounded-3xl mt-8 mb-16 lg:mb-2 lg:p-8 p-6 bg-secondary">
        <h1 className=" text-xl lg:text-2xl font-bold mb-4">Ubah Password</h1>
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
          <div className="lg:w-80 h-10 lg:mx-auto mb-4">
            <InputSubmit value="Ubah Password" />
          </div>
        </form>
      </div>
    </LecturerLayout>
  );
}
