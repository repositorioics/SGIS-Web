import React from 'react';
import InputField from '@/components/forms/InputField';
import TextAreaField from '@/components/forms/TextAreaField';
import SelectField from '@/components/forms/SelectField';
import Cargador from '@/components/Cargador';
import MensajeError from '@/components/MensajeError';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import '@/assets/styles/formulario.css';

const PaginaFormularioSolicitud = ({
  solicitud,
  cargando,
  error,
  manejarCambio,
  manejarCambioDetalle,
  manejarAgregarDetalle,
  manejarEliminarDetalle,
  manejarEnviar,
}) => {
  if (cargando) return <Cargador />;
  if (error) return <MensajeError mensaje={error.message} />;

  return (
    <div className="formulario-solicitud">
      <h1>Gestión de Solicitudes</h1>
      <h3>{solicitud.id ? 'Editar Solicitud' : 'Crear Solicitud'}</h3>

      <form onSubmit={manejarEnviar}>
        <div className="formulario-grid">
          <InputField
            label="Número de Solicitud"
            name="numeroSolicitud"
            value={solicitud.numeroSolicitud}
            onChange={manejarCambio}
            required
          />

          <InputField
            label="Usuario ID"
            name="usuarioId"
            value={solicitud.usuarioId}
            onChange={manejarCambio}
          />

          <InputField
            label="Donante ID"
            name="donanteId"
            value={solicitud.donanteId}
            onChange={manejarCambio}
          />

          <SelectField
            label="Estado"
            name="estado"
            value={solicitud.estado}
            onChange={manejarCambio}
            options={[
              { value: 'SOLICITADO', label: 'Solicitado' },
              { value: 'AUTORIZADO', label: 'Autorizado' },
              { value: 'NO_AUTORIZADO', label: 'No Autorizado' },
            ]}
          />

          <TextAreaField
            label="Observaciones"
            name="observaciones"
            value={solicitud.observaciones}
            onChange={manejarCambio}
          />
        </div>

        <h3>Detalles de la Solicitud</h3>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Insumo ID</TableCell>
                <TableCell>Marca ID</TableCell>
                <TableCell>Distribuidor ID</TableCell>
                <TableCell>Presentación ID</TableCell>
                <TableCell>Cantidad Presentaciones</TableCell>
                <TableCell>Analista Solicitante</TableCell>
                <TableCell>Observación</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {solicitud.detalles.map((detalle, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <InputField
                      name="insumoId"
                      value={detalle.insumoId}
                      onChange={(e) => manejarCambioDetalle(e, index)}
                    />
                  </TableCell>
                  <TableCell>
                    <InputField
                      name="marcaId"
                      value={detalle.marcaId}
                      onChange={(e) => manejarCambioDetalle(e, index)}
                    />
                  </TableCell>
                  <TableCell>
                    <InputField
                      name="distribuidorId"
                      value={detalle.distribuidorId}
                      onChange={(e) => manejarCambioDetalle(e, index)}
                    />
                  </TableCell>
                  <TableCell>
                    <InputField
                      name="presentacionId"
                      value={detalle.presentacionId}
                      onChange={(e) => manejarCambioDetalle(e, index)}
                    />
                  </TableCell>
                  <TableCell>
                    <InputField
                      name="cantidadPresentaciones"
                      value={detalle.cantidadPresentaciones}
                      onChange={(e) => manejarCambioDetalle(e, index)}
                    />
                  </TableCell>
                  <TableCell>
                    <InputField
                      name="analistaSolicitante"
                      value={detalle.analistaSolicitante}
                      onChange={(e) => manejarCambioDetalle(e, index)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextAreaField
                      name="observacion"
                      value={detalle.observacion}
                      onChange={(e) => manejarCambioDetalle(e, index)}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => manejarEliminarDetalle(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          startIcon={<AddIcon />}
          onClick={manejarAgregarDetalle}
          variant="contained"
          color="primary"
          className="agregar-detalle-btn"
        >
          Agregar Detalle
        </Button>

        <Button type="submit" disabled={cargando} variant="contained" color="success" className="submit-btn">
          {solicitud.id ? 'Actualizar Solicitud' : 'Crear Solicitud'}
        </Button>
      </form>
    </div>
  );
};

export default PaginaFormularioSolicitud;