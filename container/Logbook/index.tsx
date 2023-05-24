import {
  IRegisteredStudent,
  IRegisteredStudents,
} from "@/pages/student/logbook/logbook.types";
import heroLogbook from "@/public/heroLogbook.jpg";
import dynamic from "next/dynamic";
const StudentLayout = dynamic(() => import("@/layout/StudentLayout"));
import Image from "next/image";
import Link from "next/link";

export default function Logbook({ registeredStudents }: IRegisteredStudents) {
  return (
    <StudentLayout
      navigations={[{ title: "Logbook", link: "/student/logbook" }]}
    >
      <div className="md:grid xl:grid-cols-2 md:gap-8 my-20 lg:my-8">
        {registeredStudents.map((registeredStudent: IRegisteredStudent) => {
          return (
            <Link
              href={`/student/logbook/${registeredStudent.periodId}`}
              key={registeredStudent.periodId}
            >
              <div className="bg-secondary rounded-3xl mb-6">
                <Image
                  alt="picture kelompok"
                  src={heroLogbook}
                  className="rounded-t-3xl max-h-60"
                />
                <p className="font-bold p-4 md:text-xl capitalize text-center">
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
