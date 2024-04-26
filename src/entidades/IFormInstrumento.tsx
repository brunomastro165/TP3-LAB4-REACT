import { Dispatch, SetStateAction } from "react";
import { Instrumento } from "./Instrumentos";

export interface IFormInstrumento {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    values: Instrumento;
}