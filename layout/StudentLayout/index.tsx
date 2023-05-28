import { IStudentLayout } from "./StudentLayout.types";
import register from "@/public/register.png";
import contract from "@/public/contract.png";
import logbook from "@/public/logbook.png";
import profile from "@/public/profile.png";
import group from "@/public/group.png";
import SideLink from "@/components/SideLink";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { decodeJWT } from "@/helper";
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
              role="student"
              destination="register"
              icon={register}
              content="Pendaftaran"
            />
            <SideLink
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
              destination="group"
              icon={group}
              content="Kelompok"
            />
            <div className="lg:hidden">
              <SideLink
                role="student"
                destination="profile"
                icon={profile}
                content="Akun"
              />
            </div>
          </div>
        </SidebarLayout>
      </div>
      <div className="lg:col-span-8 xl:col-span-9 lg:ml-12">
        <Header navigations={navigations} admin={false} role="student" />
        {children}
      </div>
    </div>
  );
}
