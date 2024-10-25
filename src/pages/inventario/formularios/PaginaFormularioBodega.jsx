import React from 'react';
import { Box, Button, Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTranslation } from 'react-i18next'; // Importar hook de traducción
import '@/assets/styles/formularios.css'; // Importar el archivo CSS

const PaginaFormularioBodega = ({ bodega, onChange, onSave, error, isEditing, formik, sitios, donantes }) => {
  const { t } = useTranslation(); // Usar hook de traducción

  return (
    <Box className="formulario-container">
      <Typography
        component="h1"
        className="formulario-titulo"
        variant="h4"
        mb={1}
        textAlign="left"
      >
        {isEditing ? t('formularioBodega.actualizarTitulo') : t('formularioBodega.crearTitulo')}
      </Typography>

      <Typography
        className="formulario-subtitulo"
        variant="subtitle1"
        mb={3}
        textAlign="left"
        color="textSecondary"
      >
        {isEditing
          ? t('formularioBodega.actualizarSubtitulo')
          : t('formularioBodega.crearSubtitulo')}
      </Typography>

      {error ? (
        <Typography variant="h6" color="error" textAlign="center">
          {t('formularioBodega.errorCargar')}
        </Typography>
      ) : (
        <form onSubmit={onSave}>
          <Grid container spacing={2}>
            {/* Campo Nombre */}
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('formularioBodega.nombreLabel')}
                name="nombre"
                value={formik.values.nombre}
                onChange={onChange}
                fullWidth
                margin="normal"
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
                autoComplete="off"  
                InputLabelProps={{
                  sx: { color: 'text.secondary', fontSize: '16px' },
                  shrink: true,
                }}
                InputProps={{
                  className: 'formulario-input', // Aplicar clase CSS
                }}
              />
            </Grid>

            {/* Campo Descripción */}
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('formularioBodega.descripcionLabel')}
                name="descripcion"
                value={formik.values.descripcion}
                onChange={onChange}
                fullWidth
                margin="normal"
                rows={4}
                error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
                helperText={formik.touched.descripcion && formik.errors.descripcion}
                autoComplete="off"  
                InputLabelProps={{
                  sx: { color: 'text.secondary', fontSize: '16px' },
                  shrink: true,
                }}
                InputProps={{
                  className: 'formulario-input', // Aplicar clase CSS
                }}
              />
            </Grid>

            {/* Campo Dirección */}
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('formularioBodega.direccionLabel')}
                name="direccion"
                value={formik.values.direccion}
                onChange={onChange}
                fullWidth
                margin="normal"
                error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                helperText={formik.touched.direccion && formik.errors.direccion}
                autoComplete="off"  
                InputLabelProps={{
                  sx: { color: 'text.secondary', fontSize: '16px' },
                  shrink: true,
                }}
                InputProps={{
                  className: 'formulario-input', // Aplicar clase CSS
                }}
              />
            </Grid>

            {/* Campo Sitio */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>{t('formularioBodega.sitioLabel')}</InputLabel>
                <Select
                  name="sitioId"
                  value={formik.values.sitioId || ''}
                  onChange={onChange}
                  error={formik.touched.sitioId && Boolean(formik.errors.sitioId)}
                  inputProps={{ autoComplete: 'off' }}  
                >
                  <MenuItem value="">{t('formularioBodega.seleccionarSitio')}</MenuItem>
                  {sitios.map(sitio => (
                    <MenuItem key={sitio.id} value={sitio.id}>
                      {sitio.nombre}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.sitioId && formik.errors.sitioId && (
                  <Typography color="error">{formik.errors.sitioId}</Typography>
                )}
              </FormControl>
            </Grid>

            {/* Campo Donante */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>{t('formularioBodega.donanteLabel')}</InputLabel>
                <Select
                  name="donanteId"
                  value={formik.values.donanteId || ''}
                  onChange={onChange}
                  error={formik.touched.donanteId && Boolean(formik.errors.donanteId)}
                  inputProps={{ autoComplete: 'off' }}  
                >
                  <MenuItem value="">{t('formularioBodega.seleccionarDonante')}</MenuItem>
                  {donantes.map(donante => (
                    <MenuItem key={donante.id} value={donante.id}>
                      {donante.nombre}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.donanteId && formik.errors.donanteId && (
                  <Typography color="error">{formik.errors.donanteId}</Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="formulario-boton" // Aplicar clase CSS
            >
              {isEditing ? t('formularioBodega.botonActualizar') : t('formularioBodega.botonCrear')}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default PaginaFormularioBodega;