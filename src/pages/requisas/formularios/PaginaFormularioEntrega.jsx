import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import '@/assets/styles/formularios.css';

const PaginaFormularioEntrega = ({ entrega, onChange, onSave, error, isEditing, formik }) => {
  return (
    <Box className="formulario-container">
      <Typography
        component="h1"
        className="formulario-titulo"
        variant="h4"
        mb={1}
        textAlign="left"
      >
        {isEditing ? 'Actualizar Entrega' : 'Crear Entrega'}
      </Typography>

      <Typography
        className="formulario-subtitulo"
        variant="subtitle1"
        mb={3}
        textAlign="left"
        color="textSecondary"
      >
        Complete los siguientes campos para {isEditing ? 'actualizar la entrega' : 'crear una nueva entrega'}
      </Typography>

      {error ? (
        <Typography variant="h6" color="error" textAlign="center">
          Error al cargar los datos de la entrega
        </Typography>
      ) : (
        <form onSubmit={onSave}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Detalle Requisa ID"
                name="detalleRequisaId"
                type="number"
                value={formik.values.detalleRequisaId}
                onChange={onChange}
                fullWidth
                margin="normal"
                error={formik.touched.detalleRequisaId && Boolean(formik.errors.detalleRequisaId)}
                helperText={formik.touched.detalleRequisaId && formik.errors.detalleRequisaId}
                InputLabelProps={{ sx: { color: 'text.secondary', fontSize: '16px' }, shrink: true }}
                InputProps={{ className: 'formulario-input' }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Cantidad Presentación Entregada"
                name="cantidadPresentacionEntregada"
                type="number"
                value={formik.values.cantidadPresentacionEntregada}
                onChange={onChange}
                fullWidth
                margin="normal"
                error={formik.touched.cantidadPresentacionEntregada && Boolean(formik.errors.cantidadPresentacionEntregada)}
                helperText={formik.touched.cantidadPresentacionEntregada && formik.errors.cantidadPresentacionEntregada}
                InputLabelProps={{ sx: { color: 'text.secondary', fontSize: '16px' }, shrink: true }}
                InputProps={{ className: 'formulario-input' }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Recibido Por (ID)"
                name="recibidoPor"
                type="number"
                value={formik.values.recibidoPor}
                onChange={onChange}
                fullWidth
                margin="normal"
                error={formik.touched.recibidoPor && Boolean(formik.errors.recibidoPor)}
                helperText={formik.touched.recibidoPor && formik.errors.recibidoPor}
                InputLabelProps={{ sx: { color: 'text.secondary', fontSize: '16px' }, shrink: true }}
                InputProps={{ className: 'formulario-input' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Observaciones"
                name="observaciones"
                value={formik.values.observaciones}
                onChange={onChange}
                fullWidth
                margin="normal"
                multiline
                rows={3}
                InputLabelProps={{ sx: { color: 'text.secondary', fontSize: '16px' }, shrink: true }}
                InputProps={{ className: 'formulario-input' }}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="formulario-boton"
            >
              {isEditing ? 'Actualizar Entrega' : 'Crear Entrega'}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioEntrega;