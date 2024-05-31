import React from 'react'
import { useState } from 'react';
import Slider from '../../Slider/Slider';
import BarChartComponent from '../../charts/Barchar';
import PieChartComponent from '../../charts/PieChart';

const Home = () => {

    const images = ["img1.jpeg", "img2.jpeg", "img3.jpeg"]

    console.log(localStorage.getItem('carrito'))
    return (
        <div className='bg-black'>
            <div className='w-full'>
                <Slider images={images} text={"Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de   experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las mejores elecciones para tu compra musical."} />
            </div>

            <div className='bg-black flex flex-col '>
                <div className='w-full flex items-center justify-center'>
                    <h1 className='text-center text-text w-max p-5 rounded bg-white text-2xl mb-2 font-bold'>Nuestro recorrido</h1>
                </div>
                <div className='flex flex-wrap justify-center items-center'>
                    <BarChartComponent />
                    <PieChartComponent />
                </div>
            </div>

        </div>
    )
}

export default Home