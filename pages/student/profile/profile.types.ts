export interface IStudent {
  nim: string;
  name: string;
  prodi: string;
  fakultas: string;
  gender: string;
  maduraLang: string;
  profile: string;
}

export interface IProfile {
  student: IStudent;
}
