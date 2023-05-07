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
      {periods.map((period: IPeriod) => {
        return (
          <Link href={`/sakera/village/${period.id}`} key={period.id}>
            <div className="bg-secondary rounded-3xl my-8">
              <Image
                alt="hero kelompok registration"
                src={villageHero}
                className="max-h-60 rounded-t-3xl w-full"
              />
              <p className="font-bold p-4 text-2xl ml-10 capitalize">
                Data Desa Periode Semester {period.semester}{" "}
                {period.tahunAjaran}
              </p>
            </div>
          </Link>
        );
      })}
    </AdminLayout>
  );
}
