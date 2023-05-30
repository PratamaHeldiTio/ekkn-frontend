import dynamic from "next/dynamic";
import InputSubmit from "@/components/InputSubmit";
import { IOutput, IOutputGroupPage } from "@/pages/sakera/output/output.types";

const AdminLayout = dynamic(() => import("@/layout/AdminLayout"));

export default function OutputGroup({ outputs, group }: IOutputGroupPage) {
  return (
    <AdminLayout
      navigations={[
        { title: "Kembali", link: `/sakera/output/${group.periodId}` },
      ]}
    >
      <div className="mt-8 mb-20 lg:m-0 lg:mt-8 lg:p-10 p-6 bg-secondary rounded-3xl">
        <ul className="lg:text-lg mb-16">
          <li className="my-2 truncate">Kelompok : {group.name}</li>
          <li className="my-2 truncate">
            Lokasi : {group.location != "" ? group.location : "Belum ada desa"}
          </li>
          <li className="my-2 truncate">
            Pembimbing :{" "}
            {group.lecturer != "" ? group.lecturer : "Belum ada pembimbing"}
          </li>
        </ul>
        <h1 className="text-xl lg:text-2xl font-bold text-center my-8">
          Daftar Luaran Kelompok
        </h1>
        <div className="grid grid-cols-2 gap-8">
          {outputs.map((output: IOutput) => {
            return (
              <div key={output.id} className="bg-gray-200 rounded-xl">
                <div className="bg-primary text-secondary rounded-t-xl px-4 py-3 lg:px-8 flex items-center place-content-between">
                  <h2 className="font-bold lg:text-xl capitalize text-center">
                    {output.type}
                  </h2>
                  <a
                    className="block h-8 w-32"
                    href={output.file}
                    target="_blank"
                  >
                    <InputSubmit value="Buka Luaran" background="bg-success" />
                  </a>
                </div>
                <div className="px-6 py-4">
                  <h2 className="font-bold lg:text-xl capitalize">
                    Deskripsi Luaran
                  </h2>
                  <p className="text-justify leading-7">{output.description}</p>
                  <h2 className="font-bold lg:text-xl mt-4 capitalize">
                    Kontributor
                  </h2>
                  <ul className="list-decimal ml-4">
                    {output.contribution.map((student: any, index: number) => {
                      return <li key={index}>{student}</li>;
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
