import axios from "axios";
import { IStudentLogbook, mapToGroup } from "./studentLogbook.types";
import dynamic from "next/dynamic";
const StudentLogbook = dynamic(
  () => import("@/container/admin/StudentLogbook")
);

export default function StudentLogbookPage({
  group,
  logbooks,
  student,
}: IStudentLogbook) {
  return <StudentLogbook group={group} logbooks={logbooks} student={student} />;
}

export async function getServerSideProps(context: any) {
  const { periodId, studentId } = context.query;
  // get token from cookies
  const token = context.req.cookies["AUTH_LGN"];

  // get period
  const dataAPIGroup = await axios
    .get(
      `${process.env.BASE_URL_V1}/student/registration/${periodId}/${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(async (response) => {
      const groupId = response.data.data.group;
      const group = await axios
        .get(`${process.env.BASE_URL_V1}/group/${groupId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          return response.data.data;
        });
      return group;
    })
    .catch(() => {
      return null;
    });

  const logbooks = await axios
    .get(`${process.env.BASE_URL_V1}/logbook/${periodId}/${studentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const logbooks: any = [];
      response.data.data.map((data: any) => {
        const logbook = {
          id: data.id,
          nim: data.student_id,
          name: data.name,
          prodi: data.prodi,
          date: data.date,
          activity: data.activity,
          image: data.image,
          radius: data.radius,
          submitted: data.submitted,
        };
        logbooks.push(logbook);
      });

      return logbooks;
    })
    .catch(() => []);

  const student = await axios
    .get(`${process.env.BASE_URL_V1}/student/${studentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const student = {
        nim: response.data.data.nim,
        name: response.data.data.name,
        prodi: response.data.data.prodi,
      };
      return student;
    });

  const group = mapToGroup(dataAPIGroup);
  return {
    props: {
      group,
      logbooks,
      student,
    },
  };
}
