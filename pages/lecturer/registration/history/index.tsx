import React from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { ILecturerRegistrationHistories, mapingData } from "./history.types";
const History = dynamic(() => import("@/container/lecturer/History"));

export default function HistoryLecturerRegistrationPage({
  lecturerRegistrationHistories,
}: ILecturerRegistrationHistories) {
  return (
    <History lecturerRegistrationHistories={lecturerRegistrationHistories} />
  );
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/lecturer/registration/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data;
    });

  const lecturerRegistrationHistories = mapingData(dataAPI);
  return {
    props: {
      lecturerRegistrationHistories,
    },
  };
}
