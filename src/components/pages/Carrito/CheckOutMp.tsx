import React, { useEffect, useState } from 'react'
import { createPreferenceMP, postPedido } from '../../../api/Fetch';
import Swal from 'sweetalert2';
import { IPedido } from '../../../entidades/IPedido';
import { useCarrito } from '../../../hooks/useCarrito';
import { SiMercadopago } from 'react-icons/si';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // No olvides importar el CSS

export function CheckOutMO({ montoCarrito = 0 }) {

    const { carrito, limpiarCarrito } = useCarrito();

    const [idPedido, setIdPedido] = useState<number>(0);

    const [idPreference, setIdPreference] = useState<string>('');

    const [compra, setCompra] = useState<boolean>(false);

    const post = async () => {

        const user = localStorage.getItem('usuario')
        console.log(user);

        const pedido: IPedido = { fecha: "2024-08-10", id: 0, total: montoCarrito, detallesPedido: carrito, titulo: "Pedido buen sas" }
        console.log("Datos enviados desde el frontend")
        console.log(pedido)

        const res: IPedido = await postPedido(pedido);
        console.log("Datos recibidos desde el backend")
        console.log(res)
        const idPedido = res.id;

        setIdPedido(idPedido);

        getPreferenceMP(idPedido)
    }

    const getPreferenceMP = async (idPedido: number) => {

        if (montoCarrito > 0) {
            const response = await createPreferenceMP({ id: 0, titulo: 'Pedido buen sas', total: montoCarrito, detallesPedido: [], fecha: '2020-10-10' })
            console.log("Preference id" + response);
            if (response) {
                console.log(response)
                setIdPreference(response.id) //Se setea el id de la preferencia
                console.log(idPreference)
                handleCompra(response.id, idPedido) //Se llama a la API de mercado pago
            }
        }
        else {
            toast.error('Agrega al menos un elemento a tu pedido')
        }
    }

    //initMercadoPago('TEST-eff543e9-2e4e-49cb-9e55-fc3f1a0fa3da');

    const handleCompra = (idPreference: string, idPedido: number) => {

        toast.info(`Se a guardado el pedido con el id:${idPedido}
        Será redirigido a Mercado Pago`)
        setCompra(true)
        setTimeout(() => {
            const url = `https://sandbox.mercadopago.com.ar/checkout/v1/redirect?preference-id=${idPreference}`;
            window.open(url, '_blank');
            limpiarCarrito();
        }, 2000);


    }

    return (

        <>
            <div className='w-full flex '>

                {!compra ? (<button className='btn btn-wide flex items-center justify-center bg-blue-400 text-white hover:bg-blue-600' onClick={() => post()}>
                    <h1 className='flex flex-row  justify-center items-center'>Comprar con Mercado Pago <SiMercadopago className='text-5xl font-bold' /></h1>
                </button>) : (<progress className="progress w-56 "></progress>)}

            </div>

            <ToastContainer />

        </>
    )

}