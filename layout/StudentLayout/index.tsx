import { IStudentLayout } from "./StudentLayout.types";
import register from "@/public/register.png";
import contract from "@/public/contract.png";
import logbook from "@/public/logbook.png";
import output from "@/public/output.png";
import group from "@/public/group.png";
import SideLink from "@/components/SideLink";
import dynamic from "next/dynamic";
const SidebarLayout = dynamic(() => import("@/layout/SidebarLayout"));

export default function StudentLayout({ children }: IStudentLayout) {
  return (
    <div className="lg:p-10 lg:grid lg:grid-cols-12 lg:min-h-screen">
      <div className="lg:col-span-4 xl:col-span-3">
        <SidebarLayout>
          <div className="grid grid-cols-5 p-3 lg:inline-block z-100">
            <SideLink
              destination="register"
              icon={register}
              content="Pendaftaran"
            />
            <SideLink destination="kki" icon={contract} content="KKI" />
            <SideLink destination="logbook" icon={logbook} content="Logbookk" />
            <SideLink destination="output" icon={output} content="Luaran" />
            <SideLink destination="group" icon={group} content="Kelompok" />
          </div>
        </SidebarLayout>
      </div>

      <div className="lg:col-span-8 xl:col-span-9 lg:ml-12">{children}</div>
    </div>
  );
}
