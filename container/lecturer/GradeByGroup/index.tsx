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
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
const LecturerLayout = dynamic(() => import("@/layout/LecturerLayout"));

export default function GradeByGroup({
  studentRegistrations,
  periodId,
  grade,
}: IGradeByGroupPage) {
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");
  const router = useRouter();
  const { groupId } = router.query;
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [gradeData, setGrade] = useState(grade);
  const [students, setStudents] = useState(studentRegistrations);

  // to top after register
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [alertFail, alertSuccess]);

  const handleSaveGrade = (nim: string, index: number) => {
    axios
      .put(
        `${process.env.BASE_URL_V1}/student/registration/grade/${periodId}/${nim}`,
        {
          grade: gradeData[index],
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
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-primary text-center"
                >
                  Ubah Nilai
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {students.map((student: IStudentRegistration, index) => {
                return (
                  <tr className="hover:bg-gray-100 row-grade" key={student.id}>
                    <td className="px-6 py-4">{student.nim}</td>
                    <td className="px-6 py-4">{student.name}</td>
                    <td className="px-6 py-4">{student.prodi}</td>
                    <td className="px-6 py-4">{student.fakultas}</td>
                    <td className="px-6 py-4">
                      <div className="w-24 grade">
                        <InputField
                          type="number"
                          placeholder="1-100"
                          value={gradeData[index]}
                          onChange={(e) =>
                            setGrade((prev: any) => ({
                              ...prev,
                              [index]: parseInt(e.target.value),
                            }))
                          }
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24 h-8">
                        <InputSubmit
                          value="Simpan"
                          onClick={() => handleSaveGrade(student.nim, index)}
                        />
                      </div>
                    </td>
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
