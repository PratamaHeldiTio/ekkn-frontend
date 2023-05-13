import axios from "axios";
import React from "react";
import {
  IGroupPage,
  mapToDetailGroup,
  mapToLecturerApprove,
} from "./detailGroup.types";
import dynamic from "next/dynamic";

const DetailGroup = dynamic(() => import("@/container/admin/DetailGroup"));

export default function DetailGroupPage({ group, lecturers }: IGroupPage) {
  return <DetailGroup group={group} lecturers={lecturers} />;
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

  // get period
  const dataAPILecturer = await axios
    .get(
      `${process.env.BASE_URL_V1}/lecturer/registration/approve/${dataAPI.period_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      return response.data.data;
    })
    .catch(() => {
      return [];
    });

  const lecturers = mapToLecturerApprove(dataAPILecturer);
  const group = mapToDetailGroup(dataAPI);
  console.log(dataAPI);
  return {
    props: {
      group,
      lecturers,
    },
  };
}
