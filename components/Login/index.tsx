import React, { useState } from "react";
import Image from "next/image";
import utm from "../../public/utm.png";
import logo from "../../public/logo.png";
import Link from "next/link";
import axios from "axios";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";

export default function LoginComp() {
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("students");
  const cookies = new Cookies();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${process.env.BASE_URL}/api/v1/auth/${role}/login`, {
        nim,
        password,
      })
      .then(function (response) {
        const responseData = response.data;

        // set cookie
        cookies.set("AUTH_LGN", responseData.data.access_token, {
          maxAge: 3600,
        });

        router.push("/student/activity");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="w-full h-screen flex items-center sm:bg-gray-200">
      {/* root bg */}
      <div className="w-3/6 h-full bg-[#60A5FA] inline-block absolute sm:hidden" />
      <div className="w-3/6 h-full bg-[#19376D] inline-block absolute ml-1/2 sm:hidden" />

      {/* wrapper bg */}
      <div className="w-900 h-600 relative z-10 bg-white mx-auto sm:bg-gray-200 my-auto rounded-2xl flex flex-row sm:block">
        {/* part left */}
        <div className="basis-7/12 text-center sm:w-11/12 mx-auto rounded-2xl sm:bg-white">
          <Image
            alt="logo universitas trunojoyo madura"
            src={logo}
            className="w-20 pt-12 mx-auto"
          />
          <h1 className="text-3xl mt-5">Welcome Back</h1>

          {/* input */}
          <form onSubmit={handleLogin}>
            <div className="bg-gray-200 w-32 h-10 leading-10 rounded-lg my-5 mx-auto">
              <select
                id="role"
                className="bg-transparent"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="students">Mahasiswa</option>
                <option value="lectures">Dosen</option>
              </select>
            </div>

            <input
              type="text"
              name="nim"
              placeholder="Masukan NIM"
              className="w-60 h-10 p-5 border-2 border-grey-900 rounded-lg my-3"
              onChange={(e) => setNim(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Masukan Password"
              className="w-60 h-10 p-5 border-2 border-grey-900 rounded-lg my-3 block mx-auto"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="submit"
              value="Login"
              className="w-60 h-10 bg-blue hover:bg-blue-dark text-white rounded-lg my-5"
            />
          </form>

          <p className="p-12 mt-3">
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
