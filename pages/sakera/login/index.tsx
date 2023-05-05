import React from "react";
import dynamic from "next/dynamic";
const LoginAdmin = dynamic(() => import("@/container/LoginAdmin"));

export default function Login() {
  return <LoginAdmin />;
}
