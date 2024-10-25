import React from 'react';
import { Box, Button, Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import '@/assets/styles/formularios.css'; // Importar estilos personalizados
import { useTranslation } from 'react-i18next';

/**
 * Renderiza el formulario de creación de requisa, junto con la funcionalidad de agregar detalles.
 */
const PaginaFormularioRequisa = ({
  requisa,
  detalleActual,
  detalles,
  sitios,
  insumos,
  presentaciones,
  onInputChange,
  onDetalleChange,
  onAgregarDetalle,
  onGuardarRequisa
}) => {
  const { t } = useTranslation(); // Hook de traducción

  // Definir columnas para la tabla de detalles agregados
  const columnasDetalles = [
    { field: 'insumoId', headerName: t('formularioRequisa.insumo'), flex: 1, renderCell: (params) => insumos.find(i => i.id === params.value)?.nombre || '' },
    { field: 'presentacionId', headerName: t('formularioRequisa.presentacion'), flex: 1, renderCell: (params) => presentaciones.find(p => p.id === params.value)?.nombre || '' },
    { field: 'cantidadPresentacionesSolicitada', headerName: t('formularioRequisa.cantidadSolicitada'), flex: 1 },
    { field: 'observacion', headerName: t('formularioRequisa.observacion'), flex: 1 },
  ];

  return (
    <Box className="formulario-container">
      <Typography component="h1" variant="h4" mb={1} className="formulario-titulo">
        {t('formularioRequisa.titulo')}
      </Typography>

      <Grid container spacing={2} className="formulario-grid">
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>{t('formularioRequisa.sitio')}</InputLabel>
            <Select name="sitioId" value={requisa.sitioId} onChange={onInputChange}>
              {Array.isArray(sitios) && sitios.map(sitio => (
                <MenuItem key={sitio.id} value={sitio.id}>{sitio.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label={t('formularioRequisa.creadoPor')}
            name="creadoPor"
            type="number"
            value={requisa.creadoPor}
            onChange={onInputChange}
            fullWidth
            margin="normal"
            className="formulario-input"
          />
        </Grid>

        <Grid item xs={12} mb={3}>
          <TextField
            label={t('formularioRequisa.observaciones')}
            name="observaciones"
            value={requisa.observaciones}
            onChange={onInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
            className="formulario-input"
          />
        </Grid>
      </Grid>

      <Typography component="h2" variant="h5" mt={7} className="formulario-titulo">
        {t('formularioRequisa.agregarDetalles')}
      </Typography>

      <Grid container spacing={2} className="formulario-grid">
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>{t('formularioRequisa.insumo')}</InputLabel>
            <Select name="insumoId" value={detalleActual.insumoId} onChange={onDetalleChange}>
              {Array.isArray(insumos) && insumos.map(insumo => (
                <MenuItem key={insumo.id} value={insumo.id}>{insumo.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>{t('formularioRequisa.presentacion')}</InputLabel>
            <Select name="presentacionId" value={detalleActual.presentacionId} onChange={onDetalleChange}>
              {Array.isArray(presentaciones) && presentaciones.map(presentacion => (
                <MenuItem key={presentacion.id} value={presentacion.id}>{presentacion.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label={t('formularioRequisa.cantidadSolicitada')}
            name="cantidadPresentacionesSolicitada"
            type="number"
            value={detalleActual.cantidadPresentacionesSolicitada}
            onChange={onDetalleChange}
            fullWidth
            margin="normal"
            className="formulario-input"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label={t('formularioRequisa.observacion')}
            name="observacion"
            value={detalleActual.observacion}
            onChange={onDetalleChange}
            fullWidth
            margin="normal"
            multiline
            rows={2}
            className="formulario-input"
          />
        </Grid>

        <Grid item xs={12} mb={3} mt={3}>
          <Button variant="contained" color="secondary" onClick={onAgregarDetalle} className="formulario-boton">
            {t('formularioRequisa.agregarDetalleBoton')}
          </Button>
        </Grid>
      </Grid>

      <TablaGenerica
        encabezado={t('formularioRequisa.detallesAgregados')}
        columnas={columnasDetalles}
        datos={detalles}
        mostrarCrear={false}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button variant="contained" color="primary" onClick={onGuardarRequisa} className="formulario-boton">
          {t('formularioRequisa.crearRequisaBoton')}
        </Button>
      </Box>
    </Box>
  );
};

export default PaginaFormularioRequisa;