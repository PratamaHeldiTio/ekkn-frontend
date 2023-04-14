export interface IRegisteredStudent {
  semester: string;
  nim: string;
  name: string;
  prodi: string;
  fakultas: string;
  status: string;
  createdAt: Number;
  studentRegistrationId: string;
  tahunAjaran: string;
}

export interface IRegisteredStudents {
  registeredStudents: IRegisteredStudent[];
}

export const mapData = (data: any): IRegisteredStudent => {
  const dataFormat = {
    semester: data.semester,
    nim: data.nim,
    name: data.name,
    prodi: data.prodi,
    fakultas: data.fakultas,
    status: data.status,
    createdAt: data.created_at,
    studentRegistrationId: data.studentR_rgistration_id,
    tahunAjaran: data.tahun_ajaran,
  };

  return dataFormat;
};
