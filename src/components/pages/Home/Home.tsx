import React from 'react'
import { useState } from 'react';
import Slider from '../../Slider/Slider';

const Home = () => {

    const images = ["img1.jpeg", "img2.jpeg", "img3.jpeg"]

    return (
        <div className='w-full'>
            <Slider images={images} text={"Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de   experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las mejores elecciones para tu compra musical."}/>
        </div>
    )
}

export default Home