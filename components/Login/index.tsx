import React, { useEffect, useState } from "react";
import Image from "next/image";
import utm from "../../public/utm.png";
import logo from "../../public/logo.png";
import arrow from "../../public/arrow.svg";
import Link from "next/link";

export default function LoginComp() {
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    console.log("cel");
  }

  return (
    <div className="w-full h-screen flex items-center">
      {/* root bg */}
      <div className="w-3/6 h-full bg-[#60A5FA] inline-block absolute sm:hidden" />
      <div className="w-3/6 h-full bg-[#19376D] inline-block absolute ml-1/2 sm:hidden" />

      {/* wrapper bg */}
      <div className="w-900 h-600 relative z-10 bg-white mx-auto my-auto rounded-2xl flex flex-row sm:inline-block">
        {/* part left */}
        <div className="basis-7/12 flex flex-col items-center">
          <Image
            alt="logo universitas trunojoyo madura"
            src={logo}
            className="w-20 mt-20"
          />
          <h1 className="text-3xl mt-5">Welcome Back</h1>

          {/* input */}
          <div className="bg-gray-200 w-32 h-10 leading-10 text-center rounded-lg mt-5">
            <select id="role" className="bg-transparent">
              <option value="student">Mahasiswa</option>
              <option value="lecture">Dosen</option>
            </select>
          </div>

          <input
            type="text"
            name="nim"
            placeholder="Masukan NIM"
            className="w-60 h-10 p-5 border-2 border-grey-900 rounded-lg my-5"
            onChange={(e) => setNim(e.target.value)}
          />
          <input
            type="text"
            name="password"
            placeholder="Masukan Password"
            className="w-60 h-10 p-5 border-2 border-grey-900 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-60 h-10 bg-blue hover:bg-blue-dark text-white rounded-lg my-5"
            onClick={handleLogin}
          >
            Login
          </button>
          <p className="w-fit">
            Kembali ke{" "}
            <Link href="/" className="text-blue">
              beranda
            </Link>
          </p>
        </div>

        {/* part right */}
        <div className="basis-8/12 sm:hidden">
          <Image
            alt="universitas trunojoyo madura"
            src={utm}
            className="w-full h-full rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
}
