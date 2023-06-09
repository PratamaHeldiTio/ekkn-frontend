/* eslint-disable @next/next/no-img-element */
import LockAcces from "@/components/LockAccess";
import { formatTimeUnix } from "@/helper";
import { IStudentLogbook } from "@/pages/lecturer/logbook/detail/[periodId]/detailStudentLogbook.types";
import dynamic from "next/dynamic";
const LecturerLayout = dynamic(() => import("@/layout/LecturerLayout"));
export default function DetailLogbook({
  group,
  logbooks,
  student,
}: IStudentLogbook) {
  if (group == null || group.status == "false") {
    return (
      <LecturerLayout
        navigations={[
          { title: "Kembali ", link: `/lecturer/logbook/group/${group.id}` },
        ]}
      >
        <LockAcces message="Tidak dapat menampilkan data ada suatu kesalahan" />
        ;
      </LecturerLayout>
    );
  }

  return (
    <LecturerLayout
      navigations={[
        { title: "Kembali ", link: `/lecturer/logbook/group/${group.id}` },
      ]}
    >
      <div className="bg-secondary rounded-3xl p-8 font-bold my-8 grid grid-cols-1 gap-1 tracking-wide">
        <h1>
          Nim: <span className="font-light">{student.nim}</span>
        </h1>
        <h1>
          Nama: <span className="font-light">{student.name}</span>
        </h1>
        <h1>
          Prodi: <span className="font-light">{student.prodi}</span>
        </h1>
        <h1>
          Kelompok: <span className="font-light"> {group.name}</span>
        </h1>
        <h1>
          Lokasi : <span className="font-light">{group.village}</span>
        </h1>
      </div>
      <div className="my-16 lg:my-8">
        <div className="6 mt-6">
          {logbooks.map((logbook: any) => {
            return (
              <div
                key={logbook.id}
                className="bg-secondary rounded-3xl p-12 lg:text-xl font-bold mt-8"
              >
                <h1>{formatTimeUnix(logbook.date).split(",")[0]}</h1>
                <p className="font-light text-sm">
                  Dikirim pada {formatTimeUnix(logbook.submitted)} WIB
                </p>
                <p className="font-light text-sm">
                  Dikirim pada radius {(logbook.radius / 1000).toFixed(2)} KM
                  dari pusat desa
                </p>
                <hr className="border-2 border-primary mt-2" />
                <p className="font-light text-lg mt-8 text-justify px-12">
                  {logbook.activity}
                </p>
                <a
                  href={`${process.env.BASE_URL}/static/logbook/${logbook.image}`}
                  target="_blank"
                >
                  <img
                    src={`${process.env.BASE_URL}/static/logbook/${logbook.image}`}
                    alt="Dokumentasi kegiatan"
                    className="mt-8 max-h-60 mx-auto"
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </LecturerLayout>
  );
}
