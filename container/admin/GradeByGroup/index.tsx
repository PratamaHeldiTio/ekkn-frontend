import {
  IGradeByGroupPage,
  IStudentRegistration,
} from "@/pages/sakera/grade/grade.types";
import dynamic from "next/dynamic";
const AdminLayout = dynamic(() => import("@/layout/AdminLayout"));

export default function GradeByGroup({
  studentRegistrations,
  periodId,
}: IGradeByGroupPage) {
  return (
    <AdminLayout
      navigations={[
        {
          title: "Kembali",
          link: `/sakera/grade/${periodId}`,
        },
      ]}
    >
      <div className="my-20 lg:my-8 p-10 bg-secondary rounded-3xl">
        <h1 className="text-2xl font-bold mb-8">Nilai Mahasiswa</h1>
        <div className="overflow-x-scroll rounded-lg border border-gray-200 shadow-md">
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
                  Fakultas
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-bold text-primary text-center"
                >
                  Nilai
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {studentRegistrations.map((student: IStudentRegistration) => {
                return (
                  <tr className="hover:bg-gray-100" key={student.id}>
                    <td className="px-6 py-4">{student.nim}</td>
                    <td className="px-6 py-4">{student.name}</td>
                    <td className="px-6 py-4">{student.prodi}</td>
                    <td className="px-6 py-4">{student.fakultas}</td>
                    <td className="px-6 py-4">{student.grade}</td>
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
