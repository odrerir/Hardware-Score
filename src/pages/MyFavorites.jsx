import { useState, useEffect } from 'react';

import {HardwareCard} from '../components/HardwareCard';
import { storageService } from '../services/StorageService';
import { Sidebar } from '../components/Sidebar';

import heart from '../assets/icons/heart.svg';

import styles from "../styles/MyFavorites.module.css";

export function MyFavorites() {
  const [Hardware, setHardware] = useState([]);

  useEffect(() => {
    // Carrega as pecas de Hardware do localStorage
    const loadedHardware = storageService.getHardware();
    setHardware(loadedHardware);
  }, []);

  return (
    <div className={styles.Wrapper}>
      <Sidebar>
          sidebar
      </Sidebar>

      <div className={styles.listProducts}>
        <h1>Meus Favoritos <img src={heart} alt="Coracao" /></h1>
        <div className={styles.Hardware}>
          {Hardware.map(Hardware => (
            <HardwareCard
              key={Hardware.id}
              Hardware={Hardware}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
