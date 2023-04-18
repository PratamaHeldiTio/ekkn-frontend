import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import user from "@/public/user.png";
import Alert from "@/components/Alert";
import { formatTimeUnix } from "@/helper";

const StudentLayout = dynamic(() => import("@/layout/StudentLayout"));
export default function History({ registeredStudents }: any) {
  const navigations = [
    {
      title: "Pendaftaran",
      link: "/student/register",
    },
    {
      title: "Riwayat",
      link: "/student/register/history",
    },
  ];
  return (
    <StudentLayout navigations={navigations}>
      <div className="mt-12 p-4 lg:p-0">
        {registeredStudents.map((registeredStudent: any) => {
          return (
            <div
              key={registeredStudent.student_registration_id}
              className="bg-secondary rounded-3xl mt-6 py-3 px-8 flex flex-col-reverse lg:grid lg:grid-cols-6 lg:items-center"
            >
              <div className="lg:col-span-4">
                <h3 className="lg:text-xl font-bold mt-1">
                  Periode Semester {registeredStudent.semester}{" "}
                  {registeredStudent.tahun_ajaran}
                </h3>
                <p className="font-light tracking-wide">
                  Tanggal pendaftaran{" "}
                  {formatTimeUnix(registeredStudent.created_at)}
                </p>
              </div>
              <div className="lg:w-40 w-32 lg:col-span-2 lg:justify-self-end text-sm lg:text-base">
                <Alert
                  background={
                    registeredStudent.status == "true"
                      ? "bg-active"
                      : "bg-warning"
                  }
                  message={
                    registeredStudent.status == "true"
                      ? "Terdaftar"
                      : "Belum Validasi"
                  }
                  margin="my-0"
                  padding="p-1 lg:p-2"
                />
              </div>
            </div>
          );
        })}
      </div>
    </StudentLayout>
  );
}
