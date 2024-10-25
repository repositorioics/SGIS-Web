import React from 'react';
import DisAutenticacion from '@/layout/DisAutenticacion';
import FormularioGeneral from '@/components/FormularioGeneral';
import { useTranslation } from 'react-i18next';

const PaginaRestablecerContrasena = ({ onSubmit }) => {
  const { t } = useTranslation();

  return (
    <DisAutenticacion
      titulo={t('restablecer_contrasena.titulo')}
      descripcion={t('restablecer_contrasena.descripcion')}
      imagenUrl="https://i.ibb.co/jhKYvQk/reset-Password.png"
      imagenAlt={t('restablecer_contrasena.imagenAlt')}
    >
      <h2 className='dis-autenticacion__titulo'>{t('restablecer_contrasena.introducir_nueva_contrasena')}</h2>
      <p className='dis-autenticacion__descripcion'>{t('restablecer_contrasena.instruccion_contrasena')}</p>
      <FormularioGeneral
        campos={[
          { name: 'password', type: 'password', placeholder: t('restablecer_contrasena.nueva_contrasena_placeholder') },
          { name: 'confirmPassword', type: 'password', placeholder: t('restablecer_contrasena.confirmar_contrasena_placeholder') }
        ]}
        textoBoton={t('restablecer_contrasena.restablecer_contrasena')}
        onSubmit={onSubmit}
        mostrarEnlace={false}
      />
    </DisAutenticacion>
  );
};

export default PaginaRestablecerContrasena;