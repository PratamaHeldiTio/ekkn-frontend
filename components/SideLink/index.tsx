import Link from "next/link";
import { ISideLink } from "./SideLink.types";
import Image from "next/image";

export default function SideLink({
  destination,
  icon,
  content,
  role,
}: ISideLink) {
  return (
    <Link
      href={`/${role}/${destination}`}
      className="lg:flex lg:items-center lg:my-6"
    >
      <Image
        alt={`icon ${content}`}
        src={icon}
        className="w-6 lg:w-8 lg:mx-0 mx-auto"
      />
      <h3 className="text-xs text-center font-light mt-1 lg:text-xl lg:text-left lg:font-semibold text-secondary lg:ml-4 lg:mt-0">
        {content}
      </h3>
    </Link>
  );
}
