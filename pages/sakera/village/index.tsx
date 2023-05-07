import axios from "axios";
import dynamic from "next/dynamic";
import React from "react";
import { IVillagePage, mapToPeriod } from "./village.types";
const Village = dynamic(() => import("@/container/admin/Village"));

export default function VillagePage({ periods }: IVillagePage) {
  return <Village periods={periods} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/period`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data;
    });

  const periods = mapToPeriod(dataAPI);

  return {
    props: {
      periods,
    },
  };
}
