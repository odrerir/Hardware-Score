import { Link } from "react-router-dom";

import styles from "../styles/HardwareCard.module.css";

export function HardwareCard({ Hardware }) {
  return (
    <div className={styles.HardwareCard}>
      <Link to={`/Hardware/${Hardware.id}`}>
        <img
          src={Hardware.imagem}
          alt={Hardware.nome}
          className={styles.img}
        />
      </Link>

      <h2 className={styles.nome}>{Hardware.nome}</h2>
      <div className={styles.rating}>
        <span className={styles.score}>{Hardware.mediaGeral.toFixed(1)}</span>
        <span className={styles.scale}>/ 5.0</span>
      </div>
    </div>
  );
}
