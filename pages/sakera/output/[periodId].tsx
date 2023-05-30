import axios from "axios";
import { IOutputPeriodPage, mapToGroup } from "./output.types";
import dynamic from "next/dynamic";

const OutputPeriod = dynamic(() => import("@/container/admin/OutputByPeriod"));

export default function OutputPeriodPage({ groups }: IOutputPeriodPage) {
  return <OutputPeriod groups={groups} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];
  const { periodId } = context.query;

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/group/registered/${periodId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data;
    });

  const groups = mapToGroup(dataAPI);

  return {
    props: {
      groups,
    },
  };
}
