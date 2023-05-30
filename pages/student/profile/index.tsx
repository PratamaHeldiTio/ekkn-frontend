import dynamic from "next/dynamic";
import axios from "axios";
import { IProfile, IStudent } from "./profile.types";
const Profile = dynamic(() => import("@/container/Profile"));
export default function ProfilePage({ student }: IProfile) {
  return <Profile student={student} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  const dataAPI: any = await axios
    .get(`${process.env.BASE_URL_V1}/student`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data.data);

  // map data to type student
  const student: IStudent = {
    nim: dataAPI.nim,
    name: dataAPI.name,
    prodi: dataAPI.prodi,
    fakultas: dataAPI.fakultas,
    gender: dataAPI.gender,
    maduraLang: dataAPI.madura_lang,
    profile: dataAPI.profile,
  };

  return {
    props: {
      student,
    },
  };
}
