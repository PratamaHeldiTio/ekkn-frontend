import InputField from "@/components/InputField";
import axios from "axios";
import React from "react";
import { mapingData } from "./logbook.types";
import dynamic from "next/dynamic";
const Logbook = dynamic(() => import("@/container/Logbook"));

export default function LogbookPage({ registeredStudents }: any) {
  return <Logbook registeredStudents={registeredStudents} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/student/registered`, {
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
