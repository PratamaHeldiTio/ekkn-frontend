export interface IStudentRegistration {
  id: string;
  nim: string;
  name: string;
  prodi: string;
  status: string;
}

export interface IStudentRegistrationPage {
  registration: IStudentRegistration[];
}

export const mapToStudentRegistration = (
  dataAPI: any
): IStudentRegistration[] => {
  if (dataAPI == null) {
    const registrations: IStudentRegistration[] = [
      {
        id: "",
        nim: "",
        name: "",
        prodi: "",
        status: "",
      },
    ];

    return registrations;
  }

  const registrations: IStudentRegistration[] = [];
  dataAPI.forEach((data: any) => {
    const registration: IStudentRegistration = {
      id: data.id,
      nim: data.nim,
      name: data.name,
      prodi: data.prodi,
      status: data.status,
    };
    registrations.push(registration);
  });

  return registrations;
};
