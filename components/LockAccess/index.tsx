import React from "react";
import Image from "next/image";
import lock from "@/public/lock.png";

export default function LockAcces() {
  return (
    <div>
      <Image alt="lock icon" src={lock} />
    </div>
  );
}
