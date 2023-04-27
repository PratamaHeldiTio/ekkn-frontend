import React from "react";
import Image from "next/image";
import lock from "@/public/lock.png";

export default function LockAcces() {
  return (
    <div className="grid grid-cols-1 place-items-center leading mt-40">
      <div className="w-60">
        <Image alt="lock icon" src={lock} className="w-40 mx-auto" />
        <p className="font-bold text-center">
          Anda tidak dapat mengakses ini silahkan kembali
        </p>
      </div>
    </div>
  );
}
