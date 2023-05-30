import React from "react";
import dynamic from "next/dynamic";
import Alert from "@/components/Alert";
import { formatTimeUnix } from "@/helper";
import { IStudentRegistration, IStudentRegistrations } from "./History.types";
import { INavigation } from "@/components/Header/Header.types";

const StudentLayout = dynamic(() => import("@/layout/StudentLayout"));
export default function History({
  studentRegistrations,
}: IStudentRegistrations) {
  const navigations: INavigation[] = [
    {
      title: "Pendaftaran",
      link: "/student/register",
    },
    {
      title: "Riwayat",
      link: "/student/register/history",
      isActive: true,
    },
  ];
  return (
    <StudentLayout navigations={navigations}>
      <div className="mt-20 lg:mt-8">
        {studentRegistrations.map(
          (studentRegistration: IStudentRegistration) => {
            return (
              <div
                key={studentRegistration.studentRegistrationId}
                className="bg-secondary rounded-2xl mt-6 p-6 flex flex-col-reverse lg:grid lg:grid-cols-6 lg:items-center"
              >
                <div className="lg:col-span-4">
                  <h3 className="lg:text-xl font-bold mt-1">
                    Periode Semester {studentRegistration.semester}{" "}
                    {studentRegistration.tahunAjaran}
                  </h3>
                  <p className="font-light text-sm tracking-wide">
                    Tanggal pendaftaran{" "}
                    {formatTimeUnix(studentRegistration.createdAt)}
                  </p>
                </div>
                <div className="lg:w-40 w-32 lg:col-span-2 lg:justify-self-end text-sm lg:text-base">
                  {studentRegistration.status == "" ? (
                    <Alert
                      background="bg-warning"
                      message="Belum Validasi"
                      margin="my-0"
                      padding="p-1 lg:p-2"
                    />
                  ) : (
                    <Alert
                      background={
                        studentRegistration.status == "true"
                          ? "bg-success"
                          : "bg-danger"
                      }
                      message={
                        studentRegistration.status == "true"
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
    </StudentLayout>
  );
}
