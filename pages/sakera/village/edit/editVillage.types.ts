export interface IVillage {
  id: string;
  periodId: string;
  name: string;
  kecamatan: string;
  kabupaten: string;
  latitude: number;
  longitude: number;
  status: string;
}

export interface IEditVillagePage {
  village: IVillage;
}

export const mapToEditVillage = (dataAPI: any): IVillage => {
  if (dataAPI == null) {
    const village: IVillage = {
      id: "",
      periodId: "",
      name: "",
      kecamatan: "",
      kabupaten: "",
      latitude: 0,
      longitude: 0,
      status: "",
    };

    return village;
  }

  const village: IVillage = {
    id: dataAPI.id,
    periodId: dataAPI.period_id,
    name: dataAPI.name,
    kecamatan: dataAPI.kecamatan,
    kabupaten: dataAPI.kabupaten,
    latitude: dataAPI.latitude,
    longitude: dataAPI.longitude,
    status: dataAPI.status,
  };

  return village;
};
