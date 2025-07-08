import { useState, useEffect } from 'react';

import {HardwareCard} from '../components/HardwareCard';
import { storageService } from '../services/StorageService';
import { Sidebar } from '../components/Sidebar';

import styles from "../styles/Home.module.css";

export function Home() {
  const [Hardware, setHardware] = useState([]);
  const [hardwareFiltrado, setHardwareFiltrado] = useState([]);

  const [filtro, setFiltro] = useState(null);
  const [tipo, setTipo] = useState(null);

  const toggleTipo = (novoTipo) => {
    setTipo(prev => {
      // Se o tipo for o mesmo, desmarcar
      if (prev === novoTipo) {
        setFiltro(null);
        return null;
      } else {
        setFiltro(null); // limpa fabricante ao mudar tipo
        return novoTipo;
      }
    });
  };

  const toggleFiltro = (novoFiltro) => {
    setFiltro(prev => (prev === novoFiltro ? null : novoFiltro));
  };

  useEffect(() => {
    const loadedHardware = storageService.getHardware();
    setHardware(loadedHardware);
  }, []);

  useEffect(() => {
  let filtrados = Hardware;

    // Aplica o filtro por tipo (CPU ou GPU)
    if (tipo) {
      filtrados = filtrados.filter(item => item.type === tipo);
    }

    // Aplica o filtro por fabricante *dentro do tipo*, se existir
    if (filtro) {
      filtrados = filtrados.filter(item =>
        item.manufactor.toLowerCase() === filtro.toLowerCase()
      );
    }

    setHardwareFiltrado(filtrados);
  }, [Hardware, tipo, filtro]);


  return (
    <div className={styles.Wrapper}>
      <Sidebar toggleTipo={toggleTipo} toggleFiltro={toggleFiltro} tipoSelecionado={tipo} filtroSelecionado={filtro} />

      <div className={styles.Hardware}>
        {hardwareFiltrado.map(hardware => (
          <HardwareCard key={hardware.id} Hardware={hardware} />
        ))}
      </div>
    </div>
  );
}
