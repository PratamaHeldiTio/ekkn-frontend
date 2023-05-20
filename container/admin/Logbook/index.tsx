import dynamic from "next/dynamic";
import logbookHero from "@/public/heroLogbook.jpg";
import Image from "next/image";
import Link from "next/link";
import { ILogbookPage, IPeriod } from "@/pages/sakera/logbook/logbook.types";

const AdminLayout = dynamic(() => import("@/layout/AdminLayout"));

export default function Logbook({ periods }: ILogbookPage) {
  return (
    <AdminLayout
      navigations={[{ title: "Daftar Logbook", link: "/sakera/logbook" }]}
    >
      <div className="grid grid-cols-2 gap-8 mt-8">
        {periods.map((period: IPeriod) => {
          return (
            <Link href={`/sakera/logbook/${period.id}`} key={period.id}>
              <div className="bg-secondary rounded-3xl">
                <Image
                  alt="hero kelompok registration"
                  src={logbookHero}
                  className="max-h-60 rounded-t-3xl w-full"
                />
                <p className="p-4 text-xl ml-4 capitalize">
                  data logbook periode {period.semester} {period.tahunAjaran}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </AdminLayout>
  );
}
