import { IAdminLayout } from "./AdminLayout.types";
import student from "@/public/student.png";
import register from "@/public/register.png";
// import logbook from "@/public/logbook.png";
// import output from "@/public/output.png";
import group from "@/public/group.png";
import SideLink from "@/components/SideLink";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
const SidebarLayout = dynamic(() => import("@/layout/SidebarLayout"));

export default function StudentLayout({
  children,
  navigations = [],
}: IAdminLayout) {
  return (
    <div className="lg:p-10 p-6 lg:grid lg:grid-cols-12 lg:min-h-screen">
      <div className="lg:col-span-4 xl:col-span-3">
        <SidebarLayout>
          <div className="grid grid-cols-5 p-3 lg:inline-block">
            <SideLink
              destination="student"
              icon={student}
              content="Mahasiswa"
              role="sakera"
            />
            <SideLink
              role="sakera"
              destination="registration/student"
              icon={register}
              content="Pendaftaran"
            />
            {/* 
            <SideLink destination="logbook" icon={logbook} content="Logbookk" />
            <SideLink destination="output" icon={output} content="Luaran" />
            <SideLink destination="group" icon={group} content="Kelompok" /> */}
          </div>
        </SidebarLayout>
      </div>
      <div className="lg:col-span-8 xl:col-span-9 lg:ml-12">
        <Header navigations={navigations} admin={true} />
        {children}
      </div>
    </div>
  );
}
