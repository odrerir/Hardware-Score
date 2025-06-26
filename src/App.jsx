import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import { storageService } from './services/StorageService';

import { HardwareDetails } from './pages/HardwareDetails';
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
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
