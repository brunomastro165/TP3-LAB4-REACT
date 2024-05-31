import { FC } from 'react'
import { IDetallePedido } from '../../../entidades/IDetallePedido'
import { useCarrito } from '../../../hooks/useCarrito';
import { FaRegTrashAlt } from "react-icons/fa";

interface IDetalleLocal {
    detalle: IDetallePedido
}
const CardCarrito: FC<IDetalleLocal> = ({ detalle }) => {

    const { removeCarrito } = useCarrito();

    const remove = () => {
        removeCarrito(detalle);
    }

    return (

        <div className='flex flex-row items-center border-b hover:shadow-md transition-all  my-4'>

            <div className='flex  w-52 shadow-black p-5'>
                <img src={detalle.instrumento.imagen}
                    className=' size-48 rounded-xl' />
            </div>

            <div className=' rounded w-96 p-5'>
                <div className='flex flex-row justify-between w-full items-center'>
                    <div className='flex-col'>
                        <h1 className='px-2 text-xl'>{detalle.instrumento.instrumento}</h1>
                        <h2 className='px-2 text-md  text-blue-600 font-bold'><span className='text-black font-semibold'>Precio de la unidad: </span>${detalle.instrumento.precio}</h2>
                        <h2 className='px-2 text-md  text-blue-600 font-bold'><span className='text-black font-semibold'>Total individual: </span>${detalle.instrumento.precio * detalle.cantidad}</h2>
                        <h2 className=' px-2 rounded text-blue-600 font-semibold'>Cantidad: {detalle.cantidad}</h2>
                    </div>
                </div>


                <div className='text-green-600 px-2 font-semibold'>Envío: ${detalle.instrumento.costoEnvio}</div>
            </div>

            <div>
                <div className='bg-red-600 p-1 rounded mr-4 text-white transition-all active:scale-95 cursor-pointer' onClick={() => remove()}><FaRegTrashAlt className='text-xl'/></div>
            </div>

        </div>

    )
}

export default CardCarrito