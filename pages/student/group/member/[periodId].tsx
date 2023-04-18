import React from "react";
import dynamic from "next/dynamic";
import axios from "axios";
const Member = dynamic(() => import("@/container/Member"));
export default function MemberPage({ group }: any) {
  return <Member group={group} />;
}

export async function getServerSideProps(context: any) {
  const { periodId } = context.query;
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/group/${periodId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch(() => {
      return null;
    });

  console.log(dataAPI);

  return {
    props: {
      group: dataAPI,
    },
  };
}
