export type IInputOptions = {
   label?: string;
   inputType?: string;
   placeholder?: string;
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
