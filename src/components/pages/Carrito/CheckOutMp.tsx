import React, { useState } from 'react'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
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
            alert("Agregue al menos un plato al pedido");
        }
    }

    initMercadoPago('TEST-7b148f92-305c-4ef9-a246-5622da48263e', { locale: 'es-AR' });

    console.log(idPreference);

    return (

        <div className='w-full flex flex-col justify-center items-center'>
            <button onClick={getPreferenceMP} className='bg-blue-500 p-4 text-white font-bold rounded-md w-max'>Comprar con MercadoPago</button>
            {idPreference ? (
                <div onClick={() => showAlert(idPedido)}>
                    <Wallet
                        initialization={{
                            preferenceId: idPreference,
                            redirectMode: "blank",
                        }}
                        customization={{ texts: { valueProp: "smart_option" } }
                        }
                    />
                </div>
            ) : (
                <div></div>
            )}
        </div>


    )

}