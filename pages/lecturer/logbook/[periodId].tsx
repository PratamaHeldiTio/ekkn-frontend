import axios from "axios";
import dynamic from "next/dynamic";
import {
  ILogbookPeriodPage,
  mapToGroupByPeriodLecturer,
} from "./logbook.types";

const LogbookByPeriod = dynamic(
  () => import("@/container/lecturer/LogbookByPeriod")
);

export default function LogbookPage({ groups }: ILogbookPeriodPage) {
  return <LogbookByPeriod groups={groups} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];
  const { periodId } = context.query;

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/group/lecturer/${periodId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data;
    });

  console.log(dataAPI);
  const groups = mapToGroupByPeriodLecturer(dataAPI);

  return {
    props: {
      groups,
    },
  };
}
