import axios from "axios";
import { ILogbookDetail, mapToGroup } from "./detailLogbook.types";
import dynamic from "next/dynamic";
const LogbookDetail = dynamic(() => import("@/container/DetailLogbook"));

export default function LogbookDetailPage({ group }: ILogbookDetail) {
  return <LogbookDetail group={group} />;
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

  if (dataAPIGroup == null) {
    return {
      props: {
        group: null,
      },
    };
  }

  const group = mapToGroup(dataAPIGroup);

  return {
    props: {
      group,
    },
  };
}
