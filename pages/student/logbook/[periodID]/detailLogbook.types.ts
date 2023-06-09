export interface group {
  id: string;
  name: string;
  status: string;
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
    status: dataApi.status,
    village: dataApi.village.name,
  };

  return group;
};
