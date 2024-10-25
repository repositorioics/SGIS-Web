import React from 'react';
import { Box, Button, Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import TablaGenerica from '@/components/inventario/TablaGenerica';
import { useTranslation } from 'react-i18next';
import '@/assets/styles/formularios.css';

const PaginaFormularioSolicitud = ({
  solicitud,
  detalleActual,
  detalles,
  usuarios,
  donantes,
  insumos,
  marcas,
  distribuidores,
  presentaciones,
  onInputChange,
  onDetalleChange,
  onAgregarDetalle,
  onGuardarSolicitud
}) => {
  const { t } = useTranslation(); // Usar hook de traducción

  // Definir las columnas para los detalles
  const columnasDetalles = [
    { field: 'insumoId', headerName: t('formularioSolicitud.insumo'), flex: 1, renderCell: (params) => insumos.find(i => i.id === params.value)?.nombre || '' },
    { field: 'marcaId', headerName: t('formularioSolicitud.marca'), flex: 1, renderCell: (params) => marcas.find(m => m.id === params.value)?.nombre || '' },
    { field: 'distribuidorId', headerName: t('formularioSolicitud.distribuidor'), flex: 1, renderCell: (params) => distribuidores.find(d => d.id === params.value)?.nombre || '' },
    { field: 'presentacionId', headerName: t('formularioSolicitud.presentacion'), flex: 1, renderCell: (params) => presentaciones.find(p => p.id === params.value)?.nombre || '' },
    { field: 'cantidadPresentaciones', headerName: t('formularioSolicitud.cantidad'), flex: 1 },
    { field: 'analistaSolicitante', headerName: t('formularioSolicitud.analista'), flex: 1 },
    { field: 'observacion', headerName: t('formularioSolicitud.observacion'), flex: 1 },
  ];

  return (
    <Box className="formulario-container">
      {/* Título del formulario */}
      <Typography component="h1" variant="h4" mb={1} className="formulario-titulo">
        {t('formularioSolicitud.crearSolicitud')}
      </Typography>

      {/* Sección del formulario principal */}
      <Grid container spacing={2} className="formulario-grid">
        <Grid item xs={12} sm={6}>
          <TextField
            label={t('formularioSolicitud.numeroSolicitud')}
            name="numeroSolicitud"
            value={solicitud.numeroSolicitud}
            onChange={onInputChange}
            fullWidth
            margin="normal"
            className="formulario-input"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>{t('formularioSolicitud.usuario')}</InputLabel> 
            <Select name="usuarioId" value={solicitud.usuarioId} onChange={onInputChange}>
              {Array.isArray(usuarios) && usuarios.map(usuario => (
                <MenuItem key={usuario.id} value={usuario.id}>{usuario.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>{t('formularioSolicitud.donante')}</InputLabel> 
            <Select name="donanteId" value={solicitud.donanteId} onChange={onInputChange}>
              {Array.isArray(donantes) && donantes.map(donante => (
                <MenuItem key={donante.id} value={donante.id}>{donante.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>{t('formularioSolicitud.estado')}</InputLabel> 
            <Select
              name="estado"
              value={solicitud.estado ? 1 : 0}
              onChange={(e) =>
                onInputChange({
                  target: { name: "estado", value: e.target.value === 1 },
                })
              }
            >
              <MenuItem value={1}>{t('formularioSolicitud.activo')}</MenuItem>
              <MenuItem value={0}>{t('formularioSolicitud.desactivado')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} style={{ marginBottom: '20px' }}>
          <TextField
            label={t('formularioSolicitud.observaciones')} 
            name="observaciones"
            value={solicitud.observaciones}
            onChange={onInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
            className="formulario-input"
          />
        </Grid>
      </Grid>

      {/* Sección de agregar detalles */}
      <Typography component="h2" variant="h5" mt={7} className="formulario-titulo">
        {t('formularioSolicitud.agregarDetalles')}
      </Typography>

      <Grid container spacing={2} className="formulario-grid">
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>{t('formularioSolicitud.insumo')}</InputLabel> 
            <Select name="insumoId" value={detalleActual.insumoId} onChange={onDetalleChange}>
              {Array.isArray(insumos) && insumos.map(insumo => (
                <MenuItem key={insumo.id} value={insumo.id}>{insumo.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>{t('formularioSolicitud.marca')}</InputLabel> 
            <Select name="marcaId" value={detalleActual.marcaId} onChange={onDetalleChange}>
              {Array.isArray(marcas) && marcas.map(marca => (
                <MenuItem key={marca.id} value={marca.id}>{marca.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>{t('formularioSolicitud.distribuidor')}</InputLabel> 
            <Select name="distribuidorId" value={detalleActual.distribuidorId} onChange={onDetalleChange}>
              {Array.isArray(distribuidores) && distribuidores.map(distribuidor => (
                <MenuItem key={distribuidor.id} value={distribuidor.id}>{distribuidor.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>{t('formularioSolicitud.presentacion')}</InputLabel> 
            <Select name="presentacionId" value={detalleActual.presentacionId} onChange={onDetalleChange}>
              {Array.isArray(presentaciones) && presentaciones.map(presentacion => (
                <MenuItem key={presentacion.id} value={presentacion.id}>{presentacion.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label={t('formularioSolicitud.cantidad')} 
            name="cantidadPresentaciones"
            type="number"
            value={detalleActual.cantidadPresentaciones}
            onChange={onDetalleChange}
            fullWidth
            margin="normal"
            className="formulario-input"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label={t('formularioSolicitud.analista')} 
            name="analistaSolicitante"
            value={detalleActual.analistaSolicitante}
            onChange={onDetalleChange}
            fullWidth
            margin="normal"
            className="formulario-input"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label={t('formularioSolicitud.observacion')} 
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

        <Grid item xs={12}  mb={3} mt={3}>
          <Button variant="contained" color="secondary" onClick={onAgregarDetalle} className="formulario-boton">
            {t('formularioSolicitud.agregarDetalle')} 
          </Button>
        </Grid>
      </Grid>

      <TablaGenerica
        encabezado={t('formularioSolicitud.detallesAgregados')}
        columnas={columnasDetalles}
        datos={detalles}
        mostrarCrear={false}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button variant="contained" color="primary" onClick={onGuardarSolicitud} className="formulario-boton">
          {t('formularioSolicitud.crearSolicitud')} 
        </Button>
      </Box>
    </Box>
  );
};

export default PaginaFormularioSolicitud;