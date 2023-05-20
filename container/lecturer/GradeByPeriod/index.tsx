import { IGradePeriodPage, IGroup } from "@/pages/lecturer/grade/grade.types";
import gradeHero from "@/public/gradeHero.jpg";
import dynamic from "next/dynamic";
const LecturerLayout = dynamic(() => import("@/layout/LecturerLayout"));
import Image from "next/image";
import Link from "next/link";

export default function GradeByPeriod({ groups }: IGradePeriodPage) {
  return (
    <LecturerLayout
      navigations={[{ title: "Kembali", link: "/lecturer/grade" }]}
    >
      <div className="xl:grid xl:grid-cols-2 my-20 lg:my-8">
        {groups.map((group: IGroup) => {
          return (
            <Link href={`/lecturer/grade/group/${group.id}`} key={group.id}>
              <div className="bg-secondary rounded-3xl mb-6">
                <Image
                  alt="picture logbook"
                  src={gradeHero}
                  className="rounded-t-3xl max-h-60"
                />
                <div className="lg:p-8 p-4">
                  <p className="font-ligth px-4 capitalize">
                    Kelompok: {group.name}
                  </p>
                  <p className="font-ligth px-4 capitalize">
                    Lokasi: {group.location}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </LecturerLayout>
  );
}
