import dynamic from "next/dynamic";
import axios from "axios";
import { decodeJWT } from "@/helper";
const Member = dynamic(() => import("@/container/Member"));

export default function MemberPage({ group, leader }: any) {
  return <Member group={group} leader={leader} />;
}

export async function getServerSideProps(context: any) {
  const { periodId } = context.query;
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];
  const currentStudent = decodeJWT(token);

  // get period
  const group = await axios
    .get(`${process.env.BASE_URL_V1}/student/registration/${periodId}`, {
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

  return {
    props: {
      group,
      leader: currentStudent.id,
    },
  };
}
