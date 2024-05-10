import { Instrumento } from "./Instrumentos";

export interface IDetallePedido {
    id: number,
    cantidad: number,
    instrumento: Instrumento
}