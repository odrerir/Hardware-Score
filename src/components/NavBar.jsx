import { Link } from "react-router-dom";

import Perfil from '../assets/icons/Perfil.png';
import Logo from '../assets/icons/Logo.png';

import styles from "../styles/NavBar.module.css";

export function NavBar() {
  return (
    <nav className={styles.navbar}>

      <div className={styles.navLinks}>
        <div className={styles.Titulo}>
          <img src={Logo} alt="AvaliaTech Logo" className={styles.Logo}/>
          AvaliaTech
        </div>
        <Link to="/" className={styles.navLink}>Home</Link>
        <Link to="/admin" className={`${styles.navLink} ${styles.addProduct}`}>Adicionar Hardware</Link>
      </div>

      <div className={styles.navLinks}>
        <Link to="/perfil" className={styles.perfil}>Perfil</Link>
        <img src={Perfil} alt="Icone Perfil" className={styles.imagemPerfil}/>
      </div>

    </nav>
  );
}
