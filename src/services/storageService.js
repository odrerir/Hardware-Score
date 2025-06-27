import { initialData } from '../data/InitialData';

const STORAGE_KEY = 'Hardwares';

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
  }
};
