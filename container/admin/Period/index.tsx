import Alert from "@/components/Alert";
import InputField from "@/components/InputField";
import InputSelect from "@/components/InputSelect";
import InputSubmit from "@/components/InputSubmit";
import { formatTimeUnix } from "@/helper";
import {
  IPeriod,
  IPeriodPage,
  mapingDataToPeriods,
} from "@/pages/sakera/period/period.types";
import axios from "axios";
import dynamic from "next/dynamic";
import router from "next/router";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const AdminLayout = dynamic(() => import("@/layout/AdminLayout"));
export default function Period({ periods }: IPeriodPage) {
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");

  const [semester, setSemester] = useState<string>();
  const [tahunAjaran, setTahunAjaran] = useState<string>();
  const [start, setStart] = useState<string>();
  const [end, setEnd] = useState<string>();
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [periodState, setPeriod] = useState(periods);

  // to top after register
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [alertFail, alertSuccess]);

  const handleCreatePeriod = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.BASE_URL_V1}/period`,
        {
          semester,
          tahun_ajaran: tahunAjaran,
          start,
          end,
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
        setSemester("");
        setTahunAjaran("");
        setStart("");
        setEnd("");

        axios
          .get(`${process.env.BASE_URL_V1}/period`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const students = mapingDataToPeriods(response.data.data);
            setPeriod(students);
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

  const handleDelete = (id: string) => {
    axios
      .delete(`${process.env.BASE_URL_V1}/period/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        axios
          .get(`${process.env.BASE_URL_V1}/period`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const students = mapingDataToPeriods(response.data.data);
            setPeriod(students);
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
    <AdminLayout navigations={[{ title: "Periode", link: "/sakera/period" }]}>
      <div className="rounded-3xl p-8 bg-secondary my-8">
        <h1 className="text-2xl font-bold mb-6">Tambah Periode</h1>

        {alertSuccess && (
          <Alert background="bg-active" message={alertMessage} />
        )}

        {alertFail && <Alert background="bg-danger" message={alertMessage} />}

        <form onSubmit={handleCreatePeriod}>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
            <InputSelect
              label="Semester"
              value={semester}
              required
              options={[
                { id: "ganjil", value: "Ganjil" },
                { id: "genap", value: "Genap" },
              ]}
              onChange={(e) => setSemester(e.target.value)}
            />
            <InputField
              label="Tahun Ajaran"
              value={tahunAjaran}
              placeholder="Masukan tahun ajaran ex : 2023/2024"
              required
              onChange={(e) => setTahunAjaran(e.target.value)}
            />
            <InputField
              label="Dimulai"
              value={start}
              type="date"
              required
              onChange={(e) => setStart(e.target.value)}
            />
            <InputField
              label="Berakhir"
              value={end}
              type="date"
              required
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
          <div className="w-80 mx-auto h-10">
            <InputSubmit value="Tambah" />
          </div>
        </form>
      </div>
      <div className="rounded-3xl p-8 bg-secondary">
        <h1 className="text-2xl font-bold mb-12 ml-5">Daftar Periode KKN</h1>
        <div className="overflow-scroll rounded-lg border border-gray-200 shadow-md m-5 max-h-[35rem]">
          <table className="w-full border-collapse bg-secondary text-left text-gray-500">
            <thead className="bg-gray-200">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-primary text-center"
                >
                  Semester
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-primary text-center"
                >
                  Tahun ajaran
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-primary text-center"
                >
                  Dimulai
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-primary text-center"
                >
                  Berakhir
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-primary text-center"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-primary text-center"
                >
                  Status pendaftaran mahasiswa
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-primary text-center"
                >
                  Status pendaftaran dosen
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-primary text-center"
                >
                  Status pendaftaran kelompok
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
              {periodState.map((period: IPeriod) => {
                return (
                  <tr className="hover:bg-gray-100" key={period.id}>
                    <td className="px-6 py-4">{period.semester}</td>
                    <td className="px-6 py-4">{period.tahunAjaran}</td>
                    <td className="px-6 py-4 min-w-[10rem]">
                      {formatTimeUnix(period.start).split(",")[0]}
                    </td>
                    <td className="px-6 py-4 min-w-[10rem]">
                      {formatTimeUnix(period.end).split(",")[0]}
                    </td>
                    <td className="px-6 py-4">
                      {period.status == "true" ? "Dibuka" : "Ditutup"}
                    </td>
                    <td className="px-6 py-4">
                      {period.studentRegistrationStatus == "true"
                        ? "Dibuka"
                        : "Ditutup"}
                    </td>
                    <td className="px-6 py-4">
                      {period.lectureRegistrationStatus == "true"
                        ? "Dibuka"
                        : "Ditutup"}
                    </td>
                    <td className="px-6 py-4">
                      {period.groupRegistrationStatus == "true"
                        ? "Dibuka"
                        : "Ditutup"}
                    </td>
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
                          router.push(`/sakera/period/edit/${period.id}`)
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
                        onClick={() => handleDelete(period.id)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
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
