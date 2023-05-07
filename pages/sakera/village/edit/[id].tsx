import axios from "axios";
import { IEditVillagePage, mapToEditVillage } from "./editVillage.types";
import dynamic from "next/dynamic";
const EditVillage = dynamic(() => import("@/container/admin/EditVillage"));

export default function EditVillagePage({ village }: IEditVillagePage) {
  return <EditVillage village={village} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];
  const { id } = context.query;

  const dataAPI: any = await axios
    .get(`${process.env.BASE_URL_V1}/village/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data.data)
    .catch(() => null);

  console.log(dataAPI);
  const village = mapToEditVillage(dataAPI);

  return {
    props: {
      village,
    },
  };
}
