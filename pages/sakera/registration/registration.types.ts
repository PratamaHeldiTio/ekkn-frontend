export interface IPeriod {
  id: string;
  semester: string;
  tahunAjaran: string;
}

export interface IRegistration {
  periods: IPeriod[];
}

export const mapToPeriod = (dataApi: any): IPeriod => {
  const registration = {
    id: dataApi.id,
    semester: dataApi.semester,
    tahunAjaran: dataApi.tahun_ajaran,
  };
  return registration;
};
