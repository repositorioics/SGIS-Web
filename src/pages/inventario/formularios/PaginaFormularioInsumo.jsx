import React from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import "@/assets/styles/formularios.css";
import { useTranslation } from 'react-i18next';

const PaginaFormularioInsumo = ({
  insumo,
  categorias,
  unidadesMedida,
  marcas,
  distribuidores,
  presentaciones,
  onInputChange,
  onGuardarInsumo,
  isUpdating
}) => {
  const { t } = useTranslation(); // Usar hook de traducción

  return (
    <Box className="formulario-container">
      <Typography
        component="h1"
        variant="h4"
        mb={1}
        className="formulario-titulo"
      >
        {isUpdating ? t('formularioInsumo.actualizarTitulo') : t('formularioInsumo.crearTitulo')}
      </Typography>

      <Grid container spacing={2} className="formulario-grid">
        {/* Campo Nombre */}
        <Grid item xs={12} sm={6}>
          <TextField
            label={t('formularioInsumo.nombreLabel')}
            name="nombre"
            value={insumo.nombre}
            onChange={onInputChange}
            fullWidth
            margin="normal"
            className="formulario-input"
            autoComplete="off" // Desactivar autocompletado
          />
        </Grid>

        {/* Campo Descripción */}
        <Grid item xs={12} sm={6}>
          <TextField
            label={t('formularioInsumo.descripcionLabel')}
            name="descripcion"
            value={insumo.descripcion}
            onChange={onInputChange}
            fullWidth
            margin="normal"
            className="formulario-input"
            autoComplete="off" // Desactivar autocompletado
          />
        </Grid>

        {/* Selector Categoría */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>{t('formularioInsumo.categoriaLabel')}</InputLabel>
            <Select
              name="categoriaId"
              value={insumo.categoriaId}
              onChange={onInputChange}
              autoComplete="off" // Desactivar autocompletado
            >
              {categorias.length > 0 ? (
                categorias.map(categoria => (
                  <MenuItem key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>{t('formularioInsumo.cargandoCategorias')}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        {/* Selector Unidad de Medida */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>{t('formularioInsumo.unidadMedidaLabel')}</InputLabel>
            <Select
              name="unidadMedidaId"
              value={insumo.unidadMedidaId}
              onChange={onInputChange}
              autoComplete="off" // Desactivar autocompletado
            >
              {unidadesMedida.length > 0 ? (
                unidadesMedida.map(unidad => (
                  <MenuItem key={unidad.id} value={unidad.id}>
                    {unidad.nombre}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>{t('formularioInsumo.cargandoUnidades')}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        {/* Selector Marca */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>{t('formularioInsumo.marcaLabel')}</InputLabel>
            <Select
              name="marcasId"
              value={insumo.marcasId}
              onChange={onInputChange}
              multiple
              autoComplete="off" // Desactivar autocompletado
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 224,
                    width: 250,
                  },
                },
              }}
            >
              {marcas.length > 0 ? (
                marcas.map(marca => (
                  <MenuItem key={marca.id} value={marca.id}>
                    {marca.nombre}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>{t('formularioInsumo.cargandoMarcas')}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        {/* Selector Distribuidor */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>{t('formularioInsumo.distribuidorLabel')}</InputLabel>
            <Select
              name="distribuidoresId"
              value={insumo.distribuidoresId}
              onChange={onInputChange}
              multiple
              autoComplete="off" // Desactivar autocompletado
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 224,
                    width: 250,
                  },
                },
              }}
            >
              {distribuidores.length > 0 ? (
                distribuidores.map(distribuidor => (
                  <MenuItem key={distribuidor.id} value={distribuidor.id}>
                    {distribuidor.nombre}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>{t('formularioInsumo.cargandoDistribuidores')}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        {/* Selector Presentación */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>{t('formularioInsumo.presentacionLabel')}</InputLabel>
            <Select
              name="presentacionesId"
              value={insumo.presentacionesId}
              onChange={onInputChange}
              multiple
              autoComplete="off" // Desactivar autocompletado
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 224,
                    width: 250,
                  },
                },
              }}
            >
              {presentaciones.length > 0 ? (
                presentaciones.map(presentacion => (
                  <MenuItem key={presentacion.id} value={presentacion.id}>
                    {presentacion.nombre}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>{t('formularioInsumo.cargandoPresentaciones')}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        {/* Campo Estado para la actualización */}
        {isUpdating && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" className="formulario-select">
              <InputLabel>{t('formularioInsumo.estadoLabel')}</InputLabel>
              <Select
                name="activo"
                value={insumo.activo ? 1 : 0}
                onChange={(e) =>
                  onInputChange({
                    target: { name: 'activo', value: e.target.value === 1 },
                  })
                }
              >
                <MenuItem value={1}>{t('formularioInsumo.activo')}</MenuItem>
                <MenuItem value={0}>{t('formularioInsumo.desactivado')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}
      </Grid>

      {/* Botón de guardar */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onGuardarInsumo}
          className="formulario-boton"
        >
          {isUpdating ? t('formularioInsumo.botonActualizar') : t('formularioInsumo.botonCrear')}
        </Button>
      </Box>
    </Box>
  );
};

export default PaginaFormularioInsumo;