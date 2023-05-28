export interface ILecturer {
  nip: string;
  name: string;
  prodi: string;
  fakultas: string;
  gender: string;
  contact: string;
  maduraLang: string;
  profile: string;
}

export interface IProfilePage {
  lecturer: ILecturer;
}

export const mapToEditLecturer = (dataAPI: any): ILecturer => {
  if (dataAPI == null) {
    const lecturer = {
      nip: "",
      name: "",
      prodi: "",
      fakultas: "",
      gender: "",
      contact: "",
      maduraLang: "",
      profile: "",
    };

    return lecturer;
  }
  const lecturer = {
    nip: dataAPI.id,
    name: dataAPI.name,
    prodi: dataAPI.prodi,
    fakultas: dataAPI.fakultas,
    gender: dataAPI.gender,
    contact: dataAPI.contact,
    maduraLang: dataAPI.madura_lang,
    profile: dataAPI.profile,
  };

  return lecturer;
};
