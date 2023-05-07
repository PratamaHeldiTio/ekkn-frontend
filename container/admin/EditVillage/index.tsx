import Alert from "@/components/Alert";
import InputField from "@/components/InputField";
import InputSubmit from "@/components/InputSubmit";
import { IEditVillagePage } from "@/pages/sakera/village/edit/editVillage.types";
import axios from "axios";
import dynamic from "next/dynamic";
import { useState } from "react";
import Cookies from "universal-cookie";

const AdminLayout = dynamic(() => import("@/layout/AdminLayout"));

export default function EditVillage({ village }: IEditVillagePage) {
  // get token
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");
  const [alertSuccess, setAlertSuccess] = useState<boolean>();
  const [alertFail, setAlertFail] = useState<boolean>();
  const [alertMessage, setAlertMessage] = useState();
  // create state like input
  const [inputvalue, setInputValue] = useState({
    name: village.name,
    kecamatan: village.kecamatan,
    kabupaten: village.kabupaten,
    latitude: village.latitude,
    longitude: village.longitude,
    status: village.status,
  });
  const { kecamatan, name, kabupaten, latitude, longitude, status } =
    inputvalue;

  // handler change input field
  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditVillage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .put(
        `${process.env.BASE_URL_V1}/village/${village.id}`,
        {
          name,
          kecamatan,
          kabupaten,
          latitude: Number(latitude),
          longitude: Number(longitude),
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
    <AdminLayout
      navigations={[
        { title: "Kembali", link: `/sakera/village/${village.periodId}` },
      ]}
    >
      <div className="my-16 lg:m-0 rounded-3xl lg:mt-8 lg:p-8 p-6 bg-secondary">
        {alertSuccess && (
          <Alert background="bg-active" message={alertMessage} />
        )}

        {alertFail && <Alert background="bg-danger" message={alertMessage} />}

        <form onSubmit={handleEditVillage}>
          <h1 className="text-xl lg:text-2xl font-bold">Informasi Pribadi</h1>
          <div className="grid lg:grid-cols-2 gap-6 mt-8">
            <InputField
              label="Nama Desa"
              name="name"
              value={name}
              onChange={handleChangeField}
              required
            />
            <InputField
              label="Kecamatan"
              value={kecamatan}
              name="kecamatan"
              onChange={handleChangeField}
              required
            />
            <InputField
              label="Kabupaten"
              value={kabupaten}
              name="kabupaten"
              onChange={handleChangeField}
              required
            />
            <InputField
              label="Latitude"
              type="number"
              value={latitude}
              name="latitude"
              onChange={handleChangeField}
              required
            />
            <InputField
              label="Longitude"
              name="longitude"
              type="number"
              value={longitude}
              onChange={handleChangeField}
              required
            />
            <InputField
              label="status"
              name="status"
              value={status == "true" ? "Diambil" : "Belum Diambil"}
              readOnly
            />
          </div>

          <div className="lg:w-80 lg:mx-auto mt-4 h-10">
            <InputSubmit value="Simpan" />
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
