import React, { useState, useEffect, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import CustomTextField from '@/components/comun/CustomTextField';
import CustomButton from '@/components/comun/CustomButton';
import CustomTypography from '@/components/comun/CustomTypography';
import CustomSelect from '@/components/comun/CustomSelect';
import TablaDetalles from '@/components/TablaDetalles';
import { useTranslation } from 'react-i18next';

const PaginaFormularioRequisa = ({
  requisa,
  detalleActual,
  detalles = [],
  sitios = [],
  insumos = [],
  onInputChange,
  onDetalleChange,
  onAgregarDetalle,
  onEliminarSeleccionados,
  onGuardarRequisa,
  codigoUnico,
  usuarioNombre,
  selectedRows,
  handleRemoveDetail={handleRemoveDetail} ,
  setSelectedRows
}) => {
  const { t } = useTranslation();

  const [filteredPresentaciones, setFilteredPresentaciones] = useState([]);
  const [filteredMarcas, setFilteredMarcas] = useState([]);

  // Actualiza las presentaciones y marcas basadas en el insumo seleccionado
  useEffect(() => {
    const insumoSeleccionado = insumos.find(insumo => insumo.id === detalleActual.insumoId);

    if (insumoSeleccionado) {
      setFilteredPresentaciones(insumoSeleccionado.presentaciones || []);
      setFilteredMarcas(insumoSeleccionado.marcas || []);
    } else {
      setFilteredPresentaciones([]);
      setFilteredMarcas([]);
    }
  }, [detalleActual.insumoId, insumos]);

  // Mapea los detalles para reemplazar IDs por nombres, accediendo directamente a `insumos`
  const mappedDetalles = useMemo(() => {
    return detalles.map(detalle => {
      const insumo = insumos.find(i => i.id === detalle.insumoId);
      const presentacion = insumo?.presentaciones.find(p => p.id === detalle.presentacionId);
      const marca = insumo?.marcas.find(m => m.id === detalle.marcaId);

      return {
        ...detalle,
        insumoNombre: insumo ? insumo.nombre : 'N/A',
        presentacionNombre: presentacion ? presentacion.nombre : 'N/A',
        marcaNombre: marca ? marca.nombre : 'N/A',
      };
    });
  }, [detalles, insumos]);

  const columns = [
    {
      field: 'insumoNombre',
      header: t('formularioRequisa.insumo'),
      flex: 1,
    },
    {
      field: 'presentacionNombre',
      header: t('formularioRequisa.presentacion'),
      flex: 1,
    },
    {
      field: 'marcaNombre',
      header: t('formularioRequisa.marca'),
      flex: 1,
    },
    { field: 'cantidadPresentacionesSolicitada', header: t('formularioRequisa.cantidadSolicitada'), flex: 1 },
    { field: 'observacion', header: t('formularioRequisa.observacion'), flex: 1 },
  ];

  return (
    <Box className="formulario-container">
      <CustomTypography variant="h4" className="formulario-titulo" textAlign="left">
        {t('formularioRequisa.titulo')}
      </CustomTypography>

      <Grid container spacing={2} className="formulario-grid">
        <Grid item xs={12} sm={6}>
          <CustomTextField
            label={t('formularioRequisa.codigoUnico')}
            name="codigoUnico"
            value={codigoUnico}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomSelect
            label={t('formularioRequisa.sitio')}
            name="sitioId"
            value={requisa.sitioId}
            onChange={onInputChange}
            options={sitios.map(sitio => ({ id: sitio.id, nombre: sitio.nombre }))}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            label={t('formularioRequisa.creadoPor')}
            name="creadoPor"
            value={usuarioNombre}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            label={t('formularioRequisa.observaciones')}
            name="observaciones"
            value={requisa.observaciones}
            onChange={onInputChange}
            fullWidth
            multiline
            rows={3}
          />
        </Grid>
      </Grid>

      <CustomTypography variant="h5" className="formulario-titulo" mt={7} textAlign="left">
        {t('formularioRequisa.agregarDetalles')}
      </CustomTypography>

      <Grid container spacing={2} className="formulario-grid">
        <Grid item xs={12} sm={4}>
          <CustomSelect
            label={t('formularioRequisa.insumo')}
            name="insumoId"
            value={detalleActual.insumoId}
            onChange={onDetalleChange}
            options={insumos.map(insumo => ({ id: insumo.id, nombre: insumo.nombre }))}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CustomSelect
            label={t('formularioRequisa.presentacion')}
            name="presentacionId"
            value={detalleActual.presentacionId}
            onChange={onDetalleChange}
            options={filteredPresentaciones.map(p => ({ id: p.id, nombre: p.nombre }))}
            disabled={!detalleActual.insumoId}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CustomSelect
            label={t('formularioRequisa.marca')}
            name="marcaId"
            value={detalleActual.marcaId}
            onChange={onDetalleChange}
            options={filteredMarcas.map(m => ({ id: m.id, nombre: m.nombre }))}
            disabled={!detalleActual.insumoId}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t('formularioRequisa.cantidadSolicitada')}
            name="cantidadPresentacionesSolicitada"
            type="number"
            value={detalleActual.cantidadPresentacionesSolicitada}
            onChange={onDetalleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={8}>
          <CustomTextField
            label={t('formularioRequisa.observacion')}
            name="observacion"
            value={detalleActual.observacion}
            onChange={onDetalleChange}
            fullWidth
            multiline
            rows={2}
          />
        </Grid>

        <Grid item xs={12} mb={3} mt={3}>
          <CustomButton
            variant="contained"
            color="secondary"
            onClick={onAgregarDetalle}
            label={t('formularioRequisa.agregarDetalleBoton')}
          />
        </Grid>
      </Grid>

      <TablaDetalles
        encabezado={t('formularioRequisa.detallesAgregados')}
        columns={columns}
        detalles={mappedDetalles}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onEliminarSeleccionados={onEliminarSeleccionados}
        handleRemoveDetail={handleRemoveDetail} 
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <CustomButton
          variant="contained"
          color="primary"
          onClick={onGuardarRequisa}
          label={t('formularioRequisa.crearRequisaBoton')}
        />
      </Box>
    </Box>
  );
};

export default PaginaFormularioRequisa;