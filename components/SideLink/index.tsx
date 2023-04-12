import Link from "next/link";
import { ISideLink } from "./SideLink.types";
import Image from "next/image";

export default function SideLink({ destination, icon, content }: ISideLink) {
  return (
    <Link href={`/student/${destination}`} className="flex items-center">
      <Image alt={`icon ${content}`} src={icon} className="w-8 mx-4 my-3" />
      <h3 className="text-xl font-semibold text-secondary col-span-3">
        {content}
      </h3>
    </Link>
  );
}
