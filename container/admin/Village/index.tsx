import dynamic from "next/dynamic";
import villageHero from "@/public/villageHero.jpg";
import Image from "next/image";
import Link from "next/link";
import { IPeriod, IVillagePage } from "@/pages/sakera/village/village.types";
const AdminLayout = dynamic(() => import("@/layout/AdminLayout"));

export default function Village({ periods }: IVillagePage) {
  return (
    <AdminLayout
      navigations={[{ title: "Data Desa", link: "/sakera/village" }]}
    >
      <div className="grid grid-cols-2 gap-8 mt-8">
        {periods.map((period: IPeriod) => {
          return (
            <Link href={`/sakera/village/${period.id}`} key={period.id}>
              <div className="bg-secondary rounded-3xl">
                <Image
                  alt="hero kelompok registration"
                  src={villageHero}
                  className="max-h-60 rounded-t-3xl w-full"
                />
                <p className="p-4 text-xl ml-4 capitalize">
                  Data Desa Periode Semester {period.semester}{" "}
                  {period.tahunAjaran}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </AdminLayout>
  );
}
