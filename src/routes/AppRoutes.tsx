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
        <Route path="/admin" element={<Admin />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
      <Footer />
    </>
  );
}

export default AppRoutes