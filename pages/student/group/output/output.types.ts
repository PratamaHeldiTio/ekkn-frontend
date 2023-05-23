export interface IOutput {
  id: string;
  type: string;
  file: string;
  description: string;
  contribution: string[];
}

export interface IOutputPage {
  outputs: IOutput[];
  groupId: string;
}

export const toMapOutput = (dataAPI: any): IOutput[] => {
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
