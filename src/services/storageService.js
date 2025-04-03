import { initialHardwares } from '../data/InitialData';

const STORAGE_KEY = 'Hardwares';

export const storageService = {
  // Inicializa o localStorage com dados mockados se estiver vazio
  initializeStorage: () => {
    const existingData = localStorage.getItem(STORAGE_KEY);
    if (!existingData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialHardware));
    }
  },

  // Obtém todas as pecas de Hardware
  getHardware: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(data || '[]');
  },

  // Obtém uma Hardware específica por ID
  getHardwareById: (id) => {
    const Hardware = storageService.getHardware();
    return Hardware.find(p => p.id === Number(id));
  },

  // Adiciona uma nova Hardware
  addHardware: (Hardware) => {
    const Hardware = storageService.getHardware();
    const newHardware = {
      ...Hardware,
      id: Date.now(), // Gera um ID único baseado no timestamp
    };
    Hardware.push(newHardware);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Hardware));
    return newHardware;
  },

  // Atualiza um Hardware existente
  updateHardware: (id, updatedData) => {
    const Hardware = storageService.getHardware();
    const index = Hardware.findIndex(p => p.id === Number(id));
    if (index !== -1) {
      Hardware[index] = { ...Hardware[index], ...updatedData };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Hardware));
      return Hardware[index];
    }
    return null;
  },

  // Remove um Hardware
  deleteHardware: (id) => {
    const Hardware = storageService.getHardware();
    const filteredHardware = Hardware.filter(p => p.id !== Number(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredHardware));
  }
};