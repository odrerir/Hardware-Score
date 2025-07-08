import { initialData } from '../data/InitialData';

const STORAGE_KEY = 'Hardwares';
const FAVORITOS_KEY = 'Favoritos';

export const storageService = {
  // Inicializa o localStorage com os dados iniciais
  initializeStorage: () => {
    const existingData = localStorage.getItem(STORAGE_KEY);
    if (!existingData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    }
  },

  // Reseta o localStorage com os dados iniciais
  resetStorage: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    localStorage.removeItem(FAVORITOS_KEY);
  },
  
  resetUsuarios() {
    localStorage.removeItem('usuarios');
    localStorage.removeItem('usuarioLogado');
  },

  // Obtém todos os hardwares
  getHardware: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(data || '[]');
  },

  // Obtém um hardware específico por ID
  getHardwareById: (id) => {
    const hardwares = storageService.getHardware();
    return hardwares.find(hw => hw.id === Number(id));
  },

  // Adiciona um novo hardware
  addHardware: (hardware) => {
    const hardwares = storageService.getHardware();
    const newHardware = {
      ...hardware,
      id: Date.now(),
    };
    const updatedList = [...hardwares, newHardware];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    return newHardware;
  },

  // Atualiza um hardware existente
  updateHardware: (id, updatedData) => {
    const hardwares = storageService.getHardware();
    const index = hardwares.findIndex(hw => hw.id === Number(id));
    if (index !== -1) {
      hardwares[index] = { ...hardwares[index], ...updatedData };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(hardwares));
      return hardwares[index];
    }
    return null;
  },

  // Remove um hardware
  deleteHardware: (id) => {
    const hardwares = storageService.getHardware();
    const updatedList = hardwares.filter(hw => hw.id !== Number(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  },

  // FAVORITOS
  toggleFavorito: (hardwareId) => {
    const favoritos = JSON.parse(localStorage.getItem(FAVORITOS_KEY) || '[]');
    const existe = favoritos.includes(hardwareId);

    const atualizados = existe
      ? favoritos.filter(id => id !== hardwareId)
      : [...favoritos, hardwareId];

    localStorage.setItem(FAVORITOS_KEY, JSON.stringify(atualizados));
    return !existe;
  },

  isFavorito: (hardwareId) => {
    const favoritos = JSON.parse(localStorage.getItem(FAVORITOS_KEY) || '[]');
    return favoritos.includes(hardwareId);
  },

  getFavoritos: () => {
    return JSON.parse(localStorage.getItem(FAVORITOS_KEY) || '[]');
  },

  adicionarComentario: (hardwareId, comentario) => {
    const hardwares = storageService.getHardware();
    const index = hardwares.findIndex(hw => hw.id === Number(hardwareId));

    if (index !== -1) {
      const hw = hardwares[index];

      if (!hw.comentarios) {
        hw.comentarios = [];
      }

      hw.comentarios.push(comentario);

      localStorage.setItem('Hardwares', JSON.stringify(hardwares));
      return true;
    }

    return false;
  }

};
