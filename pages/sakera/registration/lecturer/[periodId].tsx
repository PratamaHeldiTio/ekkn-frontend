import axios from "axios";
import dynamic from "next/dynamic";
import {
  ILecturerRegistrationPage,
  mapToLecturerRegistration,
} from "./lecturerRegistration.types";

const LecturerRegistration = dynamic(
  () => import("@/container/admin/LecturerRegistration")
);

export default function LecturerRegistrationPage({
  registration,
}: ILecturerRegistrationPage) {
  return <LecturerRegistration registration={registration} />;
}

export async function getServerSideProps(context: any) {
  const { periodId } = context.query;
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/lecturer/registration/${periodId}`, {
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

  const registration = mapToLecturerRegistration(dataAPI);

  return {
    props: {
      registration,
    },
  };
}
