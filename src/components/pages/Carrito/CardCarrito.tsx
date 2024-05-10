import { FC } from 'react'
import { IDetallePedido } from '../../../entidades/IDetallePedido'
import { useCarrito } from '../../../hooks/useCarrito';

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
            <div className=' rounded w-96 p-5'>

                <div className='flex flex-row justify-between w-full items-center'>
                    <h1 className='p-2 text-xl'>{detalle.instrumento.instrumento}</h1>
                    <h2 className='bg-blue-600 p-5 rounded text-white'>{detalle.cantidad}</h2>
                </div>
            </div>

            <div>
                <div className='bg-red-600 mx-4 px-2 rounded-xl text-white transition-all active:scale-95 cursor-pointer' onClick={() => remove()}>X</div>
            </div>
        </div>

    )
}

export default CardCarrito