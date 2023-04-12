import { StaticImageData } from "next/image";

export interface ISideLink {
  destination: string;
  icon: StaticImageData;
  content: string;
}
