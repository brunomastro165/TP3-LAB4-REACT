import { useEffect, useState } from 'react';
import { useCarrito } from '../../../hooks/useCarrito';
import CardCarrito from './CardCarrito';
import { postPedido } from '../../../api/Fetch';
import { IPedido } from '../../../entidades/IPedido';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { CheckOutMO } from './CheckOutMp';


initMercadoPago('TEST-7b148f92-305c-4ef9-a246-5622da48263e');

const ContainerCarrito = () => {

    const { carrito } = useCarrito();

    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        let tempTotal = 0;
        const cuenta = () => {
            carrito.map((element) => {
                tempTotal += Number(element.instrumento.precio) * Number(element.cantidad);
            })
            setTotal(tempTotal)
        }
        cuenta();
    }, [])

    //postPedido()


    const post = () => {
        const pedido: IPedido = { fecha: "2020-10-10", id: 0, total: total, detallesPedido: carrito, titulo: "" }
        console.log(pedido);
        postPedido(pedido);
    }

    return (
        <>
            <div className='flex flex-row justify-around w-full items-center'>


                <div className='flex flex-col justify-center items-center'>
                    <div className='flex flex-col justify-center items-center'>
                        {carrito.map((detalle) => (
                            <CardCarrito detalle={detalle} />
                        ))}
                    </div>
                </div>

                <div className='flex items-center justify-center bg-white w-1/3 h-auto rounded border p-5  flex-col just '>
                    <h1 className='text-xl font-semibold'>Total de su pedido:</h1>
                    <h1 className='text-xl w-54 text-blue-600 px-5 py-2   rounded-lg '>
                        ${total}
                    </h1>

                    <div onClick={() => post()} className=' mt-4 '>
                        <CheckOutMO montoCarrito={total} />
                    </div>

                </div>
            </div>

            {/* <div className='flex items-center justify-center '>
                <h1 className='bg-green-600 text-xl text-white p-5 rounded border-2 border-white active:scale-95 transition-all cursor-pointer
hover:bg-white hover:text-green-600 hover:border-green-600 ' onClick={() => post()}>Realizar compra</h1>
            </div> */}


        </>
    )
}

export default ContainerCarrito