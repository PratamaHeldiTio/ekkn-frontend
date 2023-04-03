import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="bg-gray-100 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="#" className="flex items-center">
          <Image alt="lppm" src={logo} width={30} className="mr-4" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            EKKN UTM
          </span>
        </Link>
        <div className="flex order-2">
          <button
            onClick={() => router.push("login")}
            type="button"
            className="text-white bg-blue rounded hover:bg-blue-dark focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium-lg text-sm px-4 py-2 text-center mr-3"
          >
            Login
          </button>
        </div>
        <div
          className="items-center justify-between sm:hidden flex w-auto order-1"
          id="navbar-cta"
        >
          <ul className="flex font-medium p-4 border-gray-100-lg flex-row space-x-8 mt-0 border-0">
            <li>
              <Link
                href="#"
                className="block text-gray-900 p-0 hover:text-blue-dark"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block text-gray-900 hover:text-blue-dark p-0"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block text-gray-900 hover:text-blue-dark p-0"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block text-gray-900 hover:text-blue-dark p-0"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
