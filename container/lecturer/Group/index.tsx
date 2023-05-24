import { IGroupPage, IPeriod } from "@/pages/lecturer/group/group.types";
import groupHero from "@/public/groupHero.jpg";
import dynamic from "next/dynamic";
const LecturerLayout = dynamic(() => import("@/layout/LecturerLayout"));
import Image from "next/image";
import Link from "next/link";

export default function Logbook({ periods }: IGroupPage) {
  return (
    <LecturerLayout
      navigations={[{ title: "Kelompok", link: "/lecturer/group" }]}
    >
      <div className="md:grid xl:grid-cols-2 md:gap-8 my-20 lg:my-8">
        {periods.map((period: IPeriod) => {
          return (
            <Link href={`/lecturer/group/${period.id}`} key={period.id}>
              <div className="bg-secondary rounded-3xl mb-6">
                <Image
                  alt="picture kelompok"
                  src={groupHero}
                  className="rounded-t-3xl max-h-60"
                />
                <p className="font-bold p-4 md:text-xl capitalize text-center">
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
