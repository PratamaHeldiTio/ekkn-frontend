export interface IStudent {
  nim: string;
  name: string;
  prodi: string;
  fakultas: string;
  gender: string;
  maduraLang: string;
}

export interface IEditStudent {
  student: IStudent;
}
