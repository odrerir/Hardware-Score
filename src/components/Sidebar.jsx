import styles from '../styles/Sidebar.module.css';


export function Sidebar(){
    return(
        <aside className={styles.sidebar}>
            <h2>Filtros</h2>
            <div className={styles.filters}>
                <button className={styles.filterButton}>Processador</button>
                    <button className={styles.subFilters}>AMD</button>
                    <button className={styles.subFilters}>Intel</button>
            </div>

            <div className={styles.filters}>
                <button className={styles.filterButton}>Placa de video</button>
                    <button className={styles.subFilters}>NVIDIA</button>
                    <button className={styles.subFilters}>AMD</button>
            </div>
        </aside>
    );
}