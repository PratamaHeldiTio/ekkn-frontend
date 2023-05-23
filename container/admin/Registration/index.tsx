import dynamic from "next/dynamic";
import studentHero from "@/public/studentHero.jpg";
import lecturerHero from "@/public/lecturerHero.jpg";
import groupHero from "@/public/groupHero.jpg";
import Image from "next/image";
import Link from "next/link";
const AdminLayout = dynamic(() => import("@/layout/AdminLayout"));
import {
  IPeriod,
  IRegistration,
} from "@/pages/sakera/registration/registration.types";
import { useState } from "react";

export default function Regitration({ periods }: IRegistration) {
  const [currentPage, setCurrentPage] = useState("Mahasiswa");

  return (
    <AdminLayout
      navigationState={["Mahasiswa", "Dosen", "Kelompok"]}
      setPage={setCurrentPage}
      page={currentPage}
    >
      <div className="mt-8 grid grid-cols-2 gap-8">
        {currentPage == "Mahasiswa" &&
          periods.map((period: IPeriod) => {
            return (
              <Link
                href={`/sakera/registration/student/${period.id}`}
                key={period.id}
              >
                <div className="bg-secondary rounded-3xl">
                  <div className="max-h-52 overflow-hidden">
                    <Image
                      alt="hero mahasiswa registration"
                      src={studentHero}
                      className="rounded-t-3xl"
                    />
                  </div>

                  <p className="font-bold text-center p-4 px-8 text-xl capitalize">
                    Pendaftaran Mahasiswa Periode Semester {period.semester}{" "}
                    {period.tahunAjaran}
                  </p>
                </div>
              </Link>
            );
          })}

        {currentPage == "Dosen" &&
          periods.map((period: IPeriod) => {
            return (
              <Link
                href={`/sakera/registration/lecturer/${period.id}`}
                key={period.id}
              >
                <div className="bg-secondary rounded-3xl">
                  <div className="max-h-52 overflow-hidden">
                    <Image
                      alt="hero dosen registration"
                      src={lecturerHero}
                      className="rounded-t-3xl"
                    />
                  </div>
                  <p className="font-bold text-center p-4 px-8 text-xl capitalize">
                    Pendaftaran DPL Periode Semester {period.semester}{" "}
                    {period.tahunAjaran}
                  </p>
                </div>
              </Link>
            );
          })}

        {currentPage == "Kelompok" &&
          periods.map((period: IPeriod) => {
            return (
              <Link
                href={`/sakera/registration/group/${period.id}`}
                key={period.id}
              >
                <div className="bg-secondary rounded-3xl">
                  <div className="max-h-52 overflow-hidden">
                    <Image
                      alt="hero kelompok registration"
                      src={groupHero}
                      className="rounded-t-3xl bg-cover"
                    />
                  </div>
                  <p className="font-bold text-center p-4 px-8 text-xl capitalize">
                    Pendaftaran Kelompok Periode Semester {period.semester}{" "}
                    {period.tahunAjaran}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </AdminLayout>
  );
}
