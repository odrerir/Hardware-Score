import styles from '../styles/Sidebar.module.css';

export function Sidebar({ toggleTipo, toggleFiltro, tipoSelecionado, filtroSelecionado }) {
  const isCPU = tipoSelecionado === 'CPU';
  const isGPU = tipoSelecionado === 'GPU';

  return (
    <aside className={styles.sidebar}>
      <h2>Filtros</h2>

      {/* Filtro de Processadores (CPU) */}
      <div className={styles.filters}>
        <button
          className={styles.filterButton}
          onClick={() => toggleTipo('CPU')}
          style={{ backgroundColor: isCPU ? '#ddd' : '' }}
        >
          Processador
        </button>

        {isCPU && (
          <>
            <button
              className={styles.subFilters}
              onClick={() => toggleFiltro('AMD')}
              style={{ backgroundColor: filtroSelecionado === 'AMD' ? '#ddd' : '' }}
            >
              AMD
            </button>
            <button
              className={styles.subFilters}
              onClick={() => toggleFiltro('Intel')}
              style={{ backgroundColor: filtroSelecionado === 'Intel' ? '#ddd' : '' }}
            >
              Intel
            </button>
          </>
        )}
      </div>

      {/* Filtro de Placas de Vídeo (GPU) */}
      <div className={styles.filters}>
        <button
          className={styles.filterButton}
          onClick={() => toggleTipo('GPU')}
          style={{ backgroundColor: isGPU ? '#ddd' : '' }}
        >
          Placa de vídeo
        </button>

        {isGPU && (
          <>
            <button
              className={styles.subFilters}
              onClick={() => toggleFiltro('nvidia')}
              style={{ backgroundColor: filtroSelecionado === 'nvidia' ? '#ddd' : '' }}
            >
              NVIDIA
            </button>
            <button
              className={styles.subFilters}
              onClick={() => toggleFiltro('AMD')}
              style={{ backgroundColor: filtroSelecionado === 'AMD' ? '#ddd' : '' }}
            >
              AMD
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
