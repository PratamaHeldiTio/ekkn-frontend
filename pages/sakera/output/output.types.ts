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

export interface IOutputPage {
  periods: IPeriod[];
}

export interface IOutputPeriodPage {
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
