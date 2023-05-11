import Image from "next/image";
import { IHeader } from "./Header.types";
import Link from "next/link";
import userImage from "@/public/user.png";
import { useRouter } from "next/router";

export default function Header({ navigations = [], admin, role }: IHeader) {
  const router = useRouter();
  return (
    <div className="fixed top-0 left-0 right-0 bg-secondary drop-shadow-lg lg:static lg:drop-shadow-none lg:rounded-3xl">
      <div className="grid grid-cols-4 justify-items-stretch p-3 lg:p-4 px-8 lg:px-12 place-items-center min-h-[5rem]">
        <ul className="col-span-3">
          {navigations.map((nav) => {
            return (
              <Link
                href={nav.link}
                key={nav.title}
                className={`mr-8 lg:text-xl xl:text-2xl font-bold hover:text-active ${
                  nav.isActive && "text-active"
                }`}
              >
                {nav.title}
              </Link>
            );
          })}
        </ul>
        {admin == false && (
          <Image
            alt="profile user"
            src={userImage}
            className="w-10 lg:w-12 justify-self-end cursor-pointer"
            onClick={() => router.push(`/${role}/profile`)}
          />
        )}
      </div>
    </div>
  );
}
