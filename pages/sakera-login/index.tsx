import React from "react";
import dynamic from "next/dynamic";
const Login = dynamic(() => import("@/container/Admin/Login"));

export default function LoginPage() {
  return <Login />;
}
