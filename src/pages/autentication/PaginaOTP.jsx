import React from 'react';
import DisAutenticacion from '@/layout/DisAutenticacion';
import FormularioGeneral from '@/components/FormularioGeneral';

const PaginaOTP = ({ onSubmit }) => {
  return (
    <DisAutenticacion
      titulo="Check Your Email"
      descripcion="We have sent a one-time password (OTP) to your registered email address.
                  Please check your inbox, and if you don't see it there, make sure to look in your spam or junk folder."
      imagenUrl="https://i.ibb.co/Pj6XxtL/forgotpassword.png"
      imagenAlt="OTP"
    >
      <h2 className='dis-autenticacion__titulo'>Enter OTP</h2>
      <p className='dis-autenticacion__descripcion'>To proceed, please enter the 6-digit OTP that we have sent to your email. This helps us verify your identity.</p>
      <FormularioGeneral
        campos={[
          { name: 'otp', type: 'text', placeholder: '######' }
        ]}
        textoBoton="Enviar OTP"
        onSubmit={onSubmit}
        mostrarEnlace={false}
      />
    </DisAutenticacion>
  );
};

export default PaginaOTP;