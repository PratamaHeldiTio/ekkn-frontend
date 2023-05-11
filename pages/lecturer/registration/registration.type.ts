export interface IPeriod {
  id: string;
  value: string;
}

export interface IRegistration {
  periods: IPeriod[];
  lecturer: ILecturer;
}

export interface ILecturer {
  id: string;
  name: string;
  prodi: string;
  fakultas: string;
  gender: string;
  maduraLang: string;
  contact: string;
}

export interface IPeriodAPI {
  period_id: string;
  semester: string;
  tahun_ajaran: string;
}
