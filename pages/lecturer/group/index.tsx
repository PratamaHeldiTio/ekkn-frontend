import axios from "axios";
import dynamic from "next/dynamic";
import { IGroupPage, mapToPeriod } from "./group.types";
const Group = dynamic(() => import("@/container/lecturer/Group"));

export default function GroupPage({ periods }: IGroupPage) {
  return <Group periods={periods} />;
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
