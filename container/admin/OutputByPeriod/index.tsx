import Alert from "@/components/Alert";
import InputField from "@/components/InputField";
import InputSubmit from "@/components/InputSubmit";
import {
  IGroup,
  IOutputPeriodPage,
  mapToGroup,
} from "@/pages/sakera/output/output.types";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "universal-cookie";

const AdminLayout = dynamic(() => import("@/layout/AdminLayout"));

export default function OutputPeriod({ groups }: IOutputPeriodPage) {
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");
  const router = useRouter();
  const { periodId } = router.query;
  const [search, setSearch] = useState<string>();
  const [groupDatas, setGroupDatas] = useState(groups);
  const [alertFail, setAlertFail] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .get(
        `${process.env.BASE_URL_V1}/group/registered/${periodId}?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const students = mapToGroup(response.data.data);
        setGroupDatas(students);
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
    <AdminLayout navigations={[{ title: "Kembali", link: "/sakera/output" }]}>
      <div className="bg-secondary p-8 rounded-3xl my-8">
        <h1 className="text-2xl font-bold mb-8 ml-4">Luaran Kelompok</h1>
        {alertFail && <Alert background="bg-danger" message={alertMessage} />}

        <form
          onSubmit={handleSearch}
          className="mx-6 grid grid-cols-5 items-center gap-8"
        >
          <div className="col-span-4">
            <InputField
              value={search}
              placeholder="Cari berdasarkan nama kelompok"
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
                  No
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
                  Desa
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {groupDatas.map((group: IGroup, index: number) => {
                return (
                  <tr className="hover:bg-gray-100" key={group.id}>
                    <td className="px-6 py-4 text-center">{index + 1}</td>
                    <td className="px-6 py-4">{group.name}</td>
                    <td className="px-6 py-4">{group.village}</td>
                    <td className="px-6 py-4">{group.kecamatan}</td>
                    <td className="px-6 py-4">{group.kabupaten}</td>
                    <td className="px-6 py-4">
                      <div className="h-8 flex place-items-center">
                        <InputSubmit
                          value="Lihat detail"
                          onClick={() =>
                            router.push(`/sakera/output/group/${group.id}`)
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
