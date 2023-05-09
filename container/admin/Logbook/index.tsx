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
      {periods.map((period: IPeriod) => {
        return (
          <Link href={`/sakera/logbook/${period.id}`} key={period.id}>
            <div className="bg-secondary rounded-3xl my-8">
              <Image
                alt="hero kelompok registration"
                src={logbookHero}
                className="max-h-60 rounded-t-3xl w-full"
              />
              <p className="font-bold p-4 text-2xl ml-10 capitalize">
                data logbook periode {period.semester} {period.tahunAjaran}
              </p>
            </div>
          </Link>
        );
      })}
    </AdminLayout>
  );
}
