import axios from "axios";
import dynamic from "next/dynamic";
import { IDetailKKIPage, mapToStudentProker } from "./kki.types";
const DetailKKI = dynamic(() => import("@/container/DetailKKI"));

export default function DetailKKIPage({ studentProker }: IDetailKKIPage) {
  return <DetailKKI studentProker={studentProker} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];
  const { id } = context.query;

  // get student registration
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/student/registration/by_id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (response) => {
      return response.data.data;
    })
    .catch(() => {
      return null;
    });

  const studentProker = mapToStudentProker(dataAPI);
  return {
    props: {
      studentProker,
    },
  };
}
