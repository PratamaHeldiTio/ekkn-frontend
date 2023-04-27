export interface IGroup {
  id: string;
  proposal: string;
  report: string;
  village: IVillage;
}

export interface IVillage {
  id: string;
  value: string;
}

export const ToGroupFromAPI = (dataAPI: any): IGroup => {
  const group: IGroup = {
    id: dataAPI.id,
    proposal: dataAPI.proposal,
    report: dataAPI.report,
    village: {
      id: dataAPI.village.id,
      value: `${dataAPI.village.name}, ${dataAPI.village.kecamatan} - ${dataAPI.village.kabupaten}`,
    },
  };

  return group;
};

export const ToVillageFromAPI = (dataAPI: any): IVillage => {
  const village: IVillage = {
    id: dataAPI.id,
    value: `${dataAPI.name}, ${dataAPI.kecamatan} - ${dataAPI.kabupaten}`,
  };

  return village;
};

export interface IDocumentPage {
  group: IGroup;
  villages: IVillage[];
}
