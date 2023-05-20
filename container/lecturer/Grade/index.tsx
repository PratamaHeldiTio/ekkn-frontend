import { IGradePage, IPeriod } from "@/pages/lecturer/grade/grade.types";
import gradeHero from "@/public/gradeHero.jpg";
import dynamic from "next/dynamic";
const LecturerLayout = dynamic(() => import("@/layout/LecturerLayout"));
import Image from "next/image";
import Link from "next/link";

export default function Grade({ periods }: IGradePage) {
  return (
    <LecturerLayout
      navigations={[{ title: "Penilaian", link: "/lecturer/grade" }]}
    >
      <div className="md:grid md:grid-cols-2 md:gap-8 my-16 lg:my-8">
        {periods.map((period: IPeriod) => {
          return (
            <Link href={`/lecturer/grade/${period.id}`} key={period.id}>
              <div className="bg-secondary rounded-3xl mb-6">
                <Image
                  alt="picture logbook"
                  src={gradeHero}
                  className="rounded-t-3xl max-h-60"
                />
                <p className="font-bold p-4 md:text-xl">
                  Periode Semester {period.semester} {period.tahunAjaran}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </LecturerLayout>
  );
}
