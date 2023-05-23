import { IOutputPage, IPeriod } from "@/pages/sakera/output/output.types";
import outputHero from "@/public/outputHero.jpg";
import dynamic from "next/dynamic";
const AdminLayout = dynamic(() => import("@/layout/AdminLayout"));
import Image from "next/image";
import Link from "next/link";

export default function Output({ periods }: IOutputPage) {
  return (
    <AdminLayout navigations={[{ title: "Penilaian", link: "/sakera/output" }]}>
      <div className="md:grid md:grid-cols-2 md:gap-8 my-16 lg:my-8">
        {periods.map((period: IPeriod) => {
          return (
            <Link href={`/sakera/output/${period.id}`} key={period.id}>
              <div className="bg-secondary rounded-3xl mb-6">
                <Image
                  alt="picture logbook"
                  src={outputHero}
                  className="rounded-t-3xl max-h-60"
                />
                <p className="font-bold py-4 px-8 md:text-xl capitalize text-center">
                  Periode Semester {period.semester} {period.tahunAjaran}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </AdminLayout>
  );
}
