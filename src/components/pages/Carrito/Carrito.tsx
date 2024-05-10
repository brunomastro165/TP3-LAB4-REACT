import React, { FC } from 'react'
import { IPedido } from '../../../entidades/IPedido'
import { useCarrito } from '../../../hooks/useCarrito'
import ContainerCarrito from './ContainerCarrito';

const Carrito = () => {
    return (
        <div className='min-h-screen pt-24'>
            <ContainerCarrito />
        </div>
    )
}

export default Carrito