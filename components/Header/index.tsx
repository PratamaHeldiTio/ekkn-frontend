import Image from "next/image";
import { IHeader } from "./Header.types";
import Link from "next/link";

export default function Header({ navigations, image }: IHeader) {
  return (
    <div className="bg-secondary grid grid-cols-3 justify-items-stretch p-4 px-8 rounded-3xl place-items-center">
      <ul className="col-span-2 ">
        {navigations.map((nav) => {
          return (
            <Link
              href={nav.link}
              key={nav.title}
              className="inline-block mx-4 text-2xl font-bold"
            >
              {nav.title}
            </Link>
          );
        })}
      </ul>
      <Image alt="profile user" src={image} className="w-12 justify-self-end" />
    </div>
  );
}
