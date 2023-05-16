import dynamic from "next/dynamic";
import axios from "axios";
import {
  ILogbookByGroupPage,
  mapToLogbookByGroup,
} from "./logbookByGroup.types";

const LogbookByGroup = dynamic(
  () => import("@/container/lecturer/LogbookByGroup")
);

export default function LogbookByGroupPage({
  students,
  periodId,
}: ILogbookByGroupPage) {
  return <LogbookByGroup students={students} periodId={periodId} />;
}

export async function getServerSideProps(context: any) {
  const { groupId } = context.query;
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/group/${groupId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (response) => {
      return response.data.data;
    });

  const students = mapToLogbookByGroup(dataAPI);

  return {
    props: {
      students,
      periodId: dataAPI.period_id,
    },
  };
}
