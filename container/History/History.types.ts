export interface IStudentRegistration {
  studentRegistrationId: string;
  semester: string;
  tahunAjaran: string;
  createdAt: number;
  status: string;
}

export interface IStudentRegistrations {
  studentRegistrations: IStudentRegistration[];
}
