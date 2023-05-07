export interface IPeriod {
  id: string;
  semester: string;
  tahunAjaran: string;
}

export interface IVillagePage {
  periods: IPeriod[];
}

export interface IVillage {
  id: string;
  name: string;
  kecamatan: string;
  kabupaten: string;
  latitude: number;
  longitude: number;
  status: string;
}

export interface IVillageByPeriodPage {
  villages: IVillage[];
}

export const mapToPeriod = (dataApi: any): IPeriod[] => {
  const periods: IPeriod[] = [];
  dataApi.forEach((data: any) => {
    const period = {
      id: data.id,
      semester: data.semester,
      tahunAjaran: data.tahun_ajaran,
    };
    periods.push(period);
  });

  return periods;
};

export const mapDataToVillages = (dataAPI: any): IVillage[] => {
  const villages: IVillage[] = [];
  dataAPI.map((data: any) => {
    villages.push({
      id: data.id,
      name: data.name,
      kecamatan: data.kecamatan,
      kabupaten: data.kabupaten,
      latitude: data.latitude,
      longitude: data.longitude,
      status: data.status,
    });
  });

  return villages;
};
