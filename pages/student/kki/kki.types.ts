export interface IRegisteredStudent {
  id: string;
  periodId: string;
  semester: string;
  tahunAjaran: string;
}

export interface IKKI {
  registeredStudents: IRegisteredStudent[];
}

export interface IProker {
  id: string;
  proker: string;
}

export interface IDetailKKIPage {
  studentProker: IProker;
}

export const mapingData = (dataAPI: any): IRegisteredStudent[] => {
  const registeredStudents: IRegisteredStudent[] = [];
  dataAPI.map((data: any) => {
    registeredStudents.push({
      id: data.id,
      periodId: data.period_id,
      semester: data.semester,
      tahunAjaran: data.tahun_ajaran,
    });
  });

  return registeredStudents;
};

export const mapToStudentProker = (dataAPI: any): IProker => {
  if (dataAPI == null) {
    return {
      id: "",
      proker: "",
    };
  }

  return {
    id: dataAPI.id,
    proker: dataAPI.proker,
  };
};
