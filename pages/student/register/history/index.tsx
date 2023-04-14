import React from "react";
import dynamic from "next/dynamic";
import axios from "axios";
const History = dynamic(() => import("@/container/History"));

export default function HistoryPage({ registeredStudents }: any) {
  return <History registeredStudents={registeredStudents} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const registeredStudents = await axios
    .get(`${process.env.BASE_URL_V1}/student_registration/student_id`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data;
    });

  return {
    props: {
      registeredStudents,
    },
  };
}
