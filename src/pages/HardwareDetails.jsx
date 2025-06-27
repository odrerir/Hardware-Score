import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { storageService } from '../services/StorageService';
import { RatingBar } from '../components/RatingBar';
import { Comment } from '../components/Comment';

import sendIcon from '../assets/icons/send.svg';
import starHalf from '../assets/icons/star-half.svg';


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
        console.log('Hardware carregado:', found);
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
    <div className={styles.wrapper}>
      <div className={styles.avaliation}>

        <h1 className={styles.title}>{Hardware.nome}</h1>
        <img src={Hardware.imagem} alt={Hardware.nome} className={styles.imagem} />

        <div className={styles.ratingContainer}>
          <RatingBar value={Hardware.mediaGeral} />
        </div>

      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.ratingText}>Média Geral</div>

            <div className={styles.ratingNumber}>
              <div >{Hardware.mediaGeral.toFixed(1)}</div>
              <img src={starHalf} />
            </div>
        </div>


        <div className={styles.information}>
          <h2 className={styles.sectionTitle}>Informações</h2>
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Core/Threads:</span>
              <span className={styles.value}>{Hardware.cores}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Clock:</span>
              <span className={styles.value}>{Hardware.clock}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>TDP:</span>
              <span className={styles.value}>{Hardware.tdp}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Lançamento:</span>
              <span className={styles.value}>{Hardware.released}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Fabricante:</span>
              <span className={styles.value}>{Hardware.manufactor}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Tipo:</span>
              <span className={styles.value}>{Hardware.type}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.comments}>
        <h2 className={styles.sectionTitle}>Comentários</h2>

        <div className={styles.commentList}>
          <Comment />
          <Comment />

          <form className={styles.commentForm}>

            <div className={styles.textareaWrapper}>
              <textarea placeholder="Deixe seu comentário" />

              <button type="submit">
                <img src={sendIcon} alt="Enviar" />
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}
