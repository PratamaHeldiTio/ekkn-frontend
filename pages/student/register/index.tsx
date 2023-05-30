import axios from "axios";
import dynamic from "next/dynamic";
import { IPeriod, IPeriodAPI, IRegister, IStudent } from "./register.type";

const Register = dynamic(() => import("@/container/Register"));
export default function RegisterPage({ periods, student }: IRegister) {
  return <Register periods={periods} student={student} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const [periodResponse, studentResponse]: any = await axios
    .all([
      axios.get(`${process.env.BASE_URL_V1}/period/student/open`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get(`${process.env.BASE_URL_V1}/student`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ])
    .then(
      axios.spread((periodData, studentData) => {
        return [periodData.data.data, studentData.data.data];
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

  // map data to type student
  const student: IStudent = {
    nim: studentResponse.nim,
    name: studentResponse.name,
    prodi: studentResponse.prodi,
    fakultas: studentResponse.fakultas,
    gender: studentResponse.gender,
    maduraLang: studentResponse.madura_lang,
  };

  return {
    props: {
      periods,
      student,
    },
  };
}
