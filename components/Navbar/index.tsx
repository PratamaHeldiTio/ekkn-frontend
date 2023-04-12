import Image from "next/image";
import logo from "../../public/logo.png";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="bg-primary p-4">
      <Image alt="lppm" src={logo} width={50} className="ml-8 inline-block" />
      <p className="text-xl font-bold ml-4 inline-block text-secondary">
        <span className="sm:hidden">EKKN Universitas Trunojoyo Madura</span>
        <span className="hidden sm:inline-block">EKKN UTM</span>
      </p>
      <button
        onClick={() => router.push("login")}
        type="button"
        className="rounded font-semibold px-4 py-2 float-right mt-1 mr-8 bg-secondary"
      >
        Login
      </button>
    </nav>
  );
}
