import router from "next/router";
import { useEffect } from "react";
import Cookies from "universal-cookie";

export default function LogoutPage() {
  useEffect(() => {
    const cookies = new Cookies();
    cookies.remove("AUTH_LGN");

    router.push("/");
  }, []);
}
