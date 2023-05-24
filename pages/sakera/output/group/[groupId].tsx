import axios from "axios";
import dynamic from "next/dynamic";
import { IOutputGroupPage, mapToDetailGroup, toOutput } from "../output.types";
const OutputGroup = dynamic(() => import("@/container/admin/OutputByGroup"));
export default function OutputGroupPage({ outputs, group }: IOutputGroupPage) {
  return <OutputGroup outputs={outputs} group={group} />;
}

export async function getServerSideProps(context: any) {
  const { groupId } = context.query;
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/output/group/${groupId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (response) => {
      return response.data.data;
    });

  // get group
  const groupAPI = await axios
    .get(`${process.env.BASE_URL_V1}/group/${groupId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (response) => {
      return response.data.data;
    });

  const outputs = toOutput(dataAPI);
  const group = mapToDetailGroup(groupAPI);
  console.log(outputs);
  console.log(group);

  return {
    props: {
      outputs,
      group,
    },
  };
}
