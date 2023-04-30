export interface IGroup {
  id: string;
  report: string;
  potential: string;
  village: IVillage;
}

export interface IVillage {
  id: string;
  value: string;
  strength?: string;
  weakness?: string;
  oportunities?: string;
  threats?: string;
}

export const ToGroupFromAPI = (dataAPI: any): IGroup => {
  const group: IGroup = {
    id: dataAPI.id,
    report: dataAPI.report,
    potential: dataAPI.potential,
    village: {
      id: dataAPI.village.id,
      value: `${dataAPI.village.name}, ${dataAPI.village.kecamatan} - ${dataAPI.village.kabupaten}`,
      strength: dataAPI.village.strength,
      weakness: dataAPI.village.weakness,
      oportunities: dataAPI.village.oportunities,
      threats: dataAPI.village.threats,
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
