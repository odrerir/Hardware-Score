import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { storageService } from './services/StorageService';

import { HardwareDetails } from './pages/HardwareDetails';
import { Home } from './pages/Home';
import { NavBar } from './components/NavBar';
import { Admin } from './pages/Admin';
import { MyFavorites } from './pages/MyFavorites';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function AppRoutes() {
  const location = useLocation();
  const hideNavBar = location.pathname === '/' || location.pathname === '/register';

  return (
    <>
      {!hideNavBar && <NavBar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/hardware/:id" element={<HardwareDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/favorites" element={<MyFavorites />} />
      </Routes>
    </>
  );
}

export function App() {
  useEffect(() => {
    storageService.resetStorage();
    storageService.initializeStorage();
  }, []);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
