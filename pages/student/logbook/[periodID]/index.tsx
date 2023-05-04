import axios from "axios";
import { ILogbookDetail, mapToGroup } from "./detailLogbook.types";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
const LogbookDetail = dynamic(() => import("@/container/DetailLogbook"));

export default function LogbookDetailPage({ group, logbooks }: ILogbookDetail) {
  return <LogbookDetail group={group} logbooks={logbooks} />;
}

export async function getServerSideProps(context: any) {
  const { periodID } = context.query;
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const dataAPIGroup = await axios
    .get(`${process.env.BASE_URL_V1}/student/registration/${periodID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (response) => {
      const groupId = response.data.data.group;
      const group = await axios
        .get(`${process.env.BASE_URL_V1}/group/${groupId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          return response.data.data;
        });
      return group;
    })
    .catch(() => {
      return null;
    });

  const logbooks = await axios
    .get(`${process.env.BASE_URL_V1}/logbooks/${periodID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const logbooks: any = [];
      response.data.data.map((data: any) => {
        const logbook = {
          id: data.id,
          date: data.date,
          activity: data.activity,
          image: data.image,
          submitted: data.submitted,
        };
        logbooks.push(logbook);
      });

      return logbooks;
    })
    .catch(() => []);

  if (dataAPIGroup == null) {
    return {
      props: {
        group: null,
        logbooks: [],
      },
    };
  }

  const group = mapToGroup(dataAPIGroup);
  return {
    props: {
      group,
      logbooks,
    },
  };
}
