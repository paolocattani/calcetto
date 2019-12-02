import { InputHTMLAttributes } from "react";


export type IInputOptions = {
    label?: string,
    inputType?: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}