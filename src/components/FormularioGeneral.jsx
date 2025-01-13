import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { validacionEmail, validacionPassword, validacionConfirmarPassword } from '@/utils/validaciones';
import '@/assets/styles/autenticacion/formulario.css';

const FormularioGeneral = ({ campos, textoBoton, onSubmit, mostrarEnlace, texto, url }) => {
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
            <div key={campo.name} className="formulario-general__grupo">
              <Field
                type={campo.type}
                name={campo.name}
                placeholder={campo.placeholder}
                className="formulario-general__input"
              />
              {touched[campo.name] && (
                <ErrorMessage
                  name={campo.name}
                  component="div"
                  className="formulario-general__error"
                />
              )}
            </div>
          ))}
          {mostrarEnlace && (
            <div className="formulario-general__enlace-Container">
              <Link to={url} className="formulario-general__enlace">
               {texto}
              </Link>
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="formulario-general__boton"
          >
            {textoBoton}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioGeneral;