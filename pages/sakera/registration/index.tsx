import axios from "axios";
import dynamic from "next/dynamic";
import { IPeriod, IRegistration, mapToPeriod } from "./registration.types";

const Registration = dynamic(
  () => import("@/container/admin/Registration/index")
);

export default function StudentRegistrationPage({ periods }: IRegistration) {
  return <Registration periods={periods} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const dataAPI = await axios
    .get(`${process.env.BASE_URL_V1}/period`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data;
    });

  const periods: IPeriod[] = [];
  dataAPI.map((data: any) => periods.push(mapToPeriod(data)));

  return {
    props: {
      periods,
    },
  };
}
