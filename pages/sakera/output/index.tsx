import axios from "axios";
import { IOutputPage, mapToPeriod } from "./output.types";
import dynamic from "next/dynamic";
const Output = dynamic(() => import("@/container/admin/Output"));

export default function OutputPage({ periods }: IOutputPage) {
  return <Output periods={periods} />;
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

  const periods = mapToPeriod(dataAPI);

  return {
    props: {
      periods,
    },
  };
}
