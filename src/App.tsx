import { useState } from "react";
import Nav from './Nav';
import Home from './pages/Home';
import Mission from './pages/Mission';
import Merchant from './pages/Merchant';
import Informations from './pages/Informations';
import { Routes, Route } from "react-router-dom";
import Modal from './components/Modal';  // Componente Modal global

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <Nav openModal={openModal} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/merchant" element={<Merchant />} />
        <Route path="/informations" element={<Informations />} />
      </Routes>

      {isModalOpen && (
        <Modal closeModal={closeModal} />
      )}
    </div>
  );
}

export default App;
