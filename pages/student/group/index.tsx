import React from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { mapingData } from "./group.types";
const Group = dynamic(() => import("@/container/Group"));

export default function GroupPage({ registeredStudents }: any) {
  return <Group registeredStudents={registeredStudents} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/student/registration/registered`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data;
    });

  const registeredStudents = mapingData(dataAPI);

  return {
    props: {
      registeredStudents,
    },
  };
}
