export interface IStudentRegistration {
  studentRegistrationId: string;
  semester: string;
  tahunAjaran: string;
  status: string;
  createdAt: number;
}

export interface IStudentRegistrations {
  studentRegistrations: IStudentRegistration[];
}

export const mapingData = (dataAPI: any): IStudentRegistration[] => {
  const studentRegistrations: IStudentRegistration[] = [];

  dataAPI.map((data: any) => {
    studentRegistrations.push({
      studentRegistrationId: data.student_registration_id,
      semester: data.semester,
      tahunAjaran: data.tahun_ajaran,
      status: data.status,
      createdAt: data.created_at,
    });
  });

  return studentRegistrations;
};
