import React from "react";
import Image from "next/image";
import lock from "@/public/lock.png";
import { ILockAccess } from "./LockAccess.types";

export default function LockAcces({ message }: ILockAccess) {
  return (
    <div className="grid grid-cols-1 place-items-center leading mt-40">
      <div className="w-60 lg:w-80">
        <Image alt="lock icon" src={lock} className="w-40 mx-auto" />
        <p className="font-bold text-center">{message}</p>
      </div>
    </div>
  );
}
