import React, { FC } from 'react'
import { Instrumento } from '../entidades/Instrumentos'
import { useState } from 'react'
import camion from '../assets/img/nro1.jpg'
import Modal from './Modal/Modal'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineLoading } from "react-icons/ai";


const CardItem: FC<Instrumento> = ({ instrumento, cantidadVendida, costoEnvio, descripcion, imagen, marca, modelo, precio, id }) => {

    const [modal, setModal] = useState(false)

    const navigate = useNavigate();

    function pushCard() {
        navigate(`/instrumento/${id}`, { state: { instrumento, cantidadVendida, costoEnvio, descripcion, imagen, marca, modelo, precio, id } })
    }

    function envio() {
        if (costoEnvio === "G") {
            return <h3 className='text-green-500 flex justify-start flex-row'><img src="/assets/img/camion.png" />Envío gratis a todo el país</h3>
        }
        else {
            return <h3 className='text-orange-500'>Costo de envío ${costoEnvio}</h3>
        }
    }

    return (
        <>
            <div

                className='w-full md:w-1/2 flex justify-center md:justify-start items-center h-auto border-b  m-2 p-5 overflow-hidden hover:shadow-lg transition-all cursor-pointer'

            >
                <div className='flex  flex-col md:flex-row justify-center items-center  '>
                    <div className='flex  rounded-full shadow-black p-8 '>
                        <img src={`/assets/img/${imagen}`}
                            className='h-24 w-24 overflow-hidden' />
                    </div>

                    <div className='ml-5 space-y-2'>
                        <h1 className='font-normal text-xl md:text-2xl'>{instrumento}</h1>
                        <h2 className='font-semibold text-2xl md:text-3xl'>${precio}</h2>
                        <h3>{envio()}</h3>
                        <h3 className='text-blue-500'>{cantidadVendida} vendidos recientemente</h3>
                        <button
                            onClick={() => pushCard()}
                            className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800'
                        >Ver detalle</button>
                    </div>
                </div>
            </div>
        </>


    )
}

export default CardItem