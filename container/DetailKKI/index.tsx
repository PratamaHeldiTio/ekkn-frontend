import Alert from "@/components/Alert";
import InputSubmit from "@/components/InputSubmit";
import TextArea from "@/components/TextArea";
import { IDetailKKIPage } from "@/pages/student/kki/kki.types";
import axios from "axios";
import dynamic from "next/dynamic";
import { useState } from "react";
import Cookies from "universal-cookie";
const StudentLayout = dynamic(() => import("@/layout/StudentLayout"));

export default function DetailKKI({ studentProker }: IDetailKKIPage) {
  // get token
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");

  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [proker, setProker] = useState(studentProker.proker);

  const handleProker = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .put(
        `${process.env.BASE_URL_V1}/student/registration/proker/${studentProker.id}`,
        {
          proker,
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

  return (
    <StudentLayout navigations={[{ title: "Kembali", link: "/student/kki" }]}>
      <div className="mt-20 lg:m-0 rounded-3xl lg:mt-8 lg:p-8 p-6 bg-secondary">
        {alertSuccess && (
          <Alert background="bg-active" message={alertMessage} />
        )}

        {alertFail && <Alert background="bg-danger" message={alertMessage} />}

        <form onSubmit={handleProker}>
          <TextArea
            placeholder="Jelaskan program kerja dalam bentuk paragraf"
            label="Program Kerja"
            name="proker"
            value={proker}
            onChange={(e) => setProker(e.target.value)}
          />
          <div className="lg:w-80 lg:mx-auto h-10 mb-4">
            <InputSubmit value="Simpan" />
          </div>
        </form>

        {/* Ouput section */}
        <h1 className="text-xl lg:text-2xl font-bold mt-16">Luaran</h1>
      </div>
    </StudentLayout>
  );
}
