import { ILecturerLayout } from "./LecturerLayout.types";
import register from "@/public/register.png";
import grade from "@/public/grade.png";
import logbook from "@/public/logbook.png";
import group from "@/public/group.png";
import profile from "@/public/profile.png";
import SideLink from "@/components/SideLink";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
const SidebarLayout = dynamic(() => import("@/layout/SidebarLayout"));

export default function StudentLayout({
  children,
  navigations = [],
}: ILecturerLayout) {
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
            <SideLink
              role="lecturer"
              destination="logbook"
              icon={logbook}
              content="Logbook"
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
            <div className="lg:hidden">
              <SideLink
                role="lecturer"
                destination="profile"
                icon={profile}
                content="Akun"
              />
            </div>
          </div>
        </SidebarLayout>
      </div>
      <div className="lg:col-span-8 xl:col-span-9 lg:ml-12">
        <Header navigations={navigations} role="lecturer" />
        {children}
      </div>
    </div>
  );
}
