import React from "react";
import { Box, Grid } from "@mui/material";
import CustomTextField from "@/components/comun/CustomTextField";
import CustomButton from "@/components/comun/CustomButton";
import CustomTypography from "@/components/comun/CustomTypography";
import TablaDetalles from "@/components/TablaDetalles";
import { useTranslation } from "react-i18next";

/**
 * Página para gestionar el formulario de entrega de requisas.
 */
const PaginaFormularioEntregaRequisa = ({
  entrega,
  detalles,
  onInputChange,
  onUpdateDetalle,
  onGuardarEntrega,
}) => {
  const { t } = useTranslation();

  // Configuración de las columnas de la tabla de detalles
  const columns = [
    { field: "nombreInsumo", header: t("formularioEntrega.insumo"), flex: 2 },
    { field: "nombrePresentacion", header: t("formularioEntrega.presentacion"), flex: 2 },
    { field: "nombreMarca", header: t("formularioEntrega.marca"), flex: 2 },
    {
      field: "cantidadEntregada",
      header: t("formularioEntrega.cantidadEntregada"),
      flex: 1,
      editable: true,
      renderCell: (params) => (
        <CustomTextField
          type="number"
          value={params.row.cantidadEntregada}
          onChange={(e) =>
            onUpdateDetalle(params.id, "cantidadEntregada", e.target.value)
          }
          fullWidth
        />
      ),
    },
    {
      field: "observacion",
      header: t("formularioEntrega.observaciones"),
      flex: 2,
      editable: true,
      renderCell: (params) => (
        <CustomTextField
          value={params.row.observacion}
          onChange={(e) =>
            onUpdateDetalle(params.id, "observacion", e.target.value)
          }
          fullWidth
        />
      ),
    },
  ];

  return (
    <Box className="formulario-container">
      <CustomTypography variant="h4" className="formulario-titulo" textAlign="left">
        {t("formularioEntrega.titulo")}
      </CustomTypography>

      {/* Datos generales */}
      <Grid container spacing={2} className="formulario-grid">
        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t("formularioEntrega.requisaId")}
            name="requisaId"
            value={entrega.requisaId}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t("formularioEntrega.codigoUnico")}
            name="codigoUnico"
            value={entrega.codigoUnico}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t("formularioEntrega.sitio")}
            name="nombreSitio"
            value={entrega.nombreSitio}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={t("formularioEntrega.estado")}
            name="nombreEstado"
            value={entrega.nombreEstado}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <CustomTextField
            label={t("formularioEntrega.observacionesEntrega")}
            name="observacionesEntrega"
            value={entrega.observacionesEntrega}
            onChange={onInputChange}
            fullWidth
            multiline
            rows={3}
          />
        </Grid>
      </Grid>

      <CustomTypography variant="h5" className="formulario-titulo" mt={7} textAlign="left">
        {t("formularioEntrega.detalles")}
      </CustomTypography>

      {/* Tabla de detalles */}
      <TablaDetalles
        encabezado={t("formularioEntrega.detallesEntregados")}
        columns={columns}
        detalles={detalles}
        getRowId={(row) => row.id}
        seleccionMultiple={false}
      />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <CustomButton
          variant="contained"
          color="primary"
          onClick={onGuardarEntrega}
          label={t("formularioEntrega.guardar")}
        />
      </Box>
    </Box>
  );
};

export default PaginaFormularioEntregaRequisa;