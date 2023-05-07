import { formatUnixToDateHtml } from "@/helper";

export interface IEditPeriod {
  id: string;
  semester: string;
  tahunAjaran: string;
  start: string;
  end: string;
  periodStatus: string;
  studentRegistrationStatus: string;
  lectureRegistrationStatus: string;
  groupRegistrationStatus: string;
}

export interface IEditPeriodPage {
  period: IEditPeriod;
}

export const mapToEditPeriod = (dataAPI: any): IEditPeriod => {
  if (dataAPI == null) {
    const period: IEditPeriod = {
      id: "",
      semester: "",
      tahunAjaran: "",
      start: "",
      end: "",
      periodStatus: "",
      studentRegistrationStatus: "",
      lectureRegistrationStatus: "",
      groupRegistrationStatus: "",
    };

    return period;
  }

  const period: IEditPeriod = {
    id: dataAPI.id,
    semester: dataAPI.semester,
    tahunAjaran: dataAPI.tahun_ajaran,
    start: formatUnixToDateHtml(dataAPI.start),
    end: formatUnixToDateHtml(dataAPI.end),
    periodStatus: dataAPI.status,
    studentRegistrationStatus: dataAPI.student_registration_status,
    lectureRegistrationStatus: dataAPI.lecture_registration_status,
    groupRegistrationStatus: dataAPI.group_registration_status,
  };

  return period;
};
