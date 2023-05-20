import axios from "axios";
import React from "react";
import { IGradeByGroupPage, mapToGradeByGroup } from "../grade.types";
import dynamic from "next/dynamic";
const GradeByGroup = dynamic(() => import("@/container/lecturer/GradeByGroup"));
export default function GradeByGroupPage({
  studentRegistrations,
  periodId,
}: IGradeByGroupPage) {
  return (
    <GradeByGroup
      periodId={periodId}
      studentRegistrations={studentRegistrations}
    />
  );
}

export async function getServerSideProps(context: any) {
  const { groupId } = context.query;
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/student/registration/group/${groupId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (response) => {
      return response.data.data;
    });

  const studentRegistrations = mapToGradeByGroup(dataAPI);

  return {
    props: {
      studentRegistrations,
      periodId: dataAPI[0].period_id,
    },
  };
}
