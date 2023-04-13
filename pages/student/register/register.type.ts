export interface IPeriod {
  id: string;
  value: string;
}

export interface IRegister {
  periods: IPeriod[];
  student: IStudent;
}

export interface IStudent {
  nim: string;
  name: string;
  prodi: string;
  fakultas: string;
  gender: string;
  maduraLang: string;
}

export interface IPeriodAPI {
  period_id: string;
  semester: string;
  tahun_ajaran: string;
}
