import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../assets/icons/Logo.svg';

import styles from '../styles/Register.module.css';

export function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.senha) {
      setError('Preencha todos os campos');
      return;
    }

    // Simula o armazenamento do usuário no localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const jaExiste = usuarios.find(u => u.email === formData.email);

    if (jaExiste) {
      setError('Email já cadastrado');
    } else {
      usuarios.push(formData);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      alert('Cadastro realizado com sucesso!');
      navigate('/');
    }
  };

  return (
    <div className={styles.Register}>
      <div className={styles.Slogan}>
        <div className={styles.Titulo}>
          <img src={Logo} alt="AvaliaTech Logo" className={styles.Logo} />
          AvaliaTech
        </div>
        <span>Faça seu cadastro</span>
      </div>

      <form onSubmit={handleSubmit} className={styles.registerForm}>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.formGroup}>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Digite seu nome"
          />
        </div>

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
            placeholder="Crie uma senha"
          />
        </div>

        <button type="submit" className={styles.submitBtn}>Cadastrar</button>
      </form>
    </div>
  );
}
