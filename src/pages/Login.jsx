import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Logo from '../assets/icons/Logo.svg';

import styles from '../styles/Login.module.css';

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulação de login
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuarios.find(
      (u) => u.email === formData.email && u.senha === formData.senha
    );

    if (usuarioEncontrado) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
      navigate('/home');
    } else {
      setError('Email ou senha inválidos!');
    }
  };

  return (
    <div className={styles.Login}>
      <div className={styles.Slogan}>
        <div className={styles.Titulo}>
            <img src={Logo} alt="AvaliaTech Logo" className={styles.Logo} />
            AvaliaTech
        </div>

        <span>Avalie, compartilhe e descubra o hardware ideal com a comunidade</span>
      </div>


      <form onSubmit={handleSubmit} className={styles.loginForm}>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Digite seu email"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
            placeholder="Digite sua senha"
          />
        </div>

        <button type="submit" className={styles.submitBtn}>Entrar</button>
        <span>Crie seu  <Link to="/register">cadastro</Link>. </span>

      </form>
    </div>
  );
}
