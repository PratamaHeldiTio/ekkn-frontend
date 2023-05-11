import React from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { mapingData } from "./history.types";
const History = dynamic(() => import("@/container/History"));

export default function HistoryPage({ studentRegistrations }: any) {
  return <History studentRegistrations={studentRegistrations} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/student/registration`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data;
    });

  const studentRegistrations = mapingData(dataAPI);
  return {
    props: {
      studentRegistrations,
    },
  };
}
