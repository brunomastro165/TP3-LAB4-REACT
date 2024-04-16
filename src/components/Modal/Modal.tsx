import React, { FC } from 'react'
import { Instrumento } from '../../entidades/Instrumentos'
import { useLocation, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Modal = () => {

  const location = useLocation();
  const data = location.state.data as Instrumento;

  function envio() {
    if (data.costoEnvio === "G") {
      return <h3 className='text-green-500 flex justify-start flex-row'><img src="/assets/img/camion.png" />Envío gratis a todo el país</h3>
    }
    else {
      return <h3 className='text-orange-500'>Costo de envío ${data.costoEnvio}</h3>
    }
  }

  return (
    <>
      <div className=' w-full flex flex-col h-auto lg:h-screen items-center justify-center bg-slate-100'>
        <div
          className='overflow-y-scroll flex w-full xl:w-2/3 flex-col justify-center md:justify-center items-center h-auto border-b m-2 p-5 mt-24 overflow-hidden bg-white'
        >
          <div className='flex  flex-col lg:flex-row justify-center items-center '>
            <div className='flex  rounded-full shadow-black p-24 '>
              <img src={`/assets/img/${data.imagen}`}
                className='w-96 h-96 ' />
            </div>

            <div className=' space-y-2 w-full '>
              <h1 className='font-normal text-xl md:text-2xl'>{data.instrumento}</h1>
              <h3 className='text-gray-900 font-semibold'>Lo que tenés que saber sobre este producto</h3>
              <h3 className='text-blue-500 font-bold'>Marca: <span className='text-gray-900 font-normal'>{data.marca}</span></h3>
              <h3 className='text-blue-500 font-bold'>Modelo: <span className='text-gray-900 font-normal'>{data.modelo}</span></h3>
              <h3 className='text-gray-900 font-bold w-full'>Descripcion: <span className='text-gray-900 font-normal '>{data.descripcion}</span></h3>
            </div>


            <div className='border p-5 rounded-md space-y-2 w-full shadow-md m-12'>
              <h3>{envio()}</h3>
              <h2 className='font-semibold text-lg text-blue-600'>Stock disponible</h2>
              <h2 className='text-xl  font-light md:text-3xl'>${data.precio}</h2>
              <h2>Disponible en <span className='text-blue-600'>{data.cantidadVendida}</span> cuotas</h2>
              <div className='p-5'>
                <button className='w-full text-xl m-1 bg-blue-600 p-2 rounded-lg text-white'>Comprar ahora</button>
                <button className='w-full text-xl m-1 bg-blue-100 text-blue-700 font-semibold p-2 rounded-lg'>Agregar al carrito</button>
              </div>
            </div>


          </div>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <Link to={"/tienda"} className='bg-blue-600 text-white rounded-xl px-5 py-2 mt-5 hover:bg-blue-800 '>Explora todos los productos</Link>
        </div>
      </div>


    </>
  )
}

export default Modal