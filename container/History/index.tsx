import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import user from "@/public/user.png";
import Alert from "@/components/Alert";
import { formatTimeUnix } from "@/helper";

const StudentLayout = dynamic(() => import("@/layout/StudentLayout"));
export default function History({ registeredStudents }: any) {
  return (
    <StudentLayout>
      <Header
        navigations={[
          {
            title: "Pendaftaran",
            link: "/student/register",
          },
          {
            title: "Riwayat",
            link: "/student/register/history",
          },
        ]}
        image={user}
      />
      {registeredStudents.map((registeredStudent: any) => {
        return (
          <div
            key={registeredStudent.student_registration_id}
            className="bg-secondary rounded-3xl mt-10 flex justify-between items-center py-3 px-8"
          >
            <div className="col-span-4">
              <h3 className="text-2xl font-bold mb-2">
                Periode Semester {registeredStudent.semester}{" "}
                {registeredStudent.tahun_ajaran}
              </h3>
              <p className="font-light tracking-wide">
                Tanggal pendaftaran{" "}
                {formatTimeUnix(registeredStudent.created_at)}
              </p>
            </div>
            <div className="w-40">
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
              />
            </div>
          </div>
        );
      })}
    </StudentLayout>
  );
}
