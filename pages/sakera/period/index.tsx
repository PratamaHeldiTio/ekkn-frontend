import axios from "axios";
import dynamic from "next/dynamic";
import { IPeriodPage, mapingDataToPeriods } from "./period.types";

const Period = dynamic(() => import("@/container/admin/Period"));
export default function PeriodPage({ periods }: IPeriodPage) {
  return <Period periods={periods} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/period`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data;
    });

  const periods = mapingDataToPeriods(dataAPI);

  return {
    props: {
      periods,
    },
  };
}
