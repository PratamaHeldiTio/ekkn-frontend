export interface group {
  id: string;
  name: string;
  village: string;
}

export interface ILogbookDetail {
  group: group;
  logbooks: any;
}

export const mapToGroup = (dataApi: any): group => {
  const group: group = {
    id: dataApi.id,
    name: dataApi.name,
    village: dataApi.village.name,
  };

  return group;
};
