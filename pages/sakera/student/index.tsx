import axios from "axios";
import dynamic from "next/dynamic";
import { IStudentPage, mapingDataToStudents } from "./student.types";
const Student = dynamic(() => import("@/container/admin/Student"));

export default function StudentPage({ students }: IStudentPage) {
  return <Student students={students} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/students`, {
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

  const students = mapingDataToStudents(dataAPI);

  return {
    props: {
      students,
    },
  };
}
