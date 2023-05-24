import {
  ILogbookPeriodPage,
  IGroup,
} from "@/pages/lecturer/logbook/logbook.types";
import heroLogbook from "@/public/heroLogbook.jpg";
import dynamic from "next/dynamic";
const LecturerLayout = dynamic(() => import("@/layout/LecturerLayout"));
import Image from "next/image";
import Link from "next/link";

export default function LogbookByPeriod({ groups }: ILogbookPeriodPage) {
  return (
    <LecturerLayout
      navigations={[{ title: "Kembali", link: "/lecturer/logbook" }]}
    >
      <div className="my-20 lg:my-8 grid grid-cols-1 xl:grid-cols-2">
        {groups.map((group: IGroup) => {
          return (
            <Link href={`/lecturer/logbook/group/${group.id}`} key={group.id}>
              <div className="bg-secondary rounded-3xl mb-6">
                <Image
                  alt="picture logbook"
                  src={heroLogbook}
                  className="rounded-t-3xl max-h-60"
                />
                <div className="lg:p-8 p-4">
                  <p className="px-4 md:text-xl capitalize">
                    Kelompok: {group.name}
                  </p>
                  <p className="px-4 md:text-xl capitalize">
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
