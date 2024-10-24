import React from 'react';
import DisAutenticacion from '@/layout/DisAutenticacion';
import FormularioGeneral from '@/components/FormularioGeneral';

const PaginaLogin = ({ onSubmit }) => {
  return (
    <DisAutenticacion
      titulo="ICS Inventory System"
      descripcion="Manage warehouse inventory, orders, and deliveries efficiently with the ICS Inventory System."
      imagenUrl="https://i.ibb.co/dQrq62c/iniciarsesion.png"
      imagenAlt="Inicio de sesión"
    >
      <h2 className='dis-autenticacion__titulo'>Login to Your Account</h2>
      <p className='dis-autenticacion__descripcion'>Enter your email and password to access your account and manage your inventory.</p>
      <FormularioGeneral
        campos={[
          { name: 'usuario', type: 'text', placeholder: 'Correo electrónico' },  // Cambié "username" por "usuario"
          { name: 'password', type: 'password', placeholder: 'Contraseña' }
        ]}
        textoBoton="Iniciar sesión"
        onSubmit={onSubmit}
      />
    </DisAutenticacion>
  );
};

export default PaginaLogin;