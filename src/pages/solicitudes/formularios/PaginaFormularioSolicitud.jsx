import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '@/assets/styles/formularios.css';
import CustomTextField from '@/components/comun/CustomTextField';
import CustomButton from '@/components/comun/CustomButton';
import CustomTypography from '@/components/comun/CustomTypography';
import CustomSelect from '@/components/comun/CustomSelect';
import TablaDetalles from '@/components/TablaDetalles';

const PaginaFormularioSolicitud = ({
  solicitud,
  detalleActual,
  insumoIdSeleccionado,
  detalles,
  usuarios,
  donantes,
  insumos,
  marcas,
  distribuidores,
  presentaciones,
  estudios,
  bioanalistas,
  onInputChange,
  onDetalleChange,
  onAgregarDetalle,
  onEliminarSeleccionados,
  onGuardarSolicitud,
  selectedRows,
  setSelectedRows,
  columns,
  errors,
  touched,
  usuarioNombre,
  proximoNumeroSolicitud,
  estadoDeshabilitado,
  handleRemoveDetail
}) => {
  const { t } = useTranslation();

  const insumoSeleccionado = Boolean(insumoIdSeleccionado);

  return (
    <Box sx={{ padding: 5 }}>
      <CustomTypography variant="h4" className="formulario-titulo" textAlign="left">
        {t('formularioSolicitud.crearSolicitud')}
      </CustomTypography>

      <CustomTypography variant="subtitle1" color="textSecondary" className="formulario-subtitulo" textAlign="left">
        {t('formularioSolicitud.ingreseDatosGenerales')}
      </CustomTypography>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t('formularioSolicitud.numeroSolicitud')}
            name="numeroSolicitud"
            value={proximoNumeroSolicitud}
            onChange={onInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.numeroSolicitud)}
            helperText={errors.numeroSolicitud}
            touched={touched.numeroSolicitud}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t('formularioSolicitud.usuario')}
            name="usuarioId"
            value={usuarioNombre}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            helperText={errors.usuarioId}
            error={Boolean(errors.usuarioId)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomSelect
            label={t('formularioSolicitud.donante')}
            name="donanteId"
            value={solicitud.donanteId}
            onChange={onInputChange}
            options={donantes.map((donante) => ({ id: donante.id, nombre: donante.nombre }))}
            error={errors.donanteId}
            touched={touched.donanteId}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t('formularioSolicitud.estado')}
            name="estadoNombre"
            value={solicitud.estadoNombre || t('formularioSolicitud.solicitado')}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <CustomTextField
            label={t('formularioSolicitud.observaciones')}
            name="observaciones"
            value={solicitud.observaciones}
            onChange={onInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
            error={Boolean(errors.observaciones)}
            helperText={errors.observaciones}
            touched={touched.observaciones}
          />
        </Grid>
      </Grid>

      <CustomTypography variant="h5" className="formulario-titulo" mt={2} textAlign="left">
        {t('formularioSolicitud.agregarDetalles')}
      </CustomTypography>

      <Grid container spacing={2} className="formulario-grid" sx={{ width: '100%' }}>
        <Grid item xs={12} sm={4}>
          <CustomSelect
            label={t('formularioSolicitud.insumo')}
            name="insumoId"
            value={detalleActual.insumoId}
            onChange={onDetalleChange}
            options={insumos.map((insumo) => ({
              id: insumo.id,
              nombre: `${insumo.nombre} - ${insumo.unidadMedida.nombre} (${insumo.valorUnidadMedida})`,
            }))}
            error={errors.insumoId}
            touched={touched.insumoId}
            placeholder={t('formularioSolicitud.seleccioneInsumo')}
          />
        </Grid>

        {/* Mostrar marcas solo si hay un insumo seleccionado */}
        <Grid item xs={12} sm={4}>
          <CustomSelect
            label={t('formularioSolicitud.marca')}
            name="marcaId"
            value={detalleActual.marcaId}
            onChange={onDetalleChange}
            options={(insumoSeleccionado ? marcas : []).map((marca) => ({
              id: marca.id,
              nombre: marca.nombre,
            }))}
            error={errors.marcaId}
            touched={touched.marcaId}
            disabled={!insumoSeleccionado}
            placeholder={!insumoSeleccionado ? t('formularioSolicitud.seleccioneInsumoPrimero') : ''}
          />
        </Grid>

        {/* Mostrar distribuidores solo si hay un insumo seleccionado */}
        <Grid item xs={12} sm={4}>
          <CustomSelect
            label={t('formularioSolicitud.distribuidor')}
            name="distribuidorId"
            value={detalleActual.distribuidorId}
            onChange={onDetalleChange}
            options={(insumoSeleccionado ? distribuidores : []).map((distribuidor) => ({
              id: distribuidor.id,
              nombre: distribuidor.nombre,
            }))}
            error={errors.distribuidorId}
            touched={touched.distribuidorId}
            disabled={!insumoSeleccionado}
            placeholder={!insumoSeleccionado ? t('formularioSolicitud.seleccioneInsumoPrimero') : ''}
          />
        </Grid>

        {/* Mostrar presentaciones solo si hay un insumo seleccionado */}
        <Grid item xs={12} sm={4}>
          <CustomSelect
            label={t('formularioSolicitud.presentacion')}
            name="presentacionId"
            value={detalleActual.presentacionId}
            onChange={onDetalleChange}
            options={(insumoSeleccionado ? presentaciones : []).map((presentacion) => ({
              id: presentacion.id,
              nombre: presentacion.nombre,
            }))}
            error={errors.presentacionId}
            touched={touched.presentacionId}
            disabled={!insumoSeleccionado}
            placeholder={!insumoSeleccionado ? t('formularioSolicitud.seleccioneInsumoPrimero') : ''}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t('formularioSolicitud.cantidad')}
            name="cantidadPresentaciones"
            type="number"
            value={detalleActual.cantidadPresentaciones}
            onChange={onDetalleChange}
            fullWidth
            inputProps={{ min: 1 }}
            margin="normal"
            error={Boolean(errors.cantidadPresentaciones)}
            helperText={errors.cantidadPresentaciones}
            touched={touched.cantidadPresentaciones}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomSelect
            label={t('formularioSolicitud.estudio')}
            name="estudioId"
            value={detalleActual.estudioId}
            onChange={onDetalleChange}
            options={estudios.map((estudio) => ({ id: estudio.id, nombre: estudio.nombre }))}
            error={errors.estudioId}
            touched={touched.estudioId}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomSelect
            label={t('formularioSolicitud.analista')}
            name="bioanalistaId"
            value={detalleActual.bioanalistaId}
            onChange={onDetalleChange}
            options={bioanalistas.map((analista) => ({ id: analista.id, nombre: `${analista.nombre} ${analista.apellido}` }))}
            error={errors.bioanalistaId}
            touched={touched.bioanalistaId}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <CustomTextField
            label={t('formularioSolicitud.observacion')}
            name="observacion"
            value={detalleActual.observacion}
            onChange={onDetalleChange}
            fullWidth
            margin="normal"
            multiline
            rows={2}
            error={Boolean(errors.observacion)}
            helperText={errors.observacion}
            touched={touched.observacion}
          />
        </Grid>
        <Grid container justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
          <CustomButton
            variant="contained"
            color="secondary"
            onClick={onAgregarDetalle}
            className="formulario-boton"
            label={t('formularioSolicitud.agregarDetalle')}
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>

      <CustomTypography variant="h5" mt={2} textAlign="left">
        {t('formularioSolicitud.detallesAgregados')}
      </CustomTypography>
      <CustomTypography variant="subtitle2" color="textSecondary" textAlign="left" mb={2}>
        {t('formularioSolicitud.descripcionDetalles')}
      </CustomTypography>

      <TablaDetalles
        detalles={detalles}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        columns={columns}
        handleRemoveDetail={handleRemoveDetail}
      />

      <Box sx={{mb: 4, width: '100%' }}>
        <CustomButton
          variant="contained"
          color="primary"
          onClick={onGuardarSolicitud}
          label={t('formularioSolicitud.crearSolicitud')}
        />
      </Box>
    </Box>
  );
};

export default PaginaFormularioSolicitud;