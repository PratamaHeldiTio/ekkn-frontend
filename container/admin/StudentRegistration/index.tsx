import Alert from "@/components/Alert";
import InputSubmit from "@/components/InputSubmit";
import {
  IStudentRegistration,
  IStudentRegistrationPage,
  mapToStudentRegistration,
} from "@/pages/sakera/registration/student/studentRegistration.types";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "universal-cookie";

const AdminLayout = dynamic(() => import("@/layout/AdminLayout"));
export default function StudenRegistration({
  registration,
}: IStudentRegistrationPage) {
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");
  const router = useRouter();
  const { periodId } = router.query;
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [registrationState, setRegistration] = useState(registration);

  const handleValidasi = (id: string) => {
    axios
      .put(
        `${process.env.BASE_URL_V1}/student/registration/${id}`,
        {
          status: "true",
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

        //get again student registration
        axios
          .get(`${process.env.BASE_URL_V1}/student/registrations/${periodId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const students = mapToStudentRegistration(response.data.data);
            setRegistration(students);
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
      navigations={[{ title: "Kembali", link: "/sakera/registration" }]}
    >
      <div className="bg-secondary p-8 rounded-3xl my-8">
        <h1 className="text-2xl font-bold mb-12">
          Mahasiswa yang telah terdaftar
        </h1>
        {alertSuccess && (
          <Alert background="bg-active" message={alertMessage} />
        )}

        {alertFail && <Alert background="bg-danger" message={alertMessage} />}

        <div className="overflow-scroll rounded-lg border border-gray-200 shadow-md m-5 max-h-[35rem]">
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
              {registrationState.map((registration: IStudentRegistration) => {
                return (
                  <tr className="hover:bg-gray-100" key={registration.nim}>
                    <td className="px-6 py-4">{registration.nim}</td>
                    <td className="px-6 py-4">{registration.name}</td>
                    <td className="px-6 py-4">{registration.prodi}</td>
                    <td className="px-6 py-4">
                      {registration.status == "true"
                        ? "Telah divalidasi"
                        : "Belum divalidasi"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-20 h-8 flex place-items-center">
                        <InputSubmit
                          value="Validasi"
                          onClick={() => handleValidasi(registration.id)}
                          disabled={registration.status == "true" && true}
                          background={
                            registration.status == "true" ? "bg-gray-700" : ""
                          }
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
    </AdminLayout>
  );
}
