export interface IGroup {
  id: string;
  name: string;
  periodId: string;
  village: IVillage;
  members: IStudent[];
  leader: string;
  potential: string;
  report: string;
  lecturer: ILecturerGroup;
}

export interface IVillage {
  lokasi: string;
  strength: string;
  weakness: string;
  oportunities: string;
  threats: string;
}

export interface IStudent {
  id: string;
  name: string;
  prodi: string;
  fakultas: string;
  maduraLang: string;
}

export interface ILecturer {
  id: string;
  value: string;
}

export interface ILecturerGroup {
  id: string;
  name: string;
}

export interface IProker {
  studentId: string;
  name: string;
  prodi: string;
  proker: string;
}

export interface IGroupPage {
  group: IGroup;
  lecturers: ILecturer[];
  prokers: IProker[];
}

export const mapToDetailGroup = (dataAPI: any): IGroup => {
  const village: IVillage = {
    lokasi: `Desa ${dataAPI.village.name}, Kecamatan ${dataAPI.village.kecamatan}, Kabupaten ${dataAPI.village.kabupaten}`,
    strength: dataAPI.village.strength,
    weakness: dataAPI.village.weakness,
    oportunities: dataAPI.village.oportunities,
    threats: dataAPI.village.threats,
  };

  const members: IStudent[] = [];
  dataAPI.students.forEach((student: any) => {
    const studentData: IStudent = {
      id: student.nim,
      name: student.name,
      prodi: student.prodi,
      fakultas: student.fakultas,
      maduraLang: student.madura_lang,
    };
    members.push(studentData);
  });

  const lecturer: ILecturerGroup = {
    id: dataAPI.lecturer.id,
    name: dataAPI.lecturer.name,
  };

  const group: IGroup = {
    id: dataAPI.id,
    periodId: dataAPI.period_id,
    name: dataAPI.name,
    village: village,
    members: members,
    leader: dataAPI.leader,
    potential: dataAPI.potential,
    report: dataAPI.report,
    lecturer: lecturer,
  };

  return group;
};

export const mapToLecturerApprove = (dataAPI: any): ILecturer[] => {
  const lecturers: ILecturer[] = [];
  dataAPI.forEach((lecturer: any) => {
    const lecturerApprove: ILecturer = {
      id: lecturer.lecturer_id,
      value: lecturer.name,
    };

    lecturers.push(lecturerApprove);
  });

  return lecturers;
};

export const mapToProker = (dataAPI: any): IProker[] => {
  const prokers: IProker[] = [];
  dataAPI.forEach((proker: any) => {
    const prokerData: IProker = {
      studentId: proker.nim,
      name: proker.name,
      prodi: proker.prodi,
      proker: proker.proker,
    };
    prokers.push(prokerData);
  });

  return prokers;
};
