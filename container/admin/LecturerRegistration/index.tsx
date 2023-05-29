import Alert from "@/components/Alert";
import InputField from "@/components/InputField";
import InputSubmit from "@/components/InputSubmit";
import {
  ILecturerRegistration,
  ILecturerRegistrationPage,
  mapToLecturerRegistration,
} from "@/pages/sakera/registration/lecturer/lecturerRegistration.types";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "universal-cookie";

const AdminLayout = dynamic(() => import("@/layout/AdminLayout"));
export default function LecturerRegistration({
  registration,
}: ILecturerRegistrationPage) {
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");
  const router = useRouter();
  const { periodId } = router.query;
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [registrationState, setRegistration] = useState(registration);
  const [search, setSearch] = useState<string>();

  const handleValidasi = (id: string, status: string) => {
    axios
      .put(
        `${process.env.BASE_URL_V1}/lecturer/registration/validation/${id}`,
        {
          status: status,
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

        //get again Lecturer registration
        axios
          .get(`${process.env.BASE_URL_V1}/lecturer/registration/${periodId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const Lecturers = mapToLecturerRegistration(response.data.data);
            setRegistration(Lecturers);
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

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .get(
        `${process.env.BASE_URL_V1}/lecturer/registration/${periodId}?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const Lecturers = mapToLecturerRegistration(response.data.data);
        setRegistration(Lecturers);
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
      navigations={[{ title: "Kembali", link: "/sakera/registration" }]}
    >
      <div className="bg-secondary p-8 rounded-3xl my-8">
        <h1 className="text-2xl font-bold mb-12 ml-4">
          Dosen Yang Telah Mendaftar
        </h1>
        {alertSuccess && (
          <Alert background="bg-active" message={alertMessage} />
        )}
        {alertFail && <Alert background="bg-danger" message={alertMessage} />}

        <form
          onSubmit={handleSearch}
          className="mx-6 grid grid-cols-5 items-center gap-8"
        >
          <div className="col-span-4">
            <InputField
              value={search}
              placeholder="Cari berdasarkan NIP"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="h-11">
            <InputSubmit value="Cari" />
          </div>
        </form>
        <div className="overflow-scroll rounded-lg border border-gray-200 shadow-md m-5 max-h-[35rem]">
          <table className="w-full border-collapse bg-white text-left text-gray-500">
            <thead className="bg-gray-200">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-primary text-center"
                >
                  NIP
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
              {registrationState.map((registration: ILecturerRegistration) => {
                return (
                  <tr className="hover:bg-gray-100" key={registration.id}>
                    <td className="px-6 py-4">{registration.lecturerID}</td>
                    <td className="px-6 py-4">{registration.name}</td>
                    <td className="px-6 py-4">{registration.prodi}</td>
                    <td className="px-6 py-4">{registration.fakultas}</td>
                    <td className="px-6 py-4">
                      {registration.status == ""
                        ? "Belum divalidasi"
                        : registration.status == "true"
                        ? "Diterima"
                        : "Ditolak"}
                    </td>
                    <td>
                      <div className="grid grid-cols-1 gap-2 py-4">
                        <div className="w-20 h-8">
                          <InputSubmit
                            value="Terima"
                            background="bg-success"
                            onClick={() =>
                              handleValidasi(registration.id, "true")
                            }
                          />
                        </div>
                        <div className="w-20 h-8">
                          <InputSubmit
                            value="Tolak"
                            background="bg-danger"
                            onClick={() =>
                              handleValidasi(registration.id, "false")
                            }
                          />
                        </div>
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
