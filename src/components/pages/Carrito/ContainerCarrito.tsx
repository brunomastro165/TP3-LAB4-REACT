import { useEffect, useState } from 'react';
import { useCarrito } from '../../../hooks/useCarrito';
import CardCarrito from './CardCarrito';
import { postPedido } from '../../../api/Fetch';
import { IPedido } from '../../../entidades/IPedido';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { CheckOutMO } from './CheckOutMp';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { SiMercadopago } from "react-icons/si";


initMercadoPago('TEST-7b148f92-305c-4ef9-a246-5622da48263e');

const ContainerCarrito = () => {

    const { carrito } = useCarrito();

    const [total, setTotal] = useState<number>(0);

    const [envio, setEnvio] = useState<number>(0);

    const [idPedido, setIdPedido] = useState<number>()

    useEffect(() => {
        let tempTotal = 0;
        let envioTotal = 0;
        const cuenta = () => {
            carrito.map((element) => {
                tempTotal += Number(element.instrumento.precio) * Number(element.cantidad);
            })
            setTotal(tempTotal);

            carrito.map((element) => {
                envioTotal += Number(element.instrumento.costoEnvio)
            })
            setEnvio(envioTotal);
        }
        cuenta();
    }, [carrito])

    //postPedido()

    return (
        <>
            {carrito.length >= 1 ? (
                <div className='flex flex-row h-screen justify-around w-full items-center '>

                    <div className='flex flex-col justify-center items-center'>
                        <div className='flex flex-col justify-center items-center'>
                            {carrito.map((detalle) => (
                                <CardCarrito detalle={detalle} />
                            ))}
                        </div>
                    </div>

                    <div className='flex items-center justify-center bg-white w-1/4 h-auto rounded border  flex-col '>
                        <div className='flex flex-col justify-start items-start w-full p-5'>
                            <h1 className='text-xl font-semibold'>Total de su pedido: <span className='text-green-600'>${total + envio}</span></h1>
                            <h1 className='text-lg w-54 text-blue-600 px-5    rounded-lg '><span className='text-black'>Articulos:</span> ${total}</h1>
                            <h1 className='text-lg w-54 text-blue-600 px-5   rounded-lg '><span className='text-black'>Envío:</span> ${envio}</h1>
                        </div>

                        <div className=' mt-4 p-5'>
                            <CheckOutMO montoCarrito={total + envio} />
                        </div>

                    </div>
                </div>
            ) : (
                <div className='w-full h-screen flex flex-col justify-center items-center '>
                    <div className='p-5 rounded border flex flex-col items-center justify-center shadow-xl'>
                        <figure className=''>
                            <img src="/assets/img/waiter.svg" alt="" className='size-48' />
                        </figure>
                        <h1>No has agregado nada al carrito</h1>
                        <Link to="/tienda" className='btn mt-4 bg-blue-600 hover:bg-blue-500 text-white'>Ir a la tienda</Link>
                    </div>
                </div>
            )}



            {/* <div className='flex items-center justify-center '>
                <h1 className='bg-green-600 text-xl text-white p-5 rounded border-2 border-white active:scale-95 transition-all cursor-pointer
hover:bg-white hover:text-green-600 hover:border-green-600 ' onClick={() => post()}>Realizar compra</h1>
            </div> */}


        </>
    )
}

export default ContainerCarrito