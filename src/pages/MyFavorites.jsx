import { useState, useEffect } from 'react';

import { HardwareCard } from '../components/HardwareCard';
import { storageService } from '../services/StorageService';
import { Sidebar } from '../components/Sidebar';

import heart from '../assets/icons/heart.svg';

import styles from "../styles/MyFavorites.module.css";

export function MyFavorites() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const allHardware = storageService.getHardware();             // Todos os hardwares
    const favoritosIds = storageService.getFavoritos();           // IDs dos favoritos

    // Filtra os hardwares que estão nos favoritos
    const favoritosData = allHardware.filter(hw =>
      favoritosIds.includes(hw.id)
    );

    setFavoritos(favoritosData);
  }, []);

  return (
    <div className={styles.Wrapper}>
      <Sidebar>
        sidebar
      </Sidebar>

      <div className={styles.listProducts}>
        <h1>
          Meus Favoritos <img src={heart} alt="Coração" />
        </h1>

        <div className={styles.Hardware}>
          {favoritos.length > 0 ? (
            favoritos.map(hw => (
              <HardwareCard key={hw.id} Hardware={hw} />
            ))
          ) : (
            <p>Nenhum hardware favoritado ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}
