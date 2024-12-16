import React from 'react';
import { Box, Grid, Container, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomTextField from '@/components/comun/CustomTextField';
import CustomButton from '@/components/comun/CustomButton';
import CustomSelect from '@/components/comun/CustomSelect';
import TablaDetalles from '@/components/TablaDetalles';

const PaginaFormularioAsignacion = ({
  bioanalistas,
  insumos,
  detalles,
  detalleActual,
  onDetalleChange,
  onAgregarDetalle,
  onEliminarDetalle,
  onGuardarAsignacion,
  selectedRows,
  setSelectedRows,
  handleRemoveDetail,
}) => {
  const { t } = useTranslation();

  // Configurar columnas para la tabla con header y field
  const columns = [
    { header: t('formularioAsignacion.columnaInsumo'), field: 'insumoNombre' },
    { header: t('formularioAsignacion.columnaCantidad'), field: 'cantidad' },
    { header: t('formularioAsignacion.columnaObservaciones'), field: 'observaciones' },
  ];

  // Mapear detalles para incluir el nombre del insumo antes de pasarlo a la tabla
  const detallesConNombre = detalles.map((detalle) => ({
    ...detalle,
    insumoNombre: insumos.find((insumo) => insumo.id === detalle.insumoId)?.nombre || t('formularioAsignacion.insumoNoEncontrado'),
  }));

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginY: 4 }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>
          {t('formularioAsignacion.titulo')}
        </h1>

        {/* Sección de datos principales */}
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6}>
            <CustomSelect
              label={t('formularioAsignacion.bioanalista')}
              name="bioanalistaId"
              value={detalleActual.bioanalistaId || ''}
              onChange={onDetalleChange}
              options={bioanalistas.map((bioanalista) => ({
                id: bioanalista.id,
                nombre: `${bioanalista.nombre} ${bioanalista.apellido}`,
              }))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              label={t('formularioAsignacion.observaciones')}
              name="observaciones"
              value={detalleActual.observaciones}
              onChange={onDetalleChange}
              fullWidth
              multiline
            />
          </Grid>
        </Grid>

        {/* Sección de detalles */}
        <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>
          {t('formularioAsignacion.detalles')}
        </h2>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6}>
            <CustomSelect
              label={t('formularioAsignacion.insumo')}
              name="insumoId"
              value={detalleActual.insumoId}
              onChange={onDetalleChange}
              options={insumos.map((insumo) => ({
                id: insumo.id,
                nombre: insumo.nombre,
              }))}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
              label={t('formularioAsignacion.cantidad')}
              name="cantidad"
              type="number"
              value={detalleActual.cantidad}
              onChange={onDetalleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
              label={t('formularioAsignacion.observacionesDetalle')}
              name="observaciones"
              value={detalleActual.observaciones}
              onChange={onDetalleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <CustomButton
              label={t('formularioAsignacion.agregarDetalle')}
              onClick={onAgregarDetalle}
            />
          </Grid>
        </Grid>

        {/* Tabla de detalles */}
        <Box sx={{ marginTop: 4 }}>
          <TablaDetalles
            detalles={detallesConNombre}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            columns={columns}
            handleRemoveDetail={handleRemoveDetail}
            onEliminarDetalle={onEliminarDetalle}
          />
        </Box>

        {/* Botón para guardar la asignación */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <CustomButton
            label={t('formularioAsignacion.guardar')}
            onClick={onGuardarAsignacion}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default PaginaFormularioAsignacion;