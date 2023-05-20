import axios from "axios";
import {
  IGroupDetailPage,
  mapToDetailGroup,
  mapToProker,
} from "./detailGroup.types";
import dynamic from "next/dynamic";

const DetailGroup = dynamic(() => import("@/container/lecturer/DetailGroup"));

export default function DetailGroupPage({ group, prokers }: IGroupDetailPage) {
  return <DetailGroup group={group} prokers={prokers} />;
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

  // get student registration
  const dataAPIStudentRegistration = await axios
    .get(`${process.env.BASE_URL_V1}/student/registration/group/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch(() => {
      return [];
    });

  const group = mapToDetailGroup(dataAPI);
  const prokers = mapToProker(dataAPIStudentRegistration);
  return {
    props: {
      group,
      prokers,
    },
  };
}
