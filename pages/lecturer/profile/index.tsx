import axios from "axios";
import dynamic from "next/dynamic";
import { IProfilePage, mapToEditLecturer } from "./profile.types";
const Profile = dynamic(() => import("@/container/lecturer/Profile"));
export default function EditStudentPage({ lecturer }: IProfilePage) {
  return <Profile lecturer={lecturer} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  const dataAPI: any = await axios
    .get(`${process.env.BASE_URL_V1}/lecturer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data.data)
    .catch(() => null);

  const lecturer = mapToEditLecturer(dataAPI);

  return {
    props: {
      lecturer,
    },
  };
}
