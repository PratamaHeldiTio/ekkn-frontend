/* eslint-disable @next/next/no-img-element */
import { IHeader } from "./Header.types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

export default function Header({ navigations = [], role }: IHeader) {
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");
  const [profileImage, setProfile] = useState<string>("");

  useEffect(() => {
    if (role != "admin") {
      axios
        .get(`${process.env.BASE_URL_V1}/${role}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.data.profile != undefined) {
            setProfile(response.data.data.profile);
            return;
          }

          setProfile("");
        })
        .catch(() => setProfile(""));
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bg-secondary drop-shadow-lg lg:static lg:drop-shadow-none lg:rounded-3xl">
      <div className="grid grid-cols-4 justify-items-stretch px-8 place-items-center min-h-[5rem]">
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
        {role != "admin" && (
          <Link
            className="w-12 h-12 overflow-hidden justify-self-end cursor-pointer rounded-full"
            href={`/${role}/profile`}
          >
            <img
              alt="profile user"
              src={
                profileImage != ""
                  ? `${process.env.BASE_URL}/static/profile/${profileImage}`
                  : "/user.png"
              }
            />
          </Link>
        )}
      </div>
    </div>
  );
}
