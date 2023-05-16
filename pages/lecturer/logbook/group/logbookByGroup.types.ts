export interface IStudent {
  nim: string;
  name: string;
  prodi: string;
}

export interface ILogbookByGroupPage {
  students: IStudent[];
  periodId: string;
}

export const mapToLogbookByGroup = (dataApi: any): IStudent[] => {
  const students: IStudent[] = [];
  dataApi.students.forEach((data: any) => {
    const period = {
      nim: data.nim,
      name: data.name,
      prodi: data.prodi,
    };
    students.push(period);
  });

  return students;
};
