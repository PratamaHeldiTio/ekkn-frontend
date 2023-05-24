import axios from "axios";
import React from "react";
import {
  IGroupPage,
  mapToDetailGroup,
  mapToLecturerApprove,
  mapToProker,
} from "./detailGroup.types";
import dynamic from "next/dynamic";

const DetailGroup = dynamic(() => import("@/container/admin/DetailGroup"));

export default function DetailGroupPage({
  group,
  lecturers,
  prokers,
}: IGroupPage) {
  return <DetailGroup group={group} lecturers={lecturers} prokers={prokers} />;
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

  // get student registration
  const dataAPIStudentRegistration = await axios
    .get(`${process.env.BASE_URL_V1}/student/registration/group/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch(() => {
      return [];
    });

  const lecturers = mapToLecturerApprove(dataAPILecturer);
  const group = mapToDetailGroup(dataAPI);
  const prokers = mapToProker(dataAPIStudentRegistration);

  return {
    props: {
      group,
      lecturers,
      prokers,
    },
  };
}
