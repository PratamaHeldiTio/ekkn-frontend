export interface IPeriod {
  id: string;
  semester: string;
  tahunAjaran: string;
  start: number;
  end: number;
  status: string;
  studentRegistrationStatus: string;
  lectureRegistrationStatus: string;
  groupRegistrationStatus: string;
}

export interface IPeriodPage {
  periods: IPeriod[];
}

export const mapingDataToPeriods = (dataAPI: any): IPeriod[] => {
  const students: IPeriod[] = [];
  dataAPI.forEach((data: any) => {
    students.push({
      id: data.id,
      semester: data.semester,
      tahunAjaran: data.tahun_ajaran,
      start: data.start,
      end: data.end,
      status: data.status,
      studentRegistrationStatus: data.student_registration_status,
      lectureRegistrationStatus: data.lecture_registration_status,
      groupRegistrationStatus: data.group_registration_status,
    });
  });

  return students;
};
