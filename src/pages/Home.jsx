import { useState, useEffect } from 'react';

import {HardwareCard} from '../components/HardwareCard';
import { storageService } from '../services/StorageService';
import { Sidebar } from '../components/Sidebar';

import styles from "../styles/Home.module.css";

export function Home() {
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

      <div className={styles.Hardware}>
        {Hardware.map(Hardware => (
          <HardwareCard
            key={Hardware.id}
            Hardware={Hardware}
          />
        ))}
      </div>
    </div>
  );
}
