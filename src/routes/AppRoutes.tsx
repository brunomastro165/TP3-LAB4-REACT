import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ContainerCards from '../components/ContainerCards';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal/Modal';
import Home from '../components/pages/Home/Home';
import DondeEstamos from '../components/pages/DondeEstamos/DondeEstamos';
import Footer from '../components/Footer/Footer';

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
      </Routes>
      <Footer />
    </>
  );
}

export default AppRoutes