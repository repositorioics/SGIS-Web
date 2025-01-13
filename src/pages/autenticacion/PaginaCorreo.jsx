import React from 'react';
import DisAutenticacion from '@/layout/DisAutenticacion';
import FormularioGeneral from '@/components/FormularioGeneral';
import { useTranslation } from 'react-i18next';

const PaginaCorreo = ({ onSubmit }) => {
  const { t } = useTranslation();

  return (
    <DisAutenticacion
      titulo={t('correo.titulo')}
      descripcion={t('correo.descripcion')}
      imagenUrl="https://i.ibb.co/9W3ZpZm/send-Email.png"
      imagenAlt={t('correo.imagenAlt')}
    >
      <div className="dis-autenticacion__contenido">
        <h2 className="dis-autenticacion__titulo">{t('correo.introducir_correo')}</h2>
        <p className="dis-autenticacion__descripcion">{t('correo.instruccion_correo')}</p>
        <FormularioGeneral
          campos={[
            { name: 'email', type: 'email', placeholder: 'ejemplo@gmail.com', required: true },
          ]}
          textoBoton={t('correo.enviar_enlace')}
          onSubmit={onSubmit}
          mostrarEnlace={true}
          texto={t('correo.volver_inicio_sesion')} // Traducción para "Back to Login"
          url="/inicio-sesion"
        />
      </div>
    </DisAutenticacion>
  );
};

export default PaginaCorreo;