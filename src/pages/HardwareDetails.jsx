import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { storageService } from '../services/StorageService';
import { RatingBar } from '../components/RatingBar';

import styles from "../styles/HardwareDetails.module.css";

export function HardwareDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Hardware, setHardware] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const found = storageService.getHardwareById(Number(id));
      if (found) {
        setHardware(found);
      } else {
        setError('Hardware não encontrada');
      }
    } catch (err) {
      setError('Erro ao carregar os dados da Hardware');
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.load}>Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          <p className={styles.errorText}>{error}</p>
          <button onClick={() => navigate('/')} className={styles.backButton}>
            Voltar para a página inicial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.goBack}>
        ← Voltar
      </button>

      <div className={styles.card}>
        <img src={Hardware.imagem} alt={Hardware.nome} className={styles.image} />

        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>{Hardware.nome}</h1>
            <div className={styles.rating}>
              <div className={styles.ratingNumber}>{Hardware.mediaGeral.toFixed(1)}</div>
              <div className={styles.ratingText}>Média Geral</div>
            </div>
          </div>

          <p className={styles.address}>{Hardware.endereco}</p>

          <div className={styles.grid}>
            <div>
              <h2 className={styles.sectionTitle}>Avaliações</h2>
              <div className={styles.spaceY}>
                <RatingBar label="Massa" value={Hardware.avaliacao.massa} />
                <RatingBar label="Recheio" value={Hardware.avaliacao.recheio} />
                <RatingBar label="Tempero" value={Hardware.avaliacao.tempero} />
                <RatingBar label="Preço" value={Hardware.avaliacao.preco} />
              </div>
            </div>

            <div>
              <h2 className={styles.sectionTitle}>Informações</h2>
              <div className={styles.spaceY}>
                <div>
                  <h3 className={styles.subTitle}>Descrição</h3>
                  <p className={styles.text}>{Hardware.descricao}</p>
                </div>

                <div>
                  <h3 className={styles.subTitle}>Horário de Funcionamento</h3>
                  <p className={styles.text}>{Hardware.horarioFuncionamento}</p>
                </div>

                <div>
                  <h3 className={styles.subTitle}>Contato</h3>
                  <p className={styles.text}>{Hardware.contato}</p>
                </div>

                <div>
                  <h3 className={styles.subTitle}>Pontos Fortes</h3>
                  <ul className={styles.list}>
                    {Hardware.pontosFortes.map((ponto, index) => (
                      <li key={index}>{ponto}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
