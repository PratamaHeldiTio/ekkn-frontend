import axios from "axios";
import dynamic from "next/dynamic";
import { IGradePeriodPage, mapToGroup } from "./grade.types";

const GradeByPeriod = dynamic(() => import("@/container/admin/GradeByPeriod"));

export default function GradePage({ groups }: IGradePeriodPage) {
  return <GradeByPeriod groups={groups} />;
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
