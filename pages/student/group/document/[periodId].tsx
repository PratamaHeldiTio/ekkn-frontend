import { decodeJWT } from "@/helper";
import axios from "axios";
import React from "react";
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
  const [dataGroup, dataVillage]: any = await axios.all([
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
      .get(`${process.env.BASE_URL_V1}/village`, {
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
  const villages: IVillage[] = [];
  dataVillage.map((village: any) => {
    if (village.status == "false") {
      villages.push(ToVillageFromAPI(village));
    }
  });

  if (dataGroup == null) {
    return {
      props: {
        group: null,
        village: villages,
      },
    };
  }

  const group = ToGroupFromAPI(dataGroup);

  return {
    props: {
      group,
      villages,
    },
  };
}
