import dynamic from "next/dynamic";
import Image from "next/image";
import contractHero from "@/public/contractHero.jpg";
import Link from "next/link";
import { IKKI, IRegisteredStudent } from "@/pages/student/kki/kki.types";
const StudentLayout = dynamic(() => import("@/layout/StudentLayout"));
export default function KKIPage({ registeredStudents }: IKKI) {
  const navigations = [
    {
      title: "Kontrak Kinerja Individu",
      link: "/student/kki",
    },
  ];
  return (
    <StudentLayout navigations={navigations}>
      <div className="md:grid xl:grid-cols-2 md:gap-8 my-20 lg:my-8">
        {registeredStudents.map((registeredStudent: IRegisteredStudent) => {
          return (
            <Link
              href={`/student/kki/${registeredStudent.id}`}
              key={registeredStudent.periodId}
            >
              <div className="bg-secondary rounded-3xl mb-6">
                <div className="max-h-52 overflow-hidden">
                  <Image
                    alt="picture kelompok"
                    src={contractHero}
                    className="rounded-t-3xl"
                  />
                </div>
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
