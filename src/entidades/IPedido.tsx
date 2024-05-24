import { IDetallePedido } from "./IDetallePedido";

export interface IPedido {
    id: number,
    fecha: string,
    total: number,
    titulo: string,
    detallesPedido: IDetallePedido[]
}