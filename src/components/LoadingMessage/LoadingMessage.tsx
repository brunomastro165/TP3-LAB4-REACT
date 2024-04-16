import React from 'react'
import { AiOutlineLoading } from "react-icons/ai";

const LoadingMessage = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-screen'>
      <div className='p-8 rounded-md shadow-xl text-lg font-semibold'>
        <span className='flex flex-col justify-center text-center items-center'> Cargando instrumentos desde el backend...
          <AiOutlineLoading className='animate-spin text-3xl mt-4 text-blue-600' />
        </span>
      </div>
    </div>
  )
}

export default LoadingMessage