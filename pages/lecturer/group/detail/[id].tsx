import axios from "axios";
import { IGroupDetailPage, mapToDetailGroup } from "./detailGroup.types";
import dynamic from "next/dynamic";

const DetailGroup = dynamic(() => import("@/container/lecturer/DetailGroup"));

export default function DetailGroupPage({ group }: IGroupDetailPage) {
  return <DetailGroup group={group} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];
  const { id } = context.query;

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/group/${id}`, {
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

  const group = mapToDetailGroup(dataAPI);
  return {
    props: {
      group,
    },
  };
}
