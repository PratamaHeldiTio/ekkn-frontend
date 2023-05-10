import axios from "axios";
import dynamic from "next/dynamic";
import { ILecturerPage, mapingDataToLecturers } from "./lecture.types";

const Lecturer = dynamic(() => import("@/container/admin/Lecturer"));

export default function LecturerPage({ lecturers }: ILecturerPage) {
  return <Lecturer lecturers={lecturers} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/lecturers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((response) => {
      if (response.response.data.code == 401) {
        return 401;
      }
    });

  if (dataAPI == 401) {
    return {
      redirect: {
        permanent: false,
        destination: "/sakera-login",
      },
    };
  }

  const lecturers = mapingDataToLecturers(dataAPI);

  return {
    props: {
      lecturers,
    },
  };
}
