import React, { useState } from "react";
import Image from "next/image";
import utm from "../../public/utm.png";
import logo from "../../public/logo.png";
import Link from "next/link";
import axios from "axios";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import InputField from "@/components/InputField";
import { IInputValue } from "./Login.types";

export default function LoginComp() {
  const [inputvalue, setInputValue] = useState<IInputValue>({
    nim: "",
    password: "",
  });
  const { nim, password } = inputvalue;
  const [role, setRole] = useState("students");
  const [errLogin, setErrLogin] = useState(false);
  const cookies = new Cookies();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${process.env.BASE_URL}/api/v1/auth/${role}/login`, {
        nim,
        password,
      })
      .then((response) => {
        const responseData = response.data;

        // set cookie
        cookies.set("AUTH_LGN", responseData.data.access_token, {
          maxAge: 3600,
        });

        router.push("/student/activity");
        console.log("first");
      })
      .catch(() => {
        setErrLogin(!errLogin);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          <h1 className="text-2xl font-bold mt-5">Welcome Back</h1>
          {errLogin && (
            <p className="border-2 text-sm border-rose-600 bg-rose-200 rounded-lg py-2 m-4 px-4 w-fit mx-auto">
              Id atau password anda salah
            </p>
          )}
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

            <InputField
              type="text"
              name="nim"
              value={nim}
              placeholder="Masukan NIM"
              onChange={handleChange}
              required={true}
            />
            <InputField
              type="password"
              name="password"
              value={password}
              placeholder="Masukan Password"
              onChange={handleChange}
              required={true}
            />
            <InputField
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
