import styles from '../styles/Comment.module.css';

export function Comment({ texto}) {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  const nome = usuarioLogado?.nome || 'Visitante';
  return (
    <div className={styles.comment}>
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{nome}</strong>
            </div>
          </header>
          <p>{texto}</p>
        </div>
      </div>
    </div>
  );
}
