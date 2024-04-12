import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {

  const [selected, setSelected] = useState("Home")

  return (
    <div className='w-full flex bg-black justify-around h-12 items-center py-10 fixed z-50 border-b border-white
    font-semibold text-white'>
      <Link to={"/"}
        onClick={() => setSelected("Home")}
        className={`px-5 py-2 rounded-lg hover:bg-gray-50 hover:text-black transition-all ${selected === "Home" ? 'bg-gray-50 text-black' : ''}`}>
        <h1 className=''>Home</h1>
      </Link>

      <Link to={"/tienda"}
        onClick={() => setSelected("Tienda")}
        className={`px-5 py-2 rounded-lg hover:bg-gray-50 hover:text-black transition-all ${selected === "Tienda" ? 'bg-gray-50 text-black' : ''}`}>
        <h1 className=''>Tienda</h1>
      </Link>

      <Link to={"/DondeEstamos"}
        onClick={() => setSelected("Donde estamos")}
        className={`px-5 py-2 rounded-lg hover:bg-gray-50 hover:text-black transition-all ${selected === "Donde estamos" ? 'bg-gray-50 text-black' : ''}`}>
        <h1 className=''>Dónde estamos</h1>
      </Link>
    </div>
  )
}

export default Navbar