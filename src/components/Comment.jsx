import styles from '../styles/Comment.module.css';

export function Comment(){
    return(
        <>
            <div className={styles.comment}>

                <div className={styles.commentBox}>
                    <div className={styles.commentContent}>
                        <header>
                            <div className={styles.authorAndTime}>
                                <strong>Victor caua</strong>
                            </div>
                        </header>

                        <p>Exelente peça!! 👏👏</p>
                    </div>

                </div>
            </div>

            <div className={styles.comment}>

                <div className={styles.commentBox}>
                    <div className={styles.commentContent}>
                        <header>
                            <div className={styles.authorAndTime}>
                                <strong>João Enrique</strong>
                            </div>
                        </header>

                        <p>Recomendo Para qualquer um que queira jogar!!</p>
                    </div>

                </div>
            </div>
        </>
    );
}