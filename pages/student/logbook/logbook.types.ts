export interface IRegisteredStudent {
  periodId: string;
  semester: string;
  tahunAjaran: string;
}

export interface IRegisteredStudents {
  registeredStudents: IRegisteredStudent[];
}

export const mapingData = (dataAPI: any): IRegisteredStudent[] => {
  const registeredStudents: IRegisteredStudent[] = [];
  dataAPI.map((data: any) => {
    registeredStudents.push({
      periodId: data.period_id,
      semester: data.semester,
      tahunAjaran: data.tahun_ajaran,
    });
  });

  return registeredStudents;
};
