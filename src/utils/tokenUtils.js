// src/utils/tokenUtils.js
import jwtDecode from "jwt-decode";

export const decodificarToken = (token) => {
  if (token) {
    return jwtDecode(token);
  }
  return null;
};

export const obtenerUsuarioActual = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    return decodificarToken(token);
  }
  return null;
};