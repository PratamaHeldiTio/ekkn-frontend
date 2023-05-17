import { IGroupByPeriodPage, IGroup } from "@/pages/lecturer/group/group.types";
import groupHero from "@/public/groupHero.jpg";
import dynamic from "next/dynamic";
const LecturerLayout = dynamic(() => import("@/layout/LecturerLayout"));
import Image from "next/image";
import Link from "next/link";

export default function LogbookByPeriod({ groups }: IGroupByPeriodPage) {
  return (
    <LecturerLayout
      navigations={[{ title: "Kembali", link: "/lecturer/group" }]}
    >
      <div className="md:gap-8 my-20 lg:my-8">
        {groups.map((group: IGroup) => {
          return (
            <Link href={`/lecturer/group/detail/${group.id}`} key={group.id}>
              <div className="bg-secondary rounded-3xl mb-6">
                <Image
                  alt="picture logbook"
                  src={groupHero}
                  className="rounded-t-3xl max-h-60"
                />
                <div className="lg:p-8 p-4">
                  <p className="font-bold px-4 md:text-xl capitalize">
                    Nama Kelompok: {group.name}
                  </p>
                  <p className="font-bold px-4 md:text-xl capitalize">
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
