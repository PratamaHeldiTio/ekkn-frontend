export interface IInputOption {
  id: string | number;
  value: string;
}

export interface IInputSelect {
  label?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: IInputOption[];
}
