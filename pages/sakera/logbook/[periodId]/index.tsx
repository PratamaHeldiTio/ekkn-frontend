import dynamic from "next/dynamic";
import { ILogbookByPeriodPage, mapToLogbookByPeriod } from "../logbook.types";
import axios from "axios";

const LogbookByPeriod = dynamic(
  () => import("@/container/admin/LogbookByPeriod")
);

export default function LogbookByPeriodPage({
  students,
}: ILogbookByPeriodPage) {
  return <LogbookByPeriod students={students} />;
}

export async function getServerSideProps(context: any) {
  const { periodId } = context.query;
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/student/registrations/${periodId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (response) => {
      return response.data.data;
    });

  const students = mapToLogbookByPeriod(dataAPI);

  return {
    props: {
      students,
    },
  };
}
