import React, { useState } from 'react'
import { createPreferenceMP } from '../../../api/Fetch';
import Swal from 'sweetalert2';

export function CheckOutMO({ montoCarrito = 0, idPedido = 0 }) {

    const showAlert = (id: number) => {
        Swal.fire({
            title: '¡Su pedido se guardó exitosamente!',
            text: `Ahora será redirijido a Mercado Pago para completar la transacción \n ID del pedido ${idPedido}`,
            icon: 'success',
            confirmButtonText: 'Genial'
        });
    }

    const [idPreference, setIdPreference] = useState<string>('');

    console.log(montoCarrito)
    const getPreferenceMP = async () => {
        if (montoCarrito > 0) {
            const response = await createPreferenceMP({ id: 0, titulo: 'Pedido buen sas', total: montoCarrito, detallesPedido: [], fecha: '2020-10-10' })
            console.log("Preference id" + response);
            if (response) {
                console.log(response)
                setIdPreference(response.id)
            }
        }
        else {
            alert("Agregue al menos un elemento al pedido");
        }
    }


    //initMercadoPago('TEST-eff543e9-2e4e-49cb-9e55-fc3f1a0fa3da');

    const handleCompra = () => {
        const url = `https://sandbox.mercadopago.com.ar/checkout/v1/redirect?preference-id=${idPreference}`;
        window.open(url, '_blank');
    }
 
    return (

        <div className='w-full flex flex-col justify-center items-center'>
            <button onClick={getPreferenceMP} className='bg-blue-500 p-4 text-white font-bold rounded-md w-max'>Comprar con MercadoPago</button>
            {idPreference ? (
                <button className='btn' onClick={() => { showAlert(idPedido), handleCompra() }}>
                    Comprar con Mercado Pago
                </button>
            ) : (
                <div>

                </div>
            )}
        </div>


    )

}