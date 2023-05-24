import Alert from "@/components/Alert";
import InputField from "@/components/InputField";
import InputSubmit from "@/components/InputSubmit";
import {
  IGradeByGroupPage,
  IStudentRegistration,
  mapToGradeByGroup,
} from "@/pages/lecturer/grade/grade.types";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Cookies from "universal-cookie";
const LecturerLayout = dynamic(() => import("@/layout/LecturerLayout"));

export default function GradeByGroup({
  studentRegistrations,
  periodId,
}: IGradeByGroupPage) {
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");
  const router = useRouter();
  const { groupId } = router.query;
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [nim, setNim] = useState<string>();
  const [grade, setGrade] = useState<number>();
  const [students, setStudents] = useState(studentRegistrations);

  const handleSaveGrade = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .put(
        `${process.env.BASE_URL_V1}/student/registration/grade/${periodId}/${nim}`,
        {
          grade: grade,
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
        setNim("");
        setGrade(0);

        axios
          .get(
            `${process.env.BASE_URL_V1}/student/registration/group/${groupId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            const students = mapToGradeByGroup(response.data.data);
            setStudents(students);
          })
          .catch((response) => {
            setAlertMessage(response.response.data.message);
            setAlertFail(!alertFail);
            setTimeout(() => {
              setAlertFail((prev) => !prev);
            }, 2000);
          });
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
    <LecturerLayout
      navigations={[
        {
          title: "Kembali",
          link: `/lecturer/grade/${periodId}`,
        },
      ]}
    >
      <div className="my-20 lg:my-8 p-10 bg-secondary rounded-3xl">
        <h1 className="text-2xl font-bold mb-8">Penilaian Mahasiswa</h1>
        {alertSuccess && (
          <Alert background="bg-active" message={alertMessage} />
        )}

        {alertFail && <Alert background="bg-danger" message={alertMessage} />}
        <form onSubmit={handleSaveGrade}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <InputField
              label="NIM"
              placeholder="Masukan NIM"
              required
              value={nim}
              onChange={(e) => setNim(e.target.value)}
            />
            <InputField
              label="Nilai"
              type="number"
              placeholder="1-100"
              required
              value={grade}
              onChange={(e) => setGrade(parseInt(e.target.value))}
            />
          </div>
          <div className="w-40 lg:w-80 mx-auto mt-6 h-10">
            <InputSubmit value="Simpan" />
          </div>
        </form>
        <div className="overflow-x-scroll rounded-lg border border-gray-200 shadow-md mt-12">
          <table className="w-full border-collapse bg-white text-left text-gray-500">
            <thead className="bg-gray-200">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-primary text-center"
                >
                  Nim
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-primary text-center"
                >
                  Nama
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-primary text-center"
                >
                  Prodi
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-primary text-center"
                >
                  Fakultas
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-primary text-center"
                >
                  Nilai
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {students.map((student: IStudentRegistration) => {
                return (
                  <tr className="hover:bg-gray-100" key={student.id}>
                    <td className="px-6 py-4">{student.nim}</td>
                    <td className="px-6 py-4">{student.name}</td>
                    <td className="px-6 py-4">{student.prodi}</td>
                    <td className="px-6 py-4">{student.fakultas}</td>
                    <td className="px-6 py-4">{student.grade}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </LecturerLayout>
  );
}
