import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="bg-primary text-white p-4">
      <Image alt="lppm" src={logo} width={50} className="ml-8 inline-block" />
      <p className="text-xl font-bold ml-4 inline-block">
        <span className="sm:hidden">EKKN Universitas Trunojoyo Madura</span>
        <span className="hidden sm:inline-block">EKKN UTM</span>
      </p>
      <button
        onClick={() => router.push("login")}
        type="button"
        className="text-primary bg-white rounded font-semibold px-4 py-2 float-right mt-1 mr-8"
      >
        Login
      </button>
    </nav>
  );
}
