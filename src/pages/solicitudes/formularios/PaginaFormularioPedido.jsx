import React, { useEffect } from 'react';
import { Box, CircularProgress, Grid, Modal, TextField } from '@mui/material';
import CustomButton from '@/components/comun/CustomButton';
import CustomTextField from '@/components/comun/CustomTextField';
import CustomTypography from '@/components/comun/CustomTypography';
import TablaDetalles from '@/components/TablaDetalles';
import { useTranslation } from 'react-i18next';

const PaginaFormularioPedido = ({
  solicitud = {},
  usuario = {},
  detalles = [],
  codigoPedido = '',
  estadoId,
  onGuardarPedido,
  onExclusiones,
  onUpdateDetail,
  selectedRows,
  setSelectedRows,
  modalOpen,
  abrirModal,
  setModalOpen,
  justificacion,
  setJustificacion
}) => {
  const { t } = useTranslation();

  // Definición de columnas para la tabla de detalles
  const columns = [
    { header: 'pedido.insumo', field: 'insumo.nombre' },
    { header: 'pedido.categoria', field: 'insumo.categoria.nombre' },
    { header: 'pedido.unidadMedida', field: 'insumo.unidadMedida.nombre' },
    { header: 'pedido.cantidad', field: 'cantidadPresentaciones' },
    { header: 'pedido.presentacion', field: 'presentacion.nombre' },
    { header: 'pedido.marca', field: 'marca.nombre' },
    { header: 'pedido.distribuidor', field: 'distribuidor.nombre' },
    { header: 'pedido.estudio', field: 'estudio.nombre' }, // Agregar columna para estudio
    { header: 'pedido.bioanalista', field: 'bioanalista.nombre' },
    { header: 'pedido.clasificacion', field: 'clasificacion' },
    { header: 'pedido.observacion', field: 'observacion' },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <CustomTypography variant="h4">{t('pedido.titulo')}</CustomTypography>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            label={t('pedido.codigoPedido')}
            value={codigoPedido || ''}
            name="codigoPedido"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            label={t('pedido.numeroSolicitud')}
            value={solicitud?.numeroSolicitud || ''}
            name="numeroSolicitud"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            label={t('pedido.usuarioNombre')}
            value={usuario?.nombre || t('pedido.nombreNoDisponible')}
            name="usuarioNombre"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            label={t('pedido.estadoNombre')}
            value={solicitud?.estadoNombre || ''}
            name="estadoNombre"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            label={t('pedido.donanteNombre')}
            value={solicitud?.donanteNombre || ''}
            name="donanteNombre"
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            label={t('pedido.observaciones')}
            value={solicitud?.observaciones || ''}
            name="observaciones"
            multiline
          />
        </Grid>
      </Grid>

      {detalles.length > 0 ? (
        <TablaDetalles
          detalles={detalles}
          columns={columns}
          handleRemoveDetail={(index) => {
            const nuevosDetalles = [...detalles];
            nuevosDetalles.splice(index, 1);
            onUpdateDetail(index, nuevosDetalles);
          }}
          onSelectRow={(detalle, isSelected) => {
            const idsSeleccionados = isSelected
              ? [...selectedRows, detalle.insumo.id]
              : selectedRows.filter((id) => id !== detalle.insumo.id);
            setSelectedRows(idsSeleccionados);
          }}
          onUpdateDetail={onUpdateDetail}
          seleccionMultiple
        />
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
          <CustomTypography variant="body1">{t('pedido.cargandoDetalles')}</CustomTypography>
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 2, justifyContent: "center", marginTop: 2, marginBottom: 10 }}>
        <CustomButton onClick={abrirModal} label={t('pedido.excluirSeleccionados')} />
        <CustomButton onClick={onGuardarPedido} label={t('pedido.guardarPedido')} />
      </Box>

      {/* Modal de justificación */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)} // Cierra el modal al hacer clic fuera
        aria-labelledby="modal-justificacion"
        aria-describedby="modal-justificacion-descripcion"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%', // Ajuste de ancho para pantallas más pequeñas
            maxWidth: 400, // Máximo ancho del modal
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <CustomTypography variant="h6" id="modal-justificacion">
            {t('pedido.justificacionExclusion')}
          </CustomTypography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={justificacion}
            onChange={(e) => setJustificacion(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 2,
              gap: 1,
              flexWrap: 'wrap', // Permite que los botones se adapten en pantallas pequeñas
            }}
          >
            <CustomButton onClick={() => setModalOpen(false)} label={t('pedido.cancelar')} />
            <CustomButton onClick={onExclusiones} label={t('pedido.confirmarExclusion')} />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default PaginaFormularioPedido;