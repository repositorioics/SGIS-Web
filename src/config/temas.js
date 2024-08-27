export const temas = {
    claro: {
      background: '#FFFFFF',
      color: '#1B1B1B',
      secondaryBackground: '#F0F0F0',
      secondaryColor: '#666',
      borderColor: '#CCCCCC',
      highlightColor: '#1476f8',
    },
    oscuro: {
      background: '#1B1B1B',
      color: '#FFFFFF',
      secondaryBackground: '#333333',
      secondaryColor: '#AAAAAA',
      borderColor: '#444444',
      highlightColor: '#BB86FC',
    }
  };
  
  export const obtenerTema = (tema) => temas[tema] || temas.claro;
