import React from 'react';
import DisAutenticacion from '@/layout/DisAutenticacion';
import FormularioGeneral from '@/components/FormularioGeneral';
import { useTranslation } from 'react-i18next';

const PaginaLogin = ({ onSubmit }) => {
  const { t } = useTranslation();

  return (
    <DisAutenticacion
      titulo={t('login.titulo')}
      descripcion={t('login.descripcion')}
      imagenUrl="https://i.ibb.co/dQrq62c/iniciarsesion.png"
      imagenAlt={t('login.imagenAlt')}
    >
      <h2 className='dis-autenticacion__titulo'>{t('login.inicio_sesion')}</h2>
      <p className='dis-autenticacion__descripcion'>{t('login.instruccion_login')}</p>
      <FormularioGeneral
        campos={[
          { name: 'usuario', type: 'text', placeholder: t('login.correo_placeholder') }, 
          { name: 'password', type: 'password', placeholder: t('login.contrasena_placeholder') }
        ]}
        textoBoton={t('login.iniciar_sesion')}
        onSubmit={onSubmit}
        mostrarEnlace={true}
      />
    </DisAutenticacion>
  );
};

export default PaginaLogin;