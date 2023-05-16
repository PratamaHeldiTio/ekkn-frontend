export interface group {
  id: string;
  name: string;
  status: string;
  village: string;
}

export const mapToGroup = (dataApi: any): group => {
  const group: group = {
    id: dataApi.id,
    name: dataApi.name,
    status: dataApi.status,
    village: `Desa ${dataApi.village.name}, Kecamatan ${dataApi.village.kecamatan}, Kabupaten ${dataApi.village.kabupaten}`,
  };

  return group;
};

export interface IStudentLogbook {
  group: group;
  logbooks: any;
  student: any;
}
