import { Link } from "react-router-dom";
import { useState } from "react";

import Profile from '../assets/icons/profile.svg';
import Logo from '../assets/icons/logo.svg';
import Pencil from '../assets/icons/pencil.svg';

import styles from "../styles/NavBar.module.css";

export function NavBar() {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen((prev) => !prev);

  return (
    <nav className={styles.navbar}>

      <div className={styles.navLinks}>
        <div className={styles.Titulo}>
          <img src={Logo} alt="AvaliaTech Logo" className={styles.Logo} />
          AvaliaTech
        </div>
        <Link to="/home" className={styles.navLink}>Home</Link>
        <Link to="/admin" className={`${styles.navLink} ${styles.addProduct}`}>Adicionar Hardware</Link>
      </div>

      <div className={styles.navLinks}>
        <div className={styles.dropdownContainer} onClick={toggleDropdown}>
          <span className={styles.perfil}>Perfil</span>
          <img
            src={Profile}
            alt="Ícone de perfil"
            className={styles.imagemPerfil}
          />

          {open && (
            <div className={styles.dropdownMenu}>
              <span className={styles.dropdownItem}>
                Nome:
                <span className={styles.itemText}>victor</span>
                <img src={Pencil} alt="editar" />
              </span>

              <span className={styles.dropdownItem}>
                Email:
                <span className={styles.itemText}>victorcaua@gmail.com</span>
                <img src={Pencil} alt="editar"/>
              </span>

              <Link to="/favorites" className={styles.dropdownItem}>Meus Favoritos</Link>
              <button className={styles.dropdownItem}>Sair</button>
            </div>
          )}
        </div>
      </div>

    </nav>
  );
}
