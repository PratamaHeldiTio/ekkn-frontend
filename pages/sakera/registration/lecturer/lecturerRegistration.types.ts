export interface ILecturerRegistration {
  id: string;
  lecturerID: string;
  name: string;
  prodi: string;
  fakultas: string;
  status: string;
}

export interface ILecturerRegistrationPage {
  registration: ILecturerRegistration[];
}

export const mapToLecturerRegistration = (
  dataAPI: any
): ILecturerRegistration[] => {
  if (dataAPI == null) {
    const registrations: ILecturerRegistration[] = [
      {
        id: "",
        lecturerID: "",
        name: "",
        prodi: "",
        fakultas: "",
        status: "",
      },
    ];

    return registrations;
  }

  const registrations: ILecturerRegistration[] = [];
  dataAPI.forEach((data: any) => {
    const registration: ILecturerRegistration = {
      id: data.id,
      lecturerID: data.lecturer_id,
      name: data.name,
      prodi: data.prodi,
      fakultas: data.fakultas,
      status: data.status,
    };
    registrations.push(registration);
  });

  return registrations;
};
