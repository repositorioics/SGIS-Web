import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '@/assets/styles/formularios.css';
import CustomTextField from '@/components/comun/CustomTextField';
import CustomButton from '@/components/comun/CustomButton';
import CustomTypography from '@/components/comun/CustomTypography';
import TablaGenerica from '@/components/inventario/TablaGenerica';

const PaginaAutorizacionSolicitud = ({
  solicitud,
  detalles,
  usuarioNombre,
  donanteNombre,
  estadoNombre,
  fechaCreacion,
  observaciones,
  onAutorizar,
  onRechazar,
  mostrarBotones = false,
}) => {
  const { t } = useTranslation();

  // Columnas de la tabla de detalles de la solicitud
  const columnasDetalles = [
    {
      field: 'insumo',
      headerName: t('paginaAutorizacionSolicitud.insumo'),
      flex: 1,
      renderCell: (params) => params.value.nombre || t('paginaAutorizacionSolicitud.nombreNoDisponible'),
    },
    {
      field: 'marca',
      headerName: t('paginaAutorizacionSolicitud.marca'),
      flex: 1,
      renderCell: (params) => params.value.nombre || t('paginaAutorizacionSolicitud.nombreNoDisponible'),
    },
    {
      field: 'distribuidor',
      headerName: t('paginaAutorizacionSolicitud.distribuidor'),
      flex: 1,
      renderCell: (params) => params.value.nombre || t('paginaAutorizacionSolicitud.nombreNoDisponible'),
    },
    {
      field: 'presentacion',
      headerName: t('paginaAutorizacionSolicitud.presentacion'),
      flex: 1,
      renderCell: (params) => params.value.nombre || t('paginaAutorizacionSolicitud.nombreNoDisponible'),
    },
    { field: 'cantidadPresentaciones', headerName: t('paginaAutorizacionSolicitud.cantidad'), flex: 1 },
    {
      field: 'estudio',
      headerName: t('paginaAutorizacionSolicitud.estudio'),
      flex: 1,
      renderCell: (params) => params.value.nombre || t('paginaAutorizacionSolicitud.nombreNoDisponible'),
    },
    {
      field: 'bioanalista',
      headerName: t('paginaAutorizacionSolicitud.analista'),
      flex: 1,
      renderCell: (params) => `${params.value.nombre} ${params.value.apellido}` || t('paginaAutorizacionSolicitud.nombreNoDisponible'),
    },
    { field: 'observacion', headerName: t('paginaAutorizacionSolicitud.observacion'), flex: 1 },
  ];

  return (
    <Box className="formulario-container">
      <CustomTypography variant="h4" className="formulario-titulo" textAlign="left">
        {t('paginaAutorizacionSolicitud.detalleSolicitud')}
      </CustomTypography>

      <CustomTypography variant="subtitle1" color="textSecondary" className="formulario-subtitulo" textAlign="left">
        {t('paginaAutorizacionSolicitud.informacionGeneral')}
      </CustomTypography>

      <Grid container spacing={2} className="formulario-grid">
        <Grid item xs={12} sm={6}>
          <CustomTextField
            label={t('paginaAutorizacionSolicitud.numeroSolicitud')}
            value={solicitud.numeroSolicitud}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            label={t('paginaAutorizacionSolicitud.usuarioSolicitante')}
            value={usuarioNombre}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            label={t('paginaAutorizacionSolicitud.donante')}
            value={donanteNombre}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            label={t('paginaAutorizacionSolicitud.estado')}
            value={estadoNombre}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            label={t('paginaAutorizacionSolicitud.fechaCreacion')}
            value={new Date(fechaCreacion).toLocaleDateString()}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            label={t('paginaAutorizacionSolicitud.observaciones')}
            value={observaciones}
            fullWidth
            margin="normal"
            multiline
            rows={3}
            InputProps={{ readOnly: true }}
          />
        </Grid>
      </Grid>

      <CustomTypography variant="h5" className="formulario-titulo" mt={2} textAlign="left">
        {t('paginaAutorizacionSolicitud.detalles')}
      </CustomTypography>
      <CustomTypography variant="subtitle1" color="textSecondary" className="formulario-subtitulo" textAlign="left">
        {t('formularioSolicitud.detalleSubtitulo')}
      </CustomTypography>

      <TablaGenerica
        encabezado={t('paginaAutorizacionSolicitud.detallesAgregados')}
        columnas={columnasDetalles}
        datos={detalles}
        getRowId={(row) => row.id}
        mostrarCrear={false}
        pagination={false}
      />

      {mostrarBotones && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
          <CustomButton
            variant="contained"
            color="primary"
            onClick={onAutorizar}
            label={t('paginaAutorizacionSolicitud.autorizar')}
          />
          <CustomButton
            variant="contained"
            color="secondary"
            onClick={() => {
              const justificacion = prompt(t('paginaAutorizacionSolicitud.ingresarJustificacionRechazo'));
              if (justificacion) onRechazar(justificacion);
            }}
            label={t('paginaAutorizacionSolicitud.rechazar')}
          />
        </Box>
      )}
    </Box>
  );
};

export default PaginaAutorizacionSolicitud;