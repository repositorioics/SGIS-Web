import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { obtenerTema } from '@/config/temas';
import * as Yup from 'yup';
import { validacionEmail, validacionPassword, validacionConfirmarPassword } from '@/utils/validaciones';
import '@/assets/styles/autenticacion/formulario.css';

const FormularioGeneral = ({ campos, textoBoton, onSubmit, mostrarEnlace }) => {
  const temaActual = useSelector((state) => state.tema.tema);
  const tema = obtenerTema(temaActual);

  const validaciones = campos.reduce((esquema, campo) => {
    switch (campo.name) {
      case 'email':
        esquema[campo.name] = validacionEmail;
        break;
      case 'password':
        esquema[campo.name] = validacionPassword;
        break;
      case 'confirmPassword':
        esquema[campo.name] = validacionConfirmarPassword;
        break;
      default:
        esquema[campo.name] = Yup.string().required('Requerido');
    }
    return esquema;
  }, {});

  const validationSchema = Yup.object().shape(validaciones);

  return (
    <Formik
      initialValues={campos.reduce((acc, campo) => {
        acc[campo.name] = '';
        return acc;
      }, {})}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, touched }) => (
        <Form className="formulario-general">
          {campos.map((campo) => (
            <div key={campo.name} className="formulario-general__grupo" style={{ color: tema.textoPrimario }}>
              <Field
                type={campo.type}
                name={campo.name}
                placeholder={campo.placeholder}
                className="formulario-general__input"
                style={{
                  backgroundColor: tema.fondo,
                  color: tema.textoPrimario,
                  borderColor: tema.colorPrimario,
                }}
              />
              {touched[campo.name] && <ErrorMessage name={campo.name} component="div" className="formulario-general__error" style={{ color: tema.colorError }} />}
            </div>
          ))}
          {mostrarEnlace && (
            <div className="formulario-general__enlace-Container">
              <Link to="/ingresar-email" style={{color: tema.colorPrimario}} className="formulario-general__enlace">Forgot your password?</Link>
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="formulario-general__boton"
            style={{
              backgroundColor: tema.colorPrimario,
              color: tema.textoPrimario,
            }}
          >
            {textoBoton}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioGeneral;