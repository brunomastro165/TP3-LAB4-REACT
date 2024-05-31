import React from 'react'
import { useCarrito } from '../../../hooks/useCarrito'
import { CiLogout } from "react-icons/ci";
import { Link } from 'react-router-dom';

const LogOut = () => {

    const { limpiarCarrito, update, switchUpdate } = useCarrito()

    const logOut = () => {
        localStorage.removeItem('usuario');
        switchUpdate();
        limpiarCarrito();
    }

    return (
        <Link
            to={"/"}
            className={`px-5 py-2 rounded-lg hover:bg-gray-50 hover:text-black transition-all cursor-pointer`}
            onClick={() => logOut()}>
            <span className='flex flex-row items-center justify-start text-center'>
                <CiLogout className='text-3xl' />
            </span>
        </Link>
    )
}

export default LogOut