import Alert from "@/components/Alert";
import InputField from "@/components/InputField";
import InputSubmit from "@/components/InputSubmit";
import {
  IStudent,
  IStudentPage,
  mapingDataToStudents,
} from "@/pages/sakera/student/student.types";
import axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import Papa from "papaparse";
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
  const [search, setSearch] = useState<string>();
  const [statestudents, setStudents] = useState(students);
  const [newStudents, setNewStudents] = useState<Array<object> | unknown>();

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

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .get(`${process.env.BASE_URL_V1}/students?search=${search}`, {
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
  };

  const handleImportStudents = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.BASE_URL_V1}/student/import`,
        {
          data: newStudents,
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

  return (
    <AdminLayout
      navigations={[{ title: "Mahasiswa", link: "/sakera/student" }]}
    >
      <div className="rounded-3xl p-8 bg-secondary my-8">
        {alertSuccess && (
          <Alert background="bg-active" message={alertMessage} />
        )}

        {alertFail && <Alert background="bg-danger" message={alertMessage} />}
        <h1 className="text-2xl font-bold mb-6">Import Mahasiwa</h1>
        <div>
          <form className="flex gap-4" onSubmit={handleImportStudents}>
            <input
              type="file"
              className="file:hidden pt-2 px-4 outline lg:text-lg outline-2 outline-slate-400 rounded-lg font-light h-10 w-56 md:w-80"
              accept=".csv"
              required
              onChange={(e: any) => {
                Papa.parse(e.target.files[0], {
                  header: true,
                  skipEmptyLines: true,
                  complete: function (results) {
                    setNewStudents(results.data);
                  },
                });
              }}
            />
            <div className="h-10 w-24 md:w-32">
              <InputSubmit value="Simpan" />
            </div>
          </form>
          <p className="text-sm mt-2 mb-12">Note: File harus berformat CSV</p>
        </div>

        <h1 className="text-2xl font-bold mb-6">Tambah Mahasiswa</h1>

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
          <div className="w-80 mx-auto h-10">
            <InputSubmit value="Tambah" />
          </div>
        </form>
      </div>
      <div className="rounded-3xl p-8 bg-secondary">
        <h1 className="text-2xl font-bold mb-8 ml-5">Daftar Mahasiswa</h1>
        <form
          onSubmit={handleSearch}
          className="mx-6 grid grid-cols-5 items-center gap-8"
        >
          <div className="col-span-4">
            <InputField
              value={search}
              placeholder="Cari berdasarkan nim / nama / prodi / fakultas"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="h-11">
            <InputSubmit value="Cari" />
          </div>
        </form>
        <div className="overflow-scroll rounded-lg border border-gray-200 shadow-md m-5 max-h-[35rem]">
          <table className="w-full border-collapse bg-secondary text-left text-gray-500">
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {statestudents.map((student: IStudent) => {
                return (
                  <tr className="hover:bg-gray-100" key={student.nim}>
                    <td className="px-6 py-4">{student.nim}</td>
                    <td className="px-6 py-4">{student.name}</td>
                    <td className="px-6 py-4">{student.prodi}</td>
                    <td className="px-6 py-4">{student.fakultas}</td>
                    <td className="px-6 py-5 flex justify-center gap-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        cursor="pointer"
                        onClick={() =>
                          router.push(`/sakera/student/edit/${student.nim}`)
                        }
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        cursor="pointer"
                        onClick={() => handleDelete(student.nim)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      <div className="-mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-8 w-8"
                          cursor="pointer"
                          onClick={() => handleResetPassword(student.nim)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 14C7.50963 15.0039 8.37532 15.8345 9.46665 16.3667C10.558 16.8989 11.8158 17.1038 13.0506 16.9505C15.0687 16.7 16.4753 15.3884 18 14.1814M18 17V14H15M17 10C16.4904 8.99609 15.6247 8.16548 14.5334 7.63331C13.442 7.10113 12.1842 6.89624 10.9494 7.04949C8.93127 7.29995 7.52468 8.61162 6 9.81861M6 7V10H9"
                          />
                        </svg>
                      </div>
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
