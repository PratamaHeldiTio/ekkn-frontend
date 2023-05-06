import axios from "axios";
import dynamic from "next/dynamic";
import {
  IStudentRegistration,
  IStudentRegistrationPage,
  mapToStudentRegistration,
} from "./studentRegistration.types";

const StudentRegistration = dynamic(
  () => import("@/container/admin/StudentRegistration")
);

export default function StudentRegistrationPage({
  registration,
}: IStudentRegistrationPage) {
  return <StudentRegistration registration={registration} />;
}

export async function getServerSideProps(context: any) {
  const { periodId } = context.query;
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/student/registrations/${periodId}`, {
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

  const registration = mapToStudentRegistration(dataAPI);

  return {
    props: {
      registration,
    },
  };
}
