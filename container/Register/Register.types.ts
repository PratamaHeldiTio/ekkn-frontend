export interface IPeriod {
  id: string;
  value: string;
}

export interface IStudent {
  nim: string;
  name: string;
  prodi: string;
  fakultas: string;
  gender: string;
  maduraLang: string;
}

export interface IRegisterPage {
  periods: IPeriod[];
  student: IStudent;
}

export interface IInputValue {
  nim: string;
  name: string;
  gender: string;
  fakultas: string;
  prodi: string;
  maduraLang: string;
  periodInput?: string;
}
