export interface ILecturerRegistrationHistory {
  id: string;
  semester: string;
  tahunAjaran: string;
  status: string;
  createdAt: number;
}

export interface ILecturerRegistrationHistories {
  lecturerRegistrationHistories: ILecturerRegistrationHistory[];
}

export const mapingData = (dataAPI: any): ILecturerRegistrationHistory[] => {
  const LecturerRegistrationHistories: ILecturerRegistrationHistory[] = [];

  dataAPI.map((data: any) => {
    LecturerRegistrationHistories.push({
      id: data.id,
      semester: data.semester,
      tahunAjaran: data.tahun_ajaran,
      status: data.status,
      createdAt: data.created_at,
    });
  });

  return LecturerRegistrationHistories;
};
