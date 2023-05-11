import { IStudentLayout } from "./StudentLayout.types";
import register from "@/public/register.png";
import contract from "@/public/contract.png";
import logbook from "@/public/logbook.png";
import output from "@/public/output.png";
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
          <div className="grid grid-cols-5 p-3 lg:inline-block">
            <SideLink
              role="lecturer"
              destination="registration"
              icon={register}
              content="Pendaftaran"
            />
            {/* <SideLink
              role="student"
              destination="kki"
              icon={contract}
              content="KKI"
            />
            <SideLink
              role="student"
              destination="logbook"
              icon={logbook}
              content="Logbookk"
            />
            <SideLink
              role="student"
              destination="output"
              icon={output}
              content="Luaran"
            />
            <SideLink
              role="student"
              destination="group"
              icon={group}
              content="Kelompok"
            /> */}
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
