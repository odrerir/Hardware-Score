import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HardwareService } from '../services/HardwareService';
import styles from '../styles/Admin.module.css';

export function Admin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    imagem: '',
    cores: '',
    clock: '',
    tdp: '',
    released: '',
    manufactor: '',
    type: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file' && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imagem: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const formErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) formErrors[key] = 'Campo obrigatório';
    });
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await HardwareService.adicionarHardware(formData);
      if (response.error) {
        alert(`Erro: ${response.error}`);
      } else {
        alert('Hardware adicionado com sucesso!');
        navigate('/');
      }
    } catch (error) {
      alert(`Erro ao enviar os dados: ${error.message}`);
    }
  };

  return (
    <div className={styles.formPage}>
    <h1 className={styles.h1}>Adicionar Hardware</h1>
      <div className={styles.form}>
        <form onSubmit={handleSubmit} className={styles.formContainer} encType="multipart/form-data">

          {/* Imagem */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Imagem</label>
            <input
              type="file"
              name="imagem"
              accept="image/*"
              onChange={handleChange}
              className={styles.inputFile}
            />
            {errors.imagem && <span className={styles.error}>{errors.imagem}</span>}
          </div>

          {/* Campos de texto */}
          {Object.entries(formData)
            .filter(([key]) => key !== 'imagem')
            .map(([key, value]) => (
              <div key={key} className={styles.formGroup}>
                <label className={styles.label}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                </label>
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className={styles.input}
                />
                {errors[key] && <span className={styles.error}>{errors[key]}</span>}
              </div>
          ))}

        </form>
        <button type="submit" className={styles.submitBtn}>Adicionar Hardware</button>
      </div>
    </div>
  );
}
