import { StaticImageData } from "next/image";

export interface IHeader {
  navigations: INavigation[];
  image: StaticImageData;
}

export interface INavigation {
  title: string;
  link: string;
}
