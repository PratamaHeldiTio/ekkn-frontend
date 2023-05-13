export interface IGroupRegistration {
  id: string;
  name: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  mentor: string;
}

export interface IGroupRegistrationPage {
  groups: IGroupRegistration[];
}

export const mapToGroupRegistration = (dataAPI: any): IGroupRegistration[] => {
  const registrations: IGroupRegistration[] = [];
  dataAPI.forEach((data: any) => {
    const registration: IGroupRegistration = {
      id: data.id,
      name: data.name,
      desa: data.village.name,
      kecamatan: data.village.kecamatan,
      kabupaten: data.village.kabupaten,
      mentor: data.lecturer,
    };
    registrations.push(registration);
  });

  return registrations;
};
