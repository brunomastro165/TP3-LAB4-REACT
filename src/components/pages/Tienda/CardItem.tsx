import React, { FC } from 'react'
import { Instrumento } from '../../../entidades/Instrumentos'
import { useState } from 'react'
import camion from '../assets/img/nro1.jpg'
import Modal from '../../Modal/Modal'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineLoading } from "react-icons/ai";
import { fetchDataById } from '../../../api/Fetch'


const CardItem: FC<Instrumento> = ({ instrumento, cantidadVendida, costoEnvio, descripcion, imagen, marca, modelo, precio, id }) => {

    const navigate = useNavigate();

    const fetchData = async (id: number) => {
        const data = await fetchDataById(id);
        pushCard(data);
    }

    function pushCard(data: Instrumento) {
        navigate(`/instrumento/${id}`, { state: { data } })
    }


    function envio() {
        if (costoEnvio === '0') {
            return <h3 className='text-green-500 flex justify-start flex-row'><img src="/assets/img/camion.png" />Envío gratis a todo el país</h3>
        }
        else {
            return <h3 className='text-orange-500'>Costo de envío ${costoEnvio}</h3>
        }
    }

    console.log("betitosex")
    console.log(imagen)

    return (
        <>
            <div className='hidden  w-full md:w-10/12 lg:w-1/2 md:flex justify-center md:justify-start items-center h-auto border-b  m-2 p-5 overflow-hidden hover:shadow-lg transition-all cursor-pointer'>
                <div className=' flex flex-col md:flex-row justify-center items-center  '>
                    <div className='flex w-96 h-48 rounded-full shadow-black p-8 '>
                        <img src={`${imagen}`}
                            alt={imagen}
                            className='w-full h-full rounded-xl overflow-hidden' />
                    </div>

                    <div className='ml-5 space-y-2 w-full'>
                        <h1 className='font-normal text-xl md:text-2xl w-full'>{instrumento}</h1>
                        <h2 className='font-semibold text-2xl md:text-3xl'>${precio}</h2>
                        <h3>{envio()}</h3>
                        <h3 className='text-blue-500'>{cantidadVendida} vendidos recientemente</h3>
                        <button
                            onClick={() => fetchData(id)}
                            className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800'
                        >
                            Ver detalle
                        </button>
                    </div>
                </div>
            </div>

            <div className='flex flex-col md:hidden justify-center items-center shadow-lg p-5 my-5 rounded-md border'>
                <div className='flex  rounded-full shadow-black p-8'>
                    <img src={`/assets/img/${imagen}`}
                        className='h-24 w-24 overflow-hidden' />
                </div>

                <div className='w-96 space-y-1 flex flex-col '>
                    <h1 className='font-normal text-xl md:text-2xl w-full'>{instrumento}</h1>
                    <h2 className='font-semibold text-2xl md:text-3xl'>${precio}</h2>
                    <h3>{envio()}</h3>
                    <h3 className='text-blue-500'>{cantidadVendida} vendidos recientemente</h3>
                    <div className='w-full flex justify-center items-center py-4'>
                        <button
                            onClick={() => fetchData(id)}
                            className='bg-blue-600 text-white px-4 py-2 w-1/2 rounded-md hover:bg-blue-800'
                        >
                            Ver detalle
                        </button>
                    </div>

                </div>

            </div>
        </>


    )
}

export default CardItem