import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { storageService } from '../services/StorageService.js';
import {RatingBar} from '../components/RatingBar.jsx';

import styles from "../styles/Ranking.module.css";

export function Ranking() {
  const [Hardware, setHardware] = useState([]);

  useEffect(() => {
    const loadedHardware = storageService.getHardware();
    // Ordena as pecas pela média geral em ordem decrescente
    const HardwareOrdenadas = [...loadedHardware].sort((a, b) => b.mediaGeral - a.mediaGeral);
    setHardware(HardwareOrdenadas);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ranking de Hardware</h1>
      <div className={styles.HardwareList}>
        {Hardware.map((Hardware, index) => (
          <div key={Hardware.id} className={styles.HardwareCard}>
            <div className="flex items-center gap-4">
              <span className={styles.HardwareIndex}>{index + 1}º</span>
              <img
                src={Hardware.imagem}
                alt={Hardware.nome}
                className={styles.HardwareImage}
              />
              <div className={styles.HardwareDetails}>
                <Link
                  to={`/Hardware/${Hardware.id}`}
                  className={styles.HardwareLink}
                >
                  {Hardware.nome}
                </Link>
                <div className={styles.HardwareRatings}>
                  <RatingBar label="Massa" value={Hardware.avaliacao.massa} />
                  <RatingBar label="Recheio" value={Hardware.avaliacao.recheio} />
                  <RatingBar label="Tempero" value={Hardware.avaliacao.tempero} />
                  <RatingBar label="Preço" value={Hardware.avaliacao.preco} />
                </div>
              </div>
              <div className={styles.generalRating}>
                <div className={styles.ratingValue}>
                  {pizzaria.mediaGeral.toFixed(1)}
                </div>
                <div className={styles.ratingLabel}>Média Geral</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
