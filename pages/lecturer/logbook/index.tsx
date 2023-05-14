import axios from "axios";
import dynamic from "next/dynamic";
import { ILogbookPage, mapToPeriod } from "./logbook.types";
const Logbook = dynamic(() => import("@/container/lecturer/Logbook"));

export default function LogbookPage({ periods }: ILogbookPage) {
  return <Logbook periods={periods} />;
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
