import InputSubmit from "@/components/InputSubmit";
import { IGroup, IOutputPeriodPage } from "@/pages/sakera/output/output.types";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const AdminLayout = dynamic(() => import("@/layout/AdminLayout"));

export default function OutputPeriod({ groups }: IOutputPeriodPage) {
  const router = useRouter();
  return (
    <AdminLayout navigations={[{ title: "Kembali", link: "/sakera/output" }]}>
      <div className="bg-secondary p-8 rounded-3xl my-8">
        <h1 className="text-2xl font-bold mb-12 ml-4">Luaran Kelompok</h1>
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
              {groups.map((group: IGroup, index: number) => {
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
