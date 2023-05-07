import Alert from "@/components/Alert";
import InputField from "@/components/InputField";
import InputSelect from "@/components/InputSelect";
import InputSubmit from "@/components/InputSubmit";
import axios from "axios";
import dynamic from "next/dynamic";
import { useState } from "react";
import Cookies from "universal-cookie";

const AdminLayout = dynamic(() => import("@/layout/AdminLayout"));
export default function VillageByPeriod() {
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");

  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [name, setName] = useState<string>();
  const [kecamatan, setKecamatan] = useState<string>();
  const [kabupaten, setKabupaten] = useState<string>();

  const handleCreateVillage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.BASE_URL_V1}/village`,
        {
          name,
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

        // axios
        //   .get(`${process.env.BASE_URL_V1}/village`, {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   })
        //   .then((response) => {
        //     const village = mapingDataToPeriods(response.data.data);
        //     setPeriod(students);
        //   })
        //   .catch((response) => {
        //     setAlertMessage(response.response.data.message);
        //     setAlertFail(!alertFail);
        //     setTimeout(() => {
        //       setAlertFail((prev) => !prev);
        //     }, 2000);
        //   });
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
    </AdminLayout>
  );
}
