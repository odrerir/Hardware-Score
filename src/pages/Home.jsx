import { useState, useEffect } from 'react';

import {HardwareCard} from '../components/HardwareCard';
import { storageService } from '../services/StorageService';

import styles from "../styles/Home.module.css";

export function Home() {
  const [Hardware, setHardware] = useState([]);

  useEffect(() => {
    // Carrega as pecas de Hardware do localStorage
    const loadedHardware = storageService.getHardware();
    setHardware(loadedHardware);
  }, []);

  return (
    <div>
      <header>
        <h1 className={styles.titulo}>Hardware</h1>
      </header>
      <div className={styles.Hardware}>
        {Hardware.map(Hardware => (
          <HardwareCard
            key={Hardware.id}
            Hardware={Hardware} />
        ))}
      </div>
    </div>
  );
}
