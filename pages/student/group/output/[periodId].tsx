import axios from "axios";
import dynamic from "next/dynamic";
import { IOutputPage, toMapOutput } from "./output.types";

const Output = dynamic(() => import("@/container/Output"));

export default function OutputPage({ groupId, outputs }: IOutputPage) {
  return <Output groupId={groupId} outputs={outputs} />;
}

export async function getServerSideProps(context: any) {
  const { periodId } = context.query;
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const groupId = await axios
    .get(`${process.env.BASE_URL_V1}/group/leader/${periodId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (response) => {
      return response.data.data.id;
    })
    .catch(() => {
      return null;
    });

  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/output/group/${groupId}`, {
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

  const outputs = toMapOutput(dataAPI);

  return {
    props: {
      groupId,
      outputs,
    },
  };
}
