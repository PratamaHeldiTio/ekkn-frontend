import InputSubmit from "@/components/InputSubmit";
import {
  ILogbookByGroupPage,
  IStudent,
} from "@/pages/lecturer/logbook/group/logbookByGroup.types";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const LecturerLayout = dynamic(() => import("@/layout/LecturerLayout"));
export default function LogbookByPeriod({
  students,
  periodId,
}: ILogbookByGroupPage) {
  const router = useRouter();

  return (
    <LecturerLayout
      navigations={[
        { title: "Kembali", link: `/lecturer/logbook/${periodId}` },
      ]}
    >
      <div className="rounded-3xl p-8 bg-secondary my-8">
        <h1 className="text-2xl font-bold mb-12 ml-6">Logbook Mahasiwa</h1>

        <div className="overflow-scroll rounded-lg border border-gray-200 shadow-md m-5 max-h-[35rem]">
          <table className="w-full border-collapse bg-secondary text-left text-gray-500">
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {students.map((student: IStudent) => {
                return (
                  <tr className="hover:bg-gray-100" key={student.nim}>
                    <td className="px-6 py-4">{student.nim}</td>
                    <td className="px-6 py-4">{student.name}</td>
                    <td className="px-6 py-4">{student.prodi}</td>
                    <td className="px-6 py-4">
                      <div className="w-36 h-8 mx-auto mb-4">
                        <InputSubmit
                          value="Lihat Logbook"
                          onClick={() =>
                            router.push(
                              `/lecturer/logbook/detail/${periodId}/${student.nim}`
                            )
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
    </LecturerLayout>
  );
}
