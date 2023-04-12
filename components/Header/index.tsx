import Image from "next/image";
import { IHeader } from "./Header.types";

export default function Header({ links, image }: IHeader) {
  return (
    <div className="bg-secondary grid grid-cols-3 justify-items-stretch p-4 px-8 rounded-3xl place-items-center">
      <ul className="col-span-2 ">
        {links.map((link) => {
          return (
            <li key={link} className="inline-block mx-4 text-2xl font-bold">
              {link}
            </li>
          );
        })}
      </ul>
      <Image alt="profile user" src={image} className="w-12 justify-self-end" />
    </div>
  );
}
