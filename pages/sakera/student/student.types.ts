export interface IStudent {
  nim: string;
  name: string;
  prodi: string;
  grade: string;
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
      grade: data.grade,
    });
  });

  return students;
};
