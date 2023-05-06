import Alert from "@/components/Alert";
import InputField from "@/components/InputField";
import InputSubmit from "@/components/InputSubmit";
import trash from "@/public/delete.png";
import resetPassword from "@/public/resetPassword.png";
import edit from "@/public/edit.png";
import {
  IStudent,
  IStudentPage,
  mapingDataToStudents,
} from "@/pages/sakera/student/student.types";
import axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
const AdminLayout = dynamic(() => import("@/layout/AdminLayout"));

export default function Student({ students }: IStudentPage) {
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");
  const router = useRouter();

  const [nim, setNim] = useState<string>();
  const [name, setName] = useState<string>();
  const [alertSuccess, setAlertSuccess] = useState<boolean>();
  const [alertFail, setAlertFail] = useState<boolean>();
  const [alertMessage, setAlertMessage] = useState();
  const [statestudents, setStudents] = useState(students);

  // to top after register
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [alertFail, alertSuccess]);

  const handleAddStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.BASE_URL_V1}/student`,
        {
          nim,
          name,
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
        setName("");

        axios
          .get(`${process.env.BASE_URL_V1}/students`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const students = mapingDataToStudents(response.data.data);
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

  const handleDelete = (nim: string) => {
    axios
      .delete(`${process.env.BASE_URL_V1}/student/${nim}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        axios
          .get(`${process.env.BASE_URL_V1}/students`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const students = mapingDataToStudents(response.data.data);
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

  const handleResetPassword = (nim: string) => {
    axios
      .put(
        `${process.env.BASE_URL_V1}/student/reset_password/${nim}`,
        {},
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
    <AdminLayout
      navigations={[{ title: "Mahasiswa", link: "/sakera/student" }]}
    >
      <div className="rounded-3xl p-8 bg-secondary my-8">
        {alertSuccess && (
          <Alert background="bg-active" message={alertMessage} />
        )}

        {alertFail && <Alert background="bg-danger" message={alertMessage} />}
        <h1 className="text-2xl font-bold mb-6">Tambah Mahasiwa</h1>
        <form onSubmit={handleAddStudent}>
          <div className="grid grid-cols-2 gap-8 mb-6">
            <InputField
              label="NIM"
              placeholder="Masukan NIM"
              required
              value={nim}
              onChange={(e) => setNim(e.target.value)}
            />
            <InputField
              label="Nama"
              placeholder="Masukan Nama"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-80 mx-auto">
            <InputSubmit value="Tambah" />
          </div>
        </form>
      </div>
      <div className="rounded-3xl p-8 bg-secondary">
        <h1 className="text-2xl font-bold">Daftar Mahasiswa</h1>
        <div className="overflow-y-scroll my-4">
          <table className="mx-auto mt-8">
            <thead className="bg-primary text-secondary">
              <tr>
                <th className="border border-secondary">Nim</th>
                <th className="border border-secondary">Nama</th>
                <th className="border border-secondary">Prodi</th>
                <th className="border border-secondary p-3">Grade</th>
                <th className="border border-secondary p-3 min-w-[12rem]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {statestudents.map((student: IStudent, index: any) => {
                return (
                  <tr key={student.nim}>
                    <td className="border border-primary p-3">{student.nim}</td>
                    <td className="border border-primary p-3">
                      {student.name}
                    </td>
                    <td className="border border-primary p-3">
                      {student.prodi}
                    </td>
                    <td className="text-center  border border-primary p-3">
                      {student.grade}
                    </td>
                    <td className="border border-primary p-4 px-8">
                      <ul className="flex gap-4">
                        <Image
                          alt="icon edit"
                          src={edit}
                          className="w-8 h-8 cursor-pointer"
                          onClick={() =>
                            router.push(`/sakera/student/edit/${student.nim}`)
                          }
                        />
                        <Image
                          alt="icon delete"
                          src={trash}
                          className="w-8 h-8 cursor-pointer"
                          onClick={() => handleDelete(student.nim)}
                        />
                        <Image
                          alt="icon reset password"
                          src={resetPassword}
                          className="w-8 h-8 cursor-pointer"
                          onClick={() => handleResetPassword(student.nim)}
                        />
                      </ul>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
