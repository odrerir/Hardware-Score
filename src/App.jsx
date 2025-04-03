import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import { storageService } from './services/StorageService';

import { HardwareDetails } from './pages/HardwareDetails';
import { Ranking } from './pages/Ranking';
import { Home } from './pages/Home';
import { NavBar } from './components/NavBar';
import { Admin } from './pages/Admin';


export function App() {
  // Inicializa o localStorage com dados mockados
  useEffect(() => {
    storageService.initializeStorage();
  }, []);

  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hardware/:id" element={<HardwareDetails />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
