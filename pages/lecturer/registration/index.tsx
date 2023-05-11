import axios from "axios";
import dynamic from "next/dynamic";
import {
  ILecturer,
  IPeriod,
  IPeriodAPI,
  IRegistration,
} from "./registration.type";

const Registration = dynamic(() => import("@/container/lecturer/Registration"));
export default function RegistrationPage({ periods, lecturer }: IRegistration) {
  return <Registration periods={periods} lecturer={lecturer} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const [periodResponse, lecturerResponse]: any = await axios
    .all([
      axios.get(`${process.env.BASE_URL_V1}/period/lecturer/open`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get(`${process.env.BASE_URL_V1}/lecturer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ])
    .then(
      axios.spread((periodData, lecturerData) => {
        return [periodData.data.data, lecturerData.data.data];
      })
    );

  // map like type props in input select
  const periods: IPeriod[] = [];
  periodResponse.map((period: IPeriodAPI) => {
    const data = {
      id: period.period_id,
      value: `${period.semester} ${period.tahun_ajaran}`,
    };
    periods.push(data);
  });

  // map data to type lecturer
  const lecturer: ILecturer = {
    id: lecturerResponse.id,
    name: lecturerResponse.name,
    prodi: lecturerResponse.prodi,
    fakultas: lecturerResponse.fakultas,
    gender: lecturerResponse.gender,
    maduraLang: lecturerResponse.madura_lang,
    contact: lecturerResponse.contact,
  };

  return {
    props: {
      periods,
      lecturer,
    },
  };
}
