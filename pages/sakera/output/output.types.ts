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

export interface IOutputGroupPage {
  group: IGroupDetail;
  outputs: IOutput[];
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

export interface IOutput {
  id: string;
  type: string;
  file: string;
  description: string;
  contribution: string[];
}

export const toOutput = (dataAPI: any): IOutput[] => {
  const outputs: IOutput[] = [];
  dataAPI.forEach((outputAPI: any) => {
    const output: IOutput = {
      id: outputAPI.id,
      type: outputAPI.type,
      file: outputAPI.file,
      description: outputAPI.description,
      contribution: outputAPI.contribution.split(","),
    };
    outputs.push(output);
  });

  return outputs;
};

export interface IGroupDetail {
  id: string;
  name: string;
  periodId: string;
  location: string;
  lecturer: string;
}

export const mapToDetailGroup = (dataAPI: any): IGroupDetail => {
  const group: IGroupDetail = {
    id: dataAPI.id,
    name: dataAPI.name,
    periodId: dataAPI.period_id,
    location: `Desa ${dataAPI.village.name}, Kecamatan ${dataAPI.village.kecamatan}, Kabupaten ${dataAPI.village.kabupaten}`,
    lecturer: dataAPI.lecturer.name,
  };

  return group;
};
