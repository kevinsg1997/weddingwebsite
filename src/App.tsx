import Nav from './Nav';
import Home from './pages/Home';
import Mission from './pages/Mission';
import Merchant from './pages/Merchant';
import Informations from './pages/Informations';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/merchant" element={<Merchant />} />
          <Route path="/informations" element={<Informations />} />
        </Routes>
      </div>
    </>
  );
}

export default App;