export interface IRegisteredStudent {
  periodId: string;
  semester: string;
  tahunAjaran: string;
}

export interface IRegisteredStudents {
  registeredStudents: IRegisteredStudent[];
}
