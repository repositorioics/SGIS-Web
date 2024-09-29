import React from 'react';
import DisAutenticacion from '@/layout/DisAutenticacion';
import FormularioGeneral from '@/components/FormularioGeneral';

const PaginaRestablecerContrasena = ({ onSubmit }) => {
  return (
    <DisAutenticacion
      titulo="Secure Your Account"
      descripcion="For security reasons, create a new password that you haven't used before. Make sure your password is strong and easy to remember."
      imagenUrl="https://i.ibb.co/jhKYvQk/reset-Password.png"
      imagenAlt="Restablecer contraseña"
    >
      <h2 className='dis-autenticacion__titulo'>Reset Your Password</h2>
      <p className='dis-autenticacion__descripcion'>Enter your new password below to regain access to your account.</p>
      <FormularioGeneral
        campos={[
          { name: 'password', type: 'password', placeholder: 'Nueva contraseña' },
          { name: 'confirmPassword', type: 'password', placeholder: 'Confirmar contraseña' }
        ]}
        textoBoton="Restablecer contraseña"
        onSubmit={onSubmit}
        mostrarEnlace={false}
      />
    </DisAutenticacion>
  );
};

export default PaginaRestablecerContrasena;