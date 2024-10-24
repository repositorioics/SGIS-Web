const validarClave = (clave) => {
  if (!clave || typeof clave !== "string") {
    throw new Error("La clave proporcionada no es válida.");
  }
};

const validarToken = (token) => {
  if (!token || typeof token !== "string") {
    throw new Error("El token proporcionado no es válido.");
  }
};

export const guardarToken = (clave, token) => {
  validarClave(clave);
  validarToken(token);
  sessionStorage.setItem(clave, token);  // Cambiado a sessionStorage
};

export const obtenerToken = (clave) => {
  // validarClave(clave);
  return sessionStorage.getItem(clave);  // Cambiado a sessionStorage
};

export const eliminarToken = (clave) => {
  validarClave(clave);
  sessionStorage.removeItem(clave);  // Cambiado a sessionStorage
};

export const guardarRefreshToken = (clave, refreshToken) => {
  validarClave(clave);
  validarToken(refreshToken);
  sessionStorage.setItem(clave, refreshToken);  // Cambiado a sessionStorage
};

export const obtenerRefreshToken = (clave) => {
  validarClave(clave);
  return sessionStorage.getItem(clave);  // Cambiado a sessionStorage
};

export const eliminarRefreshToken = (clave) => {
  validarClave(clave);
  sessionStorage.removeItem(clave);  // Cambiado a sessionStorage
};