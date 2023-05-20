import {
  IGroupDetailPage,
  IStudent,
} from "@/pages/lecturer/group/detail/detailGroup.types";
import dynamic from "next/dynamic";
const LecturerLayout = dynamic(() => import("@/layout/LecturerLayout"));

export default function DetailGroup({ group, prokers }: IGroupDetailPage) {
  return (
    <LecturerLayout
      navigations={[
        {
          title: "Kembali",
          link: `/lecturer/group/${group.periodId}`,
        },
      ]}
    >
      {/* detail sectiom */}
      <div className="my-20 lg:my-8 p-10 bg-secondary rounded-3xl">
        <div>
          <h1 className="font-bold text-center text-xl lg:text-2xl mb-4">
            Data Kelompok
          </h1>
          <ul className="lg:text-lg">
            <li className="my-2 truncate">Nama : {group.name}</li>
            <li className="my-2 truncate">Ketua : {group.leader}</li>
            <li className="my-2 truncate">
              Lokasi :{" "}
              {group.village.lokasi != ""
                ? group.village.lokasi
                : "Belum ada desa"}
            </li>
            <li className="my-2 truncate">
              Pembimbing :{" "}
              {group.lecturer.id != ""
                ? group.lecturer.name
                : "Belum ada pembimbing"}
            </li>
          </ul>
        </div>

        <div className="overflow-x-scroll rounded-lg border border-gray-200 shadow-md mt-4">
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
                  Bahasa Madura
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {group.members.map((member: IStudent, index) => {
                return (
                  <tr className="hover:bg-gray-100" key={member.id}>
                    <td className="px-6 py-4 text-center">{index + 1}</td>
                    <td className="px-6 py-4">{member.id}</td>
                    <td className="px-6 py-4">{member.name}</td>
                    <td className="px-6 py-4">{member.prodi}</td>
                    <td className="px-6 py-4">{member.fakultas}</td>
                    <td className="px-6 py-4 text-center">
                      {member.maduraLang == "true" ? "Ya" : "Tidak"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* potential village section */}
        <div className="mt-16">
          <h1 className="font-bold text-2xl">Potensi Desa</h1>
          <div className="text-center px-5 mt-4 flex flex-col justify-center py-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-secondary  hover:bg-gray-100">
            {group.potential == "" ? (
              <p className="font-bold text-lg">
                Kelompok belum upload hasil potensi desa
              </p>
            ) : (
              <a
                href={`${process.env.BASE_URL}/static/potential/${group.potential}`}
                target="_blank"
                className="font-bold text-gray-500 hover:text-active break-words"
              >
                {group.potential}
              </a>
            )}
          </div>
        </div>

        {/* report section */}
        <div className="mt-16">
          <h1 className="font-bold text-2xl">Laporan</h1>
          <div className="text-center px-5 mt-4 flex flex-col justify-center py-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-secondary  hover:bg-gray-100">
            {group.report == "" ? (
              <p className="font-bold text-lg">
                Kelompok belum upload laporan akhir
              </p>
            ) : (
              <a
                href={`${process.env.BASE_URL}/static/report/${group.report}`}
                target="_blank"
                className="font-bold text-gray-500 hover:text-active break-words"
              >
                {group.report}
              </a>
            )}
          </div>
        </div>

        <div className="mt-16">
          {/* section description village */}
          <h1 className="font-bold text-2xl mb-4">Deskripsi Desa</h1>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 ">
            <div className="bg-gray-200 rounded-3xl">
              <h2 className="font-bold text-center text-xl bg-primary text-secondary rounded-t-3xl py-2">
                Strength
              </h2>
              <p className="px-8 py-4 text-justify leading-7">
                {group.village.strength}
              </p>
            </div>
            <div className="bg-gray-200 rounded-3xl">
              <h2 className="font-bold text-center text-xl bg-primary text-secondary rounded-t-3xl py-2">
                Weakness
              </h2>
              <p className="px-8 py-4 text-justify leading-7">
                {group.village.weakness}
              </p>
            </div>
            <div className="bg-gray-200 rounded-3xl">
              <h2 className="font-bold text-center text-xl bg-primary text-secondary rounded-t-3xl py-2">
                Oportunities
              </h2>
              <p className="px-8 py-4 text-justify leading-7">
                {group.village.oportunities}
              </p>
            </div>
            <div className="bg-gray-200 rounded-3xl">
              <h2 className="font-bold text-center text-xl bg-primary text-secondary rounded-t-3xl py-2">
                Threats
              </h2>
              <p className="px-8 py-4 text-justify leading-7">
                {group.village.threats}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h1 className="font-bold text-2xl mb-4">Program Kerja Anggota</h1>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {prokers.map((proker) => {
              return (
                <div
                  key={proker.studentId}
                  className="bg-gray-200 rounded-3xl "
                >
                  <div className="bg-primary text-secondary rounded-t-3xl p-4 lg:px-8">
                    <h2 className="font-bold lg:text-xl">{proker.name}</h2>
                    <h3 className="font-light text-sm lg:text-base">
                      {proker.studentId}, {proker.prodi}
                    </h3>
                  </div>
                  <p className="px-8 py-4 text-justify leading-7">
                    {group.village.strength}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </LecturerLayout>
  );
}
