export interface IPeriod {
  id: string;
  semester: string;
  tahunAjaran: string;
}

export interface IVillagePage {
  periods: IPeriod[];
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
