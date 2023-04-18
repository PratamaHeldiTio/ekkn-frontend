import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import profile from "@/public/user.png";
import Image from "next/image";
import heroGroup from "@/public/bgGroup.png";
import Link from "next/link";
const StudentLayout = dynamic(() => import("@/layout/StudentLayout"));
export default function Group({ registeredStudents }: any) {
  const navigations = [
    {
      title: "Kelompok",
      link: "/student/group",
    },
  ];
  return (
    <StudentLayout navigations={navigations}>
      <div className="md:grid md:grid-cols-2 md:gap-8 mt-12 p-10 lg:p-0 lg:mt-10">
        {registeredStudents.map((registeredStudent: any) => {
          return (
            <Link
              href={`/student/group/member/${registeredStudent.period_id}`}
              key={registeredStudent.period_id}
              className="bg-secondary rounded-3xl mb-6 drop-shadow-lg"
            >
              <Image
                alt="picture kelompok"
                src={heroGroup}
                className="rounded-t-3xl"
              />
              <p className="font-bold p-4 md:text-xl">
                Periode Semester {registeredStudent.Semester}{" "}
                {registeredStudent.tahun_ajaran}
              </p>
            </Link>
          );
        })}
      </div>
    </StudentLayout>
  );
}
