export interface IInputFile {
  format: string;
  maxSize: number;
  label: string;
  file: IFile;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IFile {
  name: string;
  fileUrl: string;
}
