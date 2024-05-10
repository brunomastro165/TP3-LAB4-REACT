import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";



const Navbar = () => {

  const [selected, setSelected] = useState("Home")
  const [open, setOpen] = useState(false);



  return (
    <>
      <div className='w-full flex bg-black  justify-around  h-12 items-center py-10 fixed z-50 border-b border-white
    font-semibold text-white'>

        <div className='text-xl font-semibold'>Musical Hendrix</div>

        <div className='hidden md:flex justify-around flex-row space-x-4 '>
          <Link to={"/"}
            onClick={() => setSelected("Home")}
            className={`px-5 py-2 rounded-lg hover:bg-gray-50 hover:text-black transition-all ${selected === "Home" ? 'bg-gray-50 text-black' : ''}`}>
            <span className='flex flex-row items-center justify-start text-center'>
              <FaHome />
              <h1 className=' rounded-lg  p-2'>
                Home
              </h1>
            </span>
          </Link>

          <Link to={"/tienda"}
            onClick={() => setSelected("Tienda")}
            className={`px-5 py-2 rounded-lg hover:bg-gray-50 hover:text-black transition-all ${selected === "Tienda" ? 'bg-gray-50 text-black' : ''}`}>
            <span className='flex flex-row items-center justify-start text-center'>
              <FaShoppingBag />
              <h1 className=' rounded-lg  p-2'>
                Tienda
              </h1>
            </span>
          </Link>

          <Link to={"/DondeEstamos"}
            onClick={() => setSelected("Donde estamos")}
            className={`px-5 py-2 rounded-lg hover:bg-gray-50 hover:text-black transition-all ${selected === "Donde estamos" ? 'bg-gray-50 text-black' : ''}`}>
            <span className='flex flex-row items-center justify-start text-center'>
              <SiGooglemaps />
              <h1 className=' rounded-lg  p-2'>
                Dónde estamos
              </h1>
            </span>
          </Link>

          <Link to={"/admin"}
            onClick={() => setSelected("Administrador")}
            className={`px-5 py-2 rounded-lg hover:bg-gray-50 hover:text-black transition-all ${selected === "Administrador" ? 'bg-gray-50 text-black' : ''}`}>
            <span className='flex flex-row items-center justify-start text-center'>
              <MdAdminPanelSettings />
              <h1 className=' rounded-lg  p-2'>
                Administrador
              </h1>
            </span>
          </Link>

          <Link to={"/carrito"}
            onClick={() => setSelected("Carrito")}
            className={`px-5 py-2 rounded-lg hover:bg-gray-50 hover:text-black transition-all ${selected === "Carrito" ? 'bg-gray-50 text-black' : ''}`}>
            <span className='flex flex-row items-center justify-start text-center'>
              <FaShoppingCart />
              <h1 className=' rounded-lg  p-2'>
                Carrito
              </h1>
            </span>
          </Link>
        </div>


        <div className='flex md:hidden relative text-center  justify-center items-center '>

          <div className={`text-4xl transition-all duration-200 ${open ? 'rotate-90' : ''}`} onClick={() => setOpen(!open)}>
            {open && <IoMdClose className='text-4xl' onClick={() => setOpen(!open)} />}
            {open || <IoMdMenu className='text-4xl' onClick={() => setOpen(!open)} />}
          </div>
        </div>

      </div>

      { }
      <div className={` right-0 h-min rounded-l-lg z-40 text-white px-5 py-24  bg-black  fixed transition-all duration-500 ${open ? 'translate-x-0' : 'translate-x-full'} 
      text-xl 
      `}>
        <Link to={"/"}
          onClick={() => { setSelected("Home"), setOpen(false) }}
        >
          <span className='flex flex-row items-center justify-start text-center'>
            <FaHome />
            <h1 className='my-2 rounded-lg  p-2'>
              Home
            </h1>
          </span>
        </Link>

        <Link to={"/tienda"}
          onClick={() => { setSelected("Tienda"), setOpen(false) }}
        >
          <span className='flex flex-row items-center justify-start text-center'>
            <FaShoppingBag />
            <h1 className='my-2 rounded-lg  p-2'>
              Tienda
            </h1>
          </span>
        </Link>

        <Link to={"/DondeEstamos"}
          onClick={() => { setSelected("Donde estamos"), setOpen(false) }}
        >
          <span className='flex flex-row items-center justify-start text-center'>
            <SiGooglemaps />
            <h1 className='my-2 rounded-lg  p-2'>
              Dónde estamos
            </h1>
          </span>
        </Link>


        <Link to={"/admin"}
          onClick={() => { setSelected("Administrador"), setOpen(false) }}
        >
          <span className='flex flex-row items-center justify-start text-center'>
            <MdAdminPanelSettings />
            <h1 className='my-2 rounded-lg  p-2'>
              Administrador
            </h1>
          </span>
        </Link>
      </div >
      { }

    </>
  )
}

export default Navbar