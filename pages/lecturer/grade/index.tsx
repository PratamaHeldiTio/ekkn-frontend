import axios from "axios";
import dynamic from "next/dynamic";
import { IGradePage, mapToPeriod } from "./grade.types";
const Grade = dynamic(() => import("@/container/lecturer/Grade"));

export default function GradePage({ periods }: IGradePage) {
  return <Grade periods={periods} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/lecturer/registration/approve`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data;
    });

  const periods = mapToPeriod(dataAPI);

  return {
    props: {
      periods,
    },
  };
}
