import dynamic from "next/dynamic";

const Login = dynamic(() => import("@/container/Login"));

export default function LoginPage() {
  return <Login />;
}
