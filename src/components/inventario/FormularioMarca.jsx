import React from 'react';
import FormularioGenerico from '@/components/inventario/FormularioGenerico.jsx';

const FormularioMarca = ({
  estaEditando,
  nombre,
  descripcion,
  estado,
  setNombre,
  setDescripcion,
  setEstado,
  handleGuardar,
  handleCancelar,
  loading,
  error,
}) => {
  const campos = [
    {
      name: 'nombre',
      label: 'Nombre de la Marca',
      value: nombre,
      placeholder: 'Ingrese el nombre de la marca...',
      required: true,
      onChange: (e) => setNombre(e.target.value),
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      value: descripcion,
      placeholder: 'Ingrese una descripción de la marca...',
      required: true,
      type: 'textarea',
      onChange: (e) => setDescripcion(e.target.value),
    },
    {
      name: 'estado',
      label: 'Estado',
      value: estado,
      options: [
        { value: 'activo', label: 'Activo' },
        { value: 'inactivo', label: 'Inactivo' },
      ],
      placeholder: 'Selecciona un estado...',
      type: 'select',
      isSearchable: true,
      required: true,
      onChange: (selectedOption) => setEstado(selectedOption),
    },
  ];

  return (
    <FormularioGenerico
      titulo="Marca"
      estaEditando={estaEditando}
      campos={campos}
      manejarCambioCampo={handleGuardar}
      manejarSubmit={handleGuardar}
      manejarCancelar={handleCancelar}
      cargando={loading}
      error={error}
    />
  );
};

export default FormularioMarca;