import React from "react";
import dynamic from "next/dynamic";
import Alert from "@/components/Alert";
import { formatTimeUnix } from "@/helper";
import { INavigation } from "@/components/Header/Header.types";
import {
  ILecturerRegistrationHistories,
  ILecturerRegistrationHistory,
} from "@/pages/lecturer/registration/history/history.types";

const LecturerLayout = dynamic(() => import("@/layout/LecturerLayout"));
export default function History({
  lecturerRegistrationHistories,
}: ILecturerRegistrationHistories) {
  const navigations: INavigation[] = [
    {
      title: "Pendaftaran",
      link: "/lecturer/registration",
    },
    {
      title: "Riwayat",
      link: "/lecturer/registration/history",
      isActive: true,
    },
  ];
  return (
    <LecturerLayout navigations={navigations}>
      <div className="mt-20 lg:mt-8">
        {lecturerRegistrationHistories.map(
          (lecturerRegistrationHistory: ILecturerRegistrationHistory) => {
            return (
              <div
                key={lecturerRegistrationHistory.id}
                className="bg-secondary rounded-2xl mt-6 py-6 px-8 flex flex-col-reverse lg:grid lg:grid-cols-6 lg:items-center"
              >
                <div className="lg:col-span-4">
                  <h3 className="lg:text-xl font-bold mt-1">
                    Periode Semester {lecturerRegistrationHistory.semester}{" "}
                    {lecturerRegistrationHistory.tahunAjaran}
                  </h3>
                  <p className="font-light text-sm tracking-wide">
                    Tanggal pendaftaran{" "}
                    {formatTimeUnix(lecturerRegistrationHistory.createdAt)}
                  </p>
                </div>
                <div className="lg:w-40 w-32 lg:col-span-2 lg:justify-self-end text-sm lg:text-base">
                  {lecturerRegistrationHistory.status == "" ? (
                    <Alert
                      background="bg-warning"
                      message="Belum Validasi"
                      margin="my-0"
                      padding="p-1 lg:p-2"
                    />
                  ) : (
                    <Alert
                      background={
                        lecturerRegistrationHistory.status == "true"
                          ? "bg-success"
                          : "bg-danger"
                      }
                      message={
                        lecturerRegistrationHistory.status == "true"
                          ? "Diterima"
                          : "Ditolak"
                      }
                      margin="my-0"
                      padding="p-1 lg:p-2"
                    />
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>
    </LecturerLayout>
  );
}
