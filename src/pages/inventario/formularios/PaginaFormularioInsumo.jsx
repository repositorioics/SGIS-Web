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
import TablaGenerica from "@/components/inventario/TablaGenerica";
import "@/assets/styles/formularios.css"; // Importar el archivo CSS

const PaginaFormularioInsumo = ({
  insumo,
  varianteActual,
  variantes,
  categorias,
  unidadesMedida,
  marcas,
  distribuidores,
  presentaciones,
  onInputChange,
  onVarianteChange,
  onAgregarVariante,
  onGuardarInsumo,
}) => {
  const columnasVariantes = [
    {
      field: "marcaId",
      headerName: "Marca",
      flex: 1,
      renderCell: (params) =>
        marcas?.find((m) => m.id === params.value)?.nombre || "",
    },
    {
      field: "distribuidorId",
      headerName: "Distribuidor",
      flex: 1,
      renderCell: (params) =>
        distribuidores?.find((d) => d.id === params.value)?.nombre || "",
    },
    {
      field: "presentacionId",
      headerName: "Presentación",
      flex: 1,
      renderCell: (params) =>
        presentaciones?.find((p) => p.id === params.value)?.nombre || "",
    },
    { field: "codigoBarra", headerName: "Código de Barra", flex: 1 },
    { field: "modeloMarca", headerName: "Modelo Marca", flex: 1 },
  ];

  return (
    <Box className="formulario-container">
      <Typography component="h1" variant="h4" mb={1} className="formulario-titulo">
        Crear Insumo
      </Typography>

      <Grid container spacing={2} className="formulario-grid">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre del Insumo"
            name="nombre"
            value={insumo.nombre}
            onChange={onInputChange}
            fullWidth
            margin="normal"
            className="formulario-input"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Descripción"
            name="descripcion"
            value={insumo.descripcion}
            onChange={onInputChange}
            fullWidth
            margin="normal"
            className="formulario-input"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>Categoría</InputLabel>
            <Select
              name="categoriaId"
              value={insumo.categoriaId}
              onChange={onInputChange}
            >
              {Array.isArray(categorias) && categorias.length > 0 ? (
                categorias.map((categoria) => (
                  <MenuItem key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Cargando categorías...</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>Unidad de Medida</InputLabel>
            <Select
              name="unidadMedidaId"
              value={insumo.unidadMedidaId}
              onChange={onInputChange}
            >
              {Array.isArray(unidadesMedida) && unidadesMedida.length > 0 ? (
                unidadesMedida.map((unidad) => (
                  <MenuItem key={unidad.id} value={unidad.id}>
                    {unidad.nombre}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Cargando unidades de medida...</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Valor de Unidad de Medida"
            name="valorUnidadMedida"
            type="number"
            value={insumo.valorUnidadMedida}
            onChange={onInputChange}
            fullWidth
            margin="normal"
            className="formulario-input"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>Estado</InputLabel>
            <Select
              name="activo"
              value={insumo.activo ? 1 : 0}
              onChange={(e) =>
                onInputChange({
                  target: { name: "activo", value: e.target.value === 1 },
                })
              }
            >
              <MenuItem value={1}>Activo</MenuItem>
              <MenuItem value={0}>Desactivado</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onGuardarInsumo}
          className="formulario-boton"
        >
          Crear Insumo
        </Button>
      </Box>

      <Typography component="h2" variant="h5" mt={3} className="formulario-titulo">
        Agregar Variantes
      </Typography>

      <Grid container spacing={2} className="formulario-grid">
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>Marca</InputLabel>
            <Select
              name="marcaId"
              value={varianteActual.marcaId}
              onChange={onVarianteChange}
            >
              {Array.isArray(marcas) && marcas.length > 0 ? (
                marcas.map((marca) => (
                  <MenuItem key={marca.id} value={marca.id}>
                    {marca.nombre}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Cargando marcas...</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>Distribuidor</InputLabel>
            <Select
              name="distribuidorId"
              value={varianteActual.distribuidorId}
              onChange={onVarianteChange}
            >
              {Array.isArray(distribuidores) && distribuidores.length > 0 ? (
                distribuidores.map((distribuidor) => (
                  <MenuItem key={distribuidor.id} value={distribuidor.id}>
                    {distribuidor.nombre}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Cargando distribuidores...</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" className="formulario-select">
            <InputLabel>Presentación</InputLabel>
            <Select
              name="presentacionId"
              value={varianteActual.presentacionId}
              onChange={onVarianteChange}
            >
              {Array.isArray(presentaciones) && presentaciones.length > 0 ? (
                presentaciones.map((presentacion) => (
                  <MenuItem key={presentacion.id} value={presentacion.id}>
                    {presentacion.nombre}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Cargando presentaciones...</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Código de Barra"
            name="codigoBarra"
            value={varianteActual.codigoBarra}
            onChange={onVarianteChange}
            fullWidth
            margin="normal"
            className="formulario-input"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Modelo Marca"
            name="modeloMarca"
            value={varianteActual.modeloMarca}
            onChange={onVarianteChange}
            fullWidth
            margin="normal"
            className="formulario-input"
          />
        </Grid>

        <Grid item xs={12}  mb={1} mt={1}>
          <Button
            variant="contained"
            color="secondary"
            onClick={onAgregarVariante}
            className="formulario-boton"
          >
            Agregar Variante
          </Button>
        </Grid>
      </Grid>

      <TablaGenerica
        encabezado="Variantes Agregadas"
        columnas={columnasVariantes}
        datos={variantes}
        mostrarCrear={false}
      />
    </Box>
  );
};

export default PaginaFormularioInsumo;