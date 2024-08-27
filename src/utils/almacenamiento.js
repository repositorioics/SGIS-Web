const validarClave = (clave) => {
  if (!clave || typeof clave !== 'string') {
    throw new Error('La clave proporcionada no es válida.');
  }
};

const validarToken = (token) => {
  if (!token || typeof token !== 'string') {
    throw new Error('El token proporcionado no es válido.');
  }
};

export const guardarToken = (clave, token) => {
  validarClave(clave);
  validarToken(token);
  localStorage.setItem(clave, token);
};

export const obtenerToken = (clave) => {
  validarClave(clave);
  return localStorage.getItem(clave);
};

export const eliminarToken = (clave) => {
  validarClave(clave);
  localStorage.removeItem(clave);
};

export const guardarRefreshToken = (clave, refreshToken) => {
  validarClave(clave);
  validarToken(refreshToken);
  localStorage.setItem(clave, refreshToken);
};

export const obtenerRefreshToken = (clave) => {
  validarClave(clave);
  return localStorage.getItem(clave);
};

export const eliminarRefreshToken = (clave) => {
  validarClave(clave);
  localStorage.removeItem(clave);
};