export interface IPeriod {
  id: string;
  semester: string;
  tahunAjaran: string;
}

export interface IGroup {
  id: string;
  name: string;
  village: string;
  kecamatan: string;
  kabupaten: string;
}
export interface IGradePage {
  periods: IPeriod[];
}

export interface IGradePeriodPage {
  groups: IGroup[];
}

export const mapToPeriod = (dataAPI: any): IPeriod[] => {
  const periods: IPeriod[] = [];
  dataAPI.forEach((periodData: any) => {
    const period: IPeriod = {
      id: periodData.id,
      semester: periodData.semester,
      tahunAjaran: periodData.tahun_ajaran,
    };

    periods.push(period);
  });

  return periods;
};

export const mapToGroup = (dataAPI: any): IGroup[] => {
  const groups: IGroup[] = [];
  dataAPI.forEach((groupAPI: any) => {
    const group: IGroup = {
      id: groupAPI.id,
      name: groupAPI.name,
      village: groupAPI.village.name,
      kecamatan: groupAPI.village.kecamatan,
      kabupaten: groupAPI.village.kabupaten,
    };

    groups.push(group);
  });

  return groups;
};

export interface IStudentRegistration {
  id: string;
  nim: string;
  name: string;
  prodi: string;
  fakultas: string;
  grade: string;
}

export interface IGradeByGroupPage {
  studentRegistrations: IStudentRegistration[];
  periodId: string;
}

export const mapToGradeByGroup = (dataApi: any): IStudentRegistration[] => {
  const students: IStudentRegistration[] = [];
  dataApi.forEach((data: any) => {
    const student: IStudentRegistration = {
      id: data.id,
      nim: data.nim,
      name: data.name,
      prodi: data.prodi,
      fakultas: data.fakultas,
      grade: data.grade,
    };
    students.push(student);
  });

  return students;
};
