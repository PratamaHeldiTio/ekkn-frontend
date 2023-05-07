import axios from "axios";
import dynamic from "next/dynamic";
import {
  IEditPeriod,
  IEditPeriodPage,
  mapToEditPeriod,
} from "./editPeriod.types";

const EditPeriod = dynamic(() => import("@/container/admin/EditPeriod"));
export default function EditPeriodPage({ period }: IEditPeriodPage) {
  return <EditPeriod period={period} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];
  const { id } = context.query;

  const dataAPI: any = await axios
    .get(`${process.env.BASE_URL_V1}/period/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data.data)
    .catch(() => null);

  const period = mapToEditPeriod(dataAPI);

  return {
    props: {
      period,
    },
  };
}
