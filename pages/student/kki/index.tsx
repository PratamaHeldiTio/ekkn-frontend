import dynamic from "next/dynamic";
import { IKKI, mapingData } from "./kki.types";
import axios from "axios";

const KKI = dynamic(() => import("@/container/KKI"));
export default function KKIPage({ registeredStudents }: IKKI) {
  return <KKI registeredStudents={registeredStudents} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/student/registered`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data;
    });

  const registeredStudents = mapingData(dataAPI);

  return {
    props: {
      registeredStudents,
    },
  };
}
