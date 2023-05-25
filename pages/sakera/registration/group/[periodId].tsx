import axios from "axios";
import dynamic from "next/dynamic";
import {
  IGroupRegistrationPage,
  mapToGroupRegistration,
} from "./groupRegistration.types";

const GroupRegistration = dynamic(
  () => import("@/container/admin/GroupRegistration")
);

export default function GroupRegistrationPage({
  groups,
}: IGroupRegistrationPage) {
  return <GroupRegistration groups={groups} />;
}

export async function getServerSideProps(context: any) {
  const { periodId } = context.query;
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/group/registered/${periodId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (response) => {
      return response.data.data;
    })
    .catch(() => {
      return [];
    });

  const groups = mapToGroupRegistration(dataAPI);

  return {
    props: {
      groups,
    },
  };
}
