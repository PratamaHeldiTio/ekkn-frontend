import axios from "axios";
import dynamic from "next/dynamic";
import { IEditStudent, IStudent } from "./EditStduent.types";
const EditStudent = dynamic(() => import("@/container/admin/EditStudent"));
export default function EditStudentPage({ student }: IEditStudent) {
  return <EditStudent student={student} />;
}

export async function getServerSideProps(context: any) {
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];
  const { studentId } = context.query;

  const dataAPI: any = await axios
    .get(`${process.env.BASE_URL_V1}/student/${studentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data.data)
    .catch(() => null);

  // default value
  let student: IStudent = {
    nim: "",
    name: "",
    prodi: "",
    fakultas: "",
    gender: "",
    maduraLang: "",
  };

  if (dataAPI != null) {
    // map data to type student
    student = {
      nim: dataAPI.nim,
      name: dataAPI.name,
      prodi: dataAPI.prodi,
      fakultas: dataAPI.fakultas,
      gender: dataAPI.gender,
      maduraLang: dataAPI.madura_lang,
    };
  }

  return {
    props: {
      student,
    },
  };
}
