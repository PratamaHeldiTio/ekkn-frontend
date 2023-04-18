import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import profile from "@/public/user.png";
import Image from "next/image";
import heroGroup from "@/public/bgGroup.png";
import Link from "next/link";
import { IRegisteredStudent, IRegisteredStudents } from "./Group.types";
const StudentLayout = dynamic(() => import("@/layout/StudentLayout"));
export default function Group({ registeredStudents }: IRegisteredStudents) {
  const navigations = [
    {
      title: "Kelompok",
      link: "/student/group",
    },
  ];
  return (
    <StudentLayout navigations={navigations}>
      <div className="md:grid md:grid-cols-2 md:gap-8 my-16 lg:my-8">
        {registeredStudents.map((registeredStudent: IRegisteredStudent) => {
          return (
            <Link
              href={`/student/group/member/${registeredStudent.periodId}`}
              key={registeredStudent.periodId}
            >
              <div className="bg-secondary rounded-3xl mb-6">
                <Image
                  alt="picture kelompok"
                  src={heroGroup}
                  className="rounded-t-3xl"
                />
                <p className="font-bold p-4 md:text-xl">
                  Periode Semester {registeredStudent.semester}{" "}
                  {registeredStudent.tahunAjaran}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </StudentLayout>
  );
}
