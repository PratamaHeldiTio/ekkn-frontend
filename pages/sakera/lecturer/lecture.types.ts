export interface ILecturer {
  nip: string;
  name: string;
  prodi: string;
  fakultas: string;
  gender: string;
  contact: string;
  maduraLang: string;
}

export interface ILecturerPage {
  lecturers: ILecturer[];
}

export const mapingDataToLecturers = (dataAPI: any): ILecturer[] => {
  const lecturers: ILecturer[] = [];
  dataAPI.map((data: any) => {
    lecturers.push({
      nip: data.id,
      name: data.name,
      prodi: data.prodi,
      fakultas: data.fakultas,
      gender: data.gender,
      contact: data.contact,
      maduraLang: data.madura_lang,
    });
  });

  return lecturers;
};
