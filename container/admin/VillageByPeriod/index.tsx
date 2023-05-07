import Alert from "@/components/Alert";
import InputField from "@/components/InputField";
import InputSubmit from "@/components/InputSubmit";
import {
  IVillage,
  IVillageByPeriodPage,
  mapDataToVillages,
} from "@/pages/sakera/village/village.types";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "universal-cookie";

const AdminLayout = dynamic(() => import("@/layout/AdminLayout"));
export default function VillageByPeriod({ villages }: IVillageByPeriodPage) {
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");
  const router = useRouter();
  const { periodId } = router.query;

  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [name, setName] = useState<string>();
  const [kecamatan, setKecamatan] = useState<string>();
  const [kabupaten, setKabupaten] = useState<string>();
  const [stateVillages, setVillages] = useState(villages);

  const handleCreateVillage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.BASE_URL_V1}/village`,
        {
          name,
          period_id: periodId,
          kecamatan,
          kabupaten,
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
        setName("");
        setKecamatan("");
        setKabupaten("");

        axios
          .get(`${process.env.BASE_URL_V1}/village/period/${periodId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const villages = mapDataToVillages(response.data.data);
            setVillages(villages);
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

  const handleDeleteVillage = (nim: string) => {
    axios
      .delete(`${process.env.BASE_URL_V1}/village/${nim}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        axios
          .get(`${process.env.BASE_URL_V1}/village/${periodId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const students = mapDataToVillages(response.data.data);
            setVillages(students);
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
    <AdminLayout navigations={[{ title: "Kembali", link: "/sakera/village" }]}>
      <div className="rounded-3xl p-8 bg-secondary my-8">
        <h1 className="text-2xl font-bold mb-6">Tambah Desa</h1>

        {alertSuccess && (
          <Alert background="bg-active" message={alertMessage} />
        )}

        {alertFail && <Alert background="bg-danger" message={alertMessage} />}

        <form onSubmit={handleCreateVillage}>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
            <InputField
              label="Nama Desa"
              value={name}
              placeholder="Masukan nama desa"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <InputField
              label="Kecamatan"
              placeholder="Masukan kecamatan"
              value={kecamatan}
              required
              onChange={(e) => setKecamatan(e.target.value)}
            />
            <InputField
              label="Kabupaten"
              value={kabupaten}
              placeholder="Masukan Kabupaten"
              required
              onChange={(e) => setKabupaten(e.target.value)}
            />
          </div>
          <div className="w-80 mx-auto h-10">
            <InputSubmit value="Tambah" />
          </div>
        </form>
      </div>
      <div className="rounded-3xl p-8 bg-secondary">
        <h1 className="text-2xl font-bold mb-12 ml-5">Daftar Mahasiswa</h1>
        <div className="overflow-x-scroll rounded-lg border border-gray-200 shadow-md m-5">
          <table className="w-full border-collapse bg-secondary text-left text-gray-500">
            <thead className="bg-gray-200">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-primary text-center"
                >
                  Nama Desa
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-primary text-center"
                >
                  Kecamatan
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-primary text-center"
                >
                  Kabupaten
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-primary text-center"
                >
                  Latitude
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-primary text-center"
                >
                  Longitude
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {stateVillages.map((villlage: IVillage) => {
                return (
                  <tr className="hover:bg-gray-100" key={villlage.id}>
                    <td className="px-6 py-4">{villlage.name}</td>
                    <td className="px-6 py-4">{villlage.kecamatan}</td>
                    <td className="px-6 py-4">{villlage.kabupaten}</td>
                    <td className="px-6 py-4">{villlage.latitude}</td>
                    <td className="px-6 py-4">{villlage.longitude}</td>
                    <td className="px-6 py-4">
                      {villlage.status == "true" ? "Diambil" : "Belum  Diambil"}
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
                          router.push(`/sakera/village/edit/${villlage.id}`)
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
                        onClick={() => handleDeleteVillage(villlage.id)}
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
