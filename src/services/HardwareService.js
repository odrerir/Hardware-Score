export const HardwareService = {
  calcularMediaAvaliacoes(avaliacao) {
    if (!avaliacao || typeof avaliacao !== 'object') return 0;
    const valores = Object.values(avaliacao).map(Number).filter(v => !isNaN(v));
    if (valores.length === 0) return 0;
    return valores.reduce((a, b) => a + b, 0) / valores.length;
  },

  adicionarHardware(formData) {
    return new Promise((resolve) => {
      if (!formData.avaliacao || typeof formData.avaliacao !== 'object') {
        return resolve({ error: 'Avaliação inválida' });
      }

      const mediaGeral = this.calcularMediaAvaliacoes(formData.avaliacao);

      const novaHardware = {
        ...formData,
        id: Date.now(),
        mediaGeral,
        pontosFortes: formData.pontosFortes
          ? formData.pontosFortes.split(',').map(ponto => ponto.trim())
          : []
      };

      try {
        const HardwaresAtuais = JSON.parse(localStorage.getItem('Hardware') || '[]');
        localStorage.setItem('Hardware', JSON.stringify([...HardwaresAtuais, novaHardware]));
        resolve(novaHardware);
      } catch (error) {
        resolve({ error: 'Erro ao salvar no localStorage' });
      }
    });
  },
};
