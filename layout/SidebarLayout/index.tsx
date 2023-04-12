import React from "react";
import Image from "next/image";
import logo from "../../public/logo.png";
import { ISidebar } from "./SidebarLayout";

export default function Sidebar({ children }: ISidebar) {
  return (
    <>
      <div className="bg-primary rounded-3xl h-full p-10">
        <Image
          alt="logo universitas trunojoyo madura"
          src={logo}
          className="w-20 mx-auto mt-5"
        />
        <h1 className="text-secondary text-xl font-bold my-5 text-center">
          EKKN Universitas Trunojoyo Madura
        </h1>
        <hr className="border-2 mb-5" />

        {children}
      </div>
    </>
  );
}
