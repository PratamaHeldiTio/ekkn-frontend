import React from "react";
import Image from "next/image";
import logo from "../../public/logo.png";
import { ISidebar } from "./SidebarLayout";

export default function Sidebar({ children }: ISidebar) {
  return (
    <>
      <div className="bg-primary fixed bottom-0 right-0 left-0 border-t-2 border-secondary/25 lg:static lg:rounded-3xl lg:min-h-full lg:p-10">
        <div className="hidden lg:block">
          <Image
            alt="logo universitas trunojoyo madura"
            src={logo}
            className="w-20 mx-auto mt-5 "
          />
          <h1 className="text-secondary lg:text-xl font-bold my-5 lg:text-center">
            EKKN Universitas Trunojoyo Madura
          </h1>
          <hr className="border-2" />
        </div>

        {children}
      </div>
    </>
  );
}
