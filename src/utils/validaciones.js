import * as Yup from "yup";

export const validacionEmail = Yup.string()
  .email("Correo electrónico inválido")
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "El formato del correo electrónico es inválido"
  )
  .required("El correo electrónico es obligatorio");

export const validacionPassword = Yup.string()
  .min(6, "La contraseña debe tener al menos 6 caracteres")
  .required("La contraseña es obligatoria");

export const validacionConfirmarPassword = Yup.string()
  .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
  .required("La confirmación de contraseña es obligatoria");