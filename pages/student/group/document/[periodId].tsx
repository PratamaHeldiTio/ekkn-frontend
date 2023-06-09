import axios from "axios";
import {
  IDocumentPage,
  IVillage,
  ToGroupFromAPI,
  ToVillageFromAPI,
} from "./document.types";
import dynamic from "next/dynamic";
const Document = dynamic(() => import("@/container/Document"));

export default function DocumentPage({ group, villages }: IDocumentPage) {
  return <Document group={group} villages={villages} />;
}

export async function getServerSideProps(context: any) {
  const { periodId } = context.query;
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  let [dataGroup, dataVillage]: any = await axios.all([
    await axios
      .get(`${process.env.BASE_URL_V1}/group/leader/${periodId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        return response.data.data;
      })
      .catch(() => {
        return null;
      }),

    await axios
      .get(`${process.env.BASE_URL_V1}/village/period/${periodId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        return response.data.data;
      })
      .catch(() => {
        return null;
      }),
  ]);

  // map data villages

  if (dataVillage == null) {
    dataVillage = [
      {
        id: "",
        value: "",
      },
    ];
  }

  const villages: IVillage[] = [];
  dataVillage.map((village: any) => {
    if (village.status == "false") {
      villages.push(ToVillageFromAPI(village));
    }
  });

  const group = ToGroupFromAPI(dataGroup);

  return {
    props: {
      group: group,
      villages,
    },
  };
}
