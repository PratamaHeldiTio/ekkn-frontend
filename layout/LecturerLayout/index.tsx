import { IStudentLayout } from "./StudentLayout.types";
import register from "@/public/register.png";
import grade from "@/public/grade.png";
import logbook from "@/public/logbook.png";
import group from "@/public/group.png";
import SideLink from "@/components/SideLink";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
const SidebarLayout = dynamic(() => import("@/layout/SidebarLayout"));

export default function StudentLayout({
  children,
  navigations = [],
}: IStudentLayout) {
  return (
    <div className="lg:p-10 p-6 lg:grid lg:grid-cols-12 lg:min-h-screen">
      <div className="lg:col-span-4 xl:col-span-3">
        <SidebarLayout>
          <div className="grid grid-cols-4 p-3 lg:inline-block">
            <SideLink
              role="lecturer"
              destination="registration"
              icon={register}
              content="Pendaftaran"
            />
            <SideLink
              role="lecturer"
              destination="logbook"
              icon={logbook}
              content="Logbookk"
            />
            <SideLink
              role="lecturer"
              destination="group"
              icon={group}
              content="Kelompok"
            />
            <SideLink
              role="lecturer"
              destination="grade"
              icon={grade}
              content="Penilaian"
            />
          </div>
        </SidebarLayout>
      </div>
      <div className="lg:col-span-8 xl:col-span-9 lg:ml-12">
        <Header navigations={navigations} admin={false} role="lecturer" />
        {children}
      </div>
    </div>
  );
}
