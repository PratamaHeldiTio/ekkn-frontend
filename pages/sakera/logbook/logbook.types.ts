export interface IPeriod {
  id: string;
  semester: string;
  tahunAjaran: string;
}

export interface IStudent {
  nim: string;
  name: string;
  prodi: string;
}

export interface ILogbookPage {
  periods: IPeriod[];
}

export interface ILogbookByPeriodPage {
  students: IStudent[];
}

export const mapToPeriod = (dataApi: any): IPeriod[] => {
  const periods: IPeriod[] = [];
  dataApi.forEach((data: any) => {
    const period = {
      id: data.id,
      semester: data.semester,
      tahunAjaran: data.tahun_ajaran,
    };
    periods.push(period);
  });

  return periods;
};

export const mapToLogbookByPeriod = (dataApi: any): IStudent[] => {
  const students: IStudent[] = [];
  dataApi.forEach((data: any) => {
    const period = {
      nim: data.nim,
      name: data.name,
      prodi: data.prodi,
    };
    students.push(period);
  });

  return students;
};
