import { useState } from "react";
import Image from "next/image";
import utm from "../../public/utm.png";
import logo from "../../public/logo.png";
import Link from "next/link";
import axios from "axios";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import InputField from "@/components/InputField";
import { IInputValue } from "./Login.types";
import Alert from "@/components/Alert";
import InputSubmit from "../InputSubmit";

export default function LoginComp() {
  const [inputvalue, setInputValue] = useState<IInputValue>({
    nim: "",
    password: "",
  });
  const { nim, password } = inputvalue;
  const [role, setRole] = useState("student");
  const [alert, setAlert] = useState(false);
  const cookies = new Cookies();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`${process.env.BASE_URL_V1}/auth/${role}/login`, {
        nim,
        password,
      })
      .then((response) => {
        const responseData = response.data;

        // set cookie
        cookies.set("AUTH_LGN", responseData.data.access_token, {
          maxAge: 3600,
        });

        router.replace("/student/activity");
      })
      .catch(() => {
        setAlert(true);
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
    <div className="w-full h-screen flex items-center sm:bg-slate-200">
      {/* root bg */}
      <div className="w-3/6 h-full bg-[#60A5FA] inline-block absolute sm:hidden" />
      <div className="w-3/6 h-full bg-primary inline-block absolute ml-1/2 sm:hidden" />

      {/* wrapper bg */}
      <div className="w-900 h-600 relative z-10 mx-auto sm:bg-slate-200 my-auto rounded-2xl flex flex-row sm:block">
        {/* part left */}
        <div className="basis-7/12 text-center sm:w-11/12 mx-auto rounded-2xl">
          <div className="w-9/12 p-8 sm:p-4 mx-auto">
            <Image
              alt="logo universitas trunojoyo madura"
              src={logo}
              className="w-20 mx-auto"
            />
            <h1 className="text-2xl font-bold mt-5">Welcome Back</h1>
            {alert && (
              <Alert
                background="bg-danger-bg"
                border="border-danger-border"
                message="Data yang anda masukan salah"
              />
            )}
            {/* input */}
            <form onSubmit={handleLogin}>
              <div className="bg-slate-200 font-bold w-32 h-10 leading-10 rounded-lg my-5 mx-auto">
                <select
                  id="role"
                  className="bg-transparent"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="student">Mahasiswa</option>
                  <option value="lecture">Dosen</option>
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
              <InputSubmit value="Login" />
            </form>

            <p className="mt-3 mb-14 font-semibold">
              Kembali ke{" "}
              <Link href="/" className="text-colorHover">
                beranda
              </Link>
            </p>
          </div>
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
