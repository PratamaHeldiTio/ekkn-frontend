import React from "react";
import dynamic from "next/dynamic";
const Member = dynamic(() => import("@/container/Member"));
export default function MemberPage() {
  return <Member />;
}
