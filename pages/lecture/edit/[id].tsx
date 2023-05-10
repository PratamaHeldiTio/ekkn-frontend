import axios from "axios";
import dynamic from "next/dynamic";
import { IEditLecturerPage, mapToEditLecturer } from "./EditStduent.types";
const EditLecturer = dynamic(() => import("@/container/admin/EditLecturer"));
export default function EditStudentPage({ lecturer }: IEditLecturerPage) {
  return <EditLecturer lecturer={lecturer} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];
  const { id } = context.query;

  const dataAPI: any = await axios
    .get(`${process.env.BASE_URL_V1}/lecturer/${id}`, {
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
