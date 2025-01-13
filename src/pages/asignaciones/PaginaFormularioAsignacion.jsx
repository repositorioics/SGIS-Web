import React from 'react';
import { Box, Grid, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomTextField from '@/components/comun/CustomTextField';
import CustomButton from '@/components/comun/CustomButton';
import CustomSelect from '@/components/comun/CustomSelect';
import CustomTypography from '@/components/comun/CustomTypography';
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
  bioanalistaSeleccionado,
  setBioanalistaSeleccionado,
}) => {
  const { t } = useTranslation();

  // Configurar columnas para la tabla con header y field
  const columns = [
    { header: t('formularioAsignacion.columnaInsumo'), field: 'insumoNombre' },
    { header: t('formularioAsignacion.columnaCantidad'), field: 'cantidad' },
    { header: t('formularioAsignacion.columnaObservaciones'), field: 'observacionesDetalle' },
  ];

  // Mapear detalles para incluir el nombre del insumo antes de pasarlo a la tabla
  const detallesConNombre = detalles.map((detalle) => ({
    ...detalle,
    insumoNombre: insumos.find((insumo) => insumo.id === detalle.insumoId)?.nombre || t('formularioAsignacion.insumoNoEncontrado'),
  }));

  return (
    <Container maxWidth="md">
      <Box sx={{ padding: 4, marginY: 2 }}>
        <CustomTypography
          variant="h4"
          className="formulario-titulo"
          textAlign="left"
        >
          {t('formularioAsignacion.titulo')}
        </CustomTypography>
        <CustomTypography
          variant="subtitle1"
          color="textSecondary"
          className="formulario-subtitulo"
          textAlign="left"
        >
          {t('formularioAsignacion.subtituloDatosGenerales')}
        </CustomTypography>

        {/* Sección de datos principales */}
        <Grid container spacing={2} mt={0}>
          <Grid item xs={12} sm={6}>
            <CustomSelect
              label={t('formularioAsignacion.bioanalista')}
              name="bioanalistaId"
              value={detalleActual.bioanalistaId || ''}
              onChange={(e) => {
                if (!bioanalistaSeleccionado) {
                  onDetalleChange(e);
                  setBioanalistaSeleccionado(true); // Bloquear después de la selección inicial
                }
              }}
              options={bioanalistas.map((bioanalista) => ({
                id: bioanalista.id,
                nombre: `${bioanalista.nombre} ${bioanalista.apellido}`,
              }))}
              disabled={bioanalistaSeleccionado} // Bloquear después de seleccionar
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

        <CustomTypography
          variant="h4"
          className="formulario-titulo"
          textAlign="left"
          sx={{ marginTop: 2 }}
        >
          {t('formularioAsignacion.detalles')}
        </CustomTypography>
        <CustomTypography
          variant="subtitle1"
          color="textSecondary"
          className="formulario-subtitulo"
          textAlign="left"
        >
          {t('formularioAsignacion.subtituloDetalles')}
        </CustomTypography>

        {/* Sección de detalles */}
        <Grid container spacing={2} mt={0}>
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
              name="observacionesDetalle"
              value={detalleActual.observacionesDetalle}
              onChange={onDetalleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <CustomButton
              label={t('formularioAsignacion.agregarDetalle')}
              variant="contained"
              color="secondary"
              onClick={onAgregarDetalle}
              className="formulario-boton"
              sx={{ mb: 2 }}
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
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, marginBottom: 4 }}>
          <CustomButton
            label={t('formularioAsignacion.guardar')}
            variant="contained"
            color="primary"
            onClick={onGuardarAsignacion}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default PaginaFormularioAsignacion;