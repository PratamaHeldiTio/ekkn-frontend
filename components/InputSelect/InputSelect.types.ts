export interface IInputOption {
  id: string;
  value: string;
}

export interface IInputSelect {
  label?: string;
  name?: string;
  value?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: IInputOption[];
}
