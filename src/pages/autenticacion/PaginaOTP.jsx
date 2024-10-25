import React from 'react';
import DisAutenticacion from '@/layout/DisAutenticacion';
import FormularioGeneral from '@/components/FormularioGeneral';
import { useTranslation } from 'react-i18next';

const PaginaOTP = ({ onSubmit }) => {
  const { t } = useTranslation();

  return (
    <DisAutenticacion
      titulo={t('otp.titulo')}
      descripcion={t('otp.descripcion')}
      imagenUrl="https://i.ibb.co/Pj6XxtL/forgotpassword.png"
      imagenAlt={t('otp.imagenAlt')}
    >
      <h2 className='dis-autenticacion__titulo'>{t('otp.introducir_otp')}</h2>
      <p className='dis-autenticacion__descripcion'>{t('otp.instruccion_otp')}</p>
      <FormularioGeneral
        campos={[
          { name: 'otp', type: 'text', placeholder: '######' }
        ]}
        textoBoton={t('otp.enviar_otp')}
        onSubmit={onSubmit}
        mostrarEnlace={false}
      />
    </DisAutenticacion>
  );
};

export default PaginaOTP;