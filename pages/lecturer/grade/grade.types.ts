export interface IPeriod {
  id: string;
  semester: string;
  tahunAjaran: string;
}

export interface IGroup {
  id: string;
  name: string;
  location: string;
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
      id: periodData.period_id,
      semester: periodData.semester,
      tahunAjaran: periodData.tahun_ajaran,
    };

    periods.push(period);
  });

  return periods;
};

export const mapToGroupByPeriodLecturer = (dataAPI: any): IGroup[] => {
  const groups: IGroup[] = [];
  dataAPI.forEach((groupData: any) => {
    const group: IGroup = {
      id: groupData.id,
      name: groupData.name,
      location: `Desa ${groupData.village.name}, Kecamatan ${groupData.village.kecamatan}, Kabupaten ${groupData.village.kabupaten}`,
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
  grade: number[];
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
