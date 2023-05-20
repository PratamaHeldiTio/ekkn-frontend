export interface IStudent {
  nim: string;
  name: string;
  prodi: string;
  fakultas: string;
}

export interface IStudentPage {
  students: IStudent[];
}

export const mapingDataToStudents = (dataAPI: any): IStudent[] => {
  const students: IStudent[] = [];
  dataAPI.map((data: any) => {
    students.push({
      nim: data.nim,
      name: data.name,
      prodi: data.prodi,
      fakultas: data.fakultas,
    });
  });

  return students;
};
