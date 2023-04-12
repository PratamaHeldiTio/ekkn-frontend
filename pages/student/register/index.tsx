import axios from "axios";
import dynamic from "next/dynamic";
import { IPeriod, IRegister, IStudent } from "./register.type";
import { decodeJWT } from "@/helper";

const Register = dynamic(() => import("@/container/Register"));
export default function RegisterPage({ periods, student }: IRegister) {
  return <Register periods={periods} student={student} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  let response = await axios
    .get(`${process.env.BASE_URL_V1}/period`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  // map like type props in input select
  const periods: IPeriod[] = [];
  response.data.map((res: any) => {
    const data = {
      id: res.id_period,
      value: `${res.semester} ${res.tahun_ajaran}`,
    };
    periods.push(data);
  });

  // parse token get nim
  const nim = decodeJWT(token).id;

  // get user by nim
  response = await axios
    .get(`${process.env.BASE_URL_V1}/student/${nim}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });

  // map data to type student
  const student: IStudent = {
    nim: response.nim,
    name: response.name,
    prodi: response.prodi,
    fakultas: response.fakultas,
    gender: response.gender,
    maduraLang: response.madura_lang,
  };

  return {
    props: {
      periods,
      student,
    },
  };
}
