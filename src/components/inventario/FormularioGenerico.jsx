import React from 'react';
import Seleccion from '@/components/comun/Seleccion';
import Entrada from '@/components/comun/Entrada';
import TextArea from '@/components/comun/TextArea';
import Boton from '@/components/comun/Boton';
import FormularioGrid from '@/components/inventario/FormularioGrid';
import Cargador from '@/components/Cargador';
import MensajeError from '@/components/MensajeError';
import '@/assets/styles/inventario/estilosInventario.css';

const FormularioGenerico = ({
  titulo,
  estaEditando,
  campos,
  manejarCambioCampo,
  manejarSubmit,
  manejarCancelar,
  estaEnviando,
  cargando,
  error,
}) => {
  if (cargando) {
    return <Cargador />;
  }

  if (error) {
    return <MensajeError mensaje={error.message} />;
  }

  return (
    <div className="seccion-inventario form-container">
      <div className="header">
        <h2 className="title">{estaEditando ? `Editar ${titulo}` : `Crear Nuevo ${titulo}`}</h2>
        <p className="subtitle">
          {estaEditando ? `Modifique los campos para editar el ${titulo.toLowerCase()}.` : `Complete el formulario para crear un nuevo ${titulo.toLowerCase()}.`}
        </p>
      </div>
      <form onSubmit={manejarSubmit} className="form">
        <FormularioGrid>
          {campos.map((campo) => (
            <div key={campo.name} className={`form-control ${campo.type === 'textarea' ? 'form-control-description' : ''}`}>
              <label htmlFor={campo.name}>{campo.label}</label>
              {campo.type === 'select' ? (
                <Seleccion
                  id={campo.name}
                  value={campo.value}
                  onChange={(value) => manejarCambioCampo(campo.name, value)}
                  options={campo.options}
                  placeholder={campo.placeholder}
                  isSearchable={campo.isSearchable}
                  isMulti={campo.isMulti}
                  required={campo.required}
                />
              ) : campo.type === 'textarea' ? (
                <TextArea
                  id={campo.name}
                  value={campo.value}
                  onChange={(e) => manejarCambioCampo(campo.name, e.target.value)}
                  required={campo.required}
                  placeholder={campo.placeholder}
                />
              ) : (
                <Entrada
                  id={campo.name}
                  value={campo.value}
                  onChange={(e) => manejarCambioCampo(campo.name, e.target.value)}
                  required={campo.required}
                  placeholder={campo.placeholder}
                />
              )}
            </div>
          ))}
        </FormularioGrid>
        <div className="form-row-end">
          <Boton
            etiqueta="Cancelar"
            onClick={manejarCancelar}
            className="btn btn-secondary"
            disabled={estaEnviando}
          />
          <Boton
            etiqueta={estaEditando ? 'Actualizar' : 'Crear'}
            type="submit"
            className="btn btn-primary"
            disabled={estaEnviando}
          />
        </div>
      </form>
    </div>
  );
};

export default FormularioGenerico;