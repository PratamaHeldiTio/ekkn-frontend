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
import InputSubmit from "@/components/InputSubmit";

export default function LoginComp() {
  const [inputvalue, setInputValue] = useState<IInputValue>({
    id: "",
    password: "",
  });
  const { id, password } = inputvalue;
  const [role, setRole] = useState("student");
  const [alert, setAlert] = useState(false);
  const cookies = new Cookies();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`${process.env.BASE_URL_V1}/auth/${role}/login`, {
        id,
        password,
      })
      .then((response) => {
        const responseData = response.data;

        // set cookie
        cookies.set("AUTH_LGN", responseData.data.access_token, {
          maxAge: 3600,
        });

        if (role == "student") {
          router.replace("/student/profile");
        }

        if (role == "lecturer") {
          router.replace("/lecturer/profile");
        }
      })
      .catch(() => {
        setAlert(!alert);
        setTimeout(() => {
          setAlert((prev) => !prev);
        }, 3000);
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
    <div className="p-8 md:p-x-32 min-h-screen flex items-center text-center lg:p-0">
      <div className="lg:absolute lg:bg-[#60A5FA] lg:min-w-[50%] lg:min-h-full z-[-1]" />
      <div className="lg:absolute lg:bg-primary lg:left-[50%] lg:min-w-[50%] lg:min-h-full z-[-1]" />
      <div className="bg-secondary px-8 py-16 md:p-20 rounded-3xl m-auto lg:p-0 lg:grid lg:grid-cols-12 lg:max-w-4xl">
        <div className="lg:col-span-6 lg:px-16 lg:py-9">
          <Image
            alt="logo universitas trunojoyo madura"
            src={logo}
            className="w-20 mx-auto"
          />
          <h1 className="text-2xl font-bold mt-5">Welcome Back</h1>
          {alert && (
            <Alert
              background="bg-danger"
              message="Data yang anda masukan salah"
            />
          )}
          <form onSubmit={handleLogin}>
            <div className="bg-slate-200 font-bold w-32 h-10 leading-10 rounded-lg my-5 mx-auto">
              <select
                id="role"
                className="bg-transparent"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Mahasiswa</option>
                <option value="lecturer">Dosen</option>
              </select>
            </div>

            <InputField
              type="text"
              name="id"
              value={id}
              placeholder={"Masukan NIM / NIP"}
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
            <div className="h-10">
              <InputSubmit value="Login" />
            </div>
          </form>
          <p className="mt-8 font-semibold">
            Kembali ke{" "}
            <Link href="/" className="text-active">
              beranda
            </Link>
          </p>
        </div>
        <div className="lg:col-span-6 hidden lg:block">
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
