import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ContainerCards from '../components/pages/Tienda/ContainerCards';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal/Modal';
import Home from '../components/pages/Home/Home';
import DondeEstamos from '../components/pages/DondeEstamos/DondeEstamos';
import Footer from '../components/Footer/Footer';
import Table from '../components/Tabla/Table';
import Admin from '../components/pages/Admin/Admin';
import Carrito from '../components/pages/Carrito/Carrito';
import LogIn from '../components/pages/LogIn/LogIn';
import { RutaPrivada } from '../controlAcceso/RutaPrivada';
import { IRol } from '../entidades/IRol';
import RolUsuario from '../controlAcceso/RolUsuario';

const AppRoutes = () => {
  return (
    <>
      {/* {showSelector && showSelector2 && <Selector />} */}
      <Navbar />
      <Routes>
        <Route path="/tienda" element={<ContainerCards />} />
        <Route path="/instrumento/:id" element={<Modal />} />
        <Route path="/" element={<Home />} />
        <Route path="/DondeEstamos" element={<DondeEstamos />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        {/* <Route path="/carrito" element={<Carrito />} /> */}
        <Route path="/login" element={<LogIn />} />


        {/* CON ESTA ESTRUCTURA VAMOS A DEFINIR UNA RUTA PRIVADA SIN REESTRICCIÓN DE ROL */}
        <Route path="/carrito" element={
          <RutaPrivada>
            <Carrito />
          </RutaPrivada>
        } />


        {/* CON ESTA ESTRUCTURA DEFINIMOS UNA RUTA PRIVADA CON RESTRICCIÓN DE ROL */}
        <Route element={<RolUsuario rol={IRol.ADMIN} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
  
      </Routes>
      <Footer />
    </>
  );
}

export default AppRoutes