import React from 'react';
import { Box, Grid } from '@mui/material';
import CustomTextField from '@/components/comun/CustomTextField';
import CustomButton from '@/components/comun/CustomButton';
import CustomTypography from '@/components/comun/CustomTypography';
import TablaDetalles from '@/components/TablaDetalles';
import { useTranslation } from 'react-i18next';

/**
 * Página para mostrar los detalles de una requisa.
 */
const PaginaFormularioVerRequisa = ({ requisa, detalles = [], onRegresar }) => {
  const { t } = useTranslation();

  // Columnas para la tabla de detalles con nombres en lugar de IDs
  const columns = [
    { field: 'insumoNombre', header: t('formularioRequisa.insumo'), flex: 1 },
    { field: 'presentacionNombre', header: t('formularioRequisa.presentacion'), flex: 1 },
    { field: 'marcaNombre', header: t('formularioRequisa.marca'), flex: 1 },
    {
      field: 'cantidadPresentacionesSolicitada',
      header: t('formularioRequisa.cantidadSolicitada'),
      flex: 1,
    },
    { field: 'observacion', header: t('formularioRequisa.observacion'), flex: 1 },
  ];

  return (
    <Box className="formulario-container">
      <CustomTypography variant="h4" className="formulario-titulo" textAlign="left">
        {t('formularioRequisa.detallesTitulo')}
      </CustomTypography>

      {/* Información General */}
      <Grid container spacing={2} className="formulario-grid">
        <Grid item xs={12} sm={6}>
          <CustomTextField
            label={t('formularioRequisa.codigoUnico')}
            name="codigoUnico"
            value={requisa.codigoUnico}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            label={t('formularioRequisa.nombreSitio')}
            name="nombreSitio"
            value={requisa.nombreSitio}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            label={t('formularioRequisa.estado')}
            name="nombreEstado"
            value={requisa.nombreEstado}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            label={t('formularioRequisa.observaciones')}
            name="observaciones"
            value={requisa.observaciones}
            fullWidth
            multiline
            rows={3}
            InputProps={{ readOnly: true }}
          />
        </Grid>
      </Grid>

      {/* Tabla de Detalles */}
      <TablaDetalles
        encabezado={t('formularioRequisa.detallesAgregados')}
        columns={columns}
        detalles={detalles}
        seleccionMultiple={false} // Deshabilitamos selección
      />

      {/* Botón de regresar */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <CustomButton
          variant="contained"
          color="primary"
          onClick={onRegresar}
          label={t('formularioRequisa.regresarBoton')}
        />
      </Box>
    </Box>
  );
};

export default PaginaFormularioVerRequisa;