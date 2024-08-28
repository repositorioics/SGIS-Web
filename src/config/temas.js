export const obtenerTema = (tema) => {
  return tema === 'claro' ? temaClaro : temaOscuro;
};

export const temaClaro = {
  fondo: '#FEFEFA',
  fondoSegundario:'#fff',
  fondoAlterno: '#1a87fd',
  textoPrimario: '#1B1B1B',
  textoSecundario: '#fff',
  colorPrimario: '#1a87fd',
  colorSecundario: '#1476f8',
  colorError: '#ff5636',
  colorExito: '#4caf50',
};

export const temaOscuro = {
  fondo: '#1B1B1B',
  fondoSegundario: '#121212',
  fondoAlterno: '#0d0c0c',
  textoPrimario: '#FEFEFA',
  textoSecundario: '#fff',
  colorPrimario: '#1a87fd',
  colorSecundario: '#1476f8',
  colorError: '#cf6679',
  colorExito: '#03dac6',
};