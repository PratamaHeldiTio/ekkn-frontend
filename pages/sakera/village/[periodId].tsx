import axios from "axios";
import dynamic from "next/dynamic";
import { IVillageByPeriodPage, mapDataToVillages } from "./village.types";

const VillageByPeriod = dynamic(
  () => import("@/container/admin/VillageByPeriod")
);
export default function VillageByPeriodPage({
  villages,
}: IVillageByPeriodPage) {
  return <VillageByPeriod villages={villages} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];
  const { periodId } = context.query;

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/village/period/${periodId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data;
    });

  const villages = mapDataToVillages(dataAPI);

  return {
    props: {
      villages,
    },
  };
}
