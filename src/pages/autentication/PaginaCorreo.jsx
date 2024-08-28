import React from 'react';
import DisAutenticacion from '@/layout/DisAutenticacion';
import FormularioGeneral from '@/components/FormularioGeneral';

const PaginaCorreo = ({ onSubmit }) => {
  return (
    <DisAutenticacion
      titulo="Forgot Password"
      descripcion="If you have forgotten your password, don't worry. 
                You can recover access to your account by following the steps on this page."
      imagenUrl="https://i.ibb.co/9W3ZpZm/send-Email.png"
      imagenAlt="Correo electrónico"
    >
      <h2 className='dis-autenticacion__titulo'>Enter your email</h2>
      <p className='dis-autenticacion__descripcion'>Enter the email address associated with your account, and we will send a code reset link to your email.</p>
      <FormularioGeneral
        campos={[
          { name: 'email', type: 'email', placeholder: 'ejemplo@gmail.com' }
        ]}
        textoBoton="Enviar enlace"
        onSubmit={onSubmit}
        mostrarEnlace={false}
      />
    </DisAutenticacion>
  );
};

export default PaginaCorreo;