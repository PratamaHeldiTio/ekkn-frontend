import Alert from "@/components/Alert";
import InputField from "@/components/InputField";
import InputSelect from "@/components/InputSelect";
import InputSubmit from "@/components/InputSubmit";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import status from "@/global/status.json";
import { IEditPeriodPage } from "@/pages/sakera/period/edit/editPeriod.types";
import axios from "axios";
import Cookies from "universal-cookie";
const AdminLayout = dynamic(() => import("@/layout/AdminLayout"));

export default function EditPeriod({ period }: IEditPeriodPage) {
  // get token
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");
  const [alertSuccess, setAlertSuccess] = useState<boolean>();
  const [alertFail, setAlertFail] = useState<boolean>();
  const [alertMessage, setAlertMessage] = useState();
  const [inputvalue, setInputValue] = useState({
    semester: period.semester,
    tahunAjaran: period.tahunAjaran,
    start: period.start,
    end: period.end,
    periodStatus: period.periodStatus,
    studentRegistrationStatus: period.studentRegistrationStatus,
    lectureRegistrationStatus: period.lectureRegistrationStatus,
    groupRegistrationStatus: period.groupRegistrationStatus,
  });

  const {
    semester,
    tahunAjaran,
    start,
    end,
    periodStatus,
    studentRegistrationStatus,
    lectureRegistrationStatus,
    groupRegistrationStatus,
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

  const handleEditPeriod = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .put(
        `${process.env.BASE_URL_V1}/period/${period.id}`,
        {
          semester,
          tahun_ajaran: tahunAjaran,
          start,
          end,
          status: periodStatus,
          student_registration_status: studentRegistrationStatus,
          lecture_registration_status: lectureRegistrationStatus,
          group_registration_status: groupRegistrationStatus,
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

  // to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [alertFail, alertSuccess]);

  return (
    <AdminLayout navigations={[{ title: "Kembali", link: "/sakera/period" }]}>
      <div className="my-8 rounded-3xl p-10 bg-secondary">
        {alertSuccess && (
          <Alert background="bg-active" message={alertMessage} />
        )}

        {alertFail && <Alert background="bg-danger" message={alertMessage} />}

        <h1 className="text-xl lg:text-2xl font-bold mb-8">Edit Periode KKN</h1>
        <form onSubmit={handleEditPeriod}>
          <div className="grid lg:grid-cols-2 gap-6 gap-x-12 mb-6">
            <InputSelect
              label="Semester"
              name="semester"
              value={semester}
              required
              options={[
                { id: "ganjil", value: "Ganjil" },
                { id: "genap", value: "Genap" },
              ]}
              onChange={handleChangeSelect}
            />
            <InputField
              label="Tahun Ajaran"
              value={tahunAjaran}
              name="tahunAjaran"
              placeholder="contoh : 2023/2024"
              required
              onChange={handleChangeField}
            />
            <InputField
              label="Dimulai"
              value={start}
              name="start"
              type="date"
              required
              onChange={handleChangeField}
            />
            <InputField
              label="Berakhir"
              value={end}
              name="end"
              type="date"
              required
              onChange={handleChangeField}
            />
            <InputSelect
              label="Status Periode"
              name="periodStatus"
              value={periodStatus}
              required
              options={status}
              onChange={handleChangeSelect}
            />
            <InputSelect
              label="Status Pendaftaran Dosen"
              name="lectureRegistrationStatus"
              value={lectureRegistrationStatus}
              required
              options={status}
              onChange={handleChangeSelect}
            />
            <InputSelect
              label="Status Pendaftaran Mahasiswa"
              name="studentRegistrationStatus"
              value={studentRegistrationStatus}
              required
              options={status}
              onChange={handleChangeSelect}
            />
            <InputSelect
              label="Status Pendaftaran Kelompok"
              name="groupRegistrationStatus"
              value={groupRegistrationStatus}
              required
              options={status}
              onChange={handleChangeSelect}
            />
          </div>

          <div className="w-80 mx-auto h-10">
            <InputSubmit value="Simpan" />
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
